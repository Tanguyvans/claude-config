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

## Checklist pré-livraison

- [ ] Le thème a été confirmé par l'utilisateur (ou suggéré et accepté)
- [ ] Chaque slide a des enter/exit animations
- [ ] FPS = 30, durée typique 90-150 frames par slide
- [ ] Re-render de vérification après tout ajustement de thème ou typo
