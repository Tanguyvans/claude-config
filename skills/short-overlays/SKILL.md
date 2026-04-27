---
name: short-overlays
description: >
  Génère un projet Remotion complet pour ajouter des overlays animés
  (kinetic typography, terminal mockups, GitHub PR cards, captions, diagrammes,
  bruitages) par-dessus une vidéo face-cam pour TikTok / Reels / Shorts.
  Utilise ce skill dès que l'utilisateur veut "monter une vidéo Remotion",
  "ajouter des overlays sur ma vidéo face-cam", "créer un projet Remotion
  avec captions et SFX", "habiller mon short avec des overlays animés",
  ou fournit un MP4 face-cam et veut le transformer en short avec habillage.
  Aussi déclencheur : mots clés "habillage vidéo", "captions auto", "overlays
  Remotion", "skill montage", "monter mon short".
---

# Short Overlays — Remotion overlay project generator

Tu génères un projet Remotion complet qui prend en entrée une vidéo face-cam (MP4)
et la transforme en short habillé avec des overlays animés, des captions, et des
bruitages — prêt à publier sur TikTok / Reels / Shorts.

## Architecture du projet généré

```
~/path/to/project/
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── public/
│   ├── export.mp4              ← face-cam (H.264, 1080×1920)
│   └── sounds/                 ← bibliothèque SFX (whoosh, tick, pop...)
└── src/
    ├── index.ts                ← registerRoot
    ├── Root.tsx                ← composition + zod schema (density prop)
    ├── Main.tsx                ← face-cam Video + Sequences overlays
    ├── utils/
    │   ├── timings.ts          ← BEATS centralisés (frames absolus)
    │   └── safezone.ts         ← marges TikTok/Reels
    └── components/
        ├── Captions.tsx        ← sous-titres avec highlight orange + pilule noire
        ├── KineticHook.tsx     ← mots qui pop pendant le hook
        ├── Terminal.tsx        ← terminal typewriter (commande)
        ├── FeedbackMd.tsx      ← fichier .md qui se remplit ligne par ligne
        ├── SkillCards.tsx      ← post-its style (skills + bugs)
        ├── CommandsCounter.tsx ← compteur 1·2·3
        ├── RoutinePR.tsx       ← GitHub PR notification card
        ├── DiffPanel.tsx       ← diff avant/après (rouge/vert)
        ├── ValidateButton.tsx  ← bouton ✓ Valider
        ├── GitLog.tsx          ← git log qui défile + pointer
        ├── InstallTerminal.tsx ← install commands + bandeau URL
        ├── CycleDiagram.tsx    ← diagramme de cycle (loop concept)
        ├── Sounds.tsx          ← SFX avec système de densité
        ├── Clock.tsx           ← horloge (alternative à RoutinePR)
        └── GitHubPush.tsx      ← branche + arrow (alternative à RoutinePR)
```

## Process

### 1. Récupérer les inputs

- **MP4 face-cam** : chemin absolu fourni par l'utilisateur (souvent
  `~/Downloads/export.mp4` ou similaire). Format attendu : 1080×1920, H.264.
  - Si HEVC/H.265 (iPhone), il faut **réencoder** avec ffmpeg :
    ```bash
    ffmpeg -i input.MOV -c:v libx264 -profile:v high -pix_fmt yuv420p \
      -crf 18 -preset fast -movflags +faststart \
      -c:a aac -b:a 192k output.mp4
    ```
  - Vérifier le codec : `ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of csv=p=0 file.mp4`

- **Transcription** : produite via Whisper si pas fournie. Toujours demander
  VTT + TXT + word-timestamps en un seul run (sinon 2e passe nécessaire) :
  ```bash
  whisper /path/to/video.mp4 --model small --language fr \
    --output_dir /tmp/whisper-out \
    --output_format vtt --word_timestamps True
  ```
  Le VTT contient les timestamps précis (mot par mot) — utile pour caler
  finement les captions. **Ajouter +0.15s à tous les `start`** des captions :
  Whisper détecte le début de l'audio mais la lèvre/voix audible démarre
  4-5 frames après → léger problème de sync sinon.

