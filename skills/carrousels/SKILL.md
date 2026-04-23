---
name: carrousels
description: >
  Génère des carrousels Instagram / TikTok / LinkedIn au style sketchy / lo-fi (paper tones,
  Caveat + Kalam + JetBrains Mono, accent orange, borders wobbly, sticky notes, highlights).
  Format handoff Claude Design — produit un Carrousels.html autonome avec React + Babel inline,
  plus un fichier JSX par carrousel. Déclenche cette skill dès que l'utilisateur mentionne
  "carrousel", "carousel", "slides Insta", "slides TikTok", "slides LinkedIn", "post Insta",
  "post carrousel", ou demande de transformer une actu IA, un tuto, un repo, une comparaison
  ou un benchmark en carrousel pour @code_simple (FR) / @iamtguy (EN). Trois formats cibles :
  IG 1080×1350, TikTok 1080×1920, LinkedIn 1200×1500 — même typo partout, compositions recalculées.
---

# Carrousels IA — sketchy / lo-fi

Tu génères des carrousels (7 slides) au style **sketchy / lo-fi** pour Instagram (1080×1350), TikTok/Reels (1080×1920) et LinkedIn (1200×1500). Le créateur publie sous **@code_simple** (FR) et **@iamtguy** (LinkedIn, EN). Sujets : actu IA, tutos GitHub, releases de modèles, comparaisons d'outils, benchmarks.

## Workflow

1. **Demander** (si manquant) : sujet, type de carrousel (tuto / news / versus), platformes cibles, handle par défaut, langue.
2. **Poser 2-3 questions** max sur le contenu concret (chiffres, benchmarks, commandes, screenshots prévus). Ne pas surcharger — si le sujet est clair, aller direct à l'étape 3.
2.5. **Fact-check obligatoire** (carrousels news et versus) : avant de générer les slides, vérifier chaque chiffre/benchmark via WebSearch ou WebFetch sur la doc officielle. Pour un versus, croiser au moins 2 sources indépendantes. Ne jamais écrire un chiffre de mémoire — les erreurs devront être corrigées après coup.

3. **Générer** dans un dossier `carrousels-{slug}/` :
   - `Carrousels.html` — copié depuis `assets/Carrousels.template.html` et adapté (titre, sujets)
   - `design-canvas.jsx`, `sketchy-shared.jsx`, `sketchy-slide-base.jsx` — copiés tels quels depuis `assets/`
   - `carousels/carousel-1-{slug}.jsx` — les 7 slides du carrousel
4. **Dire à l'utilisateur** comment ouvrir : `python3 -m http.server` dans le dossier puis naviguer vers `http://localhost:8000`. **Ne jamais suggérer d'ouvrir via `file://`** — Babel standalone ne peut pas fetch les `.jsx` externes (CORS → page blanche). Proposer activement : "Tu veux que je lance `python3 -m http.server` pour toi ?"

Ne jamais prendre de screenshot. Ne lancer le serveur que si l'utilisateur le demande explicitement.

## Les 3 formats

| format     | dimensions   | ratio | particularité                                   |
|------------|--------------|-------|-------------------------------------------------|
| instagram  | 1080 × 1350  | 4:5   | format par défaut, compact                       |
| tiktok     | 1080 × 1920  | 9:16  | plus haut, `safeTop: 220`, `safeBottom: 340`     |
| linkedin   | 1200 × 1500  | 4:5   | plus large, bascule EN + `handleEN` (@iamtguy)   |

Le `SlideHeader` déplace le top à `120` pour TikTok (au lieu de `70`) et le `SlideFooter` remonte à `bottom: 240`. Le `SlideBody` ajuste le safe area automatiquement.

## Le système de design (ne PAS inventer — réutiliser les primitives)

### Palette (constantes globales injectées par `sketchy-shared.jsx`)

```
INK        #2a2520  (noir encre, titres + borders)
INK_SOFT   #5e4f3d  (gris chaud, body)
INK_FAINT  #9c8568  (gris délavé, captions, slashes)
PAPER      #faf8f5  (fond papier par défaut)
ORANGE     #e07c3e  (accent — kickers, CTA, "après")
HIGHLIGHT  #ffe08a  (highlighter jaune)
```

