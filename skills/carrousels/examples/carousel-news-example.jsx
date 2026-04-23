// Carousel 2: Claude Opus 4.7 is out (sketchy style)

function C2_Cover({ format, handle }) {
  const isTall = format === 'tiktok';
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={1} total={7} format={format} />
      <SlideBody format={format}>
        <Marginalia rotate={-2} style={{ fontSize: 64, color: ORANGE, fontWeight: 700, whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
          ● actu · il y a 2h
        </Marginalia>
        <Title size={isTall ? 240 : 220}>
          opus<br/>
          <Highlight color={ORANGE}>4.7</Highlight><br/>
          is out.
        </Title>
        <Body size={36} color={INK}>
          Ce qu'il faut retenir en 7 slides<br/>
          — <Highlight>sans le marketing</Highlight>.
        </Body>
        <StickyNote rotate={2} color="#ffd27a" style={{ alignSelf: 'flex-end', maxWidth: 480, marginTop: 12 }}>
          spoiler : un saut énorme,<br/>mais pas sur tout le monde.
        </StickyNote>
      </SlideBody>
      <SlideFooter format={format} tag="# 01 · release" />
    </SlideFrame>
  );
}

function C2_Numbers({ format, handle }) {
  return (
    <SlideFrame format={format} tone="#f3ecda">
      <SlideHeader handle={handle} index={2} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ les chiffres
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          {[
            { n: '2M', l: 'tokens de contexte', sub: 'vs 200k sur 4.5' },
            { n: '+38%', l: 'sur SWE-bench', sub: 'vs version précédente' },
            { n: '0.4s', l: 'time-to-first-token', sub: 'en streaming' },
          ].map((s, i) => (
            <div key={s.n} style={{
              borderBottom: `1.5px dashed ${INK}44`,
              paddingBottom: 18,
            }}>
              <div style={{
                fontFamily: 'Caveat, cursive', fontSize: 140, fontWeight: 700,
                lineHeight: 0.9, color: ORANGE,
              }}>{s.n}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 4 }}>
                <span style={{ fontFamily: 'Caveat, cursive', fontSize: 44, fontWeight: 700, color: INK }}>
                  {s.l}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 20, color: INK_SOFT }}>
                  {s.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SlideBody>
      <SlideFooter format={format} tag="# 02 · benchmarks" />
    </SlideFrame>
  );
}

function C2_Features({ format, handle }) {
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={3} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ ce qui est nouveau
        </div>
        <Title size={80}>
          4 trucs qui changent<br/>
          <Highlight>vraiment le jeu.</Highlight>
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 12 }}>
          {[
            ['01', 'Mode agent natif', 'Plus besoin de framework pour boucler tool → résultat → décision.'],
            ['02', 'Mémoire persistante', 'Il se souvient entre sessions. Opt-in, par projet.'],
            ['03', 'Édition vidéo', 'Input vidéo brut, output timestamps + actions.'],
            ['04', 'Sandbox execution', 'Python/Node dans un conteneur. Résultat inline.'],
          ].map(([n, title, desc]) => (
            <div key={n} style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
              <SketchBox thick seed={parseInt(n) * 3} filled={ORANGE} style={{
                width: 58, height: 58, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Caveat, cursive', fontSize: 34, fontWeight: 700, color: PAPER,
              }}>{n}</SketchBox>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'Caveat, cursive', fontSize: 42, fontWeight: 700,
                  color: INK, lineHeight: 1,
                }}>{title}</div>
                <Body size={26} style={{ marginTop: 6 }}>{desc}</Body>
              </div>
            </div>
          ))}
        </div>
      </SlideBody>
      <SlideFooter format={format} tag="# 03 · features" />
    </SlideFrame>
  );
}

function C2_Screenshot({ format, handle }) {
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={4} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ le mode agent en action
        </div>
        <Title size={68}>
          Un prompt, <Highlight>14 tool-calls</Highlight>,<br/>
          zéro intervention.
        </Title>
        <SketchImage label="console — mode agent" height={format === 'tiktok' ? 760 : 540} rotate={0.4} />
        <SketchBox thick seed={6} filled="#fff4d6" style={{
          padding: '16px 20px',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 22,
          color: INK, lineHeight: 1.5,
        }}>
          task : "build et deploy mon app"<br/>
          → 14 étapes · 3min 42s · 0 erreur
        </SketchBox>
      </SlideBody>
      <SlideFooter format={format} tag="# 04 · demo" />
    </SlideFrame>
  );
}