### 2. Identifier les beats

Lis la transcription whisper (avec timestamps) et découpe en blocs logiques.
Patterns typiques pour vidéo dev / IA (voir `references/beats-patterns.md`) :

| Beat | Durée typique | Contenu |
|---|---|---|
| HOOK | 0-4s | Phrase d'accroche, kinetic typography |
| PROBLEM | 4-11s | Mise en place du problème, post-its / cards |
| ANNOUNCE | 11-13s | Énumération (1·2·3) |
| DEMO 1 | 13-20s | Première étape (terminal + résultat) |
| DEMO 2 | 20-26s | Deuxième étape |
| DEMO 3 | 26-33s | Troisième étape |
| BENEFIT | 33-39s | Conséquence / sécurité / fallback |
| OUTRO | 39-end | Install + URL + cycle |

Ces beats ne sont **pas obligatoires** — adapte au contenu. Une vidéo peut avoir
2 beats (hook + démo) ou 8 beats. **Le découpage suit le contenu, pas un template.**

### 3. Scaffold le projet

```bash
PROJECT_DIR=/path/to/project
mkdir -p "$PROJECT_DIR"/{public/sounds,src/{components,utils},out}
```

Copie depuis `~/.claude/skills/short-overlays/templates/` :

```bash
SKILL=/Users/tanguyvans/.claude/skills/short-overlays
cp "$SKILL/templates/package.json" "$PROJECT_DIR/"
cp "$SKILL/templates/tsconfig.json" "$PROJECT_DIR/"
cp "$SKILL/templates/remotion.config.ts" "$PROJECT_DIR/"
cp "$SKILL/templates/src/"{index.ts,Root.tsx} "$PROJECT_DIR/src/"
cp "$SKILL/templates/src/utils/"*.ts "$PROJECT_DIR/src/utils/"
cp "$SKILL/templates/public/sounds/"*.mp3 "$PROJECT_DIR/public/sounds/"
```

Et copie le MP4 face-cam :
```bash
cp /path/to/face-cam.mp4 "$PROJECT_DIR/public/export.mp4"
```

### 4. Adapter `src/utils/timings.ts`

Calé sur les beats identifiés à l'étape 2. Format :

```ts
export const FPS = 30;
export const DURATION_SEC = 47;  // ← durée du MP4 face-cam
export const TOTAL_FRAMES = FPS * DURATION_SEC;
export const sec = (s: number) => Math.round(s * FPS);

export const BEATS = {
  hook:    { start: sec(0),   end: sec(4),   label: 'HOOK' },
  problem: { start: sec(4),   end: sec(11),  label: 'PROBLEM' },
  // ... ajuster selon le contenu
} as const;
```

### 5. Composer `src/Main.tsx`

Pour chaque beat, choisis le ou les composants overlays appropriés depuis
`templates/src/components/`. Patterns de pairing typiques :

| Beat | Composant suggéré | Customisation |
|---|---|---|
| Hook | `KineticHook` | tableau `WORDS` avec mots-clés |
| Problem | `SkillCards` ou `FeedbackMd` | adapter `CARDS` ou `ENTRIES` |
| Announce N items | `CommandsCounter` | (pas de paramètre) |
| Démo terminal | `Terminal` + `FeedbackMd` | prop `command`, ENTRIES custom |
| Routine / automation | `RoutinePR` | adapter texte PR title, file diff |
| Avant/après | `DiffPanel` + `ValidateButton` | tableaux BEFORE/AFTER |
| Sécurité / fallback | `GitLog` | tableau COMMITS |
| Install + outro | `InstallTerminal` + `CycleDiagram` | LINES install, URL repo |

