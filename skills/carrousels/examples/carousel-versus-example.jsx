// Carousel 3: Hermes vs OpenClaw — sketchy, FR + EN

const C3_COPY = {
  fr: {
    kicker: '✶ versus · agents open-source',
    coverSub: 'Deux agents open-source. Un seul survit dans ton terminal.',
    s2K: '✶ le contexte',
    s2T: 'Pourquoi tout le monde en parle cette semaine.',
    s2B: 'Les deux ont dépassé 10k⭐ en 30 jours. Même promesse : un agent CLI 100% local qui pilote shell, éditeur, navigateur. Mais deux philosophies opposées.',
    s3K: '✶ le match',
    s3T: 'Les specs, mises à plat.',
    rows: [
      ['License', 'MIT', 'Apache 2.0'],
      ['Modèle', 'BYO api key', 'Llama 3 local'],
      ['Install', '1 binaire', 'Docker + 4Go'],
      ['Plugins', '120+', '12'],
      ['Vitesse', 'Rapide', 'Lent (local)'],
    ],
    s4K: '✶ démo',
    s4T: 'Le même prompt, deux mondes.',
    s4Sub: 'prompt : "refactor ce fichier en plus petites fonctions"',
    s5T: 'Quand choisir quoi.',
    col1T: 'prends hermes si…',
    col1: ['tu veux du setup rapide', 'tu as déjà une api key', 'tu bosses sur du code client', 'tu utilises plein d\'outils'],
    col2T: 'prends openclaw si…',
    col2: ['tu veux 100% local', 'tu n\'as pas de budget api', 'tu bosses sur du sensible', 'tu as un gpu correct'],
    s6K: '✶ mon verdict',
    s6T: 'Je garde les deux.',
    s6B: '80% du temps j\'utilise hermes — c\'est le daily driver. Pour le code proprio et les audits sécu, openclaw prend le relais en local. Pas concurrents : complémentaires.',
    s7T: 'Et toi ?',
    s7Sub: 'Team hermes ou team openclaw ? Commente, je lis tout.',
    tags: ['💬 comment', '💾 save', '+ follow'],
  },
  en: {
    kicker: '✶ versus · open-source agents',
    coverSub: 'Two open-source agents. Only one survives in your terminal.',
    s2K: '✶ context',
    s2T: 'Why everyone\'s talking about them this week.',
    s2B: 'Both crossed 10k⭐ in 30 days. Same promise: a 100% local CLI agent that drives shell, editor, browser. But opposite philosophies.',
    s3K: '✶ the match',
    s3T: 'Specs, side by side.',
    rows: [
      ['License', 'MIT', 'Apache 2.0'],
      ['Model', 'BYO api key', 'Llama 3 local'],
      ['Install', '1 binary', 'Docker + 4Gb'],
      ['Plugins', '120+', '12'],
      ['Speed', 'Fast', 'Slow (local)'],
    ],
    s4K: '✶ demo',
    s4T: 'Same prompt, two worlds.',
    s4Sub: 'prompt: "refactor this file into smaller functions"',
    s5T: 'When to pick which.',
    col1T: 'pick hermes if…',
    col1: ['you want fast setup', 'you already have an api key', 'you work on client code', 'you use many tools'],
    col2T: 'pick openclaw if…',
    col2: ['you need 100% local', 'you have no api budget', 'you work with sensitive data', 'you have a decent gpu'],
    s6K: '✶ my verdict',
    s6T: 'I keep both.',
    s6B: '80% of the time I reach for hermes — it\'s the daily driver. For proprietary code and security audits, openclaw takes over locally. Not competitors : complementary.',
    s7T: 'You?',
    s7Sub: 'Team hermes or team openclaw? Comment — I read everything.',
    tags: ['💬 comment', '💾 save', '+ follow'],
  },
};

