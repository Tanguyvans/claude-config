import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, TYPOGRAPHY, LAYOUT } from './theme';

interface FeatureCard {
  icon: string;
  title: string;
  items: string[];
  color: string;
}

export const FeatureCardsSlide: React.FC<{
  title: string;
  cards: FeatureCard[];
}> = ({ title, cards }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 15], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        padding: LAYOUT.padding,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.h1,
          fontWeight: TYPOGRAPHY.weights.bold,
          color: COLORS.textPrimary,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 60,
        }}
      >
        {title}
      </h1>

      <div
        style={{
          display: 'flex',
          gap: 32,
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
        }}
      >
        {cards.map((card, i) => {
          const delay = 15 + i * 8;
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const cardY = interpolate(frame, [delay, delay + 15], [30, 0], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: card.color,
                borderRadius: LAYOUT.cardRadius,
                padding: 40,
                width: 340,
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                boxShadow: LAYOUT.cardShadow,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Icon container */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  borderRadius: 16,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 40,
                  marginBottom: 20,
                }}
              >
                {card.icon}
              </div>

              <h3
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.h3,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  color: COLORS.textPrimary,
                  marginBottom: 20,
                  textAlign: 'center',
                }}
              >
                {card.title}
              </h3>

              {card.items.map((item, j) => {
                const itemDelay = delay + 10 + j * 4;
                const itemOpacity = interpolate(frame, [itemDelay, itemDelay + 10], [0, 1], {
                  extrapolateRight: 'clamp',
                });

                return (
                  <div
                    key={j}
                    style={{
                      fontFamily: TYPOGRAPHY.fontFamily,
                      fontSize: TYPOGRAPHY.sizes.body,
                      color: COLORS.textSecondary,
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      borderRadius: 8,
                      padding: '10px 20px',
                      marginBottom: 8,
                      opacity: itemOpacity,
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
