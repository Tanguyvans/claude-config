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

### Étape 0 — Cadrage et auto-filter

**Avant de scraper**, faire deux choses :

1. **Lire le vault Obsidian pour exclure les sujets déjà couverts** :
   ```bash
   cat ~/Desktop/ai-claude/video-courte/index-videos.md 2>/dev/null
   ls ~/Desktop/ai-claude/video-courte/scripts/*.md 2>/dev/null
   ```
   Identifier les slugs / sujets déjà traités. Plus tard à l'étape 3, **filtrer** les angles qui matchent ces sujets et flagger en tête de la liste : `Déjà couverts : caveman, mempalace, career-ops, opus-4-7`. Ne pas attendre que l'utilisateur dise "on a déjà couvert".

2. **Si la demande mentionne un produit/feature précis** (ex: "Claude Code Routines", "Opus 4.7 memory tool") :
   - **Ne PAS scraper tout azimut** — tu vas produire 15 angles génériques inutiles
   - Demander confirmation et **pivoter vers une recherche ciblée** : WebSearch sur la doc officielle, lecture du README/changelog, recherche Twitter ciblée par mot-clé
   - Le scrapper sert quand la demande est large ("inspire-moi sur l'IA cette semaine"), pas quand elle est narrow

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
- **Tweets > 90 jours** : demoter fortement (ne pas remonter en top même avec gros likes). Si pas de `created_at` exploitable, demoter aussi par défaut. Évite de présenter du vieux contenu comme "frais" en cas de fallback GitHub-only.
- **Affichage de l'âge** : pour chaque post / repo, afficher l'âge ("créé il y a 2 semaines") en plus des metrics — utile pour les claims "explose cette semaine" que l'utilisateur fera ensuite dans le script. Calculer depuis `created_at`.
- **Auto-filter sujets déjà couverts** (étape 0) : exclure les angles qui matchent les sujets déjà traités dans `~/Desktop/ai-claude/video-courte/scripts/*.md` et `index-videos.md`. Les flagger en tête : `Déjà couverts : ...`.
- **Max 15 angles** (ou `max_ideas` dans `scrapper/config.json`).
- **Langue** : angles en français même si les posts sont en anglais.
- **Tags GitHub** : inclure les `topics` pour que l'utilisateur voie rapidement le sujet (ex: `[llm, rag, python]`).

### Étape 3.5 — Shape réelle du JSON scrapper

Le JSON `/tmp/video-ideas.json` produit par `all.js` est imbriqué — pas un tableau plat. Lire :

```js
const data = JSON.parse(fs.readFileSync('/tmp/video-ideas.json'));
data.platforms.twitter.posts   // tweets X
data.platforms.github.repos    // repos GitHub (pas .posts ni .count)
data.platforms.tiktok.posts
data.platforms.instagram.posts
```

**Ne pas** faire `data.twitter[]` ni `data.platforms.github.count` — ça casse silencieusement.

### Étape 3.6 — Fallback GitHub pour repos hors-fenêtre

La fenêtre par défaut de `github.js` (30 jours) rate les repos plus vieux mais toujours trending (ex: `forrestchang/andrej-karpathy-skills` créé fin janvier, 90k stars). Quand l'user demande "est-ce qu'il y a un repo à X stars sur Y" et que le scrape ne le trouve pas → fallback :

```bash
gh search repos "Y" --sort stars --limit 10 --json name,stargazerCount,description,url
# ou pour vérifier une claim spécifique :
gh api "repos/owner/name" --jq '{name, stars: .stargazers_count, created: .created_at}'
```

### Étape 4 — Proposer les suites

Après la liste, propose :
- "Tu veux que je transforme l'idée N°X en script via `/short-script` ?"
- "Tu veux élargir la liste de comptes dans `scrapper/config.json` ?"

### Étape 5 — Mise à jour de l'index quand un sujet est validé

Quand l'utilisateur choisit un angle pour le transformer en script, **proposer
d'ajouter une entrée dans `~/Desktop/ai-claude/video-courte/index-videos.md`**
(format : `- [slug] — angle court — date`). Cela évite que le sujet remonte
dans la prochaine itération de `video-ideas`.

## Config

Le skill ne stocke **pas sa propre config** — tout est dans `~/.claude/skills/scrapper/config.json`. Si l'utilisateur veut ajouter un compte à tracker, édite ce fichier-là, pas ici.

## Debug

Si zéro idée en sortie :
- Seuils d'engagement trop hauts dans `scrapper/config.json` → baisse-les
- Handles X inexistants → regarde stderr pour `[skip] x/handle: 404`
- Crédits ScrapeCreators épuisés → erreur `402` dans stderr → lance `--only=github` en fallback