function C3_Cover({ format, handle, lang }) {
  const t = C3_COPY[lang];
  const isTall = format === 'tiktok';
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={1} total={7} format={format} />
      <SlideBody format={format}>
        <Marginalia rotate={-2} style={{ fontSize: 64, color: ORANGE, fontWeight: 700, whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
          {t.kicker}
        </Marginalia>
        <Title size={isTall ? 200 : 180}>
          <Highlight color="#ffd27a">hermes</Highlight><br/>
          <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 400, color: INK_FAINT, fontStyle: 'italic' }}>vs</span><br/>
          <Highlight color="#d5e6b5">openclaw</Highlight>
        </Title>
        <Body size={34} color={INK}>{t.coverSub}</Body>
      </SlideBody>
      <SlideFooter format={format} tag="# 01 · versus" text={lang === 'fr' ? 'swipe →' : 'swipe →'} />
    </SlideFrame>
  );
}

function C3_Context({ format, handle, lang }) {
  const t = C3_COPY[lang];
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={2} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>{t.s2K}</div>
        <Title size={80}>{t.s2T}</Title>
        <Body size={30} color={INK}>{t.s2B}</Body>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 16 }}>
          {['+10k ⭐ / 30d', 'local-first', 'cli-native'].map((tag, i) => (
            <SketchBox key={i} thick seed={i + 3} filled={i === 0 ? '#ffd27a' : i === 1 ? '#fff4d6' : '#d5e6b5'} style={{
              padding: '8px 16px',
              fontFamily: 'Caveat, cursive', fontSize: 28, color: INK,
            }}>{tag}</SketchBox>
          ))}
        </div>
      </SlideBody>
      <SlideFooter format={format} tag="# 02 · context" />
    </SlideFrame>
  );
}

function C3_Specs({ format, handle, lang }) {
  const t = C3_COPY[lang];
  return (
    <SlideFrame format={format} tone="#f3ecda">
      <SlideHeader handle={handle} index={3} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>{t.s3K}</div>
        <Title size={72}>{t.s3T}</Title>
        <SketchBox thick seed={11} filled={PAPER} style={{ marginTop: 8, overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr',
            fontFamily: 'Caveat, cursive', fontSize: 32, fontWeight: 700,
            background: INK, color: PAPER,
          }}>
            <div style={{ padding: '14px 22px' }}>—</div>
            <div style={{ padding: '14px 22px', color: '#ffd27a', borderLeft: `1px dashed ${PAPER}55` }}>hermes</div>
            <div style={{ padding: '14px 22px', color: '#d5e6b5', borderLeft: `1px dashed ${PAPER}55` }}>openclaw</div>
          </div>
          {t.rows.map(([k, a, b], i) => (
            <div key={k} style={{
              display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr',
              borderTop: `1px dashed ${INK}33`,
              fontFamily: 'Kalam, cursive', fontSize: 28, color: INK,
            }}>
              <div style={{ padding: '14px 22px', fontWeight: 700 }}>{k}</div>
              <div style={{ padding: '14px 22px', borderLeft: `1px dashed ${INK}22` }}>{a}</div>
              <div style={{ padding: '14px 22px', borderLeft: `1px dashed ${INK}22` }}>{b}</div>
            </div>
          ))}
        </SketchBox>
      </SlideBody>
      <SlideFooter format={format} tag="# 03 · specs" />
    </SlideFrame>
  );
}

function C3_Demo({ format, handle, lang }) {
  const t = C3_COPY[lang];
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={4} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>{t.s4K}</div>
        <Title size={80}>{t.s4T}</Title>
        <SketchBox thick seed={13} filled="#fff4d6" style={{
          padding: '16px 20px',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 22,
          color: INK,
          borderLeft: `4px solid ${ORANGE}`,
        }}>{t.s4Sub}</SketchBox>
        <SketchImage label="side-by-side terminal demo" height={format === 'tiktok' ? 720 : 500} rotate={-0.5} />
      </SlideBody>
      <SlideFooter format={format} tag="# 04 · demo" />
    </SlideFrame>
  );
}

