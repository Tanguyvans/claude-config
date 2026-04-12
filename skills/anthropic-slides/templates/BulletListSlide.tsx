import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, TYPOGRAPHY, LAYOUT } from './theme';

interface BulletItem {
  icon?: string;
  text: string;
  subtext?: string;
}

export const BulletListSlide: React.FC<{
  title: string;
  items: BulletItem[];
  accentColor?: string;
}> = ({ title, items, accentColor = COLORS.blue }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const titleX = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' });

  // Accent bar
  const barHeight = interpolate(frame, [0, 20], [0, 100], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        padding: LAYOUT.padding,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 6,
          height: `${barHeight}%`,
          backgroundColor: accentColor,
          borderRadius: '0 3px 3px 0',
          transition: 'height 0.3s',
        }}
      />

      <h1
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.h1,
          fontWeight: TYPOGRAPHY.weights.bold,
          color: COLORS.textPrimary,
          opacity: titleOpacity,
          transform: `translateX(${titleX}px)`,
          marginBottom: 48,
        }}
      >
        {title}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 20 }}>
        {items.map((item, i) => {
          const delay = 15 + i * 8;
          const itemOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const itemX = interpolate(frame, [delay, delay + 12], [30, 0], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
              }}
            >
              {item.icon ? (
                <span style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</span>
              ) : (
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: accentColor,
                    marginTop: 10,
                    flexShrink: 0,
                  }}
                />
              )}
              <div>
                <div
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.bodyLarge,
                    fontWeight: TYPOGRAPHY.weights.medium,
                    color: COLORS.textPrimary,
                    lineHeight: TYPOGRAPHY.lineHeight.normal,
                  }}
                >
                  {item.text}
                </div>
                {item.subtext && (
                  <div
                    style={{
                      fontFamily: TYPOGRAPHY.fontFamily,
                      fontSize: TYPOGRAPHY.sizes.body,
                      color: COLORS.textMuted,
                      marginTop: 4,
                    }}
                  >
                    {item.subtext}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
