// Sketchy carousel framework — paper, handwriting, wobbly borders
// Adds a SlideFrame that uses PaperBg + sketch primitives

const FORMATS = {
  instagram: { w: 1080, h: 1350, label: 'Instagram · 4:5' },
  tiktok:    { w: 1080, h: 1920, label: 'TikTok · 9:16' },
  linkedin:  { w: 1200, h: 1500, label: 'LinkedIn · 4:5' },
};

const DISPLAY_SCALES = {
  instagram: 0.62,
  tiktok:    0.48,
  linkedin:  0.58,
};

// Paper texture bg with subtle fibers (CSS-only)
const paperBg = (tone = '#faf8f5') => ({
  background: `
    radial-gradient(circle at 20% 30%, rgba(120,90,50,0.03) 0 1px, transparent 2px),
    radial-gradient(circle at 70% 80%, rgba(120,90,50,0.025) 0 1px, transparent 2px),
    radial-gradient(circle at 45% 60%, rgba(120,90,50,0.02) 0 1px, transparent 2px),
    ${tone}
  `,
  backgroundSize: '7px 7px, 11px 11px, 13px 13px, 100% 100%',
});

function SlideFrame({ format, tone = '#faf8f5', children, showGrain = true, displayScale }) {
  const f = FORMATS[format];
  const scale = displayScale ?? DISPLAY_SCALES[format];
  return (
    <div style={{
      width: f.w * scale,
      height: f.h * scale,
      position: 'relative',
      overflow: 'hidden',
      background: '#000',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <div style={{
        width: f.w,
        height: f.h,
        transform: `scale(${scale})`,
        transformOrigin: '0 0',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Kalam, cursive',
        color: INK,
        ...paperBg(tone),
      }}>
        {children}
      </div>
    </div>
  );
}

// Top bar — handle + page counter, handwritten
function SlideHeader({ handle, index, total, format }) {
  const top = format === 'tiktok' ? 120 : 70;
  return (
    <div style={{
      position: 'absolute',
      top,
      left: 70,
      right: 70,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <LogoMark size={48} />
        <span style={{
          fontFamily: 'Caveat, cursive',
          fontSize: 52,
          fontWeight: 700,
          color: INK,
        }}>{handle}</span>
      </div>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 30,
        fontWeight: 600,
        color: INK_SOFT,
        letterSpacing: '0.05em',
      }}>
        {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
}

function SlideFooter({ format, tag, text = 'swipe →' }) {
  const bottom = format === 'tiktok' ? 240 : 70;
  return (
    <div style={{
      position: 'absolute',
      bottom,
      left: 70,
      right: 70,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 32,
      fontWeight: 500,
      color: INK_SOFT,
      letterSpacing: '0.06em',
      textTransform: 'lowercase',
    }}>
      <span>{tag}</span>
      <span style={{ fontFamily: 'Caveat, cursive', fontSize: 54, fontWeight: 700, letterSpacing: 'normal', color: ORANGE }}>
        {text}
      </span>
    </div>
  );
}

function SlideBody({ children, format, padX = 90, justify = 'center' }) {
  const safeTop = format === 'tiktok' ? 220 : 140;
  const safeBottom = format === 'tiktok' ? 340 : 140;
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      paddingTop: safeTop,
      paddingBottom: safeBottom,
      paddingLeft: padX,
      paddingRight: padX,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: justify,
      gap: 36,
    }}>{children}</div>
  );
}

// Sketchy image placeholder — striped box with handwritten label
function SketchImage({ label, height = 500, rotate = 0 }) {
  const stripe = `repeating-linear-gradient(135deg, transparent 0 14px, rgba(42,37,32,0.08) 14px 15px)`;
  return (
    <SketchBox thick seed={5} style={{
      width: '100%', height, background: stripe,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
    }}>
      <div style={{
        fontFamily: 'Caveat, cursive', fontSize: 38,
        color: INK_SOFT, background: PAPER, padding: '10px 24px',
        border: `1.5px solid ${INK}`, borderRadius: wobblyRadius(7),
      }}>
        ✶ {label}
      </div>
    </SketchBox>
  );
}

// A sticky-note-style aside
function StickyNote({ children, rotate = -2, color = '#fef4a8', style = {} }) {
  return (
    <div style={{
      background: color, padding: '18px 22px',
      border: `1.5px solid ${INK}`,
      borderRadius: wobblyRadius(11),
      fontFamily: 'Kalam, cursive', fontSize: 26, lineHeight: 1.4,
      color: INK,
      boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
      transform: `rotate(${rotate}deg)`,
      ...style,
    }}>{children}</div>
  );
}

// Big handwritten title
function Title({ children, size, color = INK, style = {} }) {
  return (
    <h1 style={{
      fontFamily: 'Caveat, cursive',
      fontSize: size,
      fontWeight: 700,
      lineHeight: 0.95,
      color,
      margin: 0,
      letterSpacing: '-0.01em',
      ...style,
    }}>{children}</h1>
  );
}

// Body paragraph in Kalam
function Body({ children, size = 30, color = INK_SOFT, style = {} }) {
  return (
    <p style={{
      fontFamily: 'Kalam, cursive',
      fontSize: size,
      lineHeight: 1.45,
      color,
      margin: 0,
      fontWeight: 300,
      ...style,
    }}>{children}</p>
  );
}

// Mono code tag
function Code({ children, bg = INK, color = PAPER, size = 24, style = {} }) {
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: size,
      background: bg,
      color,
      padding: '4px 10px',
      borderRadius: 3,
      fontWeight: 500,
      ...style,
    }}>{children}</span>
  );
}

// Carousel row wrapper on canvas
function CarouselRow({ title, subtitle, format, children, gap = 24 }) {
  return (
    <div style={{ marginBottom: 60 }}>
      <div style={{
        padding: '0 60px 18px',
        display: 'flex',
        alignItems: 'baseline',
        gap: 18,
      }}>
        <div style={{
          fontFamily: 'Caveat, cursive', fontSize: 32, fontWeight: 700,
          color: INK, letterSpacing: '-0.01em',
        }}>{title}</div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: INK_FAINT,
        }}>{subtitle}</div>
      </div>
      <div style={{
        display: 'flex', gap,
        padding: '0 60px',
        alignItems: 'flex-start',
        width: 'max-content',
      }}>
        {children}
      </div>
    </div>
  );
}

// Checkmark + X, hand-drawn
function CheckMark({ size = 28, color = '#2d8a3e' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" style={{ flexShrink: 0 }}>
      <path d="M 5 14 Q 9 18, 12 20 Q 16 14, 23 7"
        stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function CrossMark({ size = 28, color = '#c0392b' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" style={{ flexShrink: 0 }}>
      <path d="M 7 7 L 21 21 M 21 7 L 7 21"
        stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

Object.assign(window, {
  FORMATS, DISPLAY_SCALES,
  SlideFrame, SlideHeader, SlideFooter, SlideBody,
  SketchImage, StickyNote, Title, Body, Code, CarouselRow,
  CheckMark, CrossMark,
});
