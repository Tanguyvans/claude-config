# PENDING-REVIEW — logo-fetcher

## Changements appliqués

- **Logo générique → fallback TLD** : Ajout d'une directive pour essayer les variantes de domaine via `/search` quand le logo est peu représentatif.
- **theme=dark invisible** : Warning dans étape 4 (vérification) — checker `file_size > 1KB` plutôt que la preview visuelle.
- **Fond opaque incompatible** : Warning dans étape 4 — prévenir l'utilisateur, proposer 3 options (carte thème, refetch dark/light, alternative `/search`).
- **Checklist enrichie** : 3 nouveaux items correspondant aux 3 points ci-dessus.

## Feedback intégré

| Date | Type | Contenu | Action |
|------|------|---------|--------|
| 2026-04-21 | amélioration | Logo fond opaque incompatible avec thème | Étape 4 + checklist |
| 2026-04-21 | amélioration | Logo générique → essayer variantes TLD | Étape 2 + checklist |
| 2026-04-22 | amélioration | theme=dark invisible dans viewer PNG | Étape 4 + checklist |
| 2026-04-22 | positif | Téléchargement parallèle rapide | Déjà documenté |
| 2026-04-23 | positif | Parallèle 512px first-try | Confirmé |

## AVANT (checklist)

```
- [ ] Téléchargement en parallèle (`&` + `wait`) utilisé quand plusieurs logos
- [ ] Taille adaptée au contexte : `256` pour slides, `128` pour inline, `512` pour grand format
- [ ] Vérification avec `file logos/*.png` — chaque fichier est "PNG image data"
- [ ] Convention de nommage respectée : `{entreprise}_logo.png` (minuscules, underscores)
- [ ] Confirmation affichée avec `ls -lh logos/`
```

## APRÈS (checklist)

```
- [ ] Téléchargement en parallèle (`&` + `wait`) utilisé quand plusieurs logos
- [ ] Taille adaptée au contexte : `256` pour slides, `128` pour inline, `512` pour grand format
- [ ] Vérification avec `file logos/*.png` — chaque fichier est "PNG image data"
- [ ] Si `theme=dark` : vérifier `file_size > 1KB` plutôt que la preview (logo blanc invisible sur fond blanc)
- [ ] Si logo générique ou peu représentatif : essayer variantes de domaine via `/search`
- [ ] Si fond opaque incompatible avec le thème : prévenir l'utilisateur et proposer 3 options
- [ ] Convention de nommage respectée : `{entreprise}_logo.png` (minuscules, underscores)
- [ ] Confirmation affichée avec `ls -lh logos/`
```
