# Gotchas

Erreurs récurrentes à vérifier AVANT de livrer les logos.

## Téléchargement

- [ ] Téléchargement en parallèle (`&` + `wait`) utilisé quand plusieurs logos — pas un par un
- [ ] Taille adaptée au contexte : `256` pour slides, `128` pour inline, `512` pour grand format
- [ ] Convention de nommage respectée : `{entreprise}_logo.png` (minuscules, underscores)
- [ ] Vérification avec `file logos/*.png` — chaque fichier est "PNG image data" (pas du JSON = erreur API)

## Logo dark / fond transparent

- [ ] Si `theme=dark` : vérifier `file_size > 1KB` via `ls -lh logos/` plutôt que la preview visuelle — le logo blanc est invisible sur fond blanc dans un viewer PNG classique

## Logo générique ou peu représentatif

- [ ] Si l'icône semble simpliste ou sans branding reconnaissable : essayer les variantes de domaine via l'endpoint `/search` (ex: `brand.ai`, `brand.com`, `brandname.com`) — le logo peut être bien meilleur sur une TLD différente

## Fond opaque incompatible

- [ ] Si le logo récupéré a un fond opaque non-transparent et que le contexte d'intégration est d'un thème différent : prévenir l'utilisateur **avant** intégration. Proposer : (1) encadrer dans une carte de la couleur du thème, (2) refetch avec `theme=dark` ou `theme=light`, (3) chercher via `/search`
- [ ] Ne jamais assumer silencieusement que l'encapsulation dans une carte blanche convient
