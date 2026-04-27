---
name: tiktok-cover
description: >
  Génère une cover TikTok statique 1080×1920 à partir d'une vidéo face-cam Remotion
  déjà scaffoldée. Pattern @code_simple : background = frame propre du face-cam,
  kinetic hook statique en haut à droite, cartouche centré-bas avec bandes
  cyan + rouge sur les côtés. Sortie via `npx remotion still`.
  Déclenche dès que l'utilisateur dit "cover TikTok", "couverture vidéo",
  "thumbnail TikTok", "image de couverture", ou veut habiller un short Remotion
  existant avec une cover.
---

# tiktok-cover — Cover statique 1080×1920 pour shorts TikTok / Reels

Tu prends un projet Remotion `short-overlays` existant (structure standard avec
`public/export.mp4`, `src/Root.tsx`, etc.) et tu y ajoutes une composition
`Still` qui produit une cover PNG à uploader manuellement sur TikTok.

## Quand utiliser

- Une vidéo Remotion est déjà scaffoldée et rendue (`out/short.mp4` existe)
- L'utilisateur veut une cover statique, pas un frame random pris dans la vidéo
- Le look cible = pattern @code_simple (kinetic hook visible + cartouche titre
  noir avec bandes colorées)
- Pour TikTok / Instagram Reels / YouTube Shorts (même format vertical)

## Comment fonctionne une cover TikTok

- **Format** : 1080×1920 (vertical, même que la vidéo). PNG ou JPG.
- **Upload** : sur l'app TikTok, écran "Couverture" après upload de la vidéo →
  bouton "Importer" pour cover custom (sur certaines versions). Sinon, choisir
  un frame puis editor extérieur.
- **Affichage profil grille** : crop ~3:4 par le bas → tout doit tenir dans le
  centre vertical. Un cartouche tout en bas est partiellement coupé.
- **Affichage feed** : 9:16 plein, mais la zone bottom (~y > 1540) est mangée
  par la caption + boutons TikTok.
- **Zone safe optimale** : centre vertical (entre y=600 et y=1500).

## Workflow

### 1. Récupérer les inputs

- **Project dir** : chemin absolu du projet Remotion (ex:
  `/Users/x/Desktop/test/my-short`). Doit contenir `public/export.mp4` (le
  face-cam original, **pas** `out/short.mp4` qui aurait les overlays baked in).
- **Titre désiré** : si pas fourni, proposer 3 options de wording basées sur
  le sujet de la vidéo (voir section Wording).
- **Position** : par défaut `lower-third` (paddingBottom 540 = entre face et
  caption-zone). Alternative `center` pour grille profil safe.

### 2. Sélectionner le frame face-cam

Extraire 4 candidats à des moments répartis dans la vidéo et présenter un
contact sheet 2×2 numéroté. L'utilisateur pick par numéro.

```bash
SRC=PROJECT_DIR/public/export.mp4
DEST=/tmp/cover-candidates
mkdir -p $DEST
# Choix par défaut : moments calmes / fin de phrases
for ts in "07.5:1" "11.5:2" "17.0:3" "26.0:4"; do
  T=$(echo $ts | cut -d: -f1)
  N=$(echo $ts | cut -d: -f2)
  ffmpeg -y -ss "00:00:$T" -i "$SRC" -frames:v 1 -q:v 2 \
    "$DEST/cand-$N-${T}s.jpg" 2>&1 | tail -1
done
```

Adapter les timestamps à la durée du face-cam si différente de 30s. Préférer
des moments calmes (fin de phrase, ton posé) plutôt que des moments
expressifs (mouth open, gesture).

Contact sheet 2×2 numéroté avec ffmpeg drawtext :

```bash
ffmpeg -y \
  -i $DEST/cand-1-*.jpg \
  -i $DEST/cand-2-*.jpg \
  -i $DEST/cand-3-*.jpg \
  -i $DEST/cand-4-*.jpg \
  -filter_complex "[0:v]scale=540:960,drawtext=text='1':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.7:boxborderw=10:x=20:y=20[v0];[1:v]scale=540:960,drawtext=text='2':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.7:boxborderw=10:x=20:y=20[v1];[2:v]scale=540:960,drawtext=text='3':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.7:boxborderw=10:x=20:y=20[v2];[3:v]scale=540:960,drawtext=text='4':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.7:boxborderw=10:x=20:y=20[v3];[v0][v1]hstack[top];[v2][v3]hstack[bot];[top][bot]vstack" \
  $DEST/contact-sheet.png && open $DEST/contact-sheet.png
```

User pick → copier le candidat retenu dans `public/cover-bg-clean.jpg` :

```bash
cp /tmp/cover-candidates/cand-N-*.jpg PROJECT_DIR/public/cover-bg-clean.jpg
```

