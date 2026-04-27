# Gotchas

Erreurs récurrentes à vérifier AVANT de générer les slides.

## Thème

- [ ] Demandé ou suggéré un thème au démarrage (JAMAIS silently default sur Anthropic)
- [ ] Si le sujet implique un registre dark/tech/raw, proposer `terminal`, `brutalist` ou `cave`
- [ ] Toutes les slides importent depuis `../theme.ts`, pas directement depuis les valeurs COLORS hardcodées

## Format

- [ ] Format confirmé au démarrage : 16:9 (1920×1080) ou 1:1 (1080×1080) ?
- [ ] Si invoqué via `/video` → 1080×1080 par défaut (LAYOUT_SQUARE)
- [ ] En 1:1, cartes empilées verticalement (pas de rangées 3-4 horizontales)
- [ ] En 1:1, `topSafeArea: 120` respecté pour la zone UI plateforme
- [ ] Titre = `marginTop: 60-80` minimum (pas collé en haut, même après topSafeArea)

## Structure

- [ ] `theme.ts` réexporte le bon thème (un seul fichier à swapper)
- [ ] Les slides acceptent des props pour le contenu — aucune valeur hardcodée dans le composant
- [ ] Animations via `interpolate()` et `spring()` de Remotion, pas de CSS transitions

## Fond et overflow

- [ ] Toutes les slides utilisent `COLORS.background` comme fond — sauf instruction explicite contraire dans le script
- [ ] Après tout changement de thème ou de typo : re-render toutes les slides et vérifier overflow (conteneurs fixes, grilles, labels)
- [ ] Labels flottants positionnés absolument par rapport au conteneur de slide, PAS relativement au parent
- [ ] Stack vertical via `flexDirection: column + gap`, JAMAIS `top: absolute` calculé à la main

## Animations

- [ ] Cascade d'items : `targetY = base + i * gap` (varier la cible, pas seulement le delay)
- [ ] Vérification still : choisir un frame à 60-70% de la durée slide, PAS le milieu pile (animations à delay 90+ pas encore visibles à 50%)

## Contenu

- [ ] Si sujet = repo GitHub → slide finale avec URL en grand proposée par défaut

## Checklist pré-livraison

- [ ] Le thème a été confirmé par l'utilisateur (ou suggéré et accepté)
- [ ] Chaque slide a des enter/exit animations
- [ ] FPS = 30, durée typique 90-150 frames par slide
- [ ] Re-render de vérification après tout ajustement de thème ou typo
