# Gotchas

Erreurs récurrentes à vérifier AVANT de lancer un scrape.

## Crédits ScrapeCreators

- [ ] **Vérifier le solde avant de lancer** `x.js` / `tiktok.js` / `all.js` — en cas de 402, le script brutalise les crédits restants sans s'arrêter automatiquement
- [ ] Si 402 répété en stderr → afficher `[warn] 0 credits left, skipping {plateforme}` et basculer sur `--only=github` (gratuit)
- [ ] `x.js` (25 comptes) coûte 25 crédits, `all.js` ~35 crédits — vérifier que le budget est suffisant avant de tout lancer

## Format de sortie

- [ ] `github.js` : le champ `count` au niveau racine peut être absent. Utiliser `repos?.length` côté consommateur, pas `.count`
- [ ] `x.js` / `tiktok.js` / `instagram.js` : `{ count, posts }` au niveau racine ✓

## Fraîcheur des données

- [ ] Twitter ScrapeCreators renvoie des tweets de plusieurs années mélangés — filtrer par `posted_at` côté Claude. Tweets > 90j → demoter même avec gros engagement
- [ ] GitHub trending : les repos récents ont moins de stars absolues mais peuvent être plus pertinents — ne pas trier uniquement par stars

## Process

- [ ] Charger le `.env` avant de lancer : `set -a; source ~/.claude/skills/scrapper/.env; set +a`
- [ ] Pour un sujet narrow/spécifique, préférer une recherche ciblée (web/docs) plutôt qu'un scrape tous azimuts qui retourne 15 angles génériques
