# Gotchas

Erreurs récurrentes à vérifier AVANT de générer un personnage pixel.

## Quand utiliser / ne pas utiliser

- [ ] Le script désigne explicitement une figure humaine ("toi", "tu", "un dev") au moment de la slide ?
- [ ] Personnage avec posture/émotion (KO, victoire, pleurs) → BASCULER sur `fal-generate` sprite, PAS PixelChar
- [ ] Slide déjà dense en UI mockups → ne pas ajouter de perso décoratif
- [ ] Format tutoriel pur (terminal, doc API) → personnage probablement non justifié

## pixelSize calibré

- [ ] 16:9 1920×1080 → `pixelSize: 6` (~130-150px)
- [ ] 1:1 1080×1080 → `pixelSize: 10-12` (~250-300px)
- [ ] 9:16 gros plan → `pixelSize: 14` (~350-400px)
- [ ] Vérifié via still avant de livrer (perso pas écrasé dans le canvas)

## Variantes

- [ ] Pour micro-variation (bouche triste, yeux fermés) : copier la pose la plus proche, documenter les pixels modifiés en commentaire, PAS recréer un perso
- [ ] Tête/silhouette préservée entre variantes — seule l'expression change

## Process

- [ ] Lu `references/index.md` pour identifier le bon personnage
- [ ] Disambiguation : "agent claude" / "mascotte" → CLAUDE_MASCOT (cube orange) ; "robot/bot/IA" seul → ROBOT_AGENT
- [ ] Grille rectangulaire (toutes lignes = même nb de colonnes)
- [ ] Aperçu SVG généré avec couleurs résolues en hex (pas d'alias TS)
