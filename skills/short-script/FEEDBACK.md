## 2026-03-30

- [amelioration] Le script initial était trop technique (DOM, getBoundingClientRect, prepare(), layout()) — l'utilisateur a dû corriger 4 fois. Adapter le niveau technique au public cible (audience tech généraliste, pas des devs frontend seniors). Éviter le jargon navigateur sauf si le sujet l'exige explicitement.
- [amelioration] Le skill n'a pas cherché de contexte supplémentaire (tweet viral, démos, réactions) avant de scripter. Systématiquement faire une recherche web/X quand le sujet est un repo GitHub, pour trouver l'angle le plus accrocheur.
- [amelioration] Tendance à mentionner le développeur et les détails d'implémentation ("ingénieur Midjourney", "codé avec Claude et Codex") qui ne servent pas le script. Se concentrer sur ce que ça change pour le spectateur, pas sur qui l'a fait.
- [amelioration] Les chiffres bruts sans contexte ("500 textes", "0.09ms") ne parlent pas au spectateur. Préférer des formulations relatives ("quasi instantané", "sans que ça rame").
- [amelioration] Le hook n'était pas assez percutant — trop descriptif, pas assez accrocheur. Travailler davantage l'angle émotionnel ou la curiosité dès la première phrase.
- [amelioration] Le CTA proposé ("Lien en commentaire. Abonne-toi.") ne correspondait pas au style du créateur. Utiliser par défaut "Voilà l'URL et à demain." qui est son format habituel — consulter les scripts existants dans Obsidian avant de proposer un CTA.
- [positif] Le format du script (marqueurs, séparations, structure) était correct dès le premier jet — conforme au template.
- [positif] Bonne réactivité aux corrections — chaque itération intégrait bien le feedback sans régresser sur le reste.

## 2026-04-08

- [positif] Bonne structure de base, le script généré était utilisable dès la première version
- [amelioration] Le script contenait des tirets longs (—) alors que l'utilisateur ne les veut pas — le skill devrait préciser "pas de tirets longs" dans ses contraintes
- [positif] Le hook "Imagine créer un modèle tellement puissant..." validé par l'utilisateur avec une suggestion mineure

## 2026-04-12

- [amelioration] Tirets longs (—) à nouveau utilisés alors que le feedback du 2026-04-08 le mentionnait déjà. La contrainte "pas de tirets longs" doit être ajoutée explicitement dans le SKILL.md, pas juste dans FEEDBACK.md.
- [amelioration] CTA "Lien en commentaire. Abonne-toi." utilisé alors que le feedback du 2026-03-30 disait que le CTA habituel du créateur est "Voilà l'URL et à demain." Le skill ne lit pas son propre FEEDBACK.md avant de générer.
- [amelioration] Affirmations non vérifiées dans le premier jet ("organisé autour de 3 concepts") — le skill a repris sans broncher le résumé WebFetch initial sans valider la structure réelle du repo. Pour les sujets type "présentation de repo", vérifier au moins la structure du README avant de scripter.
- [amelioration] Répétitions de "Le repo" / "Il" / "aussi" dans le corps du script. Ajouter une passe de relecture anti-répétition avant de livrer.
- [amelioration] Hooks descriptifs au lieu de créer une tension — tendance à pondre des hooks plats type "Ce repo te montre…" au lieu de jouer sur le manque, l'erreur, la promesse forte. Renforcer la consigne hook dans SKILL.md avec un check explicite : "le hook crée-t-il une tension émotionnelle ?"
- [positif] Bonne réactivité aux critiques sur le ton — corrections de "le mec" → formulation neutre acceptées sans débat.
- [positif] Vérification web quand l'utilisateur a challengé une affirmation — bon réflexe d'aller refetch le repo pour confirmer (concepts A.C.S et présence de Boris).
- [manque] Pas de détection des formulations récurrentes entre vidéos — l'utilisateur a dû signaler "je dis souvent ça" pour "Le truc c'est que ton IA oublie tout". Le skill devrait consulter les scripts précédents pour éviter les répétitions inter-vidéos.
- [amelioration] "verbatim" utilisé tel quel dans le script — remplacer systématiquement le jargon technique par des termes accessibles ("mot pour mot").
- [amelioration] "Score parfait sur les benchmarks" sans nommer lequel — toujours nommer le benchmark quand on cite un score.

