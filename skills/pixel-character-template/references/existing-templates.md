# Templates pixel art existants

Ce fichier documente les personnages et la palette déjà en place dans le projet Remotion de l'utilisateur. Toute nouvelle création doit rester visuellement cohérente avec ces templates.

## Palette de couleurs (theme.ts)

```typescript
// Pixel art skin/clothes (warm tones)
skin: '#F0C896',
skinShadow: '#D4A06A',
hair: '#5C3D2E',
shirt: '#6AACB8',       // Teal Anthropic
shirtShadow: '#528A94',
pants: '#7A7A8A',

// Robot (Anthropic teal)
robotGray: '#C8D4DC',
robotDark: '#9AACB8',
robotEye: '#6AACB8',

// Utiles pour accessoires
wood: '#B8926A',
woodDark: '#967454',
gold: '#D4A94E',
goldBright: '#E8C06A',
backgroundWhite: '#FFFFFF',
border: '#E5E5E0',
```

## Conventions d'alias

En haut de chaque fichier de personnage, on définit des alias courts pour les couleurs :

```typescript
const _ = null;       // transparent
const S = COLORS.skin;
const D = COLORS.skinShadow;
const H = COLORS.hair;
const B = COLORS.shirt;
const V = COLORS.shirtShadow;
const P = COLORS.pants;
const W = '#ffffff';  // blanc (yeux)
const K = '#000000';  // noir (yeux, bouche)

// Pour le robot
const R = COLORS.robotGray;
const RD = COLORS.robotDark;
const RE = COLORS.robotEye;
```

## Personnage existant : Développeur (DEV)

Le développeur existe en 3 variantes de pose dans le projet (DEV_SITTING, DEV_HAPPY, DEV_RELAXED) mais pour les nouveaux personnages, on crée **1 seul design par personnage**.

### Caractéristiques du développeur (à reproduire comme base pour tout humain)
- **Largeur** : 16 colonnes (le personnage occupe ~8-12 colonnes centrales, le reste en `_`)
- **Hauteur** : 17-18 lignes
- **Cheveux** : 3 lignes arrondies en haut (H = `#5C3D2E`)
- **Visage** : 4 lignes — peau (S), yeux (K = noir, 2 pixels par œil), ombre (D = skinShadow), bouche (K, 4 pixels)
- **Cou** : 1 ligne, 4 pixels de peau centrés (colonnes 6-9)
- **Corps** : 5-6 lignes de chemise (B = teal `#6AACB8`) avec bras (peau S) sur les côtés
- **Jambes** : 3 lignes de pantalon (P = `#7A7A8A`), séparées en bas avec un espace au milieu

### Comment différencier un nouveau personnage humain
- **Cheveux** : forme différente (plus long, plus court, frange, calvitie, etc.) et/ou couleur différente
- **Couleur de chemise** : chaque personnage a sa propre couleur (le dev = teal, un manager pourrait être bleu marine, une designer en rose, etc.)
- **Accessoire intégré** : lunettes (2 pixels blancs autour des yeux), casque, etc.

## Personnage existant : Robot IA (ROBOT)

### Structure du ROBOT (12×14)
- **Largeur** : 12 colonnes
- **Hauteur** : 14 lignes
- **Antenne** : 2 lignes (RE = teal `#6AACB8`), petite puis large
- **Tête** : 4 lignes de gris clair (R = `#C8D4DC`), yeux teal (RE) sur la 2e ligne, bouche gris foncé (RD = `#9AACB8`)
- **Cou** : 1 ligne, plus étroit que la tête
- **Corps** : 4 lignes gris foncé (RD), bras gris clair (R) de chaque côté
- **Jambes** : 2 pixels RD séparés + 3 pixels R pour les pieds

### Comment différencier un nouveau robot
- **Antenne** : forme différente (ronde, en T, plus haute, double antenne)
- **Couleur des yeux** : le robot existant a des yeux teal — un autre robot pourrait avoir des yeux dorés, rouges, verts...
- **Forme du corps** : plus large, plus étroit, avec un "écran" sur le torse, etc.
- **Palette** : rester dans les gris mais changer la couleur d'accent

## Composant de rendu

```typescript
// PixelChar rend n'importe quelle grille
<PixelChar grid={DEV_HAPPY} pixelSize={16} />

// Tailles de pixel disponibles dans LAYOUT :
pixel: 16,        // standard
pixelSmall: 10,   // petits éléments / arrière-plan
pixelLarge: 20,   // personnage mis en avant
```

## Structure du projet

```
src/components/
├── theme.ts                          ← palette + layout + typo
├── shared/
│   ├── PixelCharacter.tsx            ← DEV_SITTING, DEV_HAPPY, DEV_RELAXED, ROBOT, PixelChar, SweatDrop
│   └── PixelGrid.tsx                 ← PixelGrid (générique), pixelRect (helper)
└── slides/
    ├── Slide1Chaos.tsx               ← utilise DEV_SITTING
    ├── Slide2Command.tsx             ← utilise DEV_HAPPY
    └── Slide3Agent.tsx               ← utilise DEV_RELAXED + ROBOT
```
