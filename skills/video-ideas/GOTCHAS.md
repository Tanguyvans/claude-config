# Gotchas

Erreurs récurrentes à vérifier AVANT de générer la liste d'idées.

## Sujets déjà couverts

- [ ] Lire `~/Desktop/ai-claude/video-courte/index-videos.md` AVANT de scraper — auto-filtrer les sujets déjà traités et les flagger dans la liste
- [ ] Après validation d'un angle : proposer d'ajouter une entrée dans `index-videos.md`

## Fraîcheur des sources

- [ ] Posts Twitter > 90 jours → demoter fortement, même avec gros engagement. Ne pas les remonter en top comme si c'était "frais"
- [ ] Repos GitHub : afficher l'âge (`created_at`) en plus des stars quand disponible ("créé il y a N semaines")

## Sujet narrow

- [ ] Si la demande mentionne un produit/feature précis → recherche ciblée (WebSearch/WebFetch), PAS un scrape tous azimuts. Le scrape retourne du générique ; la recherche ciblée donne de la pertinence.

## Crédits ScrapeCreators

- [ ] Si 402 en stderr → crédits épuisés. Basculer sur `--only=github` et le signaler à l'utilisateur
- [ ] Par défaut : `--only=twitter,github` (meilleur ratio signal/crédits)

## Process

- [ ] Lire GOTCHAS.md avant de lancer le scraper
- [ ] Proposer les suites après la liste (script, config, index)
