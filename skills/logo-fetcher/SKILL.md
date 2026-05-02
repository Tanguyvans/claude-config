---
name: logo-fetcher
description: >
  Télécharge automatiquement le logo d'une entreprise à partir de son nom ou domaine, via l'API Logo.dev.
  Utilise ce skill dès que l'utilisateur mentionne un nom d'entreprise et veut son logo, ou quand un autre
  workflow (slides, présentations, documents) a besoin d'intégrer un logo d'entreprise. Déclenche aussi quand
  l'utilisateur dit "trouve le logo de X", "ajoute le logo", "récupère le logo", "logo de l'entreprise",
  ou quand le contexte implique qu'un logo est nécessaire (ex: création de slides mentionnant une entreprise).
  Même sans le mot "logo", active ce skill si une slide ou un document est en cours de création et qu'une
  entreprise y est mentionnée — le logo sera probablement utile.
---

# Logo Fetcher

Télécharge des logos d'entreprises en haute qualité via l'API Logo.dev et les range dans un dossier `logos/` propre et réutilisable.

## Configuration

Les clés API sont dans le fichier `.env` à côté de ce SKILL.md :

```
logo-fetcher/
├── SKILL.md
└── .env       ← LOGO_DEV_TOKEN et LOGO_DEV_SECRET
```

## Workflow complet

### Étape 1 — Préparer l'environnement

Charge le `.env` depuis le dossier de ce skill et crée le dossier de destination. Claude connaît le chemin absolu de ce SKILL.md puisqu'il l'a lu — le `.env` est juste à côté.

```bash
source /chemin/vers/logo-fetcher/.env
mkdir -p logos
```

Tous les logos vont dans `logos/` à la racine du répertoire de travail courant. Ce dossier sert de bibliothèque locale réutilisable — si un logo y existe déjà, pas besoin de le re-télécharger.

### Étape 2 — Convertir le nom d'entreprise en domaine

La plupart des entreprises connues ont un domaine évident :

| Entreprise | Domaine |
|---|---|
| Google | google.com |
| Facebook / Meta | facebook.com |
| Anthropic | anthropic.com |
| Apple | apple.com |
| Microsoft | microsoft.com |
| Amazon | amazon.com |
| OpenAI | openai.com |
| Stripe | stripe.com |
| Netflix | netflix.com |

**AI products** :

| Produit | Domaine |
|---|---|
| Claude | anthropic.com |
| ChatGPT | openai.com |
| Gemini | gemini.google.com |
| Ollama | ollama.com |
| Mistral | mistral.ai |
| Vercel | vercel.com |
| Lovable | lovable.dev |

Si le logo récupéré via le domaine semble générique ou peu représentatif (icône simpliste, sans branding reconnaissable), essayer les variantes de domaine via l'endpoint `/search` (ex: `brand.ai`, `brand.com`, `brandname.com`). Le logo peut être bien meilleur sur une TLD différente.

Pour les entreprises moins connues ou quand tu n'es pas sûr du domaine, utilise l'endpoint de recherche :

```bash
curl -s "https://api.logo.dev/search?q=NOM_ENTREPRISE" \
  -H "Authorization: Bearer $LOGO_DEV_SECRET" | python3 -m json.tool
```

Prends le premier résultat pertinent.

### Étape 3 — Télécharger

Convention de nommage : `logos/{entreprise}_logo.png` (nom en minuscules, underscores).

**Un seul logo :**
```bash
curl -s -o logos/anthropic_logo.png \
  "https://img.logo.dev/anthropic.com?token=$LOGO_DEV_TOKEN&format=png&size=256"
```

**Plusieurs logos en parallèle** (utilise `&` et `wait`) :
```bash
curl -s -o logos/facebook_logo.png "https://img.logo.dev/facebook.com?token=$LOGO_DEV_TOKEN&format=png&size=256" &
curl -s -o logos/google_logo.png "https://img.logo.dev/google.com?token=$LOGO_DEV_TOKEN&format=png&size=256" &
curl -s -o logos/apple_logo.png "https://img.logo.dev/apple.com?token=$LOGO_DEV_TOKEN&format=png&size=256" &
wait
```

