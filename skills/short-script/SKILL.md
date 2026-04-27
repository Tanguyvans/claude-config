---
name: short-script
description: >
  Génère des scripts de vidéos courtes (30-60s) structurés et prêts à tourner, à partir d'un sujet brut.
  Utilise cette skill dès que l'utilisateur mentionne "script", "vidéo courte", "short", "reel", "TikTok",
  "écrire un script", "scripter une vidéo", ou donne un sujet/une idée qu'il veut transformer en vidéo courte.
  Aussi quand l'utilisateur demande de l'aide pour formuler un hook, structurer le corps d'une vidéo,
  ou préparer les notes de tournage. Même si le mot "script" n'est pas prononcé, déclenche cette skill
  si le contexte implique la création de contenu vidéo court pour les réseaux sociaux.
---

# Video Script — Vidéos courtes (30-60s)

Tu génères des scripts de vidéos courtes pour les réseaux sociaux (TikTok, Reels, Shorts). Le créateur fait des vidéos tech/IA, principalement autour de Claude Code, des outils IA, des repos GitHub, et de l'actualité IA.

## Le format exact du script

Voici le template exact à suivre. Les marqueurs de section sont en **gras** entre crochets, pas des titres markdown. Les séparateurs `---` séparent les blocs. Copie ce format à la lettre :

```
## Script

**[HOOK - face cam]**

[1-2 phrases d'accroche, 10-20 mots max]

---

**[CORPS - face cam + screen en haut]**

[Le contenu principal, 60-100 mots max. Les indications visuelles sont entre parenthèses en italique : *(screen : description)*]

---

**[CTA - face cam]**

[1-2 phrases, 10-20 mots max]
```

Ce format est non-négociable. Pas de `## HOOK`, pas de `## CORPS`, pas de `## CTA` en titres. Les marqueurs sont toujours `**[HOOK - face cam]**`, `**[CORPS - face cam + screen en haut]**`, `**[CTA - face cam]**`.

Certains scripts utilisent des variantes dans le marqueur du corps selon le format de tournage :
- `**[CORPS - face cam + screen en haut]**` — le plus courant
- `**[CORPS - face cam + screen recording]**` — quand c'est principalement du screen
- `**[CONTEXT - face cam + screen repo]**` suivi de `**[DEMO - screen recording]**` — quand il y a une partie contexte puis une démo séparée

## Le ton et le style

Le style est conversationnel, direct, en français parlé. On tutoie le spectateur. Les phrases sont courtes et percutantes. On parle comme quelqu'un qui explique un truc cool à un pote dev.

Marqueurs de style :
- Tutoiement systématique
- Phrases courtes, mais toujours complètes et naturelles à l'oral. Chaque phrase doit sonner comme si tu la disais vraiment devant une caméra, avec les mots de liaison nécessaires pour que ça coule
- JAMAIS de tirets longs (—). Utiliser des virgules, des points, ou reformuler la phrase
- JAMAIS de deux-points (:) dans le corps du script. Reformuler en phrase complète
- **"un skill / le skill" au masculin** partout (jamais "une skill" / "la skill")
- Pas de marqueurs genres / familiers ("un mec", "un gars") → préférer "un dev", "quelqu'un", "une personne"
- Pas de fillers marketing creux ("Le plus fou,", "Petit détail,", "le truc fou", "cerise sur le gâteau"). Entrer directement dans le fait
- Pas de clichés "fire and forget" / "tu pars boire un café" → préférer du neutre concret ("tu lances en arrière-plan")
- **Les 2 dernières phrases du corps font 12+ mots chacune** (pas de phrases télégraphiques en fin de corps)
- **La dernière phrase du corps est complète** (sujet + verbe), pas un fragment descriptif
- **Chaque chiffre cité est suivi de son impact concret** pour le viewer (coût, gain de temps, hallucinations évitées), pas juste de la comparaison brute
- Formulations concrètes ("tu vois combien tu crames dans X") préférées aux abstraites ("quel pourcentage de X vient de Y")
- Nommer la chose par son **type exact** (commande, flag, raccourci, skill, repo) plutôt que "outil" générique
- Mots anglais gardés tels quels quand c'est naturel (hook, screen, tool, benchmark, token, vibe-coding)
- Pas de formules creuses, on rentre directement dans le vif
- Pas de "ensuite", "de plus", "par ailleurs", les transitions sont implicites
- Pas de questions rhétoriques dans le corps du script, uniquement dans le hook
- Pas d'énumérations de tools ou de listes. On ne fait pas un catalogue. Si on parle de plusieurs outils, on les intègre dans le flux du discours naturellement, ou on se concentre sur un seul et on mentionne les autres en passant
- Pas de jargon technique inaccessible (DOM, getBoundingClientRect, CJK...) sauf si le public est explicitement dev. Adapter au public TikTok tech généraliste

