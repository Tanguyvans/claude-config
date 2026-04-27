# motion-slide-planner — review en attente

## Changements proposés

- Ajout règle dure : max 2 éléments principaux par slide (sinon splitter)
- Ajout règle dure : annoter `logo-fetcher` pour les marques connues citées dans le script
- Ajout règle dure : `fal-generate` (pas PixelChar) pour personnages avec posture/émotion
- Ajout règle dure : still de vérification à 60-70% de la slide, pas milieu pile
- GOTCHAS.md : nouvelles sections "Annotations d'assets" et "Vérification des rendus"

## Feedback intégré

| Feedback | Occurrences | Action |
|---|---|---|
| Slide trop chargée → "pas dingue" | 1 (2026-04-19) | Règle dure max 2 éléments + gotcha |
| Marques connues : suggérer logo-fetcher | 1 (2026-04-22) | Règle dure + section gotcha "Annotations" |
| Personnages expressifs → fal-generate, pas PixelChar | 1 (2026-04-22) | Règle dure + section gotcha |
| Still à milieu+ pas milieu pile | 1 (2026-04-17 archon) | Règle dure + gotcha |

## AVANT (extraits)

Pas de règle sur la densité par slide. Pas d'annotation explicite d'assets externes (logo-fetcher / fal-generate) dans la prose des scènes.

## APRÈS (extraits)

Voir `SKILL.md` "Règles dures" (4 nouveaux bullets).
Voir `GOTCHAS.md` sections "Descriptions" (densité), "Annotations d'assets", "Vérification des rendus".
