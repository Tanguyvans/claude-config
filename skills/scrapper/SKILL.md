---
name: scrapper
description: >
  Outil générique de scraping multi-plateformes : X/Twitter, TikTok, Instagram (via ScrapeCreators),
  et GitHub trending IA (via GitHub API officielle, gratuit). Utilise ce skill quand l'utilisateur
  veut récupérer des posts, tweets, vidéos TikTok, posts Insta, ou des repos IA tendance. Les données
  sortent en JSON normalisé, consommable par d'autres skills (ex: video-ideas, tech-digest).
  Déclenche sur "scrape", "scrapper", "récupère les posts de", "tweets de", "trending GitHub IA",
  "veille réseaux", "fetch X/TikTok/Insta".
---

# Scrapper — multi-plateformes

Récupère des posts depuis X, TikTok, Instagram et GitHub. Sortie JSON uniforme. Réutilisable par d'autres skills.

## Structure

```
scrapper/
├── SKILL.md       ← ce fichier
├── .env           ← SCRAPECREATORS_API_KEY, GITHUB_TOKEN (optionnel)
├── config.json    ← comptes / hashtags / repos / seuils d'engagement
├── lib.js         ← helpers (fetch ScrapeCreators, fetch GitHub, args CLI)
├── x.js           ← tweets des comptes X configurés
├── tiktok.js      ← vidéos TikTok (comptes + hashtags)
├── instagram.js   ← posts Instagram des comptes configurés
├── github.js      ← repos IA trending sur la période (gratuit, GitHub Search API)
└── all.js         ← runner parallèle (orchestre x/tiktok/instagram/github)
```

## Quand lancer quoi

### Plateforme unique

```bash
set -a; source /Users/tanguyvans/.claude/skills/scrapper/.env; set +a

node /Users/tanguyvans/.claude/skills/scrapper/x.js         # tous les comptes X
node /Users/tanguyvans/.claude/skills/scrapper/x.js --handle=sama   # un seul compte
node /Users/tanguyvans/.claude/skills/scrapper/tiktok.js    # comptes + hashtags TikTok
node /Users/tanguyvans/.claude/skills/scrapper/instagram.js # comptes Instagram
node /Users/tanguyvans/.claude/skills/scrapper/github.js    # repos IA trending 7j
node /Users/tanguyvans/.claude/skills/scrapper/github.js --days=30 --min-stars=500
```

### Tout en parallèle

```bash
node /Users/tanguyvans/.claude/skills/scrapper/all.js > /tmp/scrapper.json
node /Users/tanguyvans/.claude/skills/scrapper/all.js --only=twitter,github
node /Users/tanguyvans/.claude/skills/scrapper/all.js --skip=instagram
```

## Coût crédits ScrapeCreators

**1 crédit = 1 requête**. Compte actuel : ~95 crédits restants.

| Script | Coût approximatif |
|---|---|
| `x.js` (25 comptes) | 25 crédits |
| `tiktok.js` (3 comptes + 3 hashtags) | 6 crédits |
| `instagram.js` (2 comptes) | 4 crédits (profile + posts × 2) |
| `github.js` | **0 crédit** (API GitHub gratuite) |
| `all.js` (tout) | ~35 crédits |

Pour économiser : lance `--only=twitter` ou `--only=github` si l'utilisateur veut une seule source.

## Format de sortie

**x.js / tiktok.js / instagram.js** :
```json
{ "count": 42, "posts": [{"platform": "twitter", "author": "sama", "text": "...", "likes": 1234, "url": "...", "posted_at": "..."}] }
```

**github.js** :
```json
{ "count": 30, "query": "...", "repos": [{"name": "org/repo", "description": "...", "stars": 5000, "url": "...", "topics": [...]}] }
```

**all.js** (merged) :
```json
{ "generated_at": "...", "platforms": { "twitter": {...}, "tiktok": {...}, "instagram": {...}, "github": {...} } }
```

## Limites connues

### Pas de YouTube
Le scrapper **ne couvre pas YouTube**. Pour les transcripts YouTube, utiliser `yt-dlp` directement :
```bash
yt-dlp --write-auto-subs --skip-download --sub-lang fr,en "https://youtu.be/VIDEO_ID"
```