function C2_BeforeAfter({ format, handle }) {
  const isTall = format === 'tiktok';
  return (
    <SlideFrame format={format} tone="#f3ecda">
      <SlideHeader handle={handle} index={5} total={7} format={format} />
      <SlideBody format={format}>
        <Title size={92}>4.5 <span style={{ color: INK_FAINT }}>vs</span> 4.7</Title>
        <Body size={28} color={INK}>Le saut qui fait mal.</Body>
        <div style={{
          display: 'flex',
          flexDirection: isTall ? 'column' : 'row',
          gap: 24, flex: 1, marginTop: 8,
        }}>
          {[
            { v: '4.5', items: ['Context : 200k', 'SWE-bench : 62%', 'Agent : via SDK', 'Vidéo : non'], fill: PAPER, mark: <CrossMark size={34} /> },
            { v: '4.7', items: ['Context : 2M', 'SWE-bench : 85%', 'Agent : natif', 'Vidéo : natif'], fill: '#fff4d6', mark: <CheckMark size={34} /> },
          ].map(col => (
            <SketchBox key={col.v} thick seed={col.v.length + 4} filled={col.fill} style={{
              flex: 1, padding: '26px 26px',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {col.mark}
                <span style={{
                  fontFamily: 'Caveat, cursive', fontSize: 80, fontWeight: 700,
                  color: col.v === '4.7' ? ORANGE : INK, lineHeight: 1,
                }}>{col.v}</span>
              </div>
              {col.items.map(item => (
                <div key={item} style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 22,
                  color: INK,
                  borderTop: `1px dashed ${INK}33`, paddingTop: 10,
                }}>{item}</div>
              ))}
            </SketchBox>
          ))}
        </div>
      </SlideBody>
      <SlideFooter format={format} tag="# 05 · versus" />
    </SlideFrame>
  );
}

function C2_Catch({ format, handle }) {
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={6} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ le piège
        </div>
        <Title size={130}>
          Puissant.<br/>
          Mais <span style={{
            textDecoration: 'line-through',
            textDecorationColor: ORANGE,
            textDecorationThickness: 8,
          }}>gratuit</span>.
        </Title>
        <Body size={30} color={INK}>
          Le prix a <Highlight>doublé</Highlight> sur les tokens input.<br/>
          Au-delà de 500k tokens/session, compte <b>~$18 par run</b> d'agent.
        </Body>
        <StickyNote rotate={-2} color="#ffd27a" style={{ alignSelf: 'flex-start', maxWidth: 620, marginTop: 12 }}>
          → reste sur 4.5 si tu fais du chat simple.<br/>
          → migre sur 4.7 si tu fais des agents.
        </StickyNote>
      </SlideBody>
      <SlideFooter format={format} tag="# 06 · caveat" />
    </SlideFrame>
  );
}

function C2_CTA({ format, handle }) {
  return (
    <SlideFrame format={format} tone="#fff4d6">
      <SlideHeader handle={handle} index={7} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ ta réaction ?
        </div>
        <Title size={150}>
          Tu migres<br/>
          ou tu <Highlight color={ORANGE}>attends</Highlight> ?
        </Title>
        <Body size={32} color={INK}>
          Dis-le en commentaire. Je fais un suivi dans 2 semaines<br/>
          avec les vrais retours de prod.
        </Body>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 24 }}>
          {['💬 comment', '💾 save', `+ follow ${handle}`].map((t, i) => (
            <SketchBox key={i} thick seed={i + 5} filled={PAPER} style={{
              padding: '10px 18px',
              fontFamily: 'Caveat, cursive', fontSize: 32, color: INK,
            }}>{t}</SketchBox>
          ))}
        </div>
      </SlideBody>
    </SlideFrame>
  );
}

function Carousel2({ format, handle }) {
  const slides = [C2_Cover, C2_Numbers, C2_Features, C2_Screenshot, C2_BeforeAfter, C2_Catch, C2_CTA];
  return (
    <CarouselRow
      title="02 · Claude Opus 4.7 is out"
      subtitle={`news · ${FORMATS[format].label}`}
      format={format}
    >
      {slides.map((S, i) => <S key={i} format={format} handle={handle} />)}
    </CarouselRow>
  );
}

Object.assign(window, { Carousel2 });
