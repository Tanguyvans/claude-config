# Pending Review — anthropic-slides

## Changements proposés
- Fix typo `#EDDA B0` → `#EDDAB0` (hex CSS invalide à cause de l'espace)
- Ajout `LAYOUT_VERTICAL` (1080×1920) + section "Adaptations 9:16" avec valeurs ajustées (h1 96-120, padding 50, safe zones TikTok)

## Feedback intégré

| Date | Feedback | Action |
|---|---|---|
| 2026-04-27 | Faute hex `#EDDA B0` (espace) | Fix typo |
| 2026-04-27 | Pas d'adaptation 9:16 (h1 56 trop petit, padding 80 trop grand) | Ajout LAYOUT_VERTICAL + section adaptations |
| 2026-04-27 | Palette warm + pastels reconnaissable [positif] | Pas d'action |

## AVANT
```
yellowMedium: '#EDDA B0',    // Hover/active state
```
```
// (pas de LAYOUT_VERTICAL)
```

## APRÈS
```
yellowMedium: '#EDDAB0',     // Hover/active state
```
```
// 9:16 vertical (1080x1920) — TikTok / Reels / Shorts plein écran
export const LAYOUT_VERTICAL = {
  width: 1080,
  height: 1920,
  padding: 50,
  topSafeArea: 220,
  bottomSafeArea: 340,
  ...
};
```
+ section "Adaptations 9:16" listant h1 96-120, gap 32-40, max 3 items.
