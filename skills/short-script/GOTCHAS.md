# Gotchas

Erreurs recurrentes a verifier AVANT de livrer. Lire cette liste a chaque execution du skill.

## Style et ponctuation
- [ ] JAMAIS de tirets longs (--) dans le script. Reformuler avec des virgules ou des points (signale 5 fois)
- [ ] JAMAIS de deux-points (:) dans le corps du script. Reformuler en phrase complete
- [ ] Pas de questions rhetoriques dans le corps du script, uniquement dans le hook
- [ ] Pas de jargon technique (DOM, getBoundingClientRect, CJK...) sauf public explicitement dev
- [ ] **"skill" est masculin** : "un skill", "le skill", "ce skill" — JAMAIS "une skill" ni "la skill" (signale 2 fois)
- [ ] **Pas de fillers marketing** : "Le plus fou,", "Petit détail,", "cerise sur le gâteau" → entrer directement dans le fait
- [ ] **Pas de marqueurs genrés/familiers** : "un mec", "un gars" → "un dev", "quelqu'un", "une personne"
- [ ] **Pas de phrases-fragments en fin de corps** ("Open source, 18k stars."). La dernière phrase du corps = phrase complète avec sujet + verbe
- [ ] **Les 2 dernières phrases du corps : 12+ mots chacune** pour qu'elles respirent à l'oral (signale 2 fois)
- [ ] **Vérifier overlap hook/corps** : les 10 derniers mots du hook et les 10 premiers du corps ne doivent pas partager de mot-clé saillant — reformuler si c'est le cas

## Hook
- [ ] Le hook cree une tension emotionnelle (curiosite, frustration, promesse forte), pas juste une description
- [ ] Proposer 3+ options de hook avant validation, pas un seul hook directement
- [ ] Eviter les hooks generiques type "Ca detruit tes performances" ou "Ce repo te montre..."

## CTA
- [ ] CTA par defaut : "Voila l'URL et a demain." (PAS "Lien en commentaire. Abonne-toi.")
- [ ] Le CTA du createur est "Voila l'URL et a demain." Signale 3 fois dans le feedback
- [ ] Pas de conclusion "mind-blown" generique ("la prochaine fois que ton IA repond bizarre..."). Finir sur un conseil actionnable.

## Contenu et fact-checking
- [ ] Fact-checker les claims techniques contre la source reelle (README, repo, article). Ne pas reprendre un resume sans verifier
- [ ] Nommer le benchmark quand on cite un score. Pas de "score parfait sur les benchmarks" sans precision
- [ ] **Chiffres comparatifs** (ratio "Nx moins cher", "X fois plus rapide") → citer la source primaire (doc officielle, pricing) avant de les intégrer. Les sources secondaires peuvent refléter une ancienne version (signale 2 fois)
- [ ] **Claims forts** (ex: "l'auteur n'a jamais ouvert un terminal") → préciser "déclaration officielle du README, non vérifié indépendamment" AVANT que l'utilisateur le demande
- [ ] Chiffres bruts sans contexte interdits ("500 textes", "0.09ms"). Utiliser des formulations relatives ("quasi instantane")
- [ ] Chaque chiffre cité doit être suivi de son impact concret pour le viewer, pas juste la comparaison brute
- [ ] Ne pas mentionner le developpeur ou les details d'implementation sauf si pertinent pour le spectateur
- [ ] Adapter le niveau technique au public TikTok generaliste, pas a des devs seniors
- [ ] Nommer la chose par son type exact (commande, flag, raccourci, skill, repo) plutôt que "outil" générique

## Process
- [ ] Lire GOTCHAS.md et FEEDBACK.md avant de generer
- [ ] Faire une recherche web/X quand le sujet est un repo GitHub pour trouver l'angle accrocheur
- [ ] Demander l'angle principal quand plusieurs angles sont possibles
- [ ] Passe anti-repetition avant de livrer (mots et structures repetes)
- [ ] Consulter les scripts precedents (Obsidian) pour eviter les repetitions inter-videos
