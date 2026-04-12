# ROBOT_AGENT — Robot IA

**Mot-clé** : `robot`, `ia`, `ai`, `bot`, `machine`, `automate`
**Description** : Robot pixel art avec antennes diagonales noires, contours noirs, yeux noirs 2×2, bras articulés avec mains/griffes, cœur doré.
**Grille** : 16 colonnes
**Couleur distinctive** : cœur doré `#E8C06A`

## Palette

```
_ = null (transparent)
K  = #000000  (black - contours, antennes, yeux)
R  = #C8D4DC  (robotGray - remplissage tête, bras, corps intérieur)
RD = #9AACB8  (robotDark - bouche)
RA = #E8C06A  (gold - cœur)
```

## Pose

### ROBOT_AGENT (16×20) — Debout, bras articulés sur les côtés

```
[_,K,_,_,_,_,_,_,_,_,_,_,_,_,K,_]
[_,_,K,_,_,_,_,_,_,_,_,_,_,K,_,_]
[_,_,_,K,K,K,K,K,K,K,K,K,K,_,_,_]
[_,_,_,K,R,R,R,R,R,R,R,R,K,_,_,_]
[_,_,_,K,R,K,K,R,R,K,K,R,K,_,_,_]
[_,_,_,K,R,K,K,R,R,K,K,R,K,_,_,_]
[_,_,_,K,R,R,R,R,R,R,R,R,K,_,_,_]
[_,_,_,K,R,R,RD,RD,RD,RD,R,R,K,_,_,_]
[_,_,_,K,K,K,K,K,K,K,K,K,K,_,_,_]
[_,_,_,_,_,_,K,R,R,K,_,_,_,_,_,_]
[_,_,_,_,_,K,K,K,K,K,K,_,_,_,_,_]
[_,_,K,K,K,K,R,R,R,R,K,K,K,K,_,_]
[_,_,K,R,K,K,R,R,R,R,K,K,R,K,_,_]
[_,_,K,R,K,K,R,RA,RA,R,K,K,R,K,_,_]
[_,_,K,R,K,K,R,R,R,R,K,K,R,K,_,_]
[_,K,K,K,K,K,K,K,K,K,K,K,K,K,K,_]
[_,K,R,K,_,K,R,R,R,R,K,_,K,R,K,_]
[_,K,K,K,_,K,R,K,K,R,K,_,K,K,K,_]
[K,_,_,K,_,K,R,K,K,R,K,_,K,_,_,K]
[_,_,_,_,_,K,K,K,K,K,K,_,_,_,_,_]
```

Design :
- Antennes K (noir) en diagonale vers l'extérieur depuis la tête
- Tête avec contour K, remplissage R (gris clair), yeux noirs 2×2 (K)
- Bouche RD (4px)
- Cou K+R étroit
- Corps avec contour K, remplissage R, cœur doré 2×2 (RA) au centre
- Bras articulés K+R avec coudes et mains/griffes
- Jambes avec pieds en K+R
