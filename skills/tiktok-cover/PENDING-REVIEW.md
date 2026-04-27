# tiktok-cover — review en attente

Note : SKILL.md et GOTCHAS.md copiés depuis `~/.claude/skills/tiktok-cover/` (n'existaient pas dans le repo).

## Changements proposés

- Étape 4 : adapter `top: + i * N` au count réel de `HOOK_LABELS` (3 → 130, 4 → 110, 5 → 95)
- Étape 5 : warning explicite sur le wrap fragment `<>...</>` autour de `Composition + Still` + Read avant Edit
- GOTCHAS : check count réel de WORDS, adapter pas vertical, fragment wrap, Read avant Edit

## Feedback intégré

| Feedback | Occurrences | Action |
|---|---|---|
| HOOK_LABELS count variable + pas vertical à adapter | 1 (2026-04-26 (2)) | Étape 4 + GOTCHAS Kinetic hook |
| Root.tsx fragment `<>...</>` requis sinon JSX rejection | 1 (2026-04-26 (2)) | Étape 5 + GOTCHAS Pré-requis |
| Edit silencieusement échoué si pas Read d'abord | 1 (2026-04-26 (2)) | Étape 5 + GOTCHAS Pré-requis |

## AVANT (extraits)

Étape 4 hardcode "4 mots du hook" (sans variation). Étape 5 montre le fragment mais sans flag explicite ni warning. Pas de mention du Read-avant-Edit obligatoire.

## APRÈS (extraits)

Voir `SKILL.md` étapes 4 (table count→pas vertical) et 5 (warning fragment + Read-first).
Voir `GOTCHAS.md` sections "Kinetic hook static" (3 nouveaux items) et "Pré-requis projet" (2 nouveaux items).
