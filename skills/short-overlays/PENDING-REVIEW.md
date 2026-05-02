# Pending Review — short-overlays

## Changements proposés
- Ajout étape 0 dans le workflow (cadrage face-cam + invocation skills nommés)
- 5 nouvelles sections dans GOTCHAS.md : cadrage face-cam, safe zone TikTok top, listicle, assets visuels, invocation skills

## Feedback intégré

| Date | Feedback | Action |
|---|---|---|
| 2026-04-27 | objectPosition center 30% coupe visage bas | Étape 0 + GOTCHAS |
| 2026-04-27 | "slides en haut" + visage bas → bleed-to-top | Étape 0 + GOTCHAS |
| 2026-04-27 | TikTok safe zone top 200-260px non documentée dans le workflow | GOTCHAS |
| 2026-04-27 | Pas d'étape pour screenshots de repo | GOTCHAS (assets visuels) |
| 2026-04-27 | motion-slide-planner nommé, pas invoqué | Étape 0 + GOTCHAS |
| 2026-04-27 (2) | Captions.tsx hardcoded 30 (déjà documenté) | Déjà dans SKILL.md |
| 2026-04-27 (2) | Panels >430px masquent visage | GOTCHAS (max-height 320, top y=240-560) |
| 2026-04-27 (2) | Listicle → whisper word-level | GOTCHAS |
| 2026-04-27 (2) | Beat avec personne/marque → fetch image | GOTCHAS |

## AVANT (workflow)
```
### 1. Récupérer les inputs
```

## APRÈS (workflow)
```
### 0. Vérifier le cadrage face-cam et invoquer les skills nommés
[demander où est le visage, fallback ffmpeg thumb, slides bleed-to-top, invoquer skills nommés]

### 1. Récupérer les inputs
```
