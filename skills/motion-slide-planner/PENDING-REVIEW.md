# Pending Review — motion-slide-planner

## Changements proposés
- Ajout règle dure : whisper word-level si MP4 face-cam fourni
- Ajout règle dure : invoquer le skill si l'utilisateur le nomme explicitement
- Ajout étape 0 dans le workflow (whisper)
- Ajout deux sections dans GOTCHAS.md : "Audio / timings" et "Invocation"

## Feedback intégré

| Date | Feedback | Action |
|---|---|---|
| 2026-04-27 | Skill nommé explicitement non invoqué | Règle dure + GOTCHAS |
| 2026-04-27 (2) | MP4 face-cam → whisper avant découpage | Règle dure + étape 0 + GOTCHAS |
| 2026-04-27 (2) | [positif] Format prose riche fonctionne | Pas d'action |
| 2026-04-28 | [positif] Brief riche → 6 slides direct | Pas d'action |

## AVANT (Règles dures)
```
- **Timing de vérification...**
```

## APRÈS (Règles dures, ajout)
```
- **Si un .mp4 face-cam est fourni** : étape 0 = whisper word-level...
- **Si l'utilisateur nomme explicitement ce skill** : l'invoquer.
```

## AVANT (Workflow)
```
### 0. Évaluer si un screen recording est pertinent
```

## APRÈS (Workflow)
```
### 0. Si MP4 face-cam fourni → whisper word-level d'abord
[whisper command + rationale]

### 0b. Évaluer si un screen recording est pertinent
```
