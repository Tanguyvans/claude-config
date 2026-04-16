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

## Checklist pré-livraison

- [ ] Le thème a été confirmé par l'utilisateur (ou suggéré et accepté)
- [ ] Chaque slide a des enter/exit animations
- [ ] FPS = 30, durée typique 90-150 frames par slide
