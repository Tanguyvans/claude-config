# Gotchas

Erreurs récurrentes à vérifier AVANT de livrer un personnage pixel art.

## Quand NE PAS utiliser ce skill

- [ ] Personnage avec posture ou émotion complexe (KO, victoire, pleurs) → `fal-generate` sprite à la place, PAS PixelChar
- [ ] Slides denses en UI mockups ou format tutoriel pur → pixel art inadapté, signaler à l'utilisateur
- [ ] Vérifier que le contexte justifie un personnage narratif avant de charger le skill

## pixelSize

- [ ] Format 1:1 (1080×1080) : utiliser `pixelSize: 10-12`, pas 6 ou 8 — sinon le personnage finit à ~130px de haut (invisible dans la slide)
- [ ] Format 4:3 (1920×1080) : `pixelSize: 6`
- [ ] Gros plan / hero : `pixelSize: 14-16`

## Grille

- [ ] Grille rectangulaire : toutes les lignes ont le même nombre de colonnes
- [ ] Couleurs résolues en hex dans le SVG de preview (pas d'alias TypeScript)
- [ ] Bon personnage + bonne pose identifiés depuis `references/index.md`

## Process

- [ ] Lire GOTCHAS.md avant de charger le personnage
- [ ] Copier la grille telle quelle — ne pas modifier les valeurs du `character.md`
