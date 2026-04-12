# Index des personnages pixel art

1 pose unique par personnage, en dur.

| Personnage | Mot-clé | Grille | Fichier |
|---|---|---|---|
| **DEV** | dev, développeur, developer, coder | 16 cols × 17 rows | `references/dev/character.md` |
| **ROBOT_AGENT** | robot, ia, ai, bot, machine, automate | 16 cols × 20 rows | `references/robot-agent/character.md` |
| **COMMERCIAL** | commercial, vendeur, business, costume | 16 cols × 17 rows | `references/commercial/character.md` |
| **CLAUDE_MASCOT** | claude, mascotte, mascot, anthropic, agent claude, claude code | 14 cols × 9 rows | `references/claude-mascot/character.md` |
| **PRESENTER** | presenter, présentateur, analyste, analyst, expert, speaker | 16 cols × 17 rows | `references/presenter/character.md` |

## Disambiguation

- **"agent claude"**, **"claude agent"**, **"mascotte"** → toujours **CLAUDE_MASCOT** (le cube orange)
- **"robot"**, **"bot"**, **"ia"**, **"machine"** → toujours **ROBOT_AGENT** (le robot gris métallique)
- Le mot "agent" seul sans "claude" → **ROBOT_AGENT**
- Le mot "agent" avec "claude" → **CLAUDE_MASCOT**

## Comment utiliser

1. Identifie le personnage demandé via les mots-clés (en respectant les règles de disambiguation ci-dessus)
2. Lis le fichier `character.md` correspondant
3. Copie la grille
4. Exporte en TypeScript dans `src/components/shared/Pixel{Nom}.tsx`
5. Génère le SVG de preview
