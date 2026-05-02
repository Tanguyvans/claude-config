# Gotchas

Erreurs récurrentes à vérifier AVANT de render.

## Scaffolding

- [ ] **pnpm** (pas `npm install`) — store global mutualisé, économise ~30 GB/an
- [ ] Si tu adaptes Main.tsx en retirant des beats du template → **supprimer les `.tsx` correspondants** dans `src/components/` (sinon tsc plante sur `BEATS.X` disparu)
- [ ] MP4 face-cam en H.264 (pas HEVC) — re-encode ffmpeg si iPhone

## Whisper

- [ ] Lancer en un seul run : `--output_format vtt --word_timestamps True` (pas TXT seul, sinon 2e passe nécessaire)
- [ ] **Shifter +0.15s sur tous les `start`** — Whisper détecte le début audio, pas la lèvre visible (décalage 4-5 frames)

## Captions

- [ ] Captions courtes (< 1.1s) → patcher l'interpolate de `Captions.tsx` avec clamp défensif (`Math.max(31, dur - 3)` / `Math.min(30, fadeOutStart - 1)`)
- [ ] Trou dans `CAPTIONS` pendant 2-3s OUTRO pour laisser respirer l'URL bandeau

## Composants

- [ ] `FeedbackMd.tsx` : fade-in à frame 0-8, 1ère entrée à frame 18-20 (PAS frame 40/60 du template — 1.3s de retard ressenti)
- [ ] Variants SFX : alterner entre `whoosh.mp3` / `whoosh-2.mp3` / `whoosh-3.mp3` pour éviter "machine à coudre"

## Render

- [ ] OffthreadVideo crash → `--concurrency=2`
- [ ] Toujours `OffthreadVideo` (pas `<Video>`) pour le face-cam (sinon timeout headless)
- [ ] zod v3 (`pnpm add zod@^3.23.8`) — v4 incompatible avec Remotion Studio

## Cadrage face-cam (objectPosition)

- [ ] **Demander où est le visage** dans le rush (haut/centre/bas) AVANT de définir `objectPosition` — ne jamais defaulter sur `'center 30%'`. Alternative : extraire un thumbnail du MP4 (`ffmpeg -ss 1 -frames:v 1`) et confirmer
- [ ] Si l'user dit "slides en haut" ET le visage est cadré bas → face-cam plein écran + slides en overlay bleed-to-top (PAS un crop strict 50/50)

## Safe zone TikTok top

- [ ] Tout content positionné dans la zone y=0-260 → bleed-to-top + content interne shifté à y=220+ (header "Pour toi / Abonnements" masque les 220 premiers pixels)
- [ ] Panels overlay visibles >3s → max-height 320px et top dans la zone safe (y=240-560), sinon ils mangent le visage face-cam

## Listicle (3+ items)

- [ ] Whisper word-level (`--word_timestamps True`) obligatoire sur listicle — caler les cuts sur le 1er mot de chaque item, pas sur les segments bruts (whisper batch les items)

## Assets visuels (personne / marque / repo)

- [ ] Si un beat featuring une personne ou une marque → fetch automatiquement leur image (avatar X via `unavatar.io/x/<handle>`, logo via `logo-fetcher`, screenshot du repo). Une slide texte-seulement sur une personne/marque paraît "triste"
- [ ] Pour les vidéos de présentation de repo → proposer 1-2 screenshots produits ou déléguer à `logo-fetcher`

## Invocation d'autres skills

- [ ] Si l'user nomme explicitement `motion-slide-planner` (ou autre skill) dans son brief → l'invoquer, ne pas planifier inline

## Process

- [ ] Lire FEEDBACK.md et GOTCHAS.md avant de scaffolder
