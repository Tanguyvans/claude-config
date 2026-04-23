# Gotchas

Erreurs récurrentes à vérifier AVANT de livrer.

## Ouverture dans le navigateur

- [ ] **Jamais `file://`** — Babel standalone ne peut pas fetch les `.jsx` externes (CORS → page blanche). Toujours `python3 -m http.server` + `http://localhost:8000`
- [ ] Proposer activement de lancer le serveur : "Tu veux que je lance `python3 -m http.server` pour toi ?"

## Fact-checking (news / versus)

- [ ] Vérifier chaque chiffre/benchmark via WebSearch ou WebFetch avant d'écrire les slides
- [ ] Pour un versus, croiser au moins 2 sources indépendantes
- [ ] Ne jamais écrire un chiffre de mémoire (context windows, scores MMLU, etc.)

## Versus — model-level vs tooling-level

- [ ] Claims strictement model-level : modalités, contexte, benchmarks, tokenizer, effort levels, instruction-following
- [ ] Les features tooling (SDK, plateforme, cron jobs, Code, Memory...) → éviter ou étiqueter explicitement "côté plateforme"

## Design

- [ ] Kickers orange à **64px Caveat 700** — jamais plus petits
- [ ] CTA avec cartes colorées + emoji géant + rotation, pas 3 SketchBox simples sans couleur
- [ ] Au moins un `<SketchImage>` placeholder par slide visuelle (à remplacer avant publication)

## News releases produit

- [ ] Pour une news sur un produit spécifique : logos de marque en inline SVG sur cover + slide features
- [ ] Mockup stylisé de l'UI du produit plutôt qu'un `<SketchImage>` vide sur la slide démo
