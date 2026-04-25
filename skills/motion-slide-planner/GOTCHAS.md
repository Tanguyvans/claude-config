# Gotchas

Erreurs récurrentes à vérifier AVANT de livrer le brief.

## Cohérence visuelle

- [ ] Le style visuel global est défini en tête du brief (pixel art / flat / SVG / terminal / ...)
- [ ] Toutes les slides utilisent le même registre visuel — pas de mix accidentel
- [ ] Les slides d'intro et outro proposent un visuel de fond, pas juste logo + texte

## Screen recording

- [ ] Si le sujet est un produit avec UI live : proposé le mix slides + screen recording ?
- [ ] Ne pas recréer une interface en composants Remotion si elle existe en ligne

## Descriptions

- [ ] Chaque description contient des éléments qui bougent (pas juste "du texte qui s'affiche")
- [ ] Aucun choix de design (couleurs, polices, tailles) dans les descriptions
- [ ] Les commandes CLI sont en blocs de code dans la description

## Densité par slide

- [ ] Maximum 2 éléments principaux par slide (hero + support). Si plus → splitter en 2 slides
- [ ] Une slide avec radar + score + 4 offres + animations = trop chargée — simplifier avant de livrer le brief

## Vérification des stills

- [ ] Pour tester une slide animée avec un still : utiliser le **frame milieu+** (ex: frame 90 sur 150), PAS le frame exact du milieu — les animations avec delay 100+ frames ne sont pas encore apparues et semblent manquantes

## Logos et personnages

- [ ] Marques connues (OpenAI, Google, Anthropic...) : annoter "logo réel via `logo-fetcher` → `public/logos/{brand}_logo.png`" dans la prose du brief
- [ ] Personnage avec posture/émotion : annoter "→ `fal-generate` sprite (pixel art, white bg)", pas `pixel-character-template` — PixelChar est pour les icônes simples

## Process

- [ ] Lire FEEDBACK.md et GOTCHAS.md avant de générer