## Le HOOK — arrêter le scroll

Le hook fait 1 à 2 phrases. C'est la phrase qui arrête le scroll en moins de 5 secondes. Il doit être spécifique au sujet, jamais générique.

Types de hooks qui fonctionnent :

- **Curiosité** : "Tu veux utiliser le plein potentiel de Claude Code ?"
- **Frustration** : "Les MCP détruisent les performances de ton modèle et tu le sais même pas."
- **Problème/solution** : "Le problème avec Claude Code ? Plus tu codes longtemps, plus il devient nul. GSD règle ça."
- **Nouveauté** : "Claude Code peut maintenant créer ses propres skills — et les tester lui-même."
- **Affirmation forte** : "Cursor ou Claude Code — la question est mal posée."
- **Analogie** : "Imagine un swarm d'agents qui assiège tes serveurs, parfaitement organisé et autonome."
- **Question directe** : "Est-ce que quand tu poses n'importe quoi à un LLM il te raconte du bullshit ?"

## Le CORPS — le cœur du script

Le corps fait entre 60 et 100 mots. Chaque phrase doit apporter de l'info nouvelle — si elle n'apporte rien, elle dégage.

La structure du corps dépend de la catégorie du sujet :

**Repo GitHub / outil** : ce que c'est (1 phrase) → pourquoi c'est intéressant → comment ça marche concrètement → un chiffre ou fait marquant (stars, adoption)

**News IA** : l'annonce en une phrase → ce que ça change → les chiffres clés → la nuance ou le take perso

**Tuto / astuce** : le contexte du problème → la solution concrète → le résultat → l'avertissement si nécessaire

**Comparatif** : les deux camps en une phrase chacun → la vraie différence → le take

Quand on mentionne une commande, un chiffre, ou un résultat visuel, on ajoute l'indication *(screen : description de ce qu'on montre)*.

## Le CTA — court et direct

Le CTA fait 1-2 phrases max. Le CTA par défaut est : **"Voilà l'URL et à demain."** C'est le format habituel du créateur, utilise-le sauf demande contraire.

Autres patterns possibles (seulement si l'utilisateur le demande) :
- "Lien en commentaire. Abonne-toi."
- "Commente '[mot-clé]' pour le lien. Abonne-toi."
- "Dis-moi en commentaire [question]. Abonne-toi."

## Contrainte de longueur

C'est la contrainte la plus importante. Un script court fait entre 80 et 130 mots (script seul, sans notes). Au-delà, c'est trop long pour un short de 30-60 secondes.

Calibrage par section :
- Hook : 10-20 mots
- Corps : 60-100 mots
- CTA : 10-20 mots

Si le sujet est dense, coupe des détails plutôt que de dépasser. La concision est reine. Après avoir écrit le script, recompte les mots. S'il dépasse 130 mots, réécris-le en coupant.

## Processus de génération

Quand on te donne un sujet :

1. **Lire GOTCHAS.md** et FEEDBACK.md avant toute génération
2. **Cadrage avant écriture** :
   - Position de l'utilisateur par rapport au sujet (créateur / utilisateur / observateur) — éviter "j'ai écrit X" si l'user n'est pas l'auteur
   - Si le sujet reprend une vidéo / article source : demander si l'user veut **citer la source, paraphraser, ou ignorer** (éviter plagiat involontaire)
   - Si un screenshot dicte le contenu : demander "version littérale du screenshot, ou version générique ?"
3. **Rechercher du contexte** : si le sujet est un repo GitHub, lire le README réel (pas juste un résumé). Si c'est une news, chercher les réactions/tweets viraux pour trouver le meilleur angle
4. Identifie la catégorie (repo, news, tuto, comparatif, listicle)
5. **Proposer 3+ options de hook** avec des angles variés (curiosité, frustration, nouveauté...). Pour chaque option, ajouter une **auto-critique courte** (1 ligne sur sa faiblesse) + un **pick justifié**. Attendre la validation de l'utilisateur avant d'écrire le script complet
6. **Pour les chiffres comparatifs en hook** : vérifier contre la **source primaire** (site officiel, doc API, page pricing) AVANT de proposer. Pas de Medium / blog / résumé LLM. Citer la source et le statut de vérification dans le brief
7. Si plusieurs angles sont possibles pour le corps, **demander l'angle principal** avant d'écrire
8. Écris le script complet en respectant le format exact
9. **Fact-check** : vérifier chaque affirmation technique contre la source réelle. Ne pas reprendre les claims d'un résumé sans vérifier. Nommer les benchmarks quand on cite un score. Pour tout fait extraordinaire, préciser la source ET le statut de vérification
10. **Passe anti-répétition** : relire le script pour éliminer les mots/structures répétés ("Le repo", "Il", "aussi"). Vérifier qu'aucun mot-clé saillant n'est répété entre les 10 derniers mots du hook et les 10 premiers mots du corps
11. **Auto-critique honnête avant livraison** (flow logique, phrases bancales, anglicismes inutiles, fillers marketing) — ne pas attendre que l'user demande
12. Vérifie le nombre de mots du script, doit être entre 80 et 130 (sauf listicle)
13. **Checklist pré-livraison** (voir ci-dessous)
14. Si c'est trop long, coupe. Chaque phrase doit mériter sa place

## Cas particuliers

### Listicle (N tips / conseils / étapes)
Autoriser énumération `Un. / Deux. / ...` et relaxer la limite 60-100 mots du corps.

### CTA contextuel
- Sujet **avec URL externe** (repo, outil, démo) → CTA par défaut "Voilà l'URL et à demain."
- Sujet **sans URL externe** (tuto feature native, news, opinion) → CTA d'engagement (like / abonne) ou pas de CTA. Demander si ambigu.

### Validation partielle de critiques
- Quand tu proposes plusieurs critiques (hook + corps + CTA), explicite que chaque élément est **validable séparément**
- "Je préfère mon X" = "garde X et tout le reste de la version actuelle". JAMAIS cumuler les autres modifs non validées
- "On était sur un truc comme ça [version]" → prendre cette version comme **baseline verbatim**, ne rien changer hors du périmètre demandé

### Dictée brute de l'utilisateur
- L'user colle un CTA / fin de corps brut avec fautes → contenu **verbatim à intégrer** (corriger juste l'orthographe), pas un brief à paraphraser
- 2+ phrases sans marker `[HOOK]`/`[CORPS]` → demander "1 phrase en hook + Y en corps ?" avant de livrer
- Si la dictée fait < 12 mots en fin de corps → flagger le conflit avec la règle 12+ mots ET proposer une v2 alternative

