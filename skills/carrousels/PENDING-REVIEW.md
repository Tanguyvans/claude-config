# PENDING-REVIEW — carrousels

## Changements appliqués

- **Bug corrigé** : Étape 4 du workflow — suppression de "ou ouvrir via `file://`" (CORS → page blanche). `python3 -m http.server` est **obligatoire**. Ajout de la proposition active de lancer le serveur.
- **Ajout étape 2.5** : Fact-check obligatoire avant génération pour les carrousels news/versus (WebSearch/WebFetch, 2 sources min pour benchmarks).
- **Section versus enrichie** : Warning model-level vs tooling-level + variante fusion 7→5 slides (pattern `C1_ForcesLimites`).
- **News releases** : Directive logos de marque inline SVG + mockup UI produit plutôt que `<SketchImage>` vide.
- **Export PNG/PDF** : Nouvelle section avec instructions Playwright (`export.mjs`) et mode `?print=1`.
- **CTA** : Pattern punchy validé documenté (cartes colorées + emoji géant + rotation + signature).
- **GOTCHAS.md créé** : Fichier de règles dures tiré du feedback.

## Feedback intégré

| Date | Type | Contenu | Action |
|------|------|---------|--------|
| 2026-04-22 | bug | `file://` → page blanche (CORS) | Règle dure + GOTCHAS |
| 2026-04-22 | manque | Export PDF | Nouvelle section |
| 2026-04-22 | manque | Logos marque pour news produit | Directive dans variantes |
| 2026-04-22 | amélioration | Proposer de lancer le serveur | Ajouté étape 4 |
| 2026-04-22 | positif | Pattern primitives (SketchBox, etc.) | Conservé |
| 2026-04-23 | amélioration | Versus model-level vs tooling-level | Règle + GOTCHAS |
| 2026-04-23 | amélioration | Fact-checking avant Write | Étape 2.5 |
| 2026-04-23 | manque | Export PNG Playwright | Nouvelle section |
| 2026-04-23 | amélioration | CTA plus punchy | Mis à jour slide 7 |
| 2026-04-23 | positif | Pattern fusion 7→5 slides | Documenté dans versus |

## AVANT (étape 4)

```
4. **Dire à l'utilisateur** comment ouvrir : `python3 -m http.server` dans le dossier puis naviguer, ou ouvrir directement `Carrousels.html` dans un navigateur moderne.

Ne jamais prendre de screenshot ni lancer un serveur — laisse l'utilisateur prévisualiser lui-même.
```

## APRÈS (étape 4)

```
4. **Dire à l'utilisateur** comment ouvrir : `python3 -m http.server` dans le dossier puis naviguer vers `http://localhost:8000`. **Ne jamais suggérer d'ouvrir via `file://`** — Babel standalone ne peut pas fetch les `.jsx` externes (CORS → page blanche). Proposer activement : "Tu veux que je lance `python3 -m http.server` pour toi ?"

Ne jamais prendre de screenshot. Ne lancer le serveur que si l'utilisateur le demande explicitement.
```