### 3. Choisir le wording du titre

Format cible : 2-4 mots punchy, mix capitalisation + caps pour l'accent.

**Patterns qui marchent** :
- **Topic label** : "Claude IA SKILLS", "POSTMORTEM CLAUDE" — pour annoncer
  un sujet précis
- **Verbe d'action** : "Anthropic L'ADMET", "OpenAI A MENTI" — verbe action
  qui accroche plus qu'un descriptif passif
- **Headline contre-intuitif** : "Claude A BAISSÉ", "Cursor BAT Copilot" —
  affirme un fait surprenant

À éviter : titres descriptifs plats ("Le bug de Claude Code"), questions
("Pourquoi Claude…?"), trop long (>4 mots).

Toujours proposer 3 options et laisser l'utilisateur trancher (pattern
hook-first du skill `short-script`).

### 4. Créer `src/Cover.tsx`

Copier depuis `~/.claude/skills/tiktok-cover/templates/Cover.tsx` puis adapter :

```bash
cp ~/.claude/skills/tiktok-cover/templates/Cover.tsx PROJECT_DIR/src/Cover.tsx
```

Customisations dans le fichier :
- `HOOK_LABELS` : les mots du hook de la vidéo (à lire dans
  `src/components/KineticHook.tsx` du projet — vérifier le **count réel** :
  3, 4, 5 ?). Adapter le pas vertical du `top` en conséquence :
  - **3 labels** : `top: 260 + i * 130`
  - **4 labels** : `top: 260 + i * 110`
  - **5 labels** : `top: 260 + i * 95`
- Le `<div>` central : le titre + son accent coloré (orange par défaut)
- `paddingBottom: 540` (lower-third) ou `justifyContent: 'center'` (centre
  vertical) selon position choisie

### 5. Wirer dans `src/Root.tsx`

Ajouter une composition `<Still>` à côté du `<Composition>` Main existant.
**ATTENTION JSX** : `Composition` + `Still` doivent être wrappés dans un fragment
`<>...</>` (ou un `<RemotionRoot>`). Sans ça, JSX rejette `Adjacent JSX elements
must be wrapped` et le projet ne build plus → erreur runtime "Could not find
composition with ID Cover" parce que l'Edit a silencieusement échoué (file pas
Read d'abord par exemple) :

```tsx
import { Composition, Still } from 'remotion';
import { Cover } from './Cover';
// ...

export const Root = () => (
  <>
    <Composition id="Main" component={Main} ... />
    <Still id="Cover" component={Cover} width={1080} height={1920} />
  </>
);
```

Avant l'Edit du Root.tsx : **toujours `Read` le fichier** pour ne pas faire un
Edit silencieusement raté qui laisse `<Still>` non ajouté.

### 6. Render et itérer

```bash
cd PROJECT_DIR && npx remotion still Cover out/cover.png && open out/cover.png
```

Itérations courantes :
- "ma tête est bizarre" → re-extraire le contact sheet, user pick autre
  candidat
- "trop bas / trop haut" → ajuster `paddingBottom` (lower-third 540, center
  vertical via `justifyContent: 'center'`)
- "wording moyen" → re-proposer 3 options et swap

## Architecture du Cover.tsx généré

```tsx
<AbsoluteFill style={{ backgroundColor: '#000' }}>
  <Img src={staticFile('cover-bg-clean.jpg')} ... />

  {/* Kinetic hook static — 4 labels stackés top-right */}
  <AbsoluteFill>
    {HOOK_LABELS.map(...)}
  </AbsoluteFill>

  {/* Title card centré-bas avec bandes cyan + rouge */}
  <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 540 }}>
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      <div style={{ width: 32, background: '#22d3ee' }} />
      <div style={{ padding: '40px 56px', background: '#0a0a0a', ...title styles }}>
        Topic <span style={{ color: '#f97316' }}>ACCENT</span>
      </div>
      <div style={{ width: 32, background: '#dc2626' }} />
    </div>
  </AbsoluteFill>
</AbsoluteFill>
```

## Pré-requis

- Project Remotion scaffoldé via `short-overlays` (structure
  `public/export.mp4`, `src/Root.tsx`, `src/components/KineticHook.tsx`)
- `public/export.mp4` doit être H.264 yuv420p (re-encodé depuis HEVC si besoin
  via `ffmpeg -c:v libx264 -pix_fmt yuv420p`)
- ffmpeg installé pour l'extraction de frames et le contact sheet

## Ce que ce skill ne fait PAS

- Tournage du face-cam
- Le sound design ou les overlays vidéo (ça relève de `short-overlays` /
  `sound-design`)
- L'upload TikTok lui-même (manuel via l'app)
- Customisations brand non-`@code_simple` (la palette cyan/rouge/orange est
  spécifique à ce style)
