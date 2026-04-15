# PENDING-REVIEW : short-script

## Changements proposes

### SKILL.md
- **Tirets longs** : Ancienne regle "Tirets longs (--) pour les incises" remplacee par "JAMAIS de tirets longs". Feedback signale 5 fois (04/08, 04/12, 04/12-pretext, 04/12-caveman, 04/12-ultraplan)
- **Deux-points** : Ajout regle dure "JAMAIS de deux-points (:) dans le corps du script" (feedback 04/12-pretext)
- **Questions rhetoriques** : Ajout regle "Pas de questions rhetoriques dans le corps" (feedback 04/12-ultraplan)
- **Jargon technique** : Ajout regle sur le niveau technique adapte au public TikTok generaliste (feedback 03/30, 04/12-pretext)
- **CTA par defaut** : Change de liste de 4 options a "Voila l'URL et a demain." comme defaut explicite (feedback 03/30, 04/12, 04/12-caveman)
- **Workflow** : Ajoute 6 etapes manquantes (lire GOTCHAS, recherche web, proposer 3+ hooks, fact-check, passe anti-repetition, checklist)
- **Checklist pre-livraison** : Nouvelle section avec 11 points de verification
- **Ce qu'il faut eviter** : Ajoute 3 nouveaux anti-patterns (hooks descriptifs, chiffres bruts, jargon technique)

### GOTCHAS.md (nouveau fichier)
- Cree avec 19 gotchas extraits du feedback, organises en 4 categories : Style, Hook, CTA, Contenu, Process

## Feedback integre

| Feedback | Occurrences | Action |
|----------|-------------|--------|
| Tirets longs (--) | 5x | Regle dure inversee dans SKILL.md + GOTCHAS.md |
| CTA "Voila l'URL et a demain" | 3x | CTA par defaut dans SKILL.md + GOTCHAS.md |
| Fact-check les claims | 4x | Etape workflow + GOTCHAS.md |
| Hooks trop generiques | 4x | Proposer 3+ hooks + check tension + GOTCHAS.md |
| Niveau technique trop eleve | 2x | Regle style + anti-pattern + GOTCHAS.md |
| Ne lit pas FEEDBACK/GOTCHAS | 2x | Etape 1 du workflow + GOTCHAS.md |
| Recherche web avant script | 2x | Etape 2 du workflow + GOTCHAS.md |
| Chiffres bruts sans contexte | 2x | Anti-pattern + GOTCHAS.md |
| Repetitions de mots | 2x | Passe anti-repetition dans workflow + GOTCHAS.md |
| Deux-points (:) | 1x (mais lie tirets longs) | Regle dure style + GOTCHAS.md |
| Questions rhetoriques corps | 1x | Regle style + GOTCHAS.md |

## Extraits AVANT / APRES

### 1. Tirets longs (SKILL.md, section "Marqueurs de style")

**AVANT :**
```
- Tirets longs (--) pour les incises et les ruptures de rythme
```

**APRES :**
```
- JAMAIS de tirets longs (--). Utiliser des virgules, des points, ou reformuler la phrase
- JAMAIS de deux-points (:) dans le corps du script. Reformuler en phrase complete
```

### 2. CTA (SKILL.md, section "Le CTA")

**AVANT :**
```
Le CTA fait 1-2 phrases max. Il inclut toujours un appel a l'abonnement.

Patterns qui marchent :
- "Lien en commentaire. Abonne-toi."
- "Commente '[mot-cle]' pour le lien. Abonne-toi."
- "Dis-moi en commentaire [question]. Abonne-toi."
- "Voila l'URL et a demain pour une prochaine video."
```

**APRES :**
```
Le CTA fait 1-2 phrases max. Le CTA par defaut est : **"Voila l'URL et a demain."** C'est le format habituel du createur, utilise-le sauf demande contraire.

Autres patterns possibles (seulement si l'utilisateur le demande) :
- "Lien en commentaire. Abonne-toi."
- "Commente '[mot-cle]' pour le lien. Abonne-toi."
- "Dis-moi en commentaire [question]. Abonne-toi."
```

### 3. Workflow (SKILL.md, section "Processus de generation")

**AVANT :**
```
1. Identifie la categorie (repo, news, tuto, comparatif)
2. Choisis le type de hook le plus adapte -- varie les approches
3. Ecris le script complet en respectant le format exact
4. Verifie le nombre de mots du script -- doit etre entre 80 et 130
5. Si c'est trop long, coupe.
```

**APRES :**
```
1. Lire GOTCHAS.md et FEEDBACK.md avant toute generation
2. Rechercher du contexte : si repo GitHub, lire le README reel. Si news, chercher reactions/tweets
3. Identifie la categorie (repo, news, tuto, comparatif)
4. Proposer 3+ options de hook avec des angles varies. Attendre validation
5. Si plusieurs angles possibles, demander l'angle principal
6. Ecris le script complet en respectant le format exact
7. Fact-check : verifier chaque affirmation technique contre la source reelle
8. Passe anti-repetition : eliminer les mots/structures repetes
9. Verifie le nombre de mots, doit etre entre 80 et 130
10. Checklist pre-livraison
11. Si c'est trop long, coupe.
```

### 4. Checklist pre-livraison (SKILL.md, nouvelle section)

**AVANT :** (inexistante)

**APRES :**
```
## Checklist pre-livraison

- [ ] Aucun tiret long (--) dans le script
- [ ] Aucun deux-points (:) dans le corps du script
- [ ] CTA = "Voila l'URL et a demain." (sauf demande contraire)
- [ ] Hook cree une tension emotionnelle (pas juste descriptif)
- [ ] Pas de questions rhetoriques dans le corps
- [ ] Chaque affirmation technique est verifiee contre la source
- [ ] Pas de jargon inaccessible pour un public TikTok generaliste
- [ ] Pas de repetitions de mots/structures dans le corps
- [ ] Indications visuelles *(screen : ...)* presentes dans le corps
- [ ] Nombre de mots entre 80 et 130
- [ ] Pas d'enumerations type catalogue
```
