---
name: pixel-character-template
description: >
  Génère des personnages, robots et accessoires en pixel art sous forme de grilles 2D TypeScript,
  compatibles avec un projet Remotion existant. Produit aussi un aperçu SVG pour visualiser le résultat.
  Utilise ce skill dès que l'utilisateur mentionne "pixel art", "personnage pixel", "sprite",
  "character template", "robot pixel", "nouveau personnage", "accessoire pixel",
  ou veut créer/modifier un élément visuel en pixel art pour ses vidéos Remotion.
  Aussi quand l'utilisateur donne une description d'un personnage ou d'un objet et veut le transformer
  en grille pixel art. Même si le mot "pixel" n'est pas prononcé, déclenche ce skill si le contexte
  implique la création d'éléments visuels en style rétro/pixel pour des vidéos ou animations.
---

# Pixel Character Template Generator v3

Tu génères des personnages pixel art pour des vidéos Remotion. Tu disposes d'une galerie de personnages pré-définis avec 3 poses chacun (idle, happy, working), tous dessinés en dur.

## Comment ça marche

### 1. Consulte l'index

Lis `references/index.md` pour trouver le personnage qui correspond à la demande. L'index contient les mots-clés et renvoie vers le fichier de chaque personnage.

**Règle de disambiguation importante** : si l'utilisateur mentionne "agent claude", "claude agent", ou "mascotte", c'est toujours **CLAUDE_MASCOT** (le cube orange). Le mot "robot", "bot", "machine" ou "ia" seul renvoie à **ROBOT_AGENT**.

### 2. Charge le personnage

Lis le `character.md` du personnage concerné (ex: `references/dev/character.md`). Ce fichier contient :
- La palette de couleurs avec les alias
- Toutes les poses définies en dur sous forme de grilles 2D
- Les différences entre chaque pose (documentées)

### 3. Copie la grille

Chaque pose est une grille `(string | null)[][]` prête à l'emploi. Ne modifie pas les grilles — copie-les telles quelles. C'est le point central du skill : les grilles sont définies en dur pour garantir la qualité visuelle.

### 4. Génère le TypeScript

Crée un fichier `src/components/shared/Pixel{Nom}.tsx` avec :
- Import de `COLORS` depuis `../theme`
- Les alias de couleur en constantes
- La grille exportée (ex: `export const DEV_IDLE: (string | null)[][] = [...]`)
- Si plusieurs poses sont demandées, exporte-les toutes dans le même fichier

### 5. Génère l'aperçu SVG

Crée un SVG avec des `<rect>` de 20px par pixel. Résous les couleurs en hex (pas d'alias TS dans le SVG). Inclus une grille légère (#eee) en fond et le nom en titre monospace.

### 6. Vérifie

- Grille rectangulaire (toutes les lignes = même nombre de colonnes)
- Couleurs résolues correctement
- Bon personnage + bonne pose

## Créer un nouveau personnage

Si l'utilisateur demande un personnage qui n'existe pas dans la galerie :
1. Lis l'index et les personnages existants pour comprendre le style
2. Utilise les conventions de taille (16 cols humain, 12 cols robot, 14 cols créature)
3. Définis les 3 poses (idle, happy, working) en t'inspirant des patterns existants
4. Crée un nouveau `character.md` dans `references/{nom}/`
5. La tête/visage des humains est toujours identique entre poses — seuls le corps et les bras changent

## Quand NE PAS utiliser ce skill

- **Slides déjà denses en UI mockups** ou sujets non-narratifs : le pixel art n'ajoute pas de valeur
- **Sujets tutoriel pur** sans personnage narrateur : préférer une illustration flat ou un screen recording
- **Personnages expressifs avec posture ou émotion** (KO allongé, boxeur victorieux, mascotte qui pleure) : les grilles PixelChar faites main sont illisibles pour ces poses complexes. Utiliser `fal-generate` avec prompt "pixel art sprite, 16-bit retro game style, chunky square pixels, white background, centered character" + `mixBlendMode: multiply` côté Remotion
- **Règle** : PixelChar marche pour icônes simples (★, ❤, cube, smiley). Pour personnages expressifs → `fal-generate`

## pixelSize recommandé par format

| Format | Dimensions | pixelSize recommandé |
|--------|-----------|---------------------|
| 4:3 standard | 1920×1080 | 6 |
| 1:1 short (slide) | 1080×1080 | 10-12 |
| Gros plan / hero | toute taille | 14-16 |

Avec `pixelSize: 8` sur une slide 1080×1080, le personnage finit à ~130px de haut — trop petit. Utiliser 10-12 pour un format carré.

## Variantes d'une pose

Pour créer une micro-variation d'une pose existante (ex: bouche triste au lieu de sourire) sans recréer le personnage complet :

1. Copier la grille de base de la pose source
2. Identifier les pixels à modifier : la bouche occupe généralement les lignes 5-6 du visage (lignes ~7-8 de la grille totale)
3. Changer uniquement les pixels de l'expression cible
4. Documenter les pixels modifiés dans un commentaire à côté de la grille

Exemple modification bouche :
```
// Sourire → Neutre : remplacer [7][6]='S', [7][7]='S' par [7][6]='C', [7][7]='C'
// Sourire → Triste : inverser la courbe, ex [8][5]='S' au lieu de [6][5]='S'
```

## Créer un accessoire

Pour les petits objets (laptop, café, téléphone...) :
- Grille compacte (4-10 colonnes)
- Pas besoin de 3 poses
- Couleurs cohérentes avec la palette existante
- Grille strictement rectangulaire
