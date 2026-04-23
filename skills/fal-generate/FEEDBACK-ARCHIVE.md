
---
# Archived 2026-04-16

## 2026-04-12

- [bug] FAL_KEY perdue entre sessions — sauvegardée dans .env mais pas rechargée automatiquement
- [amelioration] Quand on génère pour un projet Remotion, le prompt devrait s'inspirer du theme.ts existant (palette pastel, flat) — l'utilisateur a dû faire 4 itérations pour matcher le style

## 2026-04-12 (pretext)

- [bug] La commande --add-fal-key sans argument ne donne aucune instruction claire. L'utilisateur a dû essayer 4 fois avant de trouver la bonne syntaxe.
- [positif] Les images générées matchaient bien le design system demandé (fond beige, blocs bleu/corail, rulers). Résultat utilisable directement.
<!-- Feedback collecté par /refine-skills. Intégré périodiquement dans SKILL.md et GOTCHAS.md. -->
## 2026-04-12

- [bug] FAL_KEY perdue entre sessions — sauvegardée dans .env mais pas rechargée automatiquement
- [amelioration] Quand on génère pour un projet Remotion, le prompt devrait s'inspirer du theme.ts existant (palette pastel, flat) — l'utilisateur a dû faire 4 itérations pour matcher le style

## 2026-04-12 (pretext)

- [bug] La commande --add-fal-key sans argument ne donne aucune instruction claire. L'utilisateur a dû essayer 4 fois avant de trouver la bonne syntaxe.
- [positif] Les images générées matchaient bien le design system demandé (fond beige, blocs bleu/corail, rulers). Résultat utilisable directement.

## 2026-04-22

- [positif] Cohérence stylistique entre 3 sprites générés en séquence (boxer_winner, boxer_ko, wallet_crying) grâce à un pattern de prompt répété : "pixel art sprite, 16-bit retro game style, chunky square pixels, white background, centered character, classic street fighter / video game style". Les 3 sprites matchent visuellement et passent pour la même direction artistique.
- [amelioration] Les sprites générés ont un fond blanc solide (pas transparent) même avec "transparent background" dans le prompt. Pour intégration sur fond coloré, il faut appliquer `mixBlendMode: multiply` en CSS côté consommateur. Ajouter une tip dans la doc : "fond blanc par défaut → utiliser `mixBlendMode:multiply` côté Remotion/CSS, ou basculer sur un modèle avec détourage explicite (flux-kontext + rembg) si besoin de vraie transparence".

## 2026-04-23

- [amelioration] Demander des labels textuels dans une image générée (ex: "robot labeled 'GPT 5.5'" / "Opus 4.7") est quasiment toujours raté — nano-banana-pro et autres modèles rendent le texte de manière imprévisible (mots tronqués, caractères inventés). Ajouter un warning dans le SKILL : "pour tout label / logo / texte dans l'image, prévenir l'utilisateur que le rendu est non fiable. Préférer : (a) image sans texte + overlay CSS côté consommateur, (b) utiliser un SketchImage placeholder dans le carrousel, ou (c) utiliser flux-kontext qui est meilleur pour le texte."
