# short-overlays — review en attente

Note : le SKILL.md a été copié depuis `~/.claude/skills/short-overlays/SKILL.md` (n'existait pas dans le repo).

## Changements proposés

- Ajout instruction étape 6 : supprimer les .tsx non importés après custom (sinon tsc plante)
- Ajout étape 1 : whisper en un seul run avec `--output_format vtt --word_timestamps True` + shift +0.15s
- Ajout pièges connus : captions < 1.1s crash, FeedbackMd fade-in tardif, OffthreadVideo crash intermittent
- Création GOTCHAS.md (n'existait pas dans le repo)

## Feedback intégré

| Feedback | Occurrences | Action |
|---|---|---|
| Migration npm → pnpm | 1 (2026-04-26) | Déjà dans SKILL.md étape 9 ✓ |
| Supprimer .tsx non importés après custom | 1 (2026-04-26) | Note IMPORTANT étape 6 + gotcha |
| Captions < 1.1s crash interpolate | 1 (2026-04-26 (2)) | Section pièges + gotcha |
| FeedbackMd fade-in trop tardif | 1 (2026-04-26 (2)) | Section pièges + gotcha |
| Whisper VTT + word_timestamps en un seul run | 1 (2026-04-26 (2)) | Étape 1 + gotcha |
| Captions whisper +0.15s sync | 1 (2026-04-26 (2)) | Étape 1 + gotcha |
| OffthreadVideo crash → concurrency=2 | 1 (2026-04-26 (2)) | Section pièges + gotcha |

## AVANT (extraits)

- Pas d'instruction de cleanup .tsx après custom
- Whisper invoqué en TXT seul, sans word-timestamps
- Pas de mention shift sync, captions courtes, FeedbackMd, OffthreadVideo crash
- Pas de GOTCHAS.md

## APRÈS (extraits)

Voir `SKILL.md` étape 1 (whisper amélioré + shift), étape 6 (cleanup), section "Erreurs / pièges connus" (3 nouveaux).
Nouveau `GOTCHAS.md` complet.
