// Carousel 1: Comment utiliser graphify (sketchy style)

function C1_Cover({ format, handle }) {
  const isTall = format === 'tiktok';
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={1} total={7} format={format} />
      <SlideBody format={format}>
        <Marginalia rotate={-2} style={{ fontSize: 64, color: ORANGE, fontWeight: 700, whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
          ✶ tuto github
        </Marginalia>
        <Title size={isTall ? 220 : 200}>
          Comment<br/>utiliser<br/>
          <Highlight color="#ffd27a">graphify</Highlight> ?
        </Title>
        <Body size={34} color={INK}>
          Le repo qui transforme n'importe quel code<br/>
          en <Highlight>graphe interactif</Highlight> — expliqué en 7 slides.
        </Body>
        <StickyNote rotate={-3} style={{ alignSelf: 'flex-start', maxWidth: 560, marginTop: 20 }}>
          💡 À garder sous la main quand tu plonges<br/>dans un repo inconnu.
        </StickyNote>
      </SlideBody>
      <SlideFooter format={format} tag="# 01 · intro" />
    </SlideFrame>
  );
}

function C1_Why({ format, handle }) {
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={2} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ pourquoi c'est utile
        </div>
        <Title size={82}>
          Lire un gros repo,<br/>
          c'est chercher une aiguille<br/>
          <Highlight>dans un dossier.</Highlight>
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 12 }}>
          {[
            ['onboarding', 'comprendre un codebase en 10 min'],
            ['refacto', 'voir les dépendances avant de casser'],
            ['review', 'repérer les modules couplés d\'un coup'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
              <Code bg={INK} color={PAPER} size={26}>{k}</Code>
              <Body size={30} color={INK}>→ {v}</Body>
            </div>
          ))}
        </div>
      </SlideBody>
      <SlideFooter format={format} tag="# 02 · problème" />
    </SlideFrame>
  );
}

function C1_Screenshot({ format, handle }) {
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={3} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ à quoi ça ressemble
        </div>
        <Title size={72}>
          Ton repo devient<br/>
          un <Highlight>graphe navigable.</Highlight>
        </Title>
        <SketchImage label="screenshot — graphe du repo" height={format === 'tiktok' ? 780 : 560} rotate={-0.5} />
        <Body size={28}>
          Chaque nœud = un fichier. Chaque arête = un import.<br/>
          Clique pour zoomer, glisse pour panner.
        </Body>
      </SlideBody>
      <SlideFooter format={format} tag="# 03 · preview" />
    </SlideFrame>
  );
}

function C1_Steps({ format, handle }) {
  return (
    <SlideFrame format={format} tone="#f3ecda">
      <SlideHeader handle={handle} index={4} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ setup en 3 commandes
        </div>
        <Title size={96}>
          Tu lances,<br/>ça mouline,<br/>
          <Highlight>c'est fini.</Highlight>
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
          {[
            'git clone graphify/graphify',
            'npm install && npm run build',
            'graphify ./mon-repo --open',
          ].map((cmd, i) => (
            <SketchBox key={i} seed={i + 3} thick filled={INK} style={{
              padding: '18px 22px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 28, color: '#ffd27a',
              display: 'flex', gap: 16, alignItems: 'center',
            }}>
              <span style={{ color: INK_FAINT }}>0{i+1}</span>
              <span style={{ color: '#888' }}>$</span>
              <span>{cmd}</span>
            </SketchBox>
          ))}
        </div>
      </SlideBody>
      <SlideFooter format={format} tag="# 04 · install" />
    </SlideFrame>
  );
}

