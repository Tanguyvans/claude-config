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
- [ ] **TikTok handle introuvable vs vide** : `count: 0` peut signifier "compte vide" OU "handle inexistant". Logger le statut HTTP pour distinguer (404 = mauvais handle, 200 + 0 = compte vide). Si suspect, tester 2-3 variantes du handle (_ai, -ai, .ai, _hq) avant d'abandonner.
- [ ] Pour un compte ciblé par nom (vs hashtag), baisser ou désactiver `engagement_threshold.tiktok` (sinon comptes niche filtrés)
- [ ] Pour le transcript d'une vidéo, appeler `/v1/tiktok/video/transcript` directement (pas exposé dans `tiktok.js`)

## GitHub

- [ ] **GITHUB_TOKEN expiré** : `github.js` retourne `total_found: 0` silencieusement sur 401. Si output vide, vérifier explicitement "GITHUB_TOKEN invalide ou expiré, fallback API anonyme" dans stderr — ou tester `curl -s -H "Authorization: Bearer $GITHUB_TOKEN" https://api.github.com/user | jq .login`.
- [ ] **Mode `created` rate les repos trending tardifs** : un repo créé il y a 30j peut exploser en stars après sa création — absent des runs `--days=7/14/30`. Ajouter `--mode=trending` (classement par delta de stars récent) quand l'user cherche ce qui monte, pas ce qui est récent.
- [ ] **Blacklist** : si un repo spécifique réapparaît à chaque run (ex: OpenMythos), l'ajouter dans `config.json → blocklist` et filtrer dans `github.js`. Ne pas filtrer uniquement côté post-process.

## Twitter

- [ ] L'endpoint user-tweets ne filtre PAS par date → filtrer côté Claude après coup via `posted_at`
- [ ] Tweets datés de 2024-2025 sur compte sama, etc. peuvent remonter en top même si vieux → demoter > 90j
