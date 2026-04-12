import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, TYPOGRAPHY } from './theme';

export const TransitionSlide: React.FC<{
  text: string;
  backgroundColor?: string;
  textColor?: string;
}> = ({
  text,
  backgroundColor = COLORS.background,
  textColor = COLORS.textPrimary,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 20], [0.9, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.hero,
          fontWeight: TYPOGRAPHY.weights.bold,
          color: textColor,
          textAlign: 'center',
          opacity,
          transform: `scale(${scale})`,
          maxWidth: 1200,
          lineHeight: TYPOGRAPHY.lineHeight.tight,
        }}
      >
        {text}
      </h1>
    </AbsoluteFill>
  );
};
