// Shared sketchy primitives for the cheatsheet wireframes

const INK = '#2a2520';
const INK_SOFT = '#5e4f3d';
const INK_FAINT = '#9c8568';
const PAPER = '#faf8f5';
const ORANGE = '#e07c3e';
const HIGHLIGHT = '#ffe08a';

// Generate a slightly-irregular border radius so boxes look hand-drawn
function wobblyRadius(seed = 1) {
  const r = (i) => 4 + ((seed * 13 + i * 7) % 6);
  return `${r(0)}px ${r(1)}px ${r(2)}px ${r(3)}px / ${r(4)}px ${r(5)}px ${r(6)}px ${r(7)}px`;
}

// Hand-drawn-ish box: double stroke via box-shadow, wobble radius, slight rotation
function SketchBox({ children, style = {}, rotate = 0, seed = 1, thick = false, filled = null, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `${thick ? 2.5 : 1.5}px solid ${INK}`,
        borderRadius: wobblyRadius(seed),
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        background: filled || 'transparent',
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Wavy underline used for "links" and handwritten emphasis
function WavyUnderline({ width = 80, color = INK, style = {} }) {
  return (
    <svg width={width} height="6" viewBox={`0 0 ${width} 6`} style={{ display: 'block', ...style }}>
      <path
        d={`M 0 3 Q ${width / 6} 0, ${width / 3} 3 T ${(width * 2) / 3} 3 T ${width} 3`}
        stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round"
      />
    </svg>
  );
}

// Short scribble line (for placeholder text)
function Scribble({ width = 60, height = 8, color = INK_SOFT, strokeWidth = 1.3, style = {} }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', ...style }}>
      <path
        d={`M 2 ${height / 2} L ${width - 2} ${height / 2}`}
        stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round"
      />
    </svg>
  );
}

// Multiple scribble lines (paragraph placeholder)
function ScribbleLines({ lines = 3, width = 180, gap = 10, lastShort = true, color = INK_SOFT, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Scribble
          key={i}
          width={lastShort && i === lines - 1 ? width * 0.6 : width - (i % 2) * 12}
          color={color}
        />
      ))}
    </div>
  );
}

// Arrow (hand-drawn-ish) from one point to another with slight curve
function Arrow({ x1, y1, x2, y2, curve = 20, color = INK, label, labelOffset = 0 }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - curve;
  const dx = x2 - mx;
  const dy = y2 - my;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len, uy = dy / len;
  const px = -uy, py = ux;
  const head = 8;
  return (
    <svg
      style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', overflow: 'visible',
      }}
    >
      <path
        d={`M ${x1} ${y1} Q ${mx} ${my}, ${x2} ${y2}`}
        stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"
      />
      <path
        d={`M ${x2} ${y2} L ${x2 - head * ux + (head / 2) * px} ${y2 - head * uy + (head / 2) * py} M ${x2} ${y2} L ${x2 - head * ux - (head / 2) * px} ${y2 - head * uy - (head / 2) * py}`}
        stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"
      />
      {label && (
        <text
          x={mx} y={my + labelOffset} fill={color}
          fontFamily="Caveat, cursive" fontSize="16"
          textAnchor="middle"
        >{label}</text>
      )}
    </svg>
  );
}

// Highlight marker (yellow-ish highlighter swipe behind text)
function Highlight({ children, color = HIGHLIGHT, style = {} }) {
  return (
    <span style={{
      background: `linear-gradient(180deg, transparent 45%, ${color} 45%, ${color} 90%, transparent 90%)`,
      padding: '0 2px',
      ...style,
    }}>{children}</span>
  );
}

// Page frame — simulated browser chrome, sketchy
function PageFrame({ width = 900, height = 640, children, url = 'tanguyvans.github.io/ai-coding-cheatsheet' }) {
  return (
    <SketchBox
      thick
      seed={9}
      filled={PAPER}
      style={{ width, height, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* browser chrome */}
      <div style={{
        height: 34, borderBottom: `1.5px solid ${INK}`,
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px',
        background: '#f3efe8', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              border: `1.2px solid ${INK}`, background: 'transparent',
            }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: 20, marginLeft: 10,
          border: `1.2px solid ${INK}`, borderRadius: wobblyRadius(3),
          display: 'flex', alignItems: 'center', padding: '0 10px',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: INK_SOFT,
          background: '#fff',
        }}>{url}</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>
    </SketchBox>
  );
}

// Fake logo mark (triangle / asterisk hybrid)
function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" style={{ display: 'block' }}>
      <path
        d="M 11 2 L 20 18 L 2 18 Z"
        stroke={INK} strokeWidth="1.8" fill="none" strokeLinejoin="round"
      />
      <circle cx="11" cy="13" r="1.8" fill={ORANGE} />
    </svg>
  );
}

// Marginalia — a handwritten sticky note that goes beside an artboard
function Marginalia({ children, style = {}, rotate = -3, color = INK }) {
  return (
    <div style={{
      fontFamily: 'Caveat, cursive',
      fontSize: 18, lineHeight: 1.3, color,
      transform: `rotate(${rotate}deg)`,
      ...style,
    }}>{children}</div>
  );
}

Object.assign(window, {
  INK, INK_SOFT, INK_FAINT, PAPER, ORANGE, HIGHLIGHT,
  wobblyRadius, SketchBox, WavyUnderline, Scribble, ScribbleLines,
  Arrow, Highlight, PageFrame, LogoMark, Marginalia,
});
