# scrapper — review en attente

## Changements proposés

- Ajout "Pas de YouTube" dans Limites connues (utiliser yt-dlp)
- Ajout note sur format `github.js` (tiers + repos, pas count/posts)
- Ajout fallback TikTok handle inexistant via `/search/users`
- Ajout note sur seuils engagement TikTok pour comptes niche (à baisser/désactiver)
- Ajout endpoint `/v1/tiktok/video/transcript` documenté
- Ajout section "Solde de crédits ScrapeCreators" avec check avant lancement
- Création GOTCHAS.md (n'existait pas)

## Feedback intégré

| Feedback | Occurrences | Action |
|---|---|---|
| Pas de check solde → 25 × 402 brûlés | 1 (2026-04-21) | Section solde + gotcha |
| Format github.js incohérent | 1 (2026-04-21) | Section format limites + gotcha |
| Pas de YouTube | 1 (2026-04-26) | Section limites + gotcha |
| TikTok handle 0 → fallback search/users | 1 (2026-04-26 (2)) | Section limites + gotcha |
| Seuil engagement TikTok trop haut pour comptes niche | 1 (2026-04-26 (2)) | Section limites + gotcha |
| Endpoint transcript TikTok pas exposé | 1 (2026-04-26 (2)) | Section limites + gotcha |

## AVANT (extraits)

Limites connues couvrait : Twitter sample, handles incertains. Pas de mention YouTube, github format, transcript, fallback handle. Pas de check solde.

## APRÈS (extraits)

Voir `SKILL.md` "Limites connues" (5 nouvelles sous-sections) et "Solde de crédits ScrapeCreators".
Nouveau `GOTCHAS.md` avec checklist par plateforme.
