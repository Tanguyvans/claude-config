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
- [ ] Max 2 éléments principaux par slide (hero + support). Sinon → splitter en 2.

## Annotations d'assets

- [ ] Marques connues citées → annoter `logo réel via logo-fetcher → public/logos/{marque}_logo.png`
- [ ] Personnages avec posture/émotion → annoter "via fal-generate sprite", PAS pixel-character-template
- [ ] PixelChar réservé aux icônes simples (★, ❤, cube), pas aux poses expressives

## Vérification des rendus

- [ ] Pour vérifier une slide via still, choisir un frame à 60-70% de la durée slide (pas milieu pile)

## Audio / timings

- [ ] Si MP4 face-cam fourni → whisper word-level AVANT le découpage (pas de timings nominaux 5s/slide)
- [ ] Caler les cuts sur le 1er mot de chaque idée, pas sur les segments whisper bruts

## Invocation

- [ ] Si l'utilisateur nomme explicitement `motion-slide-planner` dans son brief → invoquer le skill, même si la planification inline semble suffisante

## Process

- [ ] Lire FEEDBACK.md et GOTCHAS.md avant de générer
