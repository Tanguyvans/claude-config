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
- [ ] **KineticHook sticker brand** : le pattern sticker @code_simple (orange/noir + border 4px + boxShadow 8px + rotation -2°/1.5°) est le DEFAULT du hook — pas du texte plat scaling-pop. Toutes les vidéos récentes l'utilisent.
- [ ] **Double texte interdit** : si un beat affiche un KineticHook avec les mêmes mots que la caption active → soit supprimer la caption pendant ce beat, soit mettre une caption distincte. Jamais le même texte dans 2 composants simultanément.
- [ ] **Densité max 2 éléments** par beat en plus des captions (badge + card, pas badge + card + bubble + indicateur).
- [ ] **Screen recording réel > fake cards** : si l'user fournit un MP4 d'app réelle → prioriser `OffthreadVideo` + spring scale + drop shadow. Les `SkillCards`/`FeatureScreens` générées ne valent pas un screen réel.
- [ ] **Titlebar double chrome** : si le screen recording contient déjà une titlebar app (iTerm, VS Code, browser avec colour dots dans les ~80px du haut) → NE PAS ajouter une titlebar mac custom par-dessus. Appliquer juste drop-shadow + border-radius.
- [ ] **Cohérence palette entre beats** : si un beat établit terminal sombre (#0f172a + orange border), les beats suivants du même type doivent réutiliser cette palette — pas mélanger panel blanc et terminal sombre dans la même séquence.
- [ ] **Outro non-redondante** : ne jamais retaper une commande terminal dans l'outro si elle a déjà été montrée au début. Outro = URL banner seul OU rappel en flash unique.
- [ ] **Cards auto-fit safe zone** : positions par défaut pour un stack de 3 cards doivent tenir entre y=240 et y=1500. La 3e card à y=1120 + ~600px de hauteur empiète sur y>1540.
- [ ] **Face-cam objectPosition** : demander où est le visage dans le rush (haut/centre/bas) AVANT de définir `objectPosition`. Default "center 30%" coupe le visage si il est cadré en bas.

## Timecode

- [ ] **Remotion affiche SS:FF** (secondes:frames), pas un décimal. Si l'user reporte "29.27", clarifier : `29:27 = 29s + 27 frames @ 30fps = 29.9s`. Ne pas traiter comme un décimal.
- [ ] **Listicle + whisper** : pour les beat listicles (3+ items), caler les cuts sur le 1er mot de chaque item avec `--word_timestamps True`, pas sur les segments whisper (qui batchent plusieurs items en un).
- [ ] **Captions default** : générer `CAPTIONS` directement depuis les segments JSON whisper (start/end exacts), pas des chunks manuels. Le manuel est un fallback.

## Render

- [ ] OffthreadVideo crash → `--concurrency=2`
- [ ] Toujours `OffthreadVideo` (pas `<Video>`) pour le face-cam (sinon timeout headless)
- [ ] zod v3 (`pnpm add zod@^3.23.8`) — v4 incompatible avec Remotion Studio

## Process

- [ ] Lire FEEDBACK.md et GOTCHAS.md avant de scaffolder
- [ ] **Si l'user nomme explicitement un skill** dans son brief (`motion-slide-planner`, etc.) → l'invoquer même si la planification inline semble suffisante.