C'est important de paralléliser quand il y a plusieurs logos — ça évite d'attendre chaque téléchargement l'un après l'autre.

#### Paramètres disponibles

| Paramètre | Valeur | Usage |
|---|---|---|
| `format` | `png` (défaut) ou `jpg` | PNG recommandé pour la transparence |
| `size` | entier, max `800` | `256` pour slides, `128` pour inline, `512` pour grand format |
| `greyscale` | `true` / `false` | Logo en niveaux de gris |
| `theme` | `dark` / `light` | Adapte les couleurs du logo pour le fond. Utilise `dark` si le fond est sombre |

Exemple avec fond sombre :
```bash
curl -s -o logos/stripe_logo.png \
  "https://img.logo.dev/stripe.com?token=$LOGO_DEV_TOKEN&format=png&size=256&theme=dark"
```

### Étape 4 — Vérifier

Après le téléchargement, vérifie que chaque fichier est bien une image :

```bash
file logos/*.png
```

Chaque ligne doit contenir "PNG image data". Si un fichier contient du JSON ou du texte, c'est une erreur API (domaine introuvable, clé invalide...). Dans ce cas, essaie l'endpoint de recherche (étape 2) pour trouver le bon domaine.

**Logo avec `theme=dark`** : le logo est blanc sur fond transparent — invisible dans un viewer PNG classique (blanc sur blanc). L'utilisateur peut croire que le téléchargement a échoué. Vérifier `file_size > 1KB` via `ls -lh logos/` plutôt que la preview visuelle.

**Logo avec fond opaque non-transparent** : si le contexte d'intégration est un thème clair et que le logo a un fond coloré (ou inversement), prévenir l'utilisateur avant intégration. Proposer : (1) encadrer dans une carte de la couleur du thème, (2) refetch avec `theme=dark` ou `theme=light`, (3) chercher une version alternative via `/search`.

### Étape 5 — Confirmer à l'utilisateur

Liste les logos téléchargés avec leur taille pour que l'utilisateur sache ce qu'il a :

```bash
ls -lh logos/
```

## Choix de la taille

- `size=128` — petits logos, icônes dans du texte
- `size=256` — taille par défaut, bon équilibre pour slides et présentations
- `size=512` — grand format, logo principal d'une page

## Quand utiliser `theme=dark`

Certains logos (Apple, Nike, Uber...) sont noirs ou très sombres. Sur un fond noir, ils deviennent invisibles. Le paramètre `theme=dark` dit à l'API de retourner une version du logo adaptée aux fonds sombres — souvent en blanc ou avec des couleurs claires. Pense à demander à l'utilisateur sur quel fond il va utiliser le logo, ou détecte-le dans le contexte (ex: "slide sur fond noir" → `theme=dark`).

## Checklist pré-livraison

Avant de confirmer à l'utilisateur, vérifier :

- [ ] Téléchargement en parallèle (`&` + `wait`) utilisé quand plusieurs logos
- [ ] Taille adaptée au contexte : `256` pour slides, `128` pour inline, `512` pour grand format
- [ ] Vérification avec `file logos/*.png` — chaque fichier est "PNG image data"
- [ ] Si `theme=dark` : vérifier `file_size > 1KB` plutôt que la preview (logo blanc invisible sur fond blanc)
- [ ] Si logo générique ou peu représentatif : essayer variantes de domaine via `/search`
- [ ] Si fond opaque incompatible avec le thème : prévenir l'utilisateur et proposer 3 options
- [ ] Convention de nommage respectée : `{entreprise}_logo.png` (minuscules, underscores)
- [ ] Confirmation affichée avec `ls -lh logos/`
