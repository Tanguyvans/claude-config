---
name: video-ideas
description: >
  Génère une liste d'idées de sujets pour des vidéos courtes (YouTube, TikTok, Shorts, Reels)
  en utilisant le skill `scrapper` pour scraper X, TikTok, Instagram et GitHub trending IA.
  Utilise ce skill quand l'utilisateur demande "idées de vidéo", "sujets pour vidéo",
  "veille réseaux sociaux", "quoi dire dans ma prochaine vidéo", "trouve-moi des angles",
  "trends IA", ou quand il cherche de l'inspiration pour son contenu.
  Chaque idée sortie est une phrase courte + la source (URL).
---

# Video Ideas Generator

Ce skill **utilise le skill `scrapper`** pour récupérer les données, puis synthétise des angles vidéo exploitables. Il ne fait pas de scraping lui-même — toute la logique de fetch est dans `~/.claude/skills/scrapper/`.

## Workflow

### Étape 0 — Vérifier les sujets déjà couverts

**Avant de scraper**, lire `~/Desktop/ai-claude/video-courte/index-videos.md` et les scripts dans `~/Desktop/ai-claude/video-courte/scripts/*.md` pour identifier les sujets déjà traités. Auto-filtrer et flagger les overlaps dans la liste finale ("déjà couvert : caveman, mémpalace, etc.").

Si la demande mentionne un **produit ou feature précis** (ex: "Claude Code Routines"), préférer une recherche ciblée (WebSearch/WebFetch sur la doc officielle ou le repo) plutôt qu'un scrape tous azimuts — le scrape retourne 15 angles génériques, la recherche ciblée donne des angles pertinents directement.

### Étape 1 — Choisir les sources à scraper

Par défaut : **X + GitHub**. C'est le meilleur ratio signal/crédits (X = les takes chauds, GitHub = les nouveaux outils qui buzzent, et GitHub est gratuit).

Si l'utilisateur demande explicitement TikTok ou Insta, ajoute-les. Sinon évite — TikTok et Insta consomment des crédits sans garantie de contenu utile pour une niche tech/IA.

### Étape 2 — Lancer le scrapper

```bash
set -a; source /Users/tanguyvans/.claude/skills/scrapper/.env; set +a
node /Users/tanguyvans/.claude/skills/scrapper/all.js --only=twitter,github > /tmp/video-ideas.json
```

Variations selon la demande :
- Demande légère / test : `--only=twitter` uniquement
- Demande complète : retire `--only`
- Focus GitHub trending : `--only=github` (0 crédit)

### Étape 3 — Synthétiser en angles vidéo

Lis `/tmp/video-ideas.json` puis produis une liste **dans ce format exact** :

```
## Idées de vidéo — [date du jour]

### 🔥 Chaud (< 2 semaines)

1. **"[angle reformulé en 1-2 phrases accrocheuses]"**
   📊 [metric] · [platform] · @[author] · il y a [Nj]
   🔗 [url]

### 💡 Angles evergreen
...

### 🛠️ Nouveaux outils IA (GitHub)

N. **"[repo] a explosé cette semaine — [angle : démo / comparatif / tuto]"**
   ⭐ [stars] stars · topics: [topics]
   🔗 [url]
```

### Règles de synthèse

- **Reformule le post en un angle vidéo**, pas un résumé. Un post "I built an AI that writes emails" → angle *"J'ai construit une IA qui répond à mes emails — la stack en 60s"*.
- **Groupe par thème** si plusieurs posts parlent du même sujet (même modèle IA sorti, même tool). Un seul angle, plusieurs sources.
- **Priorise les angles actionnables** : démos, tutos, comparatifs, hot takes. Évite les annonces type "on recrute".
- **Priorise les posts récents** (< 30 jours) en haut, même si d'autres ont plus d'engagement — Twitter ScrapeCreators renvoie des tweets de plusieurs années mélangés.
- **Demoter fortement les posts > 90 jours** : même avec gros engagement, ne pas les remonter en top si la date est ancienne. Risque de présenter du vieux contenu comme "frais".
- **Afficher l'âge des repos GitHub** : si `created_at` est disponible, afficher "créé il y a N semaines" en plus des stars — utile pour les claims "ça explose cette semaine".
- **Max 15 angles** (ou `max_ideas` dans `scrapper/config.json`).
- **Langue** : angles en français même si les posts sont en anglais.
- **Tags GitHub** : inclure les `topics` pour que l'utilisateur voie rapidement le sujet (ex: `[llm, rag, python]`).

### Étape 4 — Proposer les suites

Après la liste, propose :
- "Tu veux que je transforme l'idée N°X en script via `/short-script` ?"
- "Tu veux élargir la liste de comptes dans `scrapper/config.json` ?"
- "Tu veux que j'ajoute le sujet choisi dans `index-videos.md` pour éviter le doublon la prochaine fois ?"

Si l'utilisateur valide un angle, proposer d'ajouter une entrée dans `~/Desktop/ai-claude/video-courte/index-videos.md` avant de continuer.

## Config

Le skill ne stocke **pas sa propre config** — tout est dans `~/.claude/skills/scrapper/config.json`. Si l'utilisateur veut ajouter un compte à tracker, édite ce fichier-là, pas ici.

## Debug

Si zéro idée en sortie :
- Seuils d'engagement trop hauts dans `scrapper/config.json` → baisse-les
- Handles X inexistants → regarde stderr pour `[skip] x/handle: 404`
- Crédits ScrapeCreators épuisés → erreur `402` dans stderr → lance `--only=github` en fallback