function C3_When({ format, handle, lang }) {
  const t = C3_COPY[lang];
  const isTall = format === 'tiktok';
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={5} total={7} format={format} />
      <SlideBody format={format}>
        <Title size={90}>{t.s5T}</Title>
        <div style={{
          display: 'flex',
          flexDirection: isTall ? 'column' : 'row',
          gap: 22, flex: 1, marginTop: 8,
        }}>
          {[
            { title: t.col1T, items: t.col1, fill: '#ffd27a', seed: 15 },
            { title: t.col2T, items: t.col2, fill: '#d5e6b5', seed: 17 },
          ].map((col, i) => (
            <SketchBox key={i} thick seed={col.seed} filled={col.fill} style={{
              flex: 1, padding: '26px 26px',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{
                fontFamily: 'Caveat, cursive', fontSize: 44, fontWeight: 700,
                color: INK, lineHeight: 1.05,
                borderBottom: `2px solid ${INK}`, paddingBottom: 12,
              }}>{col.title}</div>
              {col.items.map(item => (
                <div key={item} style={{
                  fontFamily: 'Kalam, cursive', fontSize: 26, color: INK,
                  display: 'flex', gap: 10, lineHeight: 1.35,
                }}>
                  <span style={{ color: ORANGE, fontWeight: 700 }}>→</span>
                  <span>{item}</span>
                </div>
              ))}
            </SketchBox>
          ))}
        </div>
      </SlideBody>
      <SlideFooter format={format} tag="# 05 · choice" />
    </SlideFrame>
  );
}

function C3_Verdict({ format, handle, lang }) {
  const t = C3_COPY[lang];
  return (
    <SlideFrame format={format} tone="#f3ecda">
      <SlideHeader handle={handle} index={6} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>{t.s6K}</div>
        <Title size={120}>
          <Highlight>{t.s6T}</Highlight>
        </Title>
        <Body size={30} color={INK}>{t.s6B}</Body>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 16 }}>
          <SketchBox thick seed={19} filled="#ffd27a" style={{
            padding: '10px 18px', fontFamily: 'Caveat, cursive', fontSize: 32,
          }}>80% hermes</SketchBox>
          <SketchBox thick seed={21} filled="#d5e6b5" style={{
            padding: '10px 18px', fontFamily: 'Caveat, cursive', fontSize: 32,
          }}>20% openclaw</SketchBox>
        </div>
      </SlideBody>
      <SlideFooter format={format} tag="# 06 · verdict" />
    </SlideFrame>
  );
}

function C3_CTA({ format, handle, lang }) {
  const t = C3_COPY[lang];
  return (
    <SlideFrame format={format} tone="#fff4d6">
      <SlideHeader handle={handle} index={7} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ à toi
        </div>
        <Title size={200}>{t.s7T}</Title>
        <Body size={32} color={INK}>{t.s7Sub}</Body>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 24 }}>
          {t.tags.map((tag, i) => (
            <SketchBox key={i} thick seed={i + 7} filled={PAPER} style={{
              padding: '10px 18px',
              fontFamily: 'Caveat, cursive', fontSize: 32, color: INK,
            }}>{i === 2 ? `${tag} ${handle}` : tag}</SketchBox>
          ))}
        </div>
      </SlideBody>
    </SlideFrame>
  );
}

function Carousel3({ format, handle, lang = 'fr' }) {
  const slides = [C3_Cover, C3_Context, C3_Specs, C3_Demo, C3_When, C3_Verdict, C3_CTA];
  return (
    <CarouselRow
      title={lang === 'fr' ? '03 · Hermes vs OpenClaw' : '03 · Hermes vs OpenClaw (EN)'}
      subtitle={`versus · ${FORMATS[format].label} · ${lang.toUpperCase()}`}
      format={format}
    >
      {slides.map((S, i) => <S key={i} format={format} handle={handle} lang={lang} />)}
    </CarouselRow>
  );
}

Object.assign(window, { Carousel3 });