### Twitter via ScrapeCreators
L'endpoint `/v1/twitter/user-tweets` **ne renvoie pas les tweets récents uniquement** — c'est un échantillon de ~100 top tweets étalés sur plusieurs années. Pas de filtre `date` disponible. Pour obtenir du récent, il faut filtrer côté Claude après coup en regardant `posted_at`.

### GitHub rate-limit anonyme
Sans `GITHUB_TOKEN` dans `.env`, l'API anonyme limite à ~60 req/h. Symptôme : `github.js` qui hit le rate-limit après 2 runs proches. Soit ajouter un token (lecture publique suffit), soit cacher les résultats 1h pour amortir l'itération rapide.

### Blocklist GitHub
Pour bloquer définitivement des repos qui remontent à chaque run (ex: `OpenMythos`), ajouter `github.blocklist: ["OpenMythos", ...]` dans `config.json` et filtrer dans le post-process. Ne pas filtrer ad-hoc côté consommateur.

### TikTok handle introuvable vs compte vide
Un handle inexistant retourne `count: 0`, identique à un compte vide. Logger le statut HTTP en stderr (`[warn] tiktok/X: 404` vs `[info] tiktok/X: 200, 0 videos`) pour différencier les deux cas — sinon l'utilisateur teste 5 variantes avant de comprendre.

### Handles incertains
Certains labs d'IA asiatiques ont des handles X qui changent. Si tu vois `[skip] x/Zai_org: 404` en stderr, c'est que le handle est faux — corrige dans `config.json`.

### Format `github.js` incohérent avec les autres
`github.js` n'expose **pas** `count` / `posts` au niveau racine — uniquement `tiers` + `repos`. Les autres scripts (`x.js`, `tiktok.js`, `instagram.js`) exposent `count` + `posts`. Pour parser uniformément côté consommateur :
- `posts` → `x.js`, `tiktok.js`, `instagram.js`
- `repos` → `github.js`
Ne pas faire `d.platforms.github.count` ou `d.platforms.github.posts` — ça tombera sur 0/undefined.

### TikTok handle inexistant → fallback `/search/users`
Si `tiktok.js --handle=X` renvoie 0 vidéo, le handle est probablement faux. Avant d'abandonner, tenter le fallback :
```bash
curl -H "x-api-key: $SCRAPECREATORS_API_KEY" \
  "https://api.scrapecreators.com/v1/tiktok/search/users?query=X"
```
pour suggérer les variantes existantes (ex: `maven` → `maven_hq`).

### Seuils d'engagement TikTok pour comptes niche
`engagement_threshold.tiktok.diggs_min: 5000, views_min: 100000` écarte tous les contenus de comptes niche (top vidéo à 57k vues = filtré). Pour des **comptes nommément demandés par l'utilisateur**, baisser à `diggs_min: 50, views_min: 500` ou désactiver le filtrage. Le seuil ne s'applique qu'aux hashtags, pas aux handles ciblés.

### Transcript TikTok (pas exposé dans `tiktok.js`)
L'endpoint `/v1/tiktok/video/transcript` retourne le transcript WEBVTT d'une vidéo. Utile pour analyser une vidéo source avant un script. À appeler manuellement :
```bash
curl -H "x-api-key: $SCRAPECREATORS_API_KEY" \
  "https://api.scrapecreators.com/v1/tiktok/video/transcript?url=VIDEO_URL"
```

## Solde de crédits ScrapeCreators

**Avant de lancer `x.js` / `all.js`** : vérifier rapidement le solde. Lancer un scrape qui boucle sur 25 comptes alors que le solde est à 0 brûle 25 tentatives 402 silencieuses. Vérification :
```bash
curl -s -H "x-api-key: $SCRAPECREATORS_API_KEY" \
  "https://api.scrapecreators.com/v1/account" | jq .credits_remaining
```
Si solde = 0 ou < N (où N = nombre de comptes à scraper) → afficher `[warn] N credits left, skipping twitter` et passer au scraper suivant (github, gratuit).

## Éditer la config

`config.json` contient toutes les listes :
- `twitter.accounts` — handles X (sans `@`)
- `tiktok.accounts` / `tiktok.hashtags`
- `instagram.accounts`
- `github.topics` (labels IA : llm, rag, agents, claude, mcp, etc.), `github.days`, `github.min_stars`
- `engagement_threshold.*` — seuils min likes/RT/views par plateforme

Pour ajouter une source : édite `config.json` directement (pas besoin de toucher aux scripts JS).
