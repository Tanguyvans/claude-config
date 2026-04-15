---
name: refine-skills
description: Analyse la conversation courante pour extraire des feedbacks sur les skills utilises. A lancer avant de quitter la session.
disable-model-invocation: true
---

# Feedback Skills

Analyse la conversation courante et propose des feedbacks actionnables pour chaque skill utilise.

## Workflow

1. **Identifier les skills utilises** dans cette conversation (appels a /skill-name)
2. **Analyser la conversation** pour chaque skill et chercher :
   - Problemes rencontres (erreurs, resultats incorrects, retries)
   - Corrections que l'utilisateur a du faire apres l'execution du skill
   - Plaintes ou frustrations explicites
   - Suggestions d'amelioration mentionnees
   - Ce qui a bien fonctionne (feedback positif)
   - Etapes manquantes ou superflues dans le workflow du skill
3. **Proposer les feedbacks** sous cette forme :

```
## Skill `{skill-name}`

- [amelioration] {description du probleme + suggestion concrete}
- [positif] {ce qui a bien marche}
- [bug] {comportement incorrect observe}
- [manque] {etape ou instruction manquante dans le skill}

Tu valides ? Tu veux modifier ou ajouter quelque chose ?
```

4. **Attendre la validation** de l'utilisateur — il peut :
   - Valider tel quel
   - Modifier un feedback
   - Ajouter des points
   - Supprimer un feedback non pertinent

5. **Sauvegarder** les feedbacks valides dans `.claude/skills/{skill-name}/FEEDBACK.md`
   - Ajouter a la suite du fichier existant (ne pas ecraser)
   - Format :

```markdown
## {YYYY-MM-DD}

- [amelioration] {description}
- [positif] {description}
- [bug] {description}
```

6. Si aucun skill n'a ete utilise, dire simplement "Aucun skill utilise dans cette session."

## Regles

- Ne propose que des feedbacks **actionnables** — pas de generalites
- Sois concis, l'utilisateur veut valider vite et quitter
- Ne repete pas des feedbacks deja presents dans le FEEDBACK.md existant
- Lis le FEEDBACK.md existant du skill avant de proposer pour eviter les doublons
