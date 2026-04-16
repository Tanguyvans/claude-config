
---
# Archived 2026-04-16

## 2026-04-12

- [amelioration] Le skill est verrouille sur un seul theme visuel (Anthropic clean #FAFAF8, Inter, ombres douces). Ajouter un systeme de themes interchangeables (themes/anthropic.ts, themes/brutalist.ts, themes/cave.ts, themes/terminal.ts) selectionnables au moment de l'invocation. Les templates de slide existants (TitleSlide, BulletListSlide, FeatureCardsSlide, HubDiagramSlide, TransitionSlide) consomment le theme via import — swap = un seul fichier a changer.
- [amelioration] Au demarrage, le skill devrait demander "quel theme ?" ou proposer un theme adapte au sujet (ex : sujet "caveman" → theme cave/stone par defaut). Aujourd'hui il default a Anthropic meme quand le sujet jure visuellement avec ce style.
- [positif] L'organisation templates/ avec une slide par fichier + un theme.ts central est propre et facilite justement l'ajout d'un systeme de themes. La refacto serait minimale.