Toniques de fond secondaires pour varier : `#f3ecda` (papier plus jaune, slides "steps") et `#fff4d6` (CTA final). Ne jamais introduire une autre couleur — la contrainte palette fait toute l'identité.

### Typos (Google Fonts, déjà dans le template)

- **Caveat** 400/600/700 — titres, kickers orange, marginalia, sticky notes. Cursive manuscrit.
- **Kalam** 300/400/700 — corps de texte, légendes. Attention : `fontWeight: 300` pour le body (plus léger, manuscrit au stylo fin).
- **JetBrains Mono** 400/500/600 — code, handles, page counter, tags footer.

### Tailles de police validées (ne pas dévier — l'utilisateur a itéré là-dessus)

| élément                              | taille  | font          | weight |
|--------------------------------------|---------|---------------|--------|
| header logo                          | 48      | (LogoMark)    | —      |
| header handle (@code_simple)         | 52      | Caveat        | 700    |
| page counter (01 / 07)               | 30      | JetBrains Mono| 600    |
| footer tag (# 01 · intro)            | 32      | JetBrains Mono| 500    |
| footer swipe →                       | 54      | Caveat        | 700    |
| kicker orange (✶ tuto github)        | **64**  | Caveat        | 700    |
| titre cover                          | 180-220 | Caveat        | 700    |
| titre slide intérieure               | 72-96   | Caveat        | 700    |
| body                                 | 26-34   | Kalam         | 300    |
| code inline                          | 24-30   | JetBrains Mono| 500    |
| sticky note                          | 26      | Kalam         | 400    |

Les kickers orange doivent être à **64px en Caveat 700** — c'est le feedback final de l'utilisateur. Ne JAMAIS les mettre plus petits. Éviter le wrap avec `whiteSpace: 'nowrap'` si le texte est court.

### Composants disponibles (tous injectés sur `window`)

De `sketchy-shared.jsx` :
- `SketchBox({ thick, seed, filled, rotate, style })` — box avec border wobbly hand-drawn
- `Highlight({ color, children })` — swipe highlighter jaune (ou autre) derrière du texte
- `WavyUnderline({ width, color })` — soulignement ondulé
- `Scribble`, `ScribbleLines` — placeholders griffonnés
- `Arrow({ x1, y1, x2, y2, curve, label })` — flèche courbe annotée
- `LogoMark({ size })` — triangle + point orange (mark "code_simple")
- `Marginalia({ rotate, children })` — note manuscrite en marge
- `PageFrame` — chrome de navigateur sketchy (pour screenshots)

De `sketchy-slide-base.jsx` :
- `SlideFrame({ format, tone, children })` — wrapper au bon ratio, applique `paperBg(tone)`
- `SlideHeader({ handle, index, total, format })` — barre du haut
- `SlideFooter({ format, tag, text })` — barre du bas avec "swipe →"
- `SlideBody({ format, padX, justify, children })` — zone safe avec padding auto
- `SketchImage({ label, height, rotate })` — placeholder d'image avec stripes hachurées
- `StickyNote({ rotate, color, children })` — note jaune inclinée
- `Title`, `Body`, `Code` — primitives typographiques
- `CarouselRow({ title, subtitle, format })` — wrapper sur le canvas
- `CheckMark`, `CrossMark` — icônes hand-drawn vert/rouge

**Ne jamais réécrire ces composants.** Toujours les importer via les 3 fichiers d'assets copiés.

## Les 7 slides — structure narrative

C'est le squelette validé. Garde ces rôles, adapte le contenu.

1. **Cover / Hook** — kicker orange (✶ tuto github / ● actu · il y a 2h / ✶ versus), gros titre Caveat 180-220 sur 2-3 lignes dont un mot en `<Highlight>`, body d'accroche, sticky note (💡 ou ⚠︎), footer `# 01 · intro`.
2. **Why / Problème** — kicker ✶ pourquoi c'est utile, titre moyen (72-96), 3 points avec `<Code>` + flèche `→`.
3. **Screenshot / Visuel** — kicker ✶ à quoi ça ressemble, `<SketchImage label="screenshot — ..." height={tiktok ? 780 : 560} rotate={-0.5}/>`, body court dessous.
4. **Steps / How-to** — fond `tone="#f3ecda"`, kicker ✶ setup en 3 commandes, 3 `<SketchBox filled={INK}>` avec commandes terminal (jaune `#ffd27a` sur noir).
5. **Before / After** — titre `avant / après`, 2 `<SketchBox>` côte-à-côte (ou empilées pour tiktok via `isTall`), `<CrossMark>` rouge vs `<CheckMark>` vert, accent orange sur "après".
6. **Tips / Astuces** — kicker ✶ 3 flags / ✶ les chiffres, 3 entrées avec `<Code>` souligné orange + body.
7. **CTA** — fond `tone="#fff4d6"`, kicker ✶ à toi de jouer, **titre monumental 180** sur 3 lignes avec `<Highlight color={ORANGE}>`, 3 cartes colorées avec emoji géant + rotation + signature hand-drawn finale "on se revoit →". Pattern punchy validé : `<SketchBox filled={couleur}>` avec emoji grande taille + texte court + léger rotate, signature finale en Caveat cursif. Éviter les 3 `<SketchBox>` simples sans couleur — visuellement pauvre.

Variantes selon le type :
- **news release** (ex. Opus 4.7) — remplace Slide 2 par "les chiffres", Slide 4 par "le mode agent en action", Slide 5 par "ce qui est nouveau". Pour les news d'un produit spécifique (Google, OpenAI, Anthropic...) : intégrer (a) les logos de marque en inline SVG sur la cover + slide features, (b) un mockup stylisé de l'UI du produit sur la slide démo plutôt qu'un `<SketchImage>` vide.
- **versus** (comparaison d'outils) — Slides 2-5 = comparaisons point par point (benchmark, DX, prix, écosystème), Slide 6 = "le piège", Slide 7 = "ta réaction ?". **Pour un versus entre 2 modèles** : claims strictement **model-level** (modalités, contexte, benchmarks, tokenizer, effort levels, instruction-following). Les features tooling (SDK, plateforme, cron jobs, etc.) appartiennent à l'écosystème — les éviter ou les étiqueter explicitement "côté plateforme". Variante structure : pour un versus équilibré, fusionner pros/cons en 1 slide `C1_ForcesLimites` (2 colonnes symétriques) plutôt que 2 slides séparées — plus punchy, économise 2 slides (7→5).

## Règles de contenu

- **Ton** : direct, tutoiement, phrases courtes. Même vibe que les scripts (cf. skill `short-script`). Pas de tirets longs —, pas de deux-points dans les phrases.
- **LinkedIn** : traduire automatiquement en anglais pour le handle `@iamtguy`. Passer `lang="en"` au carrousel et prévoir les strings EN. Le composant lit `lang` pour choisir la version.
- **Chiffres / benchmarks** : en Caveat 700 reste le choix par défaut (c'est l'identité). Si l'utilisateur demande plus de punch, mettre les chiffres en `<Code>` bold.
- **Screenshots** : toujours des placeholders `<SketchImage>` avec un label descriptif. L'utilisateur les remplacera avant publication — le signaler dans la réponse finale.
- **Handles** : `@code_simple` en FR, `@iamtguy` en EN. Ne jamais inventer d'autres handles.

## Template Tweaks (bascule formats)

Le `Carrousels.html` généré inclut le bloc `window.__TWEAKS__` qui permet à l'utilisateur, dans Claude Design, de basculer IG ↔ TikTok ↔ LinkedIn ou d'empiler les 3 formats pour comparer. Ne pas supprimer ce bloc.

```js
window.__TWEAKS__ = /*EDITMODE-BEGIN*/{
  "format": "instagram",
  "showAllFormats": false,
  "handleFR": "@code_simple",
  "handleEN": "@iamtguy"
}/*EDITMODE-END*/;
```

## Squelette d'un fichier carousel-N-{slug}.jsx

Le fichier exporte une fonction `CarouselN({ format, handle, lang })` qui compose 7 sous-composants slides. Exemple minimal :

```jsx
function CN_Cover({ format, handle }) {
  const isTall = format === 'tiktok';
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={1} total={7} format={format} />
      <SlideBody format={format}>
        <Marginalia rotate={-2} style={{ fontSize: 64, color: ORANGE, fontWeight: 700, whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
          ✶ tuto github
        </Marginalia>
        <Title size={isTall ? 220 : 200}>
          Gros titre<br/>sur 3<br/>
          <Highlight color="#ffd27a">lignes</Highlight> ?
        </Title>
        <Body size={34} color={INK}>
          Sous-titre d'accroche en Kalam.
        </Body>
        <StickyNote rotate={-3} style={{ alignSelf: 'flex-start', maxWidth: 560, marginTop: 20 }}>
          💡 Une idée à retenir.
        </StickyNote>
      </SlideBody>
      <SlideFooter format={format} tag="# 01 · intro" />
    </SlideFrame>
  );
}
// ... CN_Why, CN_Screenshot, CN_Steps, CN_BeforeAfter, CN_Tips, CN_CTA

function CarouselN({ format, handle }) {
  const slides = [CN_Cover, CN_Why, CN_Screenshot, CN_Steps, CN_BeforeAfter, CN_Tips, CN_CTA];
  return (
    <CarouselRow title="0N · Titre du carrousel" subtitle={`type · ${FORMATS[format].label}`} format={format}>
      {slides.map((S, i) => <S key={i} format={format} handle={handle} />)}
    </CarouselRow>
  );
}

Object.assign(window, { CarouselN });
```

Regarde `examples/carousel-tuto-example.jsx` (graphify), `examples/carousel-news-example.jsx` (Opus 4.7) et `examples/carousel-versus-example.jsx` (Hermes vs OpenClaw) pour la version complète des 3 archétypes.

## Export PNG (Playwright) et PDF

### Export PNG via Playwright

Pour exporter les slides en PNG haute résolution (IG 2160×2700, TikTok 2160×3840) :
1. Utiliser `assets/export.mjs` (si présent) — il reprend les composants sans DesignCanvas, force `DISPLAY_SCALES[format] = 1`, et screenshote chaque slide à résolution native × 2 (retina).
2. Si absent, créer un `export.html` (sans DesignCanvas, slides empilées) + script Playwright qui screenshot chaque slide.

Si l'utilisateur demande un export PNG, proposer de générer `export.mjs` dans `assets/`.

### Export PDF via navigateur

Ajouter `?print=1&format=instagram|tiktok|linkedin` au template : bypass DesignCanvas, stacke les slides à taille native avec `page-break-after: always` et injecte `@page { size: WxHpx; margin: 0 }`. Ensuite `Cmd+P → Save as PDF`.

## Checklist avant de livrer

- [ ] Les 3 fichiers `design-canvas.jsx`, `sketchy-shared.jsx`, `sketchy-slide-base.jsx` sont copiés tels quels, sans modif.
- [ ] Chaque slide a un `SlideHeader` + `SlideFooter` cohérents (index 1-7).
- [ ] Le kicker orange de chaque slide est à **64px Caveat 700**.
- [ ] Le titre cover est à **180-220**, les titres intérieurs à **72-96**.
- [ ] Exactement un `<Highlight>` par slide (sauf steps / before-after où l'emphase passe par les boxes).
- [ ] Au moins un `<SketchImage>` ou un élément "cassé" (sticky note, marginalia, rotation) sur les slides visuelles.
- [ ] Le `Carrousels.html` charge les `<script type="text/babel" src="...">` dans le bon ordre :
  1. `design-canvas.jsx`
  2. `carousels/sketchy-shared.jsx`
  3. `carousels/sketchy-slide-base.jsx`
  4. les `carousels/carousel-N-*.jsx`
- [ ] Le bloc `window.__TWEAKS__` avec les marqueurs `/*EDITMODE-BEGIN*/` / `/*EDITMODE-END*/` est présent.
- [ ] LinkedIn reçoit bien `handle={handleEN}` et `lang="en"` dans `CarouselBlock`.
- [ ] Dire à l'utilisateur que les `<SketchImage>` sont des placeholders à remplacer par de vrais screenshots avant publication.
