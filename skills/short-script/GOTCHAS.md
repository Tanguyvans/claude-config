# Gotchas

Erreurs recurrentes a verifier AVANT de livrer. Lire cette liste a chaque execution du skill.

## Style et ponctuation
- [ ] JAMAIS de tirets longs (--) dans le script. Reformuler avec des virgules ou des points (signale 5 fois)
- [ ] JAMAIS de deux-points (:) dans le corps du script. Reformuler en phrase complete
- [ ] Pas de questions rhetoriques dans le corps du script, uniquement dans le hook
- [ ] Pas de jargon technique (DOM, getBoundingClientRect, CJK...) sauf public explicitement dev
- [ ] **"un skill / le skill" au masculin** partout (signale 2 fois : 2026-04-17, 2026-04-20). JAMAIS "une skill" / "la skill"
- [ ] Pas de marqueurs genres / familiers ("un mec", "un gars") → preferer "un dev", "quelqu'un", "une personne"
- [ ] Pas de fillers marketing creux ("Le plus fou,", "Petit detail,", "le truc fou", "cerise sur le gateau"). Entrer directement dans le fait
- [ ] Pas de cliches "fire and forget" / "tu pars boire un cafe" → preferer du neutre concret ("tu lances en arriere-plan")

## Phrases du corps
- [ ] **Les 2 dernieres phrases du corps font 12+ mots chacune** (signale 2 fois : 2026-04-19, 2026-04-21). Pas de phrases telegraphiques de 5-6 mots en fin de corps
- [ ] La derniere phrase du corps est une phrase complete avec sujet+verbe (PAS un fragment descriptif type "Open source, 18k stars en quelques semaines")
- [ ] Pas de repetition mot-cle entre les 10 derniers mots du hook et les 10 premiers mots du corps (nom de commande, nom de produit). Si oui, reformuler pour n'en garder qu'un
- [ ] Formulations concretes ("tu vois combien tu crames dans X") preferees aux formulations abstraites ("quel pourcentage de X vient de Y")
- [ ] Nommer la chose par son type exact (commande, flag, raccourci, skill, repo) plutot que "outil" generique

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
- [ ] Chiffres bruts sans contexte interdits ("500 textes", "0.09ms"). Utiliser des formulations relatives ("quasi instantane")
- [ ] **Chaque chiffre cite est suivi de son impact concret** pour le viewer (cout, halluciantions, gain de temps), pas juste de la comparaison brute
- [ ] **Chiffres comparatifs en hook** (ratios "Nx moins cher", "X fois plus rapide") : verifier contre la source primaire (site officiel, doc API, page pricing) AVANT de proposer. Pas de Medium / blog post / resume LLM
- [ ] Pour tout fait extraordinaire : preciser la source ET le statut de verification dans le brief interne ("c'est la declaration officielle du README, pas verifie independamment")
- [ ] Ne pas mentionner le developpeur ou les details d'implementation sauf si pertinent pour le spectateur
- [ ] Adapter le niveau technique au public TikTok generaliste, pas a des devs seniors

