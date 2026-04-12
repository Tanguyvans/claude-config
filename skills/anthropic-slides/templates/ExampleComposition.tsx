import React from 'react';
import { Series } from 'remotion';
import { COLORS } from './theme';
import { TitleSlide } from './TitleSlide';
import { FeatureCardsSlide } from './FeatureCardsSlide';
import { HubDiagramSlide } from './HubDiagramSlide';
import { BulletListSlide } from './BulletListSlide';
import { TransitionSlide } from './TransitionSlide';

/**
 * Example: Recreating the "Claude Cowork" presentation from the screenshots.
 * Each slide is a Series.Sequence with a durationInFrames at 30fps.
 */
export const ClaudeCoworkVideo: React.FC = () => {
  return (
    <Series>
      {/* Slide 1: Title */}
      <Series.Sequence durationInFrames={120}>
        <TitleSlide
          title="Claude Cowork"
          subtitle="Collaborate with AI, together"
        />
      </Series.Sequence>

      {/* Slide 2: Hub Diagram - Claude Cowork ecosystem */}
      <Series.Sequence durationInFrames={180}>
        <HubDiagramSlide
          hubTitle="Cowork"
          hubIcon="👥🤖"
          spokes={[
            { icon: '💬', title: 'Team Chat', color: COLORS.blue },
            { icon: '📄', title: 'Shared Docs', color: COLORS.green },
            { icon: '🛡️', title: 'Admin Tools', color: COLORS.pink },
            { icon: '📚', title: 'Knowledge Base', color: COLORS.yellow },
            { icon: '🧩', title: 'Integrations', color: COLORS.purple },
            { icon: '⚙️', title: 'Workflows', color: COLORS.purple },
          ]}
          bottomLabel="data and shared context"
        />
      </Series.Sequence>

      {/* Slide 3: Transition */}
      <Series.Sequence durationInFrames={60}>
        <TransitionSlide text="3 Ways to Claude" />
      </Series.Sequence>

      {/* Slide 4: Feature Cards */}
      <Series.Sequence durationInFrames={150}>
        <FeatureCardsSlide
          title="3 Ways to Claude"
          cards={[
            {
              icon: '💬',
              title: 'Chat',
              items: ['Ask', 'Write', 'Research'],
              color: COLORS.blue,
            },
            {
              icon: '👥',
              title: 'Cowork',
              items: ['Collab', 'Projects', 'Shared'],
              color: COLORS.yellow,
            },
            {
              icon: '⌨️',
              title: 'Code',
              items: ['CLI', 'Build', 'Deploy'],
              color: COLORS.green,
            },
          ]}
        />
      </Series.Sequence>

      {/* Slide 5: Bullet details */}
      <Series.Sequence durationInFrames={150}>
        <BulletListSlide
          title="What makes Cowork special"
          accentColor={COLORS.yellow}
          items={[
            {
              icon: '🔗',
              text: 'Shared context across your team',
              subtext: 'Everyone sees the same information',
            },
            {
              icon: '🤖',
              text: 'AI-native collaboration',
              subtext: 'Claude participates as a team member',
            },
            {
              icon: '📊',
              text: 'Integrated workflows',
              subtext: 'Connect your existing tools seamlessly',
            },
            {
              icon: '🔒',
              text: 'Enterprise-grade security',
              subtext: 'Admin controls and data governance built in',
            },
          ]}
        />
      </Series.Sequence>

      {/* Slide 6: Closing */}
      <Series.Sequence durationInFrames={90}>
        <TitleSlide
          title="Start collaborating today"
          subtitle="claude.ai/cowork"
          brandLabel="claude"
        />
      </Series.Sequence>
    </Series>
  );
};

/**
 * Root.tsx registration example:
 *
 * import { Composition } from 'remotion';
 * import { ClaudeCoworkVideo } from './compositions/ClaudeCoworkVideo';
 *
 * export const RemotionRoot: React.FC = () => {
 *   return (
 *     <Composition
 *       id="ClaudeCowork"
 *       component={ClaudeCoworkVideo}
 *       durationInFrames={750}  // sum of all sequence durations
 *       fps={30}
 *       width={1920}
 *       height={1080}
 *     />
 *   );
 * };
 */
