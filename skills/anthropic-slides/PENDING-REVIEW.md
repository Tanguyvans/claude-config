# anthropic-slides — review en attente

## Changements proposés

- Ajout règles dures : format 1:1 (1080×1080) supporté en plus du 16:9, alignement avec `/video`
- Ajout règles dures : stack vertical via `flex-column + gap`, animations cascade avec `targetY` variable
- Ajout règle : `marginTop: 60-80` par défaut sur le titre (titre collait trop haut)
- Ajout règle : still de vérification à 60-70% de la slide (pas milieu pile)
- Ajout `LAYOUT_SQUARE` (1080×1080, topSafeArea 120) à côté du LAYOUT 16:9
- Ajout type de slide #9 `Split Card Slide` (carte unifiée avec divider central)
- GOTCHAS.md : nouvelles sections `Format` et `Animations`

## Feedback intégré

| Feedback | Occurrences | Action |
|---|---|---|
| Verrouillé sur 16:9 (manque preset 1:1) | 2 (2026-04-17, 2026-04-21) | LAYOUT_SQUARE + section "Adaptations 1:1" + gotcha format |
| Pas de topSafeArea pour shorts | 2 (2026-04-17) | `topSafeArea: 120` dans LAYOUT_SQUARE + gotcha |
| Titres collent trop haut | 1 (2026-04-17 archon) | `titleMarginTop: 60` dans LAYOUT + règle dure |
| SplitCardSlide manquant | 1 (2026-04-19) | Type de slide #9 ajouté |
| Empilement vertical via top:absolute fragile | 1 (2026-04-21) | Règle dure : flex-column + gap |
| Animations chute : varier targetY | 1 (2026-04-21) | Règle dure + GOTCHAS animations |
| Still à frame milieu pile rate les animations retardées | 2 (2026-04-17 archon, 2026-04-19 via motion-slide-planner) | Règle dure + GOTCHAS |

## AVANT (extraits)

```yaml
LAYOUT.width: 1920
LAYOUT.height: 1080
# pas de variante 1:1, pas de topSafeArea
```

Pas de mention de `marginTop` titre, pas de règle stack vertical, pas de règle frame still.

## APRÈS (extraits)

Voir `SKILL.md` — sections "Règles dures", "Spacing & Layout" (LAYOUT + LAYOUT_SQUARE), "Slide Types" #9.
Voir `GOTCHAS.md` — nouvelles sections "Format" et "Animations".
