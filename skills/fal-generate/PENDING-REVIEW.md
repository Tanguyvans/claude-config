# fal-generate — review en attente

## Changements proposés

- Ajout règle dure : `--aspect-ratio="16:9"` pour AR arbitraire (vs preset --size limité)
- Ajout règle dure : gpt-image-2 filtre les noms d'IP/franchises (préférer descriptions génériques)
- Ajout règle dure : préfixe de style verbatim pour cohérence sprites en série
- Ajout section troubleshooting : `search-models.sh` pollue stdout → utiliser `2>/dev/null | jq ...`
- GOTCHAS.md : 4 nouveaux items dans `Process`

## Feedback intégré

| Feedback | Occurrences | Action |
|---|---|---|
| `--aspect-ratio` arbitraire pas exposé dans `generate.sh` | 1 (2026-04-26) | Règle dure + gotcha |
| `search-models.sh` pollue stdout, casse jq pipeline | 1 (2026-04-26) | Section troubleshooting + gotcha |
| gpt-image-2 filtre les IP/franchises | 1 (2026-04-26) | Règle dure + gotcha |
| Cohérence sprites en série via prompt verbatim | 1 (2026-04-22) | Règle dure + gotcha |

## AVANT (extraits)

Pas de mention `--aspect-ratio`, pas de gotcha sur stdout pollution, pas de règle sur cohérence inter-sprites.

## APRÈS (extraits)

Voir `SKILL.md` section "Règles dures" (4 nouveaux bullets) et "Troubleshooting" (nouveau bloc `search-models.sh`).
Voir `GOTCHAS.md` section "Process" (4 nouveaux items).
