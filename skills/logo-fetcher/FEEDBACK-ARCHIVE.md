# Archive — Feedback intégré

## Review du 2026-04-17

### 2026-04-08

- [positif] Téléchargement parallèle efficace, tous les logos valides du premier coup
- [positif] Bonne qualité d'image (128px et 256px appropriés pour les usages)
<!-- Feedback collecté par /refine-skills. Intégré périodiquement dans SKILL.md et GOTCHAS.md. -->
## 2026-04-08

- [positif] Téléchargement parallèle efficace, tous les logos valides du premier coup
- [positif] Bonne qualité d'image (128px et 256px appropriés pour les usages)

## 2026-04-21

- [amelioration] Quand les logos téléchargés ont un fond opaque non-transparent (PNG avec carré sombre/coloré) alors que le contexte d'intégration est un thème clair (ou inversement), prévenir l'utilisateur avant l'intégration. Proposer trois options : (1) encadrer dans une carte de la couleur du thème, (2) refetch avec le paramètre `theme=dark` ou `theme=light` pour une version adaptée, (3) chercher une version alternative via l'endpoint `/search`. Ne pas assumer silencieusement que l'encapsulation dans une carte blanche convient.
- [amelioration] Quand un logo récupéré via le domaine fourni semble générique ou peu représentatif (icône simpliste sans branding reconnaissable), essayer en fallback les variantes de domaine via l'endpoint `/search` (ex: `brand.ai`, `brand.com`, `brandname.com`). Le logo peut être de bien meilleure qualité sur une TLD différente, notamment pour les marques internationales qui ont plusieurs domaines.

## 2026-04-22

- [positif] Téléchargement parallèle des 4 logos (OpenAI noir + blanc, Google, Flux) via `&` + `wait` a pris moins de 2 secondes. Pattern reproductible.
- [amelioration] Le paramètre `theme=dark` produit un logo blanc sur fond transparent, qui apparaît invisible dans le viewer PNG classique (blanc sur blanc). L'utilisateur peut croire que le téléchargement a échoué. Ajouter à l'étape de vérification : "si theme=dark, vérifier `file_size > 1KB` plutôt que la preview visuelle — le logo est là mais invisible sur viewer à fond blanc".

## 2026-04-23

- [positif] Téléchargement parallèle de OpenAI + Anthropic en 512px a marché first-try, ~2 secondes. `file` a validé les PNG. Pattern reproductible.
