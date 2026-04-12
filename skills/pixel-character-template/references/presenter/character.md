# PRESENTER — Présentateur / Analyste

**Mot-clé** : `presenter`, `présentateur`, `analyste`, `analyst`, `expert`, `speaker`, `conférencier`
**Description** : Personnage en costume sombre avec cravate colorée, sans col blanc (tête connectée au corps). Variante du COMMERCIAL adaptée pour les présentations et vidéos explicatives.
**Grille** : 16 colonnes
**Couleur distinctive** : costume navy `#2C3E50`, cravate personnalisable

## Différence avec COMMERCIAL

Le PRESENTER est basé sur le COMMERCIAL mais **sans le col blanc** — le costume commence directement sous le cou. Cela évite l'effet "tête qui lévite" à petite taille (pixelSize < 14). La cravate au centre (2 pixels `T`) sert de levier de différenciation : chaque variante du PRESENTER peut avoir une couleur de cravate différente.

## Palette

```
_ = null (transparent)
S = #F0C896  (skin)
D = #D4A06A  (skinShadow)
H = #2C1D0E  (hair - dark, personnalisable)
U = #2C3E50  (suit - dark navy)
T = #6AACB8  (tie - teal, personnalisable)
P = #7A7A8A  (pants)
W = #FFFFFF  (white - eyes)
K = #000000  (black - pupils, mouth)
```

## Pose

### PRESENTER (16×17) — Debout, en costume sans col

```
[_,_,_,_,_,_,H,H,H,H,H,_,_,_,_,_]
[_,_,_,_,_,H,H,H,H,H,H,H,_,_,_,_]
[_,_,_,_,H,H,H,H,H,H,H,H,_,_,_,_]
[_,_,_,_,S,S,S,S,S,S,S,S,_,_,_,_]
[_,_,_,_,S,W,K,S,S,W,K,S,_,_,_,_]
[_,_,_,_,S,S,S,D,D,S,S,S,_,_,_,_]
[_,_,_,_,S,S,K,K,K,K,S,S,_,_,_,_]
[_,_,_,_,_,_,S,S,S,S,_,_,_,_,_,_]
[_,_,_,U,U,U,U,T,T,U,U,U,U,_,_,_]
[_,_,U,U,U,U,U,T,T,U,U,U,U,U,_,_]
[_,_,U,U,U,U,U,T,T,U,U,U,U,U,_,_]
[_,_,U,U,U,U,U,T,T,U,U,U,U,U,_,_]
[_,_,U,U,U,U,U,T,T,U,U,U,U,U,_,_]
[_,S,S,U,U,U,U,T,T,U,U,U,U,S,S,_]
[_,_,_,_,P,P,P,P,P,P,P,P,_,_,_,_]
[_,_,_,_,P,P,P,P,P,P,P,P,_,_,_,_]
[_,_,_,P,P,P,_,_,_,_,P,P,P,_,_,_]
```

## Variantes de couleur

Pour différencier plusieurs présentateurs, change la couleur de la cravate `T` et/ou des cheveux `H` :

| Variante | Cheveux | Cravate | Usage |
|---|---|---|---|
| Analyste Fondamental | `#2C1D0E` (noir) | `#6AACB8` (teal) | Finance, données |
| Analyste Sentiment | `#D4A94E` (blond) | `#E8956A` (orange) | Réseaux sociaux, opinions |
| Analyste Technique | `#A0522D` (auburn) | `#9A7EC0` (violet) | Graphiques, patterns |
| Analyste News | `#5C3D2E` (brun) | `#6EAE7A` (vert) | Actualités, presse |

## Variante avec lunettes

Pour un personnage à lunettes (ex: risk manager, expert), remplace la ligne des yeux :

```
[_,_,_,_,G,W,K,G,G,W,K,G,_,_,_,_]  // G = #8BA8C8 (glasses frame)
```

au lieu de :

```
[_,_,_,_,S,W,K,S,S,W,K,S,_,_,_,_]
```
