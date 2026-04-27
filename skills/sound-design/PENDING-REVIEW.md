# sound-design — review en attente

Note : SKILL.md et GOTCHAS.md copiés depuis `~/.claude/skills/sound-design/` (n'existaient pas dans le repo).

## Changements proposés

- Ajout étape 4.b "Sélection à l'aveugle via ffmpeg volumedetect" — pattern + critères de pick par catégorie de SFX
- Ajout dans le catalogue Mixkit testé : ID 759 (window break sustained, 1.4s, peak 0 dB) pour bris narratif fort
- Ajout dans "À éviter" : ID 2183 (glass crack court, peak -4.4 dB) qui tombe dans la voix
- GOTCHAS.md : 2 nouveaux items dans "Process" (sélection à l'aveugle, critère long/peak 0 dB pour percussif fort) + ligne ID 2183 dans le catalogue à éviter

## Feedback intégré

| Feedback | Occurrences | Action |
|---|---|---|
| Pour SFX percussif fort, favoriser long + peak 0 dB | 1 (2026-04-26) | Étape 4.b + catalogue + gotcha |
| Sélection à l'aveugle ffmpeg volumedetect (positif) | 1 (2026-04-26) | Étape 4.b + gotcha "Process" |

## AVANT (extraits)

Pas de pattern documenté pour la sélection à l'aveugle multi-candidats. Pas de mention du critère `mean_volume > -22 dB`. Catalogue ne mentionnait pas ID 759 (utile) ni 2183 (à éviter).

## APRÈS (extraits)

Voir `SKILL.md` nouvelle sous-section "4.b. Sélection à l'aveugle via `ffmpeg volumedetect`", catalogue Mixkit testé enrichi.
Voir `GOTCHAS.md` 2 nouveaux items dans "Process".
