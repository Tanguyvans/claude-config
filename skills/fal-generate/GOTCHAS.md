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
- [ ] Pour un AR spécifique (16:9, 9:16, 21:9...), utiliser `--aspect-ratio` ou curl direct (pas `--size`)
- [ ] Avec gpt-image-2 : éviter les noms d'IP/franchises/cartoons connus (filtrage agressif → `downstream_service_error`)
- [ ] Pour des sprites en série : copier le même préfixe de style mot pour mot dans chaque prompt
- [ ] Si script piping `search-models.sh | jq ...` → rediriger info messages : `search-models.sh 2>/dev/null | jq ...`