**Toujours** :
- Importer `Captions` qui rend en permanence (synchronisé sur la transcription)
- Importer `Sounds` avec prop `density` (par défaut `normal`)
- Le `<OffthreadVideo>` face-cam reste l'arrière-plan principal de toute la vidéo

### 6. Adapter chaque composant

Les composants dans `templates/src/components/` ont du contenu hardcodé en haut
de fichier (tableaux `WORDS`, `CARDS`, `ENTRIES`, `LINES`, `COMMITS`...). Édite
ces tableaux pour matcher le contenu de la vidéo. Le reste du composant
(animations, styles, safe zones) reste tel quel.

**IMPORTANT — Supprimer les fichiers non importés** : si tu adaptes `Main.tsx`
pour un projet hors-pattern (ex: tu retires `problem`, `refine`, `routine` du
template), **supprime aussi les fichiers `.tsx` correspondants** dans
`src/components/` (ex: `SkillCards.tsx`, `Terminal.tsx` non utilisés). Sinon
ils référencent encore `BEATS.problem` / `BEATS.refine` qui n'existent plus →
`tsc --noEmit` plante.

### 7. Adapter `src/components/Captions.tsx`

Rédige le tableau `CAPTIONS` avec les sous-titres synchronisés sur la
transcription whisper. Format :

```ts
{ start: 0.2, end: 2.4, text: 'Comment j\'améliore mes skills', highlight: ['skills'] }
```

Garde des chunks courts (1-3s par caption). `highlight` met les mots en pilule
orange `#f97316`.

### 8. Adapter `src/components/Sounds.tsx`

Le `SFX_LIST` est une liste d'événements audio chacun avec un `tier` (1=lite,
2=normal, 3=dense). Adapte les frames `from` aux beats du projet.

**Pour le détail du sound design** (choix de SFX, calibration volume,
itération sur feedback timecodé, sources Mixkit / ElevenLabs, système de
densité) → utilise le skill **`sound-design`** dédié. Il prend le relais
une fois que les overlays sont scaffoldés.

SFX inclus dans `templates/public/sounds/` (copiés tels quels) :
`whoosh{,-2,-3}.mp3`, `pop{,-2,-3}.mp3`, `tick{,-2,-3}.mp3`, `keyboard.mp3`,
`notification.mp3`, `chime.mp3`, `impact.mp3`, `swoosh-alt.mp3`,
`swoosh-clean.mp3`, `slide.mp3`, `alarm.mp3`.

### 9. Lancer le studio

Utilise **pnpm** (store global mutualisé entre projets, ~30 GB économisés sur 50 vidéos/an vs `npm install` qui duplique node_modules) :

```bash
cd "$PROJECT_DIR" && pnpm install && pnpm start
```

Studio disponible sur http://localhost:3333. Hot-reload sur tout changement.

Si pnpm n'est pas installé : `npm install -g pnpm`. Tous les scripts du `package.json`
fonctionnent identique avec `pnpm <script>` au lieu de `npm run <script>`.

### 10. Render final

```bash
npx remotion render Main out/short.mp4
# ou avec densité spécifique :
npx remotion render Main out/short-lite.mp4 --props='{"density":"lite"}'
```

## Principes à respecter

### Safe zones (obligatoire)

- **Top** : ne rien placer entre y=0 et y=240 (TikTok status bar + Reels notch)
- **Bottom** : ne rien placer entre y=1540 et y=1920 (description + boutons + caption)
- **Right** : éviter x>1000 si du texte (icônes TikTok)
- Voir `references/safe-zones.md` pour le détail par plateforme

### Densité audio

Système 4 niveaux contrôlé par prop `density` (none/lite/normal/dense).
Voir `references/density-tiers.md`. Toujours laisser à `normal` par défaut,
exposer le sélecteur via Remotion Studio Props (zod schema).

### Palette

- Background overlay : `rgba(15, 23, 42, 0.92)` (dark navy)
- Accent principal : `#f97316` (orange vif, utilisé partout)
- Success : `#22c55e` · Danger : `#ef4444` · Warning : `#f59e0b`
- Texte primaire : `#fff` · Muted : `#94a3b8`
- Voir `references/color-palette.md`

