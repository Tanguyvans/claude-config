# Gotchas

Erreurs récurrentes à vérifier AVANT de générer les slides.

## Thème

- [ ] Demandé ou suggéré un thème au démarrage (JAMAIS silently default sur Anthropic)
- [ ] Si le sujet implique un registre dark/tech/raw, proposer `terminal`, `brutalist` ou `cave`
- [ ] Toutes les slides importent depuis `../theme.ts`, pas directement depuis les valeurs COLORS hardcodées

## Structure

- [ ] `theme.ts` réexporte le bon thème (un seul fichier à swapper)
- [ ] Les slides acceptent des props pour le contenu — aucune valeur hardcodée dans le composant
- [ ] Animations via `interpolate()` et `spring()` de Remotion, pas de CSS transitions

## Fond et overflow

- [ ] Toutes les slides utilisent `COLORS.background` comme fond — sauf instruction explicite contraire dans le script
- [ ] Après tout changement de thème ou de typo : re-render toutes les slides et vérifier overflow (conteneurs fixes, grilles, labels)
- [ ] Labels flottants positionnés absolument par rapport au conteneur de slide, PAS relativement au parent

## Contenu

- [ ] Si sujet = repo GitHub → slide finale avec URL en grand proposée par défaut

## Format et layout

- [ ] Pour le workflow /video (TikTok/Reels) : utiliser `LAYOUT_SQUARE` (1080×1080), pas `LAYOUT` (1920×1080)
- [ ] En format 1:1 : `topSafeArea: 120px` réservé à la zone UI de la plateforme, `titleMarginTop: 80` par défaut sur les titres
- [ ] Cards empilées verticalement en 1:1 : `flex-column + gap`, PAS `top: absolute` calculé à la main
- [ ] Animations en cascade : `targetY = base + i * gap` pour chaque item — pas `y = progress * H` commun (pile visuelle)

## Vérification des animations

- [ ] Pour tester une slide avec stills : rendre au **frame milieu+** (ex: 90 sur 150 frames), pas au frame exact du milieu — les animations avec delay 100+ frames ne sont pas encore visibles au frame 75

## Checklist pré-livraison

- [ ] Le thème a été confirmé par l'utilisateur (ou suggéré et accepté)
- [ ] Chaque slide a des enter/exit animations
- [ ] FPS = 30, durée typique 90-150 frames par slide
- [ ] Re-render de vérification après tout ajustement de thème ou typo
