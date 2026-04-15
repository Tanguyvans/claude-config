---
name: review-skills
description: >
  Review des mises à jour de skills proposées par la scheduled task.
  Affiche les avant/après pour chaque skill modifié et permet de valider
  individuellement ou tout d'un coup.
---

# Review des mises à jour de skills

Tu es un assistant de review. L'utilisateur veut valider les mises à jour de skills proposées automatiquement.

## Étape 1 — Vérifier les updates en attente

```bash
cd ~/Desktop/my_project/claude-config
git fetch origin
```

Vérifie si la branche `skill-updates` existe sur le remote :
```bash
git branch -r | grep skill-updates
```

Si elle n'existe pas : "Aucune mise à jour en attente. La prochaine exécution est planifiée automatiquement."

## Étape 2 — Lister les skills modifiés

```bash
git log origin/main..origin/skill-updates --oneline
```

Pour chaque commit, identifier le skill concerné (format : `refine(skill-name): ...`).

## Étape 3 — Présenter les reviews

Pour chaque skill modifié :

1. Lire le fichier `PENDING-REVIEW.md` du skill sur la branche skill-updates :
   ```bash
   git show origin/skill-updates:skills/{nom}/PENDING-REVIEW.md
   ```

2. Afficher à l'utilisateur de manière claire et concise :
   - Nom du skill
   - Changements proposés (bullet points)
   - Feedback intégré
   - Diff avant/après (les extraits clés, pas tout le fichier)

3. Si le PENDING-REVIEW.md n'existe pas, montrer le diff git :
   ```bash
   git diff origin/main..origin/skill-updates -- skills/{nom}/
   ```

## Étape 4 — Demander validation

Utilise AskUserQuestion pour proposer :

- **"Valider tout"** — Merge toute la branche skill-updates dans main
- **"Valider un par un"** — Pour chaque skill, demander oui/non
- **"Tout rejeter"** — Supprimer la branche skill-updates

### Si "Valider tout" :
```bash
cd ~/Desktop/my_project/claude-config
git checkout main
git merge origin/skill-updates --no-ff -m "merge: skill updates validées"
```

Pour chaque skill validé, reset le FEEDBACK.md :
- Archiver le contenu dans FEEDBACK-ARCHIVE.md
- Remplacer FEEDBACK.md par :
  ```
  <!-- Feedback collecté par /refine-skills. Intégré périodiquement dans SKILL.md et GOTCHAS.md. -->
  ```

Supprimer les fichiers PENDING-REVIEW.md.

Commit final :
```bash
git add .
git commit -m "review: reset feedback après validation"
git push origin main
git push origin --delete skill-updates
```

### Si "Valider un par un" :
Pour chaque skill, demander : "Valider les changements de {skill-name} ?"
- Si oui → cherry-pick le commit correspondant sur main
- Si non → skip

Après tous les reviews :
- Pour les skills validés : reset FEEDBACK.md (archiver + vider)
- Supprimer les PENDING-REVIEW.md des skills validés
- Commit et push main
- Si tous validés ou certains rejetés, nettoyer la branche :
  ```bash
  git push origin --delete skill-updates
  ```

### Si "Tout rejeter" :
```bash
git push origin --delete skill-updates
```
Message : "Branche supprimée. Le feedback reste intact pour la prochaine itération."

## Règles
- Toujours montrer le contenu AVANT de demander validation
- Ne jamais modifier main sans validation explicite
- Garder les messages concis et visuels (utiliser des blocs de code pour les diffs)
- Après validation, toujours push pour que le repo soit à jour