function C1_BeforeAfter({ format, handle }) {
  const isTall = format === 'tiktok';
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={5} total={7} format={format} />
      <SlideBody format={format}>
        <Title size={92}>avant <span style={{ color: INK_FAINT }}>/</span> après</Title>
        <div style={{
          display: 'flex',
          flexDirection: isTall ? 'column' : 'row',
          gap: 24, flex: 1, marginTop: 8,
        }}>
          <SketchBox thick seed={7} filled={PAPER} style={{
            flex: 1, padding: '28px 26px',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CrossMark size={36} />
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: 44, fontWeight: 700 }}>avant</span>
            </div>
            <Code bg={INK} color={PAPER} size={24}>tree -L 3 | head -100</Code>
            <Body size={26} color={INK}>
              Liste plate. Tu devines les dépendances.<br/>
              Tu ouvres 12 fichiers pour comprendre une fonction.
            </Body>
          </SketchBox>
          <SketchBox thick seed={9} filled="#fff4d6" style={{
            flex: 1, padding: '28px 26px',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckMark size={36} />
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: 44, fontWeight: 700, color: ORANGE }}>après</span>
            </div>
            <Code bg={INK} color="#ffd27a" size={24}>graphify .</Code>
            <Body size={26} color={INK}>
              Graphe navigable. Clusters, fichiers orphelins,<br/>
              imports circulaires — visibles en un clin d'œil.
            </Body>
          </SketchBox>
        </div>
      </SlideBody>
      <SlideFooter format={format} tag="# 05 · comparaison" />
    </SlideFrame>
  );
}

function C1_Tips({ format, handle }) {
  return (
    <SlideFrame format={format}>
      <SlideHeader handle={handle} index={6} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ 3 flags qui changent tout
        </div>
        <Title size={72}>
          Les options que personne<br/>
          ne lit <Highlight>dans le README.</Highlight>
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 16 }}>
          {[
            ['--depth=2', 'Limite la profondeur. Obligatoire sur un monorepo.'],
            ['--ignore=tests', 'Exclut un dossier. Le graphe devient lisible.'],
            ['--focus=auth/', 'Isole un sous-module. Ma feature préférée.'],
          ].map(([flag, desc]) => (
            <div key={flag} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <WavyUnderline width={6} color={ORANGE} style={{ marginTop: 30, width: 24, height: 24 }} />
              <div style={{ flex: 1 }}>
                <Code bg="transparent" color={INK} size={30} style={{ padding: 0, borderBottom: `2px solid ${ORANGE}` }}>
                  {flag}
                </Code>
                <Body size={26} style={{ marginTop: 6 }}>{desc}</Body>
              </div>
            </div>
          ))}
        </div>
      </SlideBody>
      <SlideFooter format={format} tag="# 06 · astuces" />
    </SlideFrame>
  );
}

function C1_CTA({ format, handle }) {
  return (
    <SlideFrame format={format} tone="#fff4d6">
      <SlideHeader handle={handle} index={7} total={7} format={format} />
      <SlideBody format={format}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 64, fontWeight: 700, color: ORANGE }}>
          ✶ à toi de jouer
        </div>
        <Title size={180}>
          Teste.<br/>Save.<br/>
          <Highlight color={ORANGE}>Partage.</Highlight>
        </Title>
        <Body size={32} color={INK}>
          Si ce post t'a servi, garde-le pour la prochaine fois<br/>
          que tu plonges dans un repo inconnu.
        </Body>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 24 }}>
          {['💾 save', '↻ share', `+ follow ${handle}`].map((t, i) => (
            <SketchBox key={i} thick seed={i + 2} filled={PAPER} style={{
              padding: '10px 18px',
              fontFamily: 'Caveat, cursive', fontSize: 32, color: INK,
            }}>{t}</SketchBox>
          ))}
        </div>
      </SlideBody>
    </SlideFrame>
  );
}

function Carousel1({ format, handle }) {
  const slides = [C1_Cover, C1_Why, C1_Screenshot, C1_Steps, C1_BeforeAfter, C1_Tips, C1_CTA];
  return (
    <CarouselRow
      title="01 · Comment utiliser graphify"
      subtitle={`tuto · ${FORMATS[format].label}`}
      format={format}
    >
      {slides.map((S, i) => <S key={i} format={format} handle={handle} />)}
    </CarouselRow>
  );
}

Object.assign(window, { Carousel1 });