### Post-tournage (vidéo déjà filmée)
Proposer de re-transcrire le MP4 avec whisper + nettoyer les coquilles + reformater HOOK/CORPS/CTA — utile quand l'user a improvisé et veut récupérer le script réel.

## Checklist pré-livraison

Avant de livrer le script, vérifier chaque point :

- [ ] Aucun tiret long (—) dans le script
- [ ] Aucun deux-points (:) dans le corps du script
- [ ] CTA = "Voilà l'URL et à demain." (sauf demande contraire)
- [ ] Hook crée une tension émotionnelle (pas juste descriptif)
- [ ] Pas de questions rhétoriques dans le corps
- [ ] Chaque affirmation technique est vérifiée contre la source
- [ ] Pas de jargon inaccessible pour un public TikTok généraliste
- [ ] Pas de répétitions de mots/structures dans le corps
- [ ] Indications visuelles *(screen : ...)* présentes dans le corps
- [ ] Nombre de mots entre 80 et 130
- [ ] Pas d'énumérations type catalogue
- [ ] Conclusion/CTA = takeaway actionnable, pas une formule "mind-blown" générique

## Ce qu'il faut éviter

- Les conclusions génériques "mind-blown" ("la prochaine fois que ton IA répond bizarre..."). Finir sur un takeaway actionnable — un conseil de prompting concret, une astuce directement utilisable
- Utiliser des titres `##` pour les sections du script au lieu du format `**[SECTION - indication]**`
- Dépasser 130 mots de script
- Les intros qui contextualisent trop ("Aujourd'hui on va parler de...")
- Les phrases trop longues. Si tu dois reprendre ton souffle en lisant à voix haute, coupe
- Les CTA de plus de 2 phrases
- Les hooks de plus de 2 phrases
- Les hooks descriptifs/plats ("Ce repo te montre..."). Le hook doit créer un manque, une erreur, une promesse forte
- Oublier les indications visuelles *(screen : ...)* dans le corps
- Les énumérations de tools ("on va utiliser X, Y et Z"). C'est un script parlé, pas une slide de présentation
- Les phrases télégraphiques ou incomplètes qui sonnent comme des notes. Chaque phrase doit être prononçable naturellement à l'oral, avec ses articles, ses verbes et ses liaisons
- Reprendre les chiffres bruts sans contexte ("500 textes", "0.09ms"). Préférer des formulations relatives ("quasi instantané", "sans que ça rame")
- Mentionner le développeur ou les détails d'implémentation sauf si c'est pertinent pour le spectateur
- Utiliser du jargon technique (DOM, getBoundingClientRect, CJK, soft hyphens) pour un public généraliste
