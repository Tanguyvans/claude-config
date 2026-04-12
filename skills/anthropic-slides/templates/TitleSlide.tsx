import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, TYPOGRAPHY, LAYOUT } from './theme';

export const TitleSlide: React.FC<{
  title: string;
  subtitle?: string;
  brandLabel?: string;
}> = ({ title, subtitle, brandLabel = 'claude' }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: 'clamp' });
  const titleScale = interpolate(frame, [0, 20], [0.95, 1], { extrapolateRight: 'clamp' });

  const subtitleOpacity = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleY = interpolate(frame, [12, 28], [20, 0], { extrapolateRight: 'clamp' });

  const brandOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: LAYOUT.padding,
      }}
    >
      <h1
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.hero,
          fontWeight: TYPOGRAPHY.weights.bold,
          color: COLORS.textPrimary,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          margin: 0,
          lineHeight: TYPOGRAPHY.lineHeight.tight,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.h3,
            fontWeight: TYPOGRAPHY.weights.regular,
            color: COLORS.textSecondary,
            textAlign: 'center',
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 24,
          }}
        >
          {subtitle}
        </p>
      )}

      {brandLabel && (
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            fontFamily: TYPOGRAPHY.brandFont,
            fontSize: TYPOGRAPHY.sizes.h3,
            fontWeight: TYPOGRAPHY.weights.bold,
            color: COLORS.textPrimary,
            opacity: brandOpacity,
            letterSpacing: -0.5,
          }}
        >
          {brandLabel}
        </div>
      )}
    </AbsoluteFill>
  );
};
