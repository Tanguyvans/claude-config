# Pending Review — video-ideas

## Changements proposés
- SKILL.md : ajout étape 3.5 (shape réelle du JSON scrapper) et 3.6 (fallback `gh search repos` pour repos hors fenêtre 30j)
- GOTCHAS.md : sections "Shape JSON scrapper" et "Fallback fenêtre GitHub"

## Feedback intégré

| Date | Feedback | Action |
|---|---|---|
| 2026-04-27 | Shape imbriquée non documentée | Étape 3.5 + GOTCHAS |
| 2026-04-27 | Fenêtre 30j rate les repos plus vieux trending | Étape 3.6 + GOTCHAS |

## AVANT
```
### Étape 4 — Proposer les suites
```

## APRÈS
```
### Étape 3.5 — Shape réelle du JSON scrapper
[data.platforms.<x>.posts | github.repos]

### Étape 3.6 — Fallback GitHub pour repos hors-fenêtre
[gh search repos / gh api repos/owner/name]

### Étape 4 — Proposer les suites
```
