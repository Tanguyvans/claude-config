# Pending Review — scrapper

## Changements proposés
- SKILL.md : 3 nouvelles sous-sections "Limites connues" (GitHub rate-limit anonyme, Blocklist GitHub, TikTok handle introuvable vs vide)
- GOTCHAS.md : ajout sections "GitHub" et "TikTok — HTTP status"

## Feedback intégré

| Date | Feedback | Action |
|---|---|---|
| 2026-04-27 | github.js rate-limit anonyme | SKILL.md + GOTCHAS |
| 2026-04-27 | TikTok handle introuvable indiscernable de vide | SKILL.md + GOTCHAS |
| 2026-04-27 | Blocklist mémoire non câblée dans github.js | SKILL.md + GOTCHAS (config.json) |

## AVANT (SKILL.md)
```
### Handles incertains
```

## APRÈS (SKILL.md, ajout)
```
### GitHub rate-limit anonyme
[token GitHub ou cache 1h]

### Blocklist GitHub
[github.blocklist dans config.json]

### TikTok handle introuvable vs compte vide
[logger HTTP status]

### Handles incertains
```
