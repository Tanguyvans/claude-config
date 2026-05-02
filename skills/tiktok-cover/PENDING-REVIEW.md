# Pending Review — tiktok-cover

## Changements proposés
- Ajout étape 0 dans le workflow (détection split vs fullscreen via grep Main.tsx)
- GOTCHAS.md : heuristique paddingBottom selon position visage, section "Layout split", section "Auto mode"

## Feedback intégré

| Date | Feedback | Action |
|---|---|---|
| 2026-04-27 | paddingBottom 540 sur visage bas = pile sur visage | GOTCHAS (heuristique selon position) |
| 2026-04-27 | Auto mode + skill demande pick = conflit | GOTCHAS (Auto mode) |
| 2026-04-27 (2) | Split layout vs fullscreen+cartouche | Étape 0 + GOTCHAS |
| 2026-04-28 | **Bug récurrent** split layout non détecté | Étape 0 (grep Main.tsx) |
| 2026-04-28 | Question composite ambigue | GOTCHAS (1 décision/question) |
| 2026-04-28 | Bandeau bas redondant en split | GOTCHAS |

## AVANT (workflow)
```
### 1. Récupérer les inputs
```

## APRÈS (workflow)
```
### 0. Détection du layout du projet (split vs fullscreen)
[grep Main.tsx pour FaceCam/Sequence Slide → template split par défaut]

### 1. Récupérer les inputs
```
