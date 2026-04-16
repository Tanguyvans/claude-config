# PENDING-REVIEW — anthropic-slides

## Changements proposés

- Ajout section "Règles dures" en haut de SKILL.md avec règle explicite sur les thèmes
- Ajout section "Choisir un thème" avec workflow de sélection au démarrage
- Ajout tableau des 4 thèmes disponibles (anthropic, brutalist, terminal, cave) avec mécanisme de swap
- Création GOTCHAS.md

## Feedback intégré

| Feedback | Occurrences | Action |
|----------|-------------|--------|
| Skill verrouillé sur un seul thème visuel (Anthropic) | 1 (2026-04-12) | Ajout système de thèmes interchangeables + tableau |
| Devrait demander "quel thème ?" au démarrage | 1 (2026-04-12) | Ajout règle dure + workflow de sélection étape 1 |
| Organisation templates/ + theme.ts central est propre | 1 (positif) | Conservé, renforcé avec mécanisme de swap documenté |

## AVANT (parties changées de SKILL.md)

```
---
name: anthropic-slides
description: ...
---

# Anthropic-Style Remotion Video Slides

## Design System
```

## APRÈS

```
---
name: anthropic-slides
description: ...
---

# Anthropic-Style Remotion Video Slides

## Règles dures
- TOUJOURS demander ou suggérer un thème au démarrage
- Si le sujet jure visuellement avec le style Anthropic → proposer thème adapté
- Un thème = un seul fichier theme.ts à swapper

## Choisir un thème
[workflow + tableau des thèmes + mécanisme de swap]

## Design System
```
