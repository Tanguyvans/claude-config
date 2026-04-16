# PENDING-REVIEW — motion-slide-planner

## Changements proposés

- Ajout section "Règles dures" en tête de SKILL.md (3 règles : cohérence visuelle, screen recording, intro/outro)
- Ajout étape 0 "Évaluer si un screen recording est pertinent" dans le Processus
- Ajout étape 1 "Définir la cohérence visuelle globale" dans le Processus (nouvelle étape avant l'analyse)
- Renommage des étapes existantes (1→2, 2→3, 3→4)
- Amélioration de la slide d'intro/outro : exiger un visuel de fond
- Ajout de 3 anti-patterns dans "Ce qu'il faut éviter"
- Création GOTCHAS.md

## Feedback intégré

| Feedback | Occurrences | Action |
|----------|-------------|--------|
| Pas d'indication sur cohérence visuelle → mix de styles | 1 (2026-04-12) | Étape 1 "Cohérence visuelle" + règle dure + anti-pattern |
| Slides d'intro/outro trop basiques (logo + texte) | 1 (2026-04-12 pretext) | Règle dure + amélioration étape découpage |
| Pas d'alternative screen recording pour UI live | 2 (2026-04-12 pretext + ultraplan) → RÉCURRENT | Étape 0 + règle dure + anti-pattern + gotcha |
| Format de sortie directement exploitable (positif) | plusieurs | Conservé intact |

## AVANT (parties changées)

```
# Motion Slide Planner — Générateur de briefs de slides animées

Tu reçois un script vidéo...

## Processus

### 1. Analyser le script
### 2. Découper en slides
### 3. Décrire chaque slide...
```

## APRÈS

```
# Motion Slide Planner — Générateur de briefs de slides animées

## Règles dures
[3 règles explicites]

Tu reçois un script vidéo...

## Processus

### 0. Évaluer si un screen recording est pertinent [NOUVEAU]
### 1. Définir la cohérence visuelle globale [NOUVEAU]
### 2. Analyser le script [renommé]
### 3. Découper en slides [renommé + intro/outro amélioré]
### 4. Décrire chaque slide [renommé]
```
