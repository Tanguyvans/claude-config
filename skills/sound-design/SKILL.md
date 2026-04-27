---
name: sound-design
description: >
  Ajoute, calibre et itère sur des bruitages (SFX) dans une vidéo Remotion.
  Déclenche dès que l'utilisateur mentionne "bruitages", "SFX", "sound design",
  "ajouter du son", "manque de peps", "trop silencieux", ou veut donner du
  punch sonore à une vidéo Remotion existante. Couvre les sources libres
  (Mixkit), payantes (ElevenLabs), le système de densité (none/lite/normal/dense),
  les variants pour éviter les répétitions, et le workflow d'itération basé sur
  des feedbacks timecodés. Activable aussi quand on itère sur des SFX existants
  (volume, timing, swap d'un son).
---

# remotion-sfx — Bruitages calés sur Remotion

Tu pars d'une vidéo Remotion existante (face-cam + overlays) et tu y ajoutes une couche SFX qui donne du punch sans saturer. Toute la logique vit dans un composant `<Sounds>` à part, branché via une prop `density` exposée dans le studio.

Tu ne peux pas entendre. Toute la fiabilité vient du système (tiers, variants, catalogue), de l'auto-critique, et des feedbacks timecodés que l'utilisateur te donne.

## Quand utiliser

- Une vidéo Remotion est déjà scaffolded (`<Video>`/`<OffthreadVideo>` + Sequences pour les overlays)
- L'utilisateur dit "ajoute des bruitages", "SFX", "manque de son", "donne du peps"
- L'utilisateur veut itérer sur des SFX existants (volume, sync, swap)
- Tu finalises une vidéo courte (TikTok/Reels/Shorts) et il te faut un layer audio par-dessus la voix

## Workflow

### 1. Cartographier les beats SFX-ables

Lis le script et les beats Remotion (souvent `src/utils/timings.ts`). Pour chaque moment qui peut bénéficier d'un SFX, note :
- **Frame absolue**
- **Type d'événement visuel** (apparition, frappe, transition, validation, payoff)
- **Justification** (renforce le visuel ? marque une transition ? payoff ?)

Catégories types et l'événement visuel auquel les associer :

| Événement visuel | SFX type |
|---|---|
| Mot/card qui apparaît avec spring | `whoosh` |
| Compteur 1·2·3 | `pop` montant en pitch |
| Frappe de commande terminal | `keyboard typing` (court, capé) |
| Bullets/lignes qui se remplissent | `tick` (variants) |
| Alerte / horloge qui sonne | `notification` (PAS `alarm` — cliché) |
| Validation/confirmation | `chime` |
| Transition panneau | `swoosh` court (PAS `slide` — sonne avalanche) |
| Outro / payoff final | `impact` (avec parcimonie) |

### 2. Sourcer

**Mixkit** (gratuit, libre de droits) — premier choix par défaut.

URL pattern : `https://assets.mixkit.co/active_storage/sfx/{ID}/{ID}-preview.mp3`

Pour scraper les IDs d'une catégorie :
```bash
curl -s "https://mixkit.co/free-sound-effects/{categorie}/" \
  | grep -oE 'sfx/[0-9]+/[0-9]+-preview\.mp3' | head -5
```

Catégories utiles : `whoosh`, `swoosh`, `transition`, `keyboard`, `click`, `pop`, `notification`, `bell`, `impact`. Voir le **Catalogue** plus bas pour les IDs déjà testés.

**ElevenLabs** (payant, plus précis) — pour les SFX signature où Mixkit déçoit. Bons cas d'usage : chimes "soft synth confirm" (les Mixkit chimes sonnent souvent casino), risers cinématiques calibrés, pops de pitch précis. Endpoint : `/v1/sound-generation`. ~5¢ par génération.

**Variants pour répétition** : si un SFX joue 3+ fois (par exemple 4 mots du hook qui ont chacun un whoosh), télécharge 2-3 IDs différents de la même catégorie et alterne. Sans ça → effet "machine à coudre".

### 3. Système de densité

Implémenter un sélecteur en props avec Zod schema (visible dans Remotion Studio) :

```ts
// src/Root.tsx
import { z } from 'zod';
import { Composition } from 'remotion';

export const mainSchema = z.object({
  density: z.enum(['none', 'lite', 'normal', 'dense']),
});

<Composition
  id="Main"
  component={Main}
  schema={mainSchema}
  defaultProps={{ density: 'normal' as const }}
  /* ... */
/>
```

```ts
// src/components/Sounds.tsx
export type Density = 'none' | 'lite' | 'normal' | 'dense';
const TIER: Record<Density, number> = { none: 0, lite: 1, normal: 2, dense: 3 };

interface SfxEntry {
  src: string;
  from: number;       // frame absolue
  duration?: number;  // frames audibles (cap)
  volume?: number;    // 0-1
  startFrom?: number; // skip frames du fichier source
  tier: 1 | 2 | 3;    // 1=lite, 2=normal, 3=dense
  label: string;      // pour debug uniquement
}

const SFX_LIST: SfxEntry[] = [ /* ... */ ];

export const Sounds: React.FC<{ density?: Density }> = ({ density = 'normal' }) => {
  const level = TIER[density];
  if (level === 0) return null;
  return (
    <>
      {SFX_LIST.filter(s => s.tier <= level).map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={s.duration ?? 60}>
          <Audio src={s.src} volume={s.volume ?? 0.5} startFrom={s.startFrom} />
        </Sequence>
      ))}
    </>
  );
};
```

**Tiers :**
- **Tier 1** (lite, normal, dense) : payoffs majeurs uniquement (validate chime, hook climax, finale impact si conservé)
- **Tier 2** (normal, dense) : SFX structurels (counters, keyboard typing, ticks principaux, notification)
- **Tier 3** (dense) : SFX accessoires (bullets supplémentaires, transitions secondaires)

**Plafonds typiques** : `lite` ≤ 6 SFX · `normal` 10-14 · `dense` 16-20. Au-delà, ça sature.

### 4. Calibrage timing & volume

- **Sync** : SFX doit hit quand le visuel LANDS, pas quand il START. Si spring-in de ~10 frames, décale `from` de +3 à +6.
- **Volumes par défaut** : payoffs 0.6 · structurels 0.45 · accessoires 0.35.
- **Cap `duration`** systématique pour les fichiers > 1s (keyboard typing 26s → cap à 25 frames).
- **`startFrom`** pour skipper un démarrage silencieux du fichier source.

### 4.b. Sélection à l'aveugle via `ffmpeg volumedetect`

Tu ne peux pas entendre — pour choisir entre plusieurs candidats SFX, mesure leurs métriques de volume avec `ffmpeg volumedetect` AVANT de pick. Pattern :

```bash
for f in candidate-*.mp3; do
  echo "== $f =="
  ffprobe -v error -show_entries format=duration -of csv=p=0 "$f"
  ffmpeg -i "$f" -af volumedetect -f null - 2>&1 | grep -E "(max_volume|mean_volume)"
done
```

Critère de pick :

- **SFX percussifs narrativement forts** (bris de verre, explosion, claque, validate climax) : favoriser un candidat **long (1.0-1.5s)** avec **peak ~0 dB normalisé** et `mean_volume > -22 dB`. Un "crack" court (< 0.6s, peak -4 dB) tombe dans la voix → "on entend rien".
- Heuristique : `mean_volume > -22 dB` compte plus que `duration courte` quand le SFX doit ponctuer un mot fort.
- **SFX structurels / accessoires** (tick, pop, click) : court (~0.2-0.4s) et `mean_volume` autour de -25 à -28 dB pour ne pas saturer.

Cela évite les pivots à l'aveugle vers des "préférés arbitraires" et permet un pick justifié en 1 itération.

### 5. Wiring final

`Main.tsx` :
```tsx
import { Sounds, type Density } from './components/Sounds';
import type { z } from 'zod';
import type { mainSchema } from './Root';

type MainProps = z.infer<typeof mainSchema>;

export const Main: React.FC<MainProps> = ({ density }) => (
  <AbsoluteFill>
    {/* ... face cam + overlays ... */}
    <Sounds density={density} />
  </AbsoluteFill>
);
```

### 6. Itération sur feedback timecodé

L'utilisateur écoute en `normal` puis te donne du timecode. Patterns de réponse efficaces :

| Feedback type | Action |
|---|---|
| "0:14 keyboard sonne stuttery" | Réduire `duration`, ajuster `startFrom` |
| "0:22 alarm trop cliché" | Swap pour `notification` (Mixkit 2870) |
| "0:26 slide sonne avalanche" | Swap pour `swoosh` court (Mixkit 166), durée < 1s |
| "0:31 chime arrive en retard" | Décaler `from` de -3 à -5 frames |
| "premier event 3 sons trop" | Réduire à 1-2 SFX dans la zone (passer certains en tier 3) |
| "le 2 enlève" | Suppression dans `SFX_LIST`, pas réduction de volume |
| "on entend rien à X" | Augmenter le volume de **ce** SFX (pas tous) |
| "c'est top" | Garder en l'état |

**Tu ne peux pas entendre. Ne devine pas, demande des notes timecodées.** Si l'utilisateur n'en donne pas et dit juste "ça va pas", lui demander quel beat précisément (timecode ou nom du beat).

### 7. Pré-requis Remotion

- **Vidéo source** doit être H.264 yuv420p pour preview Chrome. Si HEVC (iPhone) :
  ```bash
  ffmpeg -i in.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p \
    -crf 18 -preset fast -movflags +faststart -c:a aac -b:a 192k out.mp4
  ```
- **`OffthreadVideo`** au lieu de `Video` pour le rendering (sinon delayRender timeouts).
- **zod v3** (pas v4) — Remotion 4.0.x ne détecte pas le schema en zod v4.
- **Chaque `<Audio>`** doit être dans un `<Sequence>` pour timing isolé (sinon il joue depuis frame 0).

## Catalogue Mixkit testé

| Use case | ID(s) | Notes |
|---|---|---|
| Hook word whoosh | 1489, 1491, 1492 | 3 variants à alterner |
| Counter pop (1·2·3) | 2358, 2364, 2354 | Pitchs montants |
| Keyboard typing | 1386 | Cap à 25 frames, `startFrom: 20` pour skip silence |
| Soft tick (bullets) | 1133, 275, 900 | 3 variants |
| Notification | 2870 | Remplace l'alarm clock cliché |
| Chime / validate ✓ | 933 | Confirm payoff propre |
| Swoosh court | 166 | < 1s, sec, parfait pour transitions panneau |
| Swoosh aérien | 1474 | 3.2s, plus diffus |
| Impact / finale | 1143 | Parcimonie — souvent trop épique pour tech |
| Window break (sustained shatter) | 759 | ~1.4s, peak 0 dB — pour bris narratif fort |

**À ÉVITER :**
- ID **995** (alarm clock) → cliché, sonne année 90
- ID **1714** (slide transition) → traînant, sonne "avalanche" sur les transitions courtes
- ID **2183** (glass crack court ~0.56s, peak -4.4 dB, mean -27 dB) → tombe dans la voix sur un mot fort, "on entend rien"
- Tout ka-ching long → sonne casino sur du contenu dev

## Sortie attendue

Quand l'utilisateur valide la passe SFX :
1. `src/components/Sounds.tsx` avec `Density`, `SFX_LIST` (tiers calibrés), `<Sounds>`
2. `src/Root.tsx` avec `mainSchema` zod + `defaultProps={{ density: 'normal' }}`
3. `src/Main.tsx` avec `<Sounds density={density} />` + type tiré du schema
4. `public/sounds/*.mp3` avec les fichiers téléchargés (noms sémantiques : `whoosh.mp3`, `tick.mp3`, etc.)
5. Doc rapide dans le README sur comment changer la densité (Studio Props panel ou `--props='{"density":"lite"}'`)

## Auto-critique avant livraison

Avant de dire "c'est prêt" :
- [ ] Pas plus de 1-2 SFX simultanés sur l'intro/hook
- [ ] Pas de SFX répété 3+ fois sans variants
- [ ] Tous les fichiers > 1s ont une `duration` capée
- [ ] Volumes hiérarchisés (payoffs > structurels > accessoires)
- [ ] Tier 1 ≤ 6 entrées, Tier 1+2 ≤ 14 entrées
- [ ] Pas d'`alarm` ID 995 ni de `slide` ID 1714 dans la liste
- [ ] Vidéo source vérifiée H.264 yuv420p (pas HEVC)
- [ ] zod v3 dans `package.json`

## Itération avec skill-loop

Ce skill vit dans `~/.claude/skills/remotion-sfx/`. À chaque session de travail, `/refine-skills` capture les feedbacks dans `FEEDBACK.md`. La routine hebdomadaire propose des updates qui passent par `/review-skills`.
