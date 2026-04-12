---
name: motion-slide-planner
description: >
  Planifie et décrit des slides animées (format 4:3) à partir d'un script vidéo.
  Chaque slide est décrite comme une scène visuelle riche en prose — pas un template statique.
  Utilise ce skill dès que l'utilisateur mentionne "slides", "remotion", "découpage en slides",
  "slides pour ma vidéo", "créer les slides", "slides animées", "motion slides", ou fournit
  un script vidéo et veut le transformer en séquence de slides visuelles dynamiques.
  Fonctionne aussi quand l'utilisateur donne un texte et veut un storyboard slide par slide,
  ou demande des suggestions visuelles animées pour accompagner un script.
  Même si le mot "Remotion" n'est pas prononcé, déclenche ce skill si le contexte implique
  un découpage en slides illustratives avec du mouvement pour une vidéo.
---

# Motion Slide Planner — Générateur de briefs de slides animées

Tu reçois un script vidéo et tu produis un brief de slides pour Remotion : chaque slide est décrite comme une **scène visuelle** en prose, avec un titre, un timing, et une description riche de ce qu'on voit à l'écran.

## Contexte

Les slides Remotion sont des composants React rendus en vidéo. Format **4:3**. Ces slides apparaissent typiquement dans la partie haute d'un écran splitté (face cam en bas, slide en haut) pour des vidéos courtes, mais le format est flexible.

L'objectif n'est pas de générer du code Remotion — c'est de produire des descriptions de scènes suffisamment détaillées pour qu'un développeur (ou un autre agent) puisse les implémenter directement.

## Processus

### 1. Analyser le script

Lis le script fourni. Identifie les blocs logiques : hook, étapes du corps, CTA. Si le script utilise des annotations comme `[HOOK]`, `[CORPS]`, `[CTA]`, appuie-toi dessus. Sinon, découpe toi-même selon les idées.

### 2. Découper en slides

Environ **5 secondes par slide** en moyenne, mais adapte selon le rythme. Une idée dense = une slide. Plusieurs phrases liées = une seule slide. Le contenu dicte le découpage, pas un nombre fixe.

Une slide d'intro (slide 0) peut présenter le sujet en 2-3 secondes avant d'entrer dans le vif.

### 3. Décrire chaque slide comme une scène

C'est le cœur du skill. Chaque slide est une **description de scène** en prose. Tu racontes ce qu'on voit, ce qui bouge, ce qui apparaît, ce qui se transforme. Le lecteur doit pouvoir visualiser la slide rien qu'en lisant ta description.

La description est un paragraphe fluide, pas une liste de champs. Elle inclut naturellement :
- **Ce qu'on voit** : les éléments visuels (un terminal, un schéma, des icônes, du texte)
- **Ce qui bouge** : les animations, les apparitions, les transformations
- **Le texte à l'écran** : intégré dans la description, pas dans un champ séparé
- **Les blocs de code** : quand le script mentionne des commandes, inclus-les en bloc de code markdown dans la description

Ce que la description ne contient PAS : des choix de design (couleurs, polices, fonds). On décrit le contenu et le mouvement, pas le style.

### 4. Format de sortie

```
### Slide [N] — [Titre court] ([timestamp début] → [timestamp fin])

[Description de la scène en prose. Un à trois paragraphes qui racontent
ce qu'on voit, ce qui bouge, ce qui apparaît. Peut inclure des blocs
de code si pertinent.]
```

Le titre court donne le sujet de la slide en 2-4 mots. Le timing utilise le format `(Xs → Ys)`.

## Écrire de bonnes descriptions de scènes

Une bonne description de slide permet à quelqu'un qui ne voit pas la vidéo de se la représenter mentalement. Elle est concrète et spécifique.

**Mauvais** : "Un visuel montrant que l'outil est rapide."

**Bon** : "Un fichier de code au centre. 3 curseurs apparaissent en même temps à différents endroits du code, chacun avec un label — 'reuse', 'quality', 'efficiency'. Les zones rouges passent en vert une par une. Compteur en bas : `3 duplications removed · 2 patterns fixed · 1 query optimized`."

