# PENDING-REVIEW — anthropic-slides

## Changements proposés

- Ajout du preset `LAYOUT_SQUARE` (1080×1080) avec `topSafeArea: 120` et `titleMarginTop: 80`
- Ajout du type de slide `SplitCardSlide` (carte unifiée avec divider central)
- Ajout d'une section "Pièges d'animation et de layout" couvrant : vérification des stills (frame milieu+), flex-column pour cards empilées, animation cascade (`targetY = base + i * gap`)
- Mise à jour GOTCHAS.md : section "Format et layout" (LAYOUT_SQUARE, topSafeArea, flex-column, cascade) + section "Vérification des animations"

## Feedback intégré

| Feedback | Date | Occurrences | Action |
|---|---|---|---|
| LAYOUT_SQUARE (1080×1080) preset pour shorts/TikTok | 2026-04-17 | 2 (17 + 21) | Ajouté dans design system |
| SlideShellShort avec topMargin configurable (120px) | 2026-04-17 | 2 (17 archon + 21) | Intégré dans LAYOUT_SQUARE.topSafeArea |
| titleMarginTop: 60-80 par défaut sur les titres | 2026-04-17 (archon) | 1 | Documenté dans LAYOUT_SQUARE.titleMarginTop |
| SplitCardSlide (carte unifiée + divider) | 2026-04-19 | 1 | Nouveau type de slide ajouté |
| Frame milieu+ pour vérification des stills | 2026-04-19 | 2 (19 + archon) | Section pièges + GOTCHAS |
| Flex-column + gap pour cards empilées en 1:1 | 2026-04-21 | 1 | Section pièges + GOTCHAS |
| Animation cascade : targetY = base + i * gap | 2026-04-21 | 1 | Section pièges + GOTCHAS |

## Extraits AVANT

```typescript
export const LAYOUT = {
  // Video dimensions (1080p standard)
  width: 1920,
  height: 1080,
  ...
};
```

GOTCHAS.md : pas de section Format/Layout ni Vérification des animations.

## Extraits APRÈS

```typescript
export const LAYOUT = { width: 1920, height: 1080, ... };

export const LAYOUT_SQUARE = {
  width: 1080,
  height: 1080,
  topSafeArea: 120,
  titleMarginTop: 80,
  ...
};
```

GOTCHAS.md : 2 nouvelles sections ajoutées (Format et layout, Vérification des animations).
