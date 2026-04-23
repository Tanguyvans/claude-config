# PENDING-REVIEW — fal-generate

## Changements appliqués

- **Règle dure : labels textuels** — Prévenir l'utilisateur que le rendu texte est non fiable. Alternatives : image sans texte + overlay CSS, SketchImage placeholder, flux-kontext.
- **Règle dure : fond transparent** — La plupart des modèles renvoient fond blanc même avec "transparent background". Solution : `mixBlendMode: multiply` en CSS/Remotion ou flux-kontext + rembg.

## Feedback intégré

| Date | Type | Contenu | Action |
|------|------|---------|--------|
| 2026-04-22 | amélioration | Fond blanc non-transparent → mixBlendMode | Règle dure ajoutée |
| 2026-04-23 | amélioration | Labels textuels dans image = non fiable | Règle dure ajoutée |
| 2026-04-22 | positif | Cohérence stylistique entre sprites via prompt répété | Conservé |
| 2026-04-23 | positif | (déjà dans les règles existantes) | — |

## AVANT (Règles dures)

```markdown
## Règles dures

- **Si un fichier `theme.ts` existe dans le projet**, lire sa palette avant de rédiger le prompt
- **FAL_KEY doit être rechargée explicitement** ...
- **`--add-fal-key` sans argument** ne fait rien d'utile ...
```

## APRÈS (Règles dures)

```markdown
## Règles dures

- **Si un fichier `theme.ts` existe dans le projet**, lire sa palette avant de rédiger le prompt
- **FAL_KEY doit être rechargée explicitement** ...
- **`--add-fal-key` sans argument** ne fait rien d'utile ...
- **Labels textuels dans l'image** → rendu non fiable. Prévenir l'utilisateur. Alternatives : (a) image sans texte + overlay CSS, (b) SketchImage placeholder, (c) flux-kontext
- **Fond transparent** : fond blanc solide par défaut. Solution : `mixBlendMode: multiply` ou flux-kontext + rembg
```