### Typographie

- **Sans-serif** : `Inter, system-ui` — captions, titres
- **Mono** : `JetBrains Mono, monospace` — code, terminal, fichiers
- **Tailles** : caption 56px · titre 64px · code terminal 24-38px

### Variants pour éviter la répétition

Si un SFX joue plusieurs fois (hook avec 4 whooshes, 4 ticks...), **alterner
entre variants** (`whoosh.mp3` → `whoosh-2.mp3` → `whoosh-3.mp3`). Évite le
"machine à coudre" effect.

### Re-encode HEVC

Les MP4 iPhone sont en HEVC, **non lisibles dans Chrome**. Toujours réencoder
en H.264 (voir étape 1). Erreur typique :
> Code 4 - PipelineStatus::DECODER_ERROR_NOT_SUPPORTED

## Ce que ce skill ne fait PAS

- Tournage / cadrage / éclairage de la face-cam (tu prends ce qu'on te donne)
- Génération de la transcription : utilise Whisper externe
- Choix du contenu textuel : tu adaptes les tableaux des composants au contenu
  de la vidéo, mais tu ne réinventes pas le script
- Génération de SFX custom : utilise la bibliothèque fournie ou ajoute des MP3
  (Mixkit / ElevenLabs)
- Publication sur les plateformes : produit un MP4, l'utilisateur publie

## Références

- `references/safe-zones.md` — TikTok / Reels / YouTube Shorts par plateforme
- `references/density-tiers.md` — système 4 niveaux audio
- `references/beats-patterns.md` — patterns de découpage par type de vidéo
- `references/color-palette.md` — palette + typo

## Erreurs / pièges connus

- **Le texte du hook reste invisible au début** : si tes mots kinetic ont un
  `at` plus tard que la durée de la sequence, ils n'apparaissent jamais.
  Vérifier les frames `at` vs `BEATS.hook.end`.
- **Captions chevauchent le bandeau URL final** : laisser un trou dans la
  liste `CAPTIONS` pendant les 2-3 dernières secondes pour que l'URL soit
  bien visible seule.
- **Bruitage qui joue trop longtemps** : utiliser `duration` court dans
  `OneShot` pour couper la fin du fichier source qui peut traîner.
- **`OffthreadVideo` requis pour le render** : `<Video>` standard fait
  timeout en headless. Toujours utiliser `OffthreadVideo` pour le face-cam.
- **Zod v4 non compatible** : Remotion Studio ne détecte le schema que
  avec `zod@^3.x`. Si l'UI Props affiche "add a schema prop", downgrade :
  `pnpm add zod@^3.23.8`.
- **Captions courtes (< 1.1s) crashent au render** : le template
  `Captions.tsx` a un `interpolate([0, 4, 30, sec(end-start) - 3], ...)`. Si la
  caption dure < ~1.1s, `sec(end-start) - 3 < 30` → render crash
  `inputRange must be strictly monotonically increasing`. Patcher avec un
  clamp défensif :
  ```ts
  const fadeOutStart = Math.max(31, dur - 3);
  const fadeOutEnd = Math.min(30, fadeOutStart - 1);
  ```
- **`FeedbackMd.tsx` arrive trop tard** : le template a son fade-in à frame
  40 (1.3s de retard) et la 1ère entrée à frame 60. L'overlay arrive 1.3s
  après le mot prononcé → "l'image gotcha arrive un peu en retard". Démarrer
  le fade-in à frame 0-8 et la 1ère entrée à frame 18-20 dans le composant
  customisé.
- **`OffthreadVideo` crash intermittent** : `Could not extract frame from
  compositor / Request closed` au render. Workaround : relancer avec
  `--concurrency=2` :
  ```bash
  npx remotion render Main out/short.mp4 --concurrency=2
  ```
