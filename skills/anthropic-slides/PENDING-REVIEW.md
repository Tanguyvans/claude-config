# PENDING-REVIEW — anthropic-slides

## Changements proposés

- 4 règles dures ajoutées dans SKILL.md
- 2 nouvelles sections dans GOTCHAS.md (Fond et overflow, Contenu) + item checklist pré-livraison

## Feedback intégré

| Feedback | Source | Occurrences | Action |
|----------|---------|-------------|--------|
| Fond sombre sur Slide 4 au lieu de COLORS.background | Desktop/test/.claude/skills/video/FEEDBACK.md 2026-03-30 | 1 | Règle dure + GOTCHA |
| Après changement typo, vérifier overflow sur toutes les slides | Desktop/test/.claude/skills/video/FEEDBACK.md 2026-04-20 | 1 | Règle dure + GOTCHA + checklist |
| Pas de slide URL finale pour repo GitHub dans le scaffolding | Desktop/test/.claude/skills/video/FEEDBACK.md 2026-04-20 | 1 | Règle dure + GOTCHA |
| Labels flottants positionnés relativement au parent cassent au resize | Desktop/test/.claude/skills/video/FEEDBACK.md 2026-04-20 | 1 | Règle dure + GOTCHA |

## Avant / Après

### SKILL.md — section "Règles dures" (AVANT)
```
- TOUJOURS demander ou suggérer un thème au démarrage
- Si le sujet jure visuellement...
- Un thème = un seul fichier theme.ts...
```

### SKILL.md — section "Règles dures" (APRÈS, 4 règles ajoutées)
```
- TOUJOURS demander ou suggérer un thème au démarrage
- Si le sujet jure visuellement...
- Un thème = un seul fichier theme.ts...
- Toutes les slides utilisent COLORS.background comme fond — sauf si le script mentionne explicitement un fond différent
- Après tout changement de thème ou de typographie : re-render toutes les slides et vérifier overflow
- Pour un sujet de type repo GitHub : proposer systématiquement une slide finale avec l'URL en grand
- Labels flottants : positionner absolument par rapport au conteneur de slide
```

### GOTCHAS.md (AVANT)
```
## Thème / Structure / Checklist pré-livraison
```

### GOTCHAS.md (APRÈS, 2 sections ajoutées)
```
## Thème / Structure
## Fond et overflow (NOUVEAU)
## Contenu (NOUVEAU)
## Checklist pré-livraison (+ item re-render)
```
