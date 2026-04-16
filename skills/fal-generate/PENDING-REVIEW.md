# PENDING-REVIEW — fal-generate

## Changements proposés

- Ajout section "Règles dures" en haut de SKILL.md (3 règles explicites : theme.ts, FAL_KEY reload, --add-fal-key)
- Refonte section "API Key Error" dans Troubleshooting avec instructions claires et section séparée "FAL_KEY perdue entre sessions"
- Ajout section "Générer pour un projet Remotion" avec règle de lecture du theme.ts avant prompt
- Création GOTCHAS.md

## Feedback intégré

| Feedback | Occurrences | Action |
|----------|-------------|--------|
| FAL_KEY perdue entre sessions | 1 (2026-04-12) | Section dédiée dans Troubleshooting + règle dure |
| --add-fal-key sans argument peu clair, 4 tentatives | 1 (2026-04-12) | Remplacement par `export` + note explicite que --add-fal-key sans arg ne fait rien |
| Prompt devrait lire theme.ts existant pour Remotion | 1 (2026-04-12) | Section "Générer pour un projet Remotion" + règle dure |
| Images matchaient bien le design system (positif) | 1 (2026-04-12) | Conservé, mais maintenant documenté comme processus explicite |

## AVANT (parties changées)

Troubleshooting API Key Error :
```
**Solution:** Run `./generate.sh --add-fal-key` or `export FAL_KEY=your_key`.
```

Pas de section Remotion, pas de règles dures.

## APRÈS

```
## Règles dures
- Si theme.ts existe → lire avant de prompter
- FAL_KEY doit être rechargée explicitement
- --add-fal-key sans argument → guider vers export/env

## Générer pour un projet Remotion
[lecture theme.ts + exemple de prompt adapté]

Troubleshooting API Key Error :
- export FAL_KEY=... (session)
- ~/.claude/skills/fal-generate/.env (permanent)
- source pour recharger
- Note: --add-fal-key sans arg ne fait rien
+ Section "FAL_KEY perdue entre sessions"
```
