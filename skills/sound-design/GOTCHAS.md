# Gotchas — sound-design

Erreurs récurrentes à vérifier AVANT de livrer.

## Sources & catégories

- [ ] PAS d'`alarm` clock classique — sonne cliché/retro années 90. Préférer `notification` (Mixkit ID 2870)
- [ ] PAS de `slide` long pour transitions de panneau — sonne "avalanche" / rumblant. Préférer `swoosh` court (Mixkit ID 166), durée < 1s
- [ ] PAS d'`impact` cinématique en outro tech — sonne trop épique pour 1.5s. Skip ou utiliser un chime court
- [ ] Si un SFX joue 3+ fois (ex: 4 mots du hook), **télécharger 2-3 variants** de la même catégorie. Sinon effet "machine à coudre"

## Timing

- [ ] SFX doit hit quand le visuel LANDS, pas quand il START. Si spring-in de ~10 frames, décaler `from` de +3 à +6
- [ ] Toujours capper la `duration` des fichiers sources > 1s (keyboard 26s, slide 4.7s, etc.) sinon le SFX traîne dans le beat suivant
- [ ] `startFrom` pour skipper un démarrage silencieux du fichier source MP3

## Volume

- [ ] Volumes typiques : payoffs 0.6 · structurels 0.45 · accessoires 0.35
- [ ] Tester en `normal` d'abord. Si l'utilisateur dit "on entend rien à X", remonter le volume de **ce** SFX (pas tous globalement)
- [ ] Ne jamais saturer plusieurs SFX simultanés au volume max — la voix doit rester claire

## Densité

- [ ] Pas plus de 4-6 SFX en `lite`, 10-14 en `normal`, 16-20 en `dense`. Au-delà ça sature
- [ ] Au premier event / hook / intro, pas plus de **1-2 SFX simultanés**. 3 = trop selon les retours utilisateur testés
- [ ] Tier 1 = payoffs majeurs uniquement (validate, hook climax) — visibles dans toutes les densités sauf none

## Tech Remotion

- [ ] Vidéo HEVC (iPhone) ne joue pas en preview Chrome. Réencoder en H.264 yuv420p :
  ```bash
  ffmpeg -i in.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p \
    -crf 18 -preset fast -movflags +faststart -c:a aac -b:a 192k out.mp4
  ```
- [ ] Utiliser `OffthreadVideo` au lieu de `Video` pour éviter les `delayRender()` timeouts au render
- [ ] **zod v3** (pas v4) pour que Remotion 4.0.x détecte le schema dans le Props panel
- [ ] Chaque `<Audio>` doit être DANS un `<Sequence>` pour timing isolé (sinon il joue depuis frame 0)
- [ ] `interpolate()` exige des frames strictement croissants (`[0, 120, 330, ...]`), pas de doublons (`[120, 120, ...]`)

## Process

- [ ] Tu ne peux pas entendre. Ne devine pas — demander des notes timecodées à l'utilisateur ("0:14 trop fort", "0:22 cliché")
- [ ] Quand l'utilisateur valide globalement ("c'est top"), garder en l'état. Quand il dit "à enlever", **supprimer** de la liste, pas réduire le volume
- [ ] Si l'utilisateur dit "X répétitif" mais qu'il n'y a pas de variant disponible localement, télécharger 2-3 IDs alternatifs Mixkit AVANT de proposer une solution
- [ ] Donner les sons sémantiques (`notification.mp3` plutôt que `2870.mp3`) pour que l'utilisateur sache ce que c'est en lisant le code
- [ ] **Sélection à l'aveugle entre candidats SFX** : `ffmpeg volumedetect` sur 3-4 candidats AVANT de pick (peak / mean dB), pas un "préféré arbitraire"
- [ ] Pour SFX percussif narrativement fort (bris de verre, claque) : favoriser **long (1.0-1.5s)** avec `peak ~0 dB` et `mean_volume > -22 dB`. Pas un "crack" court (<0.6s, peak -4 dB)

## Catalogue à éviter explicitement

| ID Mixkit | Catégorie | Pourquoi à éviter |
|---|---|---|
| 995 | alarm clock | Cliché années 90, sonne retro/spam |
| 1714 | slide transition | Trop long, traînant, sonne "avalanche" |
| 2183 | glass crack court | ~0.56s, peak -4.4 dB, mean -27 dB → tombe dans la voix |
| Tout ka-ching | bell | Sonne casino sur du contenu dev/tech |
