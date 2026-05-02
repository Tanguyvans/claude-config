# Gotchas

Erreurs récurrentes à vérifier AVANT de lancer un scrape.

## Plateformes couvertes

- [ ] Le sujet est-il sur X / TikTok / Instagram / GitHub trending IA ?
- [ ] **Pas de YouTube** — utiliser `yt-dlp --write-auto-subs --skip-download` directement
- [ ] Pas de LinkedIn, Facebook, Reddit (non couverts)

## Crédits ScrapeCreators

- [ ] Vérifier le solde AVANT de lancer `x.js` ou `all.js` (25 comptes = 25 crédits brûlés sinon)
- [ ] Si solde = 0 / < N → flagger `[warn] X credits left, skipping twitter` et passer au scraper gratuit (github)

## Format de sortie

- [ ] `x.js` / `tiktok.js` / `instagram.js` → `count` + `posts` au niveau racine
- [ ] `github.js` → `tiers` + `repos` (PAS `count` ni `posts`) — ne pas confondre côté consommateur

## TikTok

- [ ] Handle 0 vidéo → fallback `/v1/tiktok/search/users` avant d'abandonner
- [ ] Pour un compte ciblé par nom (vs hashtag), baisser ou désactiver `engagement_threshold.tiktok` (sinon comptes niche filtrés)
- [ ] Pour le transcript d'une vidéo, appeler `/v1/tiktok/video/transcript` directement (pas exposé dans `tiktok.js`)

## GitHub

- [ ] Sans `GITHUB_TOKEN` dans `.env`, l'API anonyme rate-limit après 1-2 runs proches → ajouter un token GitHub (lecture publique suffit) ou cacher les résultats 1h
- [ ] Blacklist de repos (ex: `OpenMythos`) → ajouter dans `config.json` sous `github.blocklist: []` et filtrer dans le post-process

## TikTok — HTTP status

- [ ] Un handle inexistant retourne `count: 0`, identique à un compte vide → logger le status HTTP en stderr pour différencier 404 vs vide

## Twitter

- [ ] L'endpoint user-tweets ne filtre PAS par date → filtrer côté Claude après coup via `posted_at`
- [ ] Tweets datés de 2024-2025 sur compte sama, etc. peuvent remonter en top même si vieux → demoter > 90j
