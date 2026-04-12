---
name: anthropic-slides
description: Generate Remotion video slides with Anthropic's visual design language.
  Use when the user wants to create animated video slides, explainer videos,
  product demos, or presentation-style videos using Remotion with the
  Anthropic/Claude brand aesthetic (soft pastels, clean typography, card layouts).
---

# Anthropic-Style Remotion Video Slides

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

export const LAYOUT = {
  // Video dimensions (1080p standard)
  width: 1920,
  height: 1080,

  // Content area padding
  padding: 80,
  contentMaxWidth: 1600,

  // Card properties
  cardRadius: 16,
  cardPadding: 24,
  cardShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',

  // Icon size in cards
  iconSize: 48,
};
```

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
