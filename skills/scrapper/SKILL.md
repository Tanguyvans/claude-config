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

### Twitter via ScrapeCreators
L'endpoint `/v1/twitter/user-tweets` **ne renvoie pas les tweets récents uniquement** — c'est un échantillon de ~100 top tweets étalés sur plusieurs années. Pas de filtre `date` disponible. Pour obtenir du récent, il faut filtrer côté Claude après coup en regardant `posted_at`.

### Handles incertains
Certains labs d'IA asiatiques ont des handles X qui changent. Si tu vois `[skip] x/Zai_org: 404` en stderr, c'est que le handle est faux — corrige dans `config.json`.

## Éditer la config

`config.json` contient toutes les listes :
- `twitter.accounts` — handles X (sans `@`)
- `tiktok.accounts` / `tiktok.hashtags`
- `instagram.accounts`
- `github.topics` (labels IA : llm, rag, agents, claude, mcp, etc.), `github.days`, `github.min_stars`
- `engagement_threshold.*` — seuils min likes/RT/views par plateforme

Pour ajouter une source : édite `config.json` directement (pas besoin de toucher aux scripts JS).