## Cadrage avant ecriture
- [ ] **Position de l'utilisateur par rapport au sujet** verifiee avant de proposer un hook first-person : createur, utilisateur, observateur ? Eviter "j'ai ecrit X" si l'user n'est pas l'auteur
- [ ] Si le sujet reprend une video / article source : demander si l'user veut **citer la source, paraphraser a sa sauce, ou ignorer** AVANT d'ecrire (eviter le plagiat involontaire d'une phrase trop proche)
- [ ] Si screenshot / visuel dicte le contenu : demander "tu veux la version litterale du screenshot, ou une version generique qui parle a plus de monde ?" avant d'ecrire
- [ ] Listicle (N tips/conseils/etapes) : autoriser enumeration `Un. / Deux. / ...` et relaxer la limite 60-100 mots du corps

## Process
- [ ] Lire GOTCHAS.md et FEEDBACK.md avant de generer
- [ ] Faire une recherche web/X quand le sujet est un repo GitHub pour trouver l'angle accrocheur
- [ ] Demander l'angle principal quand plusieurs angles sont possibles
- [ ] Passe anti-repetition avant de livrer (mots et structures repetes)
- [ ] **Auto-critique honnete avant livraison** (flow logique, phrases bancales, anglicismes inutiles) — ne pas attendre que l'user demande "tu en penses quoi"
- [ ] Auto-critique par option (note courte + pick justifie) quand l'user demande un avis comparatif sur les hooks
- [ ] Consulter les scripts precedents (Obsidian) pour eviter les repetitions inter-videos
- [ ] **Sur correction "trop d'anglicismes"** : proposer d'abord la v2 minimale ciblee (les 1-2 mots reellement plaints), pas une refonte complete du glossaire dev (PR, YAML, worktree, run restent OK)

## Validation et iteration
- [ ] **"Je prefere mon X" = "garde X et tout le reste de la version actuelle"**, PAS "applique tes autres modifs en plus". Ne jamais cumuler des critiques non explicitement validees
- [ ] Quand tu proposes une critique multi-elements, expliciter au moment de la livraison que chaque element est validable separement
- [ ] A la validation partielle, demander "tu valides aussi mes propositions sur Y et Z, ou on garde la version actuelle ?"
- [ ] Quand l'user colle "on etait sur un truc comme ca [version]", prendre cette version comme **baseline exacte verbatim** et ne rien changer hors du perimetre demande
- [ ] Si l'user dit "vas-y" / "utilise /skill" sans valider un hook, prendre le pick recommande ET le flagger en tete : "Je pars sur X parce que..." (pas l'enterrer dans le script)
- [ ] Quand l'user dicte verbatim une fin < 12 mots : flagger le conflit avec la regle 12+ mots ET proposer une v2 alternative gardant le sens, laisser le choix final
- [ ] Quand l'user dicte un CTA brut avec fautes : c'est du contenu verbatim a integrer (juste corriger l'orthographe), pas un brief a paraphraser
- [ ] Si dictee de 2+ phrases sans marker `[HOOK]`/`[CORPS]`, demander "c'est 1 phrase en hook + Y en corps ?" avant de livrer
- [ ] "Pas clair X" → proposer 2-3 reformulations avec angles differents (technique / abstrait / impact chiffre), pas une seule

## CTA contextuel
- [ ] CTA "Voila l'URL et a demain." par defaut **uniquement quand il y a une URL externe** (repo, outil, demo)
- [ ] Sujets sans URL externe (tuto feature native, news, opinion) → CTA d'engagement (like / abonne) ou pas de CTA. Demander si ambigu

## Atomicite des regles citees
- [ ] **1 phrase parlee = 1 regle atomique** du fichier source. Ne JAMAIS fusionner 2 regles distinctes en une seule phrase ("si tu ecris 200 lignes en 50 si un dev senior trouverait ca overcomplicated") — illisible a l'oral
- [ ] Quand le source addresse Claude en 2e personne ("you must X") : traduire au pattern "le fichier oblige Claude a X. A Y. A Z." plutot que tutoyer directement (ambiguite viewer/Claude)

## Contraintes negatives en amont
- [ ] Avant de proposer les hooks, demander **"des contraintes type 'pas mentionner X' ?"** (ex: "ne pas mentionner le post viral", marques a eviter). Sinon re-roll force apres coup

## Confirmation de pick
- [ ] Quand l'user dit "option C dans le style", confirmer brievement "OK je pars sur C tel que propose" avant d'ecrire — leve l'ambiguite "garde C verbatim" vs "garde le ton de C mais reformule"

## Reformulation "trop technique"
- [ ] 1ere passe quand l'user signale "trop technique" : sabrer aussi les **concepts** (rate limit, req/min, base URL), pas juste les acronymes (API key → cle). Retablir si l'user veut + de precision
- [ ] Quand l'user pousse vers une formulation honest, proposer 2-3 reformulations en 1 message (cap technique precis / formulation marketing-honest / verbatim user adapte), pas iterer 1-by-1

## Verifs de coherence interne (avant livraison)
- [ ] **Ne JAMAIS inventer un chiffre absent d'une source verifiee.** Si la source est qualitative ("fleet of agents"), rester qualitatif ("une equipe", "plusieurs", "toute une flotte"). Pas de "5 lead devs" fabrique pour rendre concret
- [ ] **Simuler mentalement la sequence d'actions** : si A depend de B, B doit venir avant A dans le corps (ex: "tu fermes le terminal pendant que ca mouline" doit venir APRES "tu lances sur ta branche")
- [ ] **Coherence hook ↔ corps** : aucun chiffre du hook ne doit etre contredit/nuance par le corps (hook "20 dollars" + corps "5 a 20 dollars selon la taille" = incoherence a fixer)

## Post-tournage (optionnel)
- [ ] Si l'user a deja tourne la video : proposer de re-transcrire le MP4 avec whisper, nettoyer les coquilles, reformater HOOK/CORPS/CTA
