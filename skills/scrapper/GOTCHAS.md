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

## Twitter

- [ ] L'endpoint user-tweets ne filtre PAS par date → filtrer côté Claude après coup via `posted_at`
- [ ] Tweets datés de 2024-2025 sur compte sama, etc. peuvent remonter en top même si vieux → demoter > 90j
