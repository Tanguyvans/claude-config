# Pending Review — logo-fetcher

## Changements proposés

- Ajout d'une section "Checklist pré-livraison" à la fin de SKILL.md

## Feedback intégré

| Feedback | Date | Occurrences | Action |
|---|---|---|---|
| Téléchargement parallèle efficace, tous logos valides du premier coup | 2026-04-08 | 1 | Pratique validée → renforcée dans checklist |
| Bonne qualité d'image (128px et 256px appropriés) | 2026-04-08 | 1 | Tailles validées → renforcées dans checklist |

## Extraits AVANT modification

*(Fin du fichier SKILL.md — pas de checklist)*

```
## Quand utiliser `theme=dark`

Certains logos (Apple, Nike, Uber...) sont noirs ou très sombres...
[fin du fichier]
```

## Extraits APRÈS modification

```markdown
## Checklist pré-livraison

Avant de confirmer à l'utilisateur, vérifier :

- [ ] Téléchargement en parallèle (`&` + `wait`) utilisé quand plusieurs logos
- [ ] Taille adaptée au contexte : `256` pour slides, `128` pour inline, `512` pour grand format
- [ ] Vérification avec `file logos/*.png` — chaque fichier est "PNG image data"
- [ ] Convention de nommage respectée : `{entreprise}_logo.png` (minuscules, underscores)
- [ ] Confirmation affichée avec `ls -lh logos/`
```

## Notes

Le feedback était entièrement positif — aucune erreur récurrente à corriger.
GOTCHAS.md non créé (condition : 2+ occurrences d'un même problème — non atteinte).
La checklist renforce les patterns validés et comble le critère manquant des guidelines.
