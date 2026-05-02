# Gotchas — video-ideas

Erreurs récurrentes à vérifier AVANT de livrer la liste.

## Cadrage avant scrape

- [ ] Lu `~/Desktop/ai-claude/video-courte/index-videos.md` et `scripts/*.md` AVANT de scraper
- [ ] Sujets déjà couverts identifiés et flaggés en tête de la liste : `Déjà couverts : ...`
- [ ] Si la demande est narrow (produit/feature précis) → **pivoter vers recherche ciblée**, ne pas scraper tout azimut

## Tri et fraîcheur

- [ ] Posts récents (< 30j) en haut, même si engagement plus faible
- [ ] Tweets > 90j → demoter fortement (jamais en top même avec gros likes)
- [ ] Pas de `created_at` exploitable → demoter par défaut
- [ ] Afficher l'âge ("créé il y a 2 semaines") en plus des metrics

## Synthèse

- [ ] Reformulation en angle vidéo (pas un résumé)
- [ ] Groupement par thème si plusieurs posts parlent du même sujet
- [ ] Max 15 angles
- [ ] Angles en français même si posts en anglais
- [ ] Tags GitHub `topics` inclus

## Suite

- [ ] Proposé de transformer un angle en script via `/short-script`
- [ ] Proposé d'ajouter une entrée dans `index-videos.md` quand un sujet est choisi (évite le doublon prochaine fois)

## Shape JSON scrapper

- [ ] `data.platforms.twitter.posts` (PAS `data.twitter[]`)
- [ ] `data.platforms.github.repos` (PAS `.posts` ni `.count` — github expose `repos`)
- [ ] Lire `data.platforms.<plateforme>.posts` pour x/tiktok/instagram

## Fallback fenêtre GitHub

- [ ] Si l'user vérifie une claim "repo à X stars" et le scrape (fenêtre 30j) ne le trouve pas → `gh search repos` ou `gh api repos/owner/name` pour confirmer
- [ ] Ne pas conclure "ce repo n'existe pas" juste parce que le scrape n'a rien remonté

## Debug

- [ ] Si zéro idée : vérifier seuils d'engagement, handles 404, crédits ScrapeCreators
- [ ] Crédits épuisés → fallback `--only=github` (gratuit)
