---
name: anthropic-slides
description: Generate Remotion video slides with Anthropic's visual design language.
  Use when the user wants to create animated video slides, explainer videos,
  product demos, or presentation-style videos using Remotion with the
  Anthropic/Claude brand aesthetic (soft pastels, clean typography, card layouts).
---

# Anthropic-Style Remotion Video Slides

## Règles dures

- **TOUJOURS demander ou suggérer un thème au démarrage** — ne jamais defaulter silencieusement sur Anthropic
- **TOUJOURS demander ou inférer le format au démarrage** — `1920×1080` (16:9 desktop) ou `1080×1080` (1:1 short TikTok/Reels). Le `/video` command exige 1:1 par défaut → aligner LAYOUT.width/height en conséquence
- **Si le sujet jure visuellement avec le style Anthropic** (ex: caveman, terminal, dark hacker) → proposer un thème adapté
- **Un thème = un seul fichier `theme.ts` à swapper** — les slides importent toutes depuis `theme.ts`
- **Toutes les slides utilisent `COLORS.background` comme fond** — sauf si le script mentionne explicitement un fond différent. Ne jamais interpréter un "terminal sombre" comme un changement de fond global (styler le contenu en carte, pas le fond de slide)
- **Après tout changement de thème ou de typographie** : re-render toutes les slides et vérifier qu'aucun conteneur fixe ne déborde (`overflow: hidden` ou vérification visuelle)
- **Pour un sujet de type repo GitHub** : proposer systématiquement une slide finale avec l'URL en grand par défaut
- **Labels flottants** : positionner absolument par rapport au conteneur de slide (coordonnées explicites), pas relativement au parent — le parent peut changer de taille et casser le layout
- **Stack vertical de cartes** : utiliser `display: flex; flexDirection: column; gap: ...` — JAMAIS `top: absolute` calculé à la main (le stack casse dès que le padding d'une carte change)
- **Titres** : ajouter `marginTop: 60-80` par défaut au titre du SlideFrame — sinon il colle visuellement trop haut, même avec topSafeArea respecté
- **Animations "chute / cascade d'items"** : varier `targetY` par index (`base + i * gap`), pas seulement le `delay`. Sinon tous les items atterrissent au même endroit → pile visuelle quand `progress = 1`
- **Vérification still d'une slide animée** : choisir un frame au milieu+ (ex: 60-70% de la durée), pas le milieu pile — les animations à `delay 90+` ne sont pas encore apparues à 50%, on croit à tort qu'elles manquent

## Choisir un thème

Au démarrage, avant de générer quoi que ce soit :

1. **Demander** : "Quel thème visuel ? `anthropic` (pastels doux), `brutalist` (noir/blanc, typo dure), `terminal` (vert sur noir), `cave` (textures stone/sépia)" — ou proposer un thème adapté au sujet.
2. **Si le sujet est évocateur** → suggérer le thème le plus cohérent et demander confirmation.
3. **Swap de thème = un seul fichier** : toutes les slides importent depuis `../theme.ts`, donc changer de thème = remplacer `theme.ts` uniquement.

### Thèmes disponibles

| Thème | Ambiance | Couleurs clés | Usage typique |
|-------|----------|---------------|---------------|
| `anthropic` | Pastels doux, clean | `#FAFAF8`, Inter, ombres douces | Produits SaaS, Claude brand |
| `brutalist` | Noir/blanc, typo dure | `#000`, `#FFF`, borders épaisses | Dev tools, punk, contrasté |
| `terminal` | Retro terminal | `#0D1117`, `#00FF41`, monospace | CLI tools, hacker, code |
| `cave` | Stone, sépia, warm | `#D4A96A`, `#3D2B1F`, textured | Caveman, histoire, raw |

Chaque thème est un fichier `themes/{nom}.ts` qui exporte `COLORS`, `TYPOGRAPHY`, `LAYOUT`. Le `theme.ts` principal réexporte le thème choisi :

```typescript
// theme.ts — swap ici pour changer de thème
export * from './themes/anthropic';
// export * from './themes/terminal';
// export * from './themes/brutalist';
```

## Design System

### Color Palette

```typescript
export const COLORS = {
  // Backgrounds
  background: '#FAFAF8',        // Warm off-white canvas
  backgroundWhite: '#FFFFFF',   // Pure white for cards on colored bg
  backgroundDark: '#1A1A2E',    // Dark mode / contrast sections

  // Brand Pastels (card backgrounds)
  blue: '#D6E4F0',             // Team Chat, Chat features
  blueMedium: '#B8D4E8',       // Hover/active state
  yellow: '#F5E6C8',           // Cowork, central hub
  yellowMedium: '#EDDA B0',    // Hover/active state
  green: '#D5E8D4',            // Code, Shared Docs
  greenMedium: '#BFD9BE',      // Hover/active state
  pink: '#F5D4C8',             // Admin Tools, alerts
  pinkMedium: '#EBC0B2',       // Hover/active state
  purple: '#D8D4E8',           // Integrations, Workflows
  purpleMedium: '#C8C2DC',     // Hover/active state

  // Text
  textPrimary: '#1A1A1A',      // Main headings
  textSecondary: '#4A4A4A',    // Body text
  textMuted: '#8A8A8A',        // Captions, labels
  textOnDark: '#F5F5F5',       // Text on dark backgrounds

  // Accents
  accentOrange: '#E8956A',     // CTA, highlights
  accentTeal: '#6AACB8',       // Links, interactive elements

  // Borders & Shadows
  border: '#E5E5E0',           // Subtle card borders
  shadow: 'rgba(0, 0, 0, 0.06)', // Soft card shadows
};
```

### Typography

```typescript
export const TYPOGRAPHY = {
  // Use Inter (primary) or fallback to system sans-serif
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  // For the "claude" wordmark style
  brandFont: "'Styrene B', 'Inter', sans-serif",

  sizes: {
    hero: 72,         // Main title on title slides
    h1: 56,           // Section titles
    h2: 42,           // Slide titles
    h3: 32,           // Subtitles
    body: 24,         // Body text
    bodyLarge: 28,    // Emphasized body
    caption: 18,      // Labels, captions
    small: 14,        // Fine print, badges
  },

  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.1,       // Headings
    normal: 1.5,      // Body
    relaxed: 1.7,     // Long-form text
  },
};
```

### Spacing & Layout

```typescript
export const SPACING = {
  // Base unit: 8px
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
};

// 16:9 desktop (1920x1080) — preset par défaut hors /video
export const LAYOUT = {
  width: 1920,
  height: 1080,
  padding: 80,
  contentMaxWidth: 1600,
  cardRadius: 16,
  cardPadding: 24,
  cardShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
  iconSize: 48,
  topSafeArea: 0,            // pas de zone UI réservée
  titleMarginTop: 60,        // évite que le titre colle trop haut
};

// 1:1 square (1080x1080) — preset par défaut quand invoqué via /video (TikTok/Reels)
export const LAYOUT_SQUARE = {
  width: 1080,
  height: 1080,
  padding: 60,
  contentMaxWidth: 960,
  cardRadius: 16,
  cardPadding: 20,
  cardShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
  iconSize: 40,
  topSafeArea: 120,          // zone UI plateforme — header/title commence après
  titleMarginTop: 60,        // toujours pousser le titre 60-80px sous topSafeArea
};
```

### Adaptations 1:1 (short vertical/square)

- **Empiler verticalement** au lieu de rangées horizontales — pas de "rows de 3-4 cards" qui marchent en 16:9
- **Moins d'éléments par slide** — 2 max (vs 3-4 en 16:9)
- **`topSafeArea: 120`** réservé pour la zone UI plateforme (TikTok/Reels) — rien ne doit chevaucher
- **`SlideShellShort`** : variante de `SlideFrame` qui hardcode `topMargin = 120`

### Animation Principles

```typescript
export const ANIMATION = {
  // Standard easing
  easeOut: [0.16, 1, 0.3, 1],      // For entrances
  easeInOut: [0.42, 0, 0.58, 1],    // For transitions
  spring: { damping: 15, mass: 1, stiffness: 200 },

  // Standard durations (in frames at 30fps)
  fadeIn: 15,          // 0.5s
  slideIn: 20,         // 0.67s
  stagger: 6,          // 0.2s between items
  holdDuration: 90,    // 3s per slide content

  // Entrance patterns
  // - Cards: fade in + slide up from 20px below
  // - Text: fade in with slight scale from 0.95
  // - Arrows/connections: draw from center outward
  // - Icons: pop in with spring physics
};
```

## Slide Types

### 1. Title Slide
- Large centered title (hero size)
- Optional subtitle below
- Minimal background, possibly with subtle gradient or brand element
- "claude" wordmark at bottom

### 2. Feature Cards Slide (like "3 Ways to Claude")
- 2-4 cards in a horizontal row
- Each card: pastel background, icon, title, bullet list
- Cards animate in with stagger
- Clean white background

### 3. Hub Diagram Slide (like "Claude Cowork" diagram)
- Central element (card or badge)
- Surrounding cards connected with arrows
- Arrows animate drawing in
- Bottom label/subtitle
- Each spoke card has: icon, title, pastel bg

### 4. Bullet List Slide
- Left-aligned title
- Staggered bullet points animating in
- Optional icon per bullet
- Right side optional: illustration or code block

### 5. Comparison Slide
- Two columns side by side
- Each with heading + content
- Divider line between
- Good for before/after, old/new

### 6. Quote / Callout Slide
- Large quote text centered
- Attribution below
- Subtle accent bar on left

### 7. Code Slide
- Dark background section for code
- Syntax highlighted
- Line-by-line reveal animation

### 8. Transition Slide
- Simple centered text
- Used between major sections
- Can use accent background color

### 9. Split Card Slide
- **Une seule carte blanche unifiée** avec divider central (vertical ou horizontal)
- Deux zones côte-à-côte (ex: radar gauche + score droit, before/after, problème/solution)
- Pattern visuellement plus solide que deux cards séparées flottantes — utiliser quand l'utilisateur trouve "deux cards séparées" trop éclatées

## Remotion Implementation Rules

1. **Always use `@remotion/core`** imports: `AbsoluteFill`, `useCurrentFrame`, `useVideoConfig`, `interpolate`, `spring`, `Sequence`, `Series`.

2. **File structure for a video project:**
```
src/
  components/
    slides/
      TitleSlide.tsx
      FeatureCardsSlide.tsx
      HubDiagramSlide.tsx
      BulletListSlide.tsx
      ComparisonSlide.tsx
      TransitionSlide.tsx
    shared/
      Card.tsx
      Arrow.tsx
      Icon.tsx
      Badge.tsx
      AnimatedText.tsx
    theme.ts
  compositions/
    MyVideo.tsx
  Root.tsx
```

3. **Each slide is a Remotion `<Sequence>`** with a `durationInFrames`.

4. **Animations use `interpolate()` and `spring()`** from Remotion, NOT CSS transitions.

5. **All slides accept props** for content (title, items, colors) so they're reusable.

6. **The composition wraps slides** in `<Series>` for sequential playback.

7. **FPS: 30** standard. Each slide typically 90-150 frames (3-5 seconds).

8. **Always include enter/exit animations** for smooth slide transitions.

## Example Slide Component

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../theme';

interface FeatureCard {
  icon: string;      // emoji or SVG path
  title: string;
  items: string[];
  color: string;     // pastel background color
}

export const FeatureCardsSlide: React.FC<{
  title: string;
  cards: FeatureCard[];
}> = ({ title, cards }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 15], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: LAYOUT.padding }}>
      <h1 style={{
        fontFamily: TYPOGRAPHY.fontFamily,
        fontSize: TYPOGRAPHY.sizes.h1,
        fontWeight: TYPOGRAPHY.weights.bold,
        color: COLORS.textPrimary,
        textAlign: 'center',
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        marginBottom: 60,
      }}>
        {title}
      </h1>

      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        {cards.map((card, i) => {
          const delay = 15 + i * 8;
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: 'clamp' });
          const cardY = interpolate(frame, [delay, delay + 15], [30, 0], { extrapolateRight: 'clamp' });

          return (
            <div key={i} style={{
              backgroundColor: card.color,
              borderRadius: LAYOUT.cardRadius,
              padding: 40,
              width: 340,
              opacity: cardOpacity,
              transform: `translateY(${cardY}px)`,
              boxShadow: LAYOUT.cardShadow,
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{card.icon}</div>
              <h3 style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.h3,
                fontWeight: TYPOGRAPHY.weights.semibold,
                color: COLORS.textPrimary,
                marginBottom: 16,
              }}>
                {card.title}
              </h3>
              {card.items.map((item, j) => (
                <div key={j} style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.body,
                  color: COLORS.textSecondary,
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  borderRadius: 8,
                  padding: '8px 16px',
                  marginBottom: 8,
                }}>
                  {item}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```

## Example Composition

```tsx
import { Composition, Series } from 'remotion';
import { TitleSlide } from './components/slides/TitleSlide';
import { FeatureCardsSlide } from './components/slides/FeatureCardsSlide';
import { COLORS } from './components/theme';

export const MyVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={120}>
        <TitleSlide
          title="Claude Cowork"
          subtitle="Collaborate with AI, together"
        />
      </Series.Sequence>

      <Series.Sequence durationInFrames={150}>
        <FeatureCardsSlide
          title="3 Ways to Claude"
          cards={[
            { icon: '💬', title: 'Chat', items: ['Ask', 'Write', 'Research'], color: COLORS.blue },
            { icon: '👥', title: 'Cowork', items: ['Collab', 'Projects', 'Shared'], color: COLORS.yellow },
            { icon: '⌨️', title: 'Code', items: ['CLI', 'Build', 'Deploy'], color: COLORS.green },
          ]}
        />
      </Series.Sequence>
    </Series>
  );
};
```

## Key Design Principles

1. **Whitespace is generous** - never crowd elements. Let content breathe.
2. **Pastel cards, not borders** - color comes from soft card backgrounds, not outlines.
3. **Consistent rounding** - all cards use 16px radius, badges use 8px.
4. **Subtle animations** - smooth fade + slide, never flashy or bouncy.
5. **Hierarchy through size** - titles are big, content is proportionally smaller.
6. **Icons are simple** - use emoji or simple line-art SVGs, not complex illustrations.
7. **Connection arrows** - thin, dark gray, with small arrowheads. Animated stroke-dasharray for drawing effect.
8. **Brand wordmark** - "claude" in lowercase with rounded font at bottom of title slides.
9. **No gradients on cards** - flat pastel fills only. Gradients only for subtle background effects.
10. **Dark text on light backgrounds** - high contrast but not harsh black (#1A1A1A, not #000).
