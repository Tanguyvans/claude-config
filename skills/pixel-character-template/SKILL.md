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

## Quand NE PAS utiliser ce skill

PixelChar est conçu pour des **icônes simples et stylisées** (cube mascotte, robot pixel, dev minimaliste, étoile, cube, cœur). Il n'est PAS adapté pour :

- **Personnages avec posture/émotion forte** (KO allongé, boxeur victorieux, wallet qui pleure) — les grilles faites main sont peu lisibles. Utiliser `fal-generate` avec un prompt sprite ("pixel art sprite, 16-bit retro, chunky pixels, white background") + `mixBlendMode: multiply` côté Remotion
- **Slides déjà denses en UI mockups** où un personnage en plus alourdit la composition
- **Sujets non-narratifs / formats tutoriel pur** (commande terminal, doc API) où le personnage est juste décoratif et n'apporte pas

Si le script ne dit pas "toi", "tu", ou ne désigne pas explicitement une figure humaine au moment de la slide, ne pas glisser un personnage par défaut.

## `pixelSize` par format

Le `pixelSize` (taille d'un pixel rendu en CSS) doit être calibré au format de la slide pour que le personnage soit lisible :

| Format | `pixelSize` recommandé | Hauteur perso typique |
|--------|------------------------|------------------------|
| 16:9 1920×1080 (4:3 desktop) | 6 | ~130-150px |
| 1:1 1080×1080 (short carré) | 10-12 | ~250-300px |
| 9:16 1080×1920 (gros plan) | 14 | ~350-400px |

À 1080×1080, `pixelSize: 8` produit un perso d'environ 130px de haut — visuellement écrasé dans le canvas. Toujours tester un still avant de valider.

## Variantes d'une pose existante

Plutôt que de créer un nouveau personnage pour une micro-variation (bouche triste au lieu de sourire, yeux fermés au lieu d'ouverts) :

1. Copier la grille de la pose existante la plus proche (ex: `DEV_IDLE`)
2. Documenter les pixels modifiés en commentaire en tête de la nouvelle constante (`DEV_SAD = ... // bouche : (5,12) → ' ', (6,12) → '_'`)
3. Garder la même tête/silhouette — seuls les pixels d'expression changent
4. Exporter sous un nom explicite (`DEV_SAD`, `DEV_EYES_CLOSED`)

Cela évite de recréer un personnage complet pour des micro-variations et garantit la cohérence visuelle entre poses.

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

## Créer un accessoire

Pour les petits objets (laptop, café, téléphone...) :
- Grille compacte (4-10 colonnes)
- Pas besoin de 3 poses
- Couleurs cohérentes avec la palette existante
- Grille strictement rectangulaire
