# Gotchas

Erreurs récurrentes à vérifier AVANT de générer.

## Clé API

- [ ] `FAL_KEY` est bien chargée dans l'environnement courant (pas seulement dans .env)
- [ ] Si absente : `source ~/.claude/skills/fal-generate/.env` ou `export FAL_KEY=...`
- [ ] Ne jamais dire à l'utilisateur de lancer `--add-fal-key` sans argument — ça ne fait rien

## Prompt

- [ ] Si un `theme.ts` existe dans le projet courant : lire sa palette avant de rédiger le prompt
- [ ] Le prompt reflète le style visuel du projet (fond, couleurs dominantes, style illustration)
- [ ] Ne pas laisser le modèle choisir librement le style si un design system existe

## Process

- [ ] Utiliser le mode queue par défaut (pas --sync pour les vidéos)
- [ ] Pour les vidéos longues, proposer `--async` + instructions de suivi