## 2026-04-12 (pretext)

- [amelioration] Éviter les deux-points (:) et les tirets longs (—) dans le script par défaut. L'utilisateur a dû les retirer manuellement à chaque itération.
- [amelioration] Le hook initial était trop générique ("ça détruit tes performances"). Proposer d'emblée un hook explicatif/éducatif plutôt que sensationnaliste quand le sujet s'y prête.
- [amelioration] Vérifier les affirmations techniques automatiquement. "Sans toucher au DOM" était imprécis (Pretext utilise le canvas du navigateur). Le script devrait fact-checker le README avant de vulgariser.
- [amelioration] Quand le sujet est un repo GitHub, adapter le niveau technique à l'audience TikTok. Le premier draft contenait getBoundingClientRect, CJK, soft hyphens — trop technique pour un short.
- [positif] Le processus itératif (proposer plusieurs options de hook, de formulations) a bien fonctionné. L'utilisateur a pu choisir rapidement.

## 2026-04-12 (caveman)

- [amelioration] Tirets longs (—) encore presents dans le premier jet (3e fois). La contrainte n'est toujours pas dans SKILL.md. A ajouter en regle dure dans la section style.
- [amelioration] CTA "Lien en commentaire. Abonne-toi." utilise encore une fois alors que les feedbacks 2026-03-30 et 2026-04-12 disent que le createur prefere "Voila l'URL et a demain." Le skill ne lit pas son propre FEEDBACK.md avant de generer.
- [amelioration] Hook initial trop generique ("Ton agent IA te coute 5 fois trop cher"). L'utilisateur a du dire "pas dingue" puis rappeler son style prefere (explicatif/pedagogique). Le skill devrait varier les angles et proposer 3-4 hooks d'office avant validation.
- [amelioration] Enumeration "lite, full ou ultra" — petite liste acceptee par l'utilisateur cette fois mais le SKILL.md la deconseille. Reformuler par defaut en "plusieurs niveaux" et laisser l'utilisateur decider d'enumerer.
- [positif] Format markdown (marqueurs, separateurs) respecte au pixel.
- [positif] Bonne integration des indications visuelles *(screen : ...)* dans le corps du script.

## 2026-04-12 (ultraplan)

- [amelioration] Tirets longs (—) encore presents dans le premier jet (5e fois signalee). Cette contrainte n'est toujours pas dans SKILL.md — a ajouter comme regle dure bloquante.
- [amelioration] Questions rhetoriques type "Tu l'utilises quand ?" proposees dans le corps alors qu'elles cassent le flow a l'oral. Ajouter regle : pas de questions rhetoriques dans le corps, uniquement dans le hook.
- [amelioration] Le skill a repris sans verifier l'affirmation "en terminal, chaque iteration relance tout depuis zero" de l'article source. L'utilisateur a du corriger "c'est pas un argument". Fact-check les claims techniques des sources avant de les scripter.
- [amelioration] Angle initial mal calibre : le skill a mis en avant le workflow de review browser (angle de l'article) alors que l'utilisateur voulait d'abord positionner /ultraplan comme "version boostee du plan mode". Demander l'angle principal avant d'ecrire quand plusieurs sont possibles.
- [amelioration] Le disclaimer cout/tokens n'est pas apparu spontanement alors qu'il etait implicite dans le sujet (produit premium). Proposer par defaut un disclaimer quand le sujet touche a un produit payant/cher.
- [positif] Bonne reactivite aux iterations, format markdown respecte, bon equilibre hook/corps/CTA en structure.