Les descriptions réussies :
- **Montrent des objets concrets** : un terminal, un fichier, une icône, un compteur — pas des concepts abstraits
- **Décrivent le mouvement** : "apparaît", "se transforme", "défile", "s'alignent", "pulse" — la slide vit
- **Utilisent des métaphores visuelles** quand c'est pertinent : un cerveau qui absorbe des notes, un compteur arcade, des livres qui débordent d'une étagère
- **Incluent le texte affiché dans le flux** : "Texte au centre : '100+ skills'" plutôt qu'un champ séparé
- **Incluent les commandes en code** quand le script parle de CLI :

```
Un terminal avec le texte `> gws` qui s'affiche avec un effet typewriter.
Les six icônes sont aspirées dans l'écran et s'alignent sous la commande.
```

## Ce qu'il faut éviter

- **Des descriptions plates.** "Un texte qui affiche le nom de l'outil." → trop vague, pas de mouvement, pas de vie.
- **Des choix de design.** Ne jamais écrire de couleurs ("fond dégradé sombre", "vert lime"), de tailles de police ("48pt"), de palettes. Le brief décrit ce qu'on voit, pas comment c'est stylé.
- **Des champs structurés.** Pas de "Texte affiché :", "Visuel :", "Narration :", "Transition :" — la description est en prose fluide.
- **Du texte répété.** Si le script dit "J'ai testé en 10 minutes", la slide ne devrait pas réécrire la phrase en entier — elle montre visuellement ce que ça représente.

## Quand le script est en franglais / tech

Les termes techniques anglais restent tels quels dans les slides : "Claude Code", `/memory`, `gws`. Le texte affiché sur les slides peut être en anglais si c'est plus punchy.

## Exemple

Script d'entrée :
> Google vient de donner accès à tout ton Workspace à ton IA. Avec le CLI de Google Workspace, tout passe par une seule commande : `gws`. Tu dois juste l'installer et t'identifier, et c'est tout. Il a accès à tes mails, ton Drive, ton Calendar, tes Sheets, tes Docs. Tu peux lui demander d'écrire et envoyer des mails, manipuler des dossiers, et même de créer des slides de toute pièce. Le repo déborde de skills. Ça fait même pas une semaine qu'il est sorti et il a déjà plus de 15k stars sur GitHub.

Brief de sortie :

### Slide 1 — Le chaos des APIs (0s → 4s)

Un personnage développeur assis à son bureau, entouré de six écrans différents. Chaque écran affiche un service Google (enveloppe, dossier, calendrier, tableur, document, bulle de chat). Des câbles partent dans tous les sens. Le personnage est débordé.

### Slide 2 — Une seule commande (4s → 9s)

Le même personnage, mais cette fois un seul écran devant lui. Un terminal avec le texte `> gws` qui s'affiche avec un effet typewriter. Les six icônes Google sont aspirées dans l'écran et viennent s'aligner en une rangée propre sous la commande. Le personnage sourit, bras croisés.

### Slide 3 — L'agent au travail (9s → 18s)

Le personnage est dans un fauteuil, café à la main. À côté, un petit robot s'active : il attrape une enveloppe et l'envoie (mail), déplace un dossier d'une étagère à une autre (Drive), empile des slides sur un bureau (présentations). Trois actions en séquence. Le personnage regarde tranquillement.

### Slide 4 — Skills en pagaille (18s → 22s)

Vue d'une bibliothèque remplie de livres. Chaque livre a une étiquette : "Gmail", "Drive", "Sheets", "Calendar", "Docs". Les livres débordent des étagères, certains tombent. Texte au centre : "100+ skills".

### Slide 5 — Explosion de stars (22s → 30s)

Un compteur géant style arcade au centre, les chiffres défilent de 0 à 15 000. Des étoiles explosent autour comme un feu d'artifice. Le logo GitHub en haut. Petite foule de personnages en bas qui lèvent les bras. Confettis.
