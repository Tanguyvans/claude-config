import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, TYPOGRAPHY, LAYOUT } from './theme';

interface SpokeCard {
  icon: string;
  title: string;
  color: string;
}

export const HubDiagramSlide: React.FC<{
  hubTitle: string;
  hubIcon?: string;
  spokes: SpokeCard[];
  bottomLabel?: string;
}> = ({ hubTitle, hubIcon, spokes, bottomLabel }) => {
  const frame = useCurrentFrame();
  const centerX = LAYOUT.width / 2;
  const centerY = LAYOUT.height / 2 - 40;
  const radius = 320;

  // Hub animation
  const hubScale = interpolate(frame, [0, 20], [0.8, 1], { extrapolateRight: 'clamp' });
  const hubOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Hub center */}
      <div
        style={{
          position: 'absolute',
          left: centerX - 100,
          top: centerY - 60,
          width: 200,
          height: 120,
          backgroundColor: COLORS.yellow,
          borderRadius: LAYOUT.cardRadius,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: hubOpacity,
          transform: `scale(${hubScale})`,
          boxShadow: LAYOUT.cardShadow,
          zIndex: 10,
        }}
      >
        {hubIcon && <div style={{ fontSize: 32, marginBottom: 8 }}>{hubIcon}</div>}
        <div
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.h2,
            fontWeight: TYPOGRAPHY.weights.bold,
            color: COLORS.textPrimary,
          }}
        >
          {hubTitle}
        </div>
      </div>

      {/* Spoke cards */}
      {spokes.map((spoke, i) => {
        const angle = (i / spokes.length) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius - 80;
        const y = centerY + Math.sin(angle) * radius - 35;

        const delay = 20 + i * 6;
        const spokeOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
          extrapolateRight: 'clamp',
        });
        const spokeScale = interpolate(frame, [delay, delay + 12], [0.85, 1], {
          extrapolateRight: 'clamp',
        });

        // Arrow animation
        const arrowProgress = interpolate(frame, [delay - 5, delay + 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        // Arrow line from hub to spoke
        const arrowStartX = centerX + Math.cos(angle) * 70;
        const arrowStartY = centerY + Math.sin(angle) * 50;
        const arrowEndX = centerX + Math.cos(angle) * (radius - 90);
        const arrowEndY = centerY + Math.sin(angle) * (radius - 45);
        const currentEndX = arrowStartX + (arrowEndX - arrowStartX) * arrowProgress;
        const currentEndY = arrowStartY + (arrowEndY - arrowStartY) * arrowProgress;

        return (
          <React.Fragment key={i}>
            {/* Arrow SVG */}
            <svg
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
            >
              <line
                x1={arrowStartX}
                y1={arrowStartY}
                x2={currentEndX}
                y2={currentEndY}
                stroke={COLORS.textMuted}
                strokeWidth={2}
                markerEnd={arrowProgress > 0.8 ? 'url(#arrowhead)' : undefined}
              />
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.textMuted} />
                </marker>
              </defs>
            </svg>

            {/* Spoke card */}
            <div
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 160,
                height: 70,
                backgroundColor: spoke.color,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                opacity: spokeOpacity,
                transform: `scale(${spokeScale})`,
                boxShadow: LAYOUT.cardShadow,
                zIndex: 5,
              }}
            >
              <span style={{ fontSize: 24 }}>{spoke.icon}</span>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.body,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  color: COLORS.textPrimary,
                }}
              >
                {spoke.title}
              </span>
            </div>
          </React.Fragment>
        );
      })}

      {/* Bottom label */}
      {bottomLabel && (
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.h3,
            fontWeight: TYPOGRAPHY.weights.bold,
            color: COLORS.textPrimary,
            opacity: interpolate(frame, [50, 65], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {bottomLabel}
        </div>
      )}
    </AbsoluteFill>
  );
};
