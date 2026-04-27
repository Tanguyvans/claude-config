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

## Process

- [ ] Lire FEEDBACK.md et GOTCHAS.md avant de scaffolder
