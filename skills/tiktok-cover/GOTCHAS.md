# Gotchas

Erreurs récurrentes à vérifier AVANT de livrer une cover. Lire à chaque exécution.

## Background

- [ ] Extraire le frame depuis `public/export.mp4` (face-cam brut), **pas** `out/short.mp4`. Sinon les overlays vidéo (captions, kinetic hook animé, cards) sont baked in et font doublon avec ce qu'on dessine au-dessus.
- [ ] Sauver dans `public/cover-bg-clean.jpg` pour distinguer du `cover-bg.jpg` qui contiendrait des overlays.
- [ ] Vérifier que le candidat a une expression posée (pas mouth open, pas grimace). Préférer fin de phrase / moments de pause.

## Frame selection

- [ ] Toujours proposer un contact sheet 2×2 numéroté, jamais un seul candidat. L'utilisateur veut choisir.
- [ ] 4 timestamps répartis sur la durée du face-cam. Pour 30s de vidéo : ~7s, 11s, 17s, 26s marche. Adapter au pro-rata si durée différente.

## Position du cartouche

- [ ] `paddingBottom: 540` (lower-third) → face dégagée, mais coupé en grille profil TikTok 3:4.
- [ ] `justifyContent: 'center'` → safe grille profil, mais cache souvent la tête.
- [ ] Demander à l'utilisateur lequel des deux trade-offs il accepte. Ne pas choisir tout seul.
- [ ] Ne jamais aller en-dessous de `paddingBottom: 380` (zone caption TikTok mange y > 1540).
- [ ] **Heuristique selon position du visage** : visage cadré haut → `paddingBottom: 540`, visage centré → 380, visage cadré bas → 280-320. Demander en amont si pas évident.

## Layout split (slide haut + face-cam bas)

- [ ] **Étape 0** : `grep -E "FaceCam|Sequence.*Slide" src/Main.tsx` → si match (pattern open-codesign), **defaulter sur le template split** (`HookSlide statique en haut / face-cam en bas`), PAS le pattern cartouche
- [ ] En split layout, **PAS de bandeau bas par défaut** — le titre est déjà dans la slide top. L'user le demande explicitement s'il veut le rajouter
- [ ] Si ambigu (Main.tsx mixte), demander : "split slide/face-cam (template open-codesign) ou fullscreen+cartouche (template par défaut) ?"

## Auto mode

- [ ] Si auto mode actif et le skill demande un pick frame → auto-pick avec heuristique "visage net + bouche fermée + mains hors champ" et flagger explicitement le pick à l'user
- [ ] **Une décision par question** — jamais combiner "frame N° + hook A/B/C + titre 1/2/3" dans une seule question (l'user répond ambigu)

## Wording

- [ ] Toujours proposer 3 options de titre, pas un seul. Patterns : topic label / verbe d'action / headline contre-intuitif.
- [ ] 2-4 mots max. >5 mots = illisible en miniature de grille profil.
- [ ] Mix Capital + CAPS pour créer un accent visuel ("Anthropic L'ADMET"). Tout en CAPS = bloc lourd.
- [ ] Accent coloré orange (#f97316) sur le mot-clé final, jamais sur tout le titre.

## Kinetic hook static

- [ ] Synchroniser `HOOK_LABELS` avec le tableau `WORDS` dans `src/components/KineticHook.tsx` du projet. Ne pas inventer des mots qui ne sont pas dans la vidéo.
- [ ] **Vérifier le count réel de WORDS** (3, 4 ou 5) dans `KineticHook.tsx` AVANT de copier le template.
- [ ] **Adapter le pas vertical** au count : 3→`top: 260 + i * 130`, 4→`top: 260 + i * 110`, 5→`top: 260 + i * 95`.
- [ ] Tilts alternés (-2°, +1.5°, -2°, +1.5°) pour cohérence avec le composant animé.
- [ ] Position `right: 60` — la même que dans KineticHook.tsx.

## Render

- [ ] `npx remotion still Cover out/cover.png` (PAS `npx remotion render`). Still = composition statique, render = animée.
- [ ] Toujours `open out/cover.png` après render pour vérifier visuellement.
- [ ] Si le user dit "je vois pas mon cartouche", check pixel via Python/PIL avant de re-render — souvent il est là mais affiché en cache.

## Pré-requis projet

- [ ] `public/export.mp4` doit exister et être H.264 yuv420p.
- [ ] `src/Root.tsx` doit avoir un import + un `<Still id="Cover" component={Cover} ... />`.
- [ ] Si `<Still>` pas encore ajouté, l'ajouter à côté du `<Composition id="Main" ... />` existant.
- [ ] **Wrap `Composition` + `Still` dans un fragment `<>...</>`** — sinon JSX rejette `Adjacent JSX elements must be wrapped`.
- [ ] **Toujours `Read` Root.tsx avant d'`Edit`** — un Edit raté silencieusement laisse `<Still>` non ajouté → erreur runtime "Could not find composition with ID Cover".
