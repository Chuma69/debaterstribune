// pages-home.jsx
const { useState:useStateH } = React;

function PlayGlyph() {
  return <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><polygon points="2,1 11,6 2,11" fill="var(--accent)" /></svg>;
}

function HomeHero() {
  const a = ARTICLES.find((x) => x.feature) || ARTICLES[0];
  const au = contributor(a.author);
  return (
    <header style={{ paddingTop: "clamp(40px,6vw,76px)", paddingBottom: "clamp(40px,6vw,72px)" }}>
      <div className="wrap">
        <div className="fadeup" style={{ textAlign: "center", margin: "0 auto clamp(32px,4vw,52px)" }}>
          <div className="label" style={{ justifyContent: "center" }}>A living archive of debate culture</div>
        </div>
        <hr className="hairline" style={{ marginBottom: 0 }} />
        <a href={"#/read/" + a.slug} onClick={(e) => { e.preventDefault(); go("/read/" + a.slug); }}
          className="card-hover fadeup" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr",
            gap: "clamp(28px,4vw,64px)", alignItems: "center", paddingTop: "clamp(34px,4vw,56px)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <span className="kicker">{sectionById(a.section)?.name}</span>
              <span className="label">Featured</span>
            </div>
            <h2 style={{ fontFamily: "var(--ff-display)", fontWeight: 800,
              fontSize: "clamp(32px,4.6vw,60px)", lineHeight: 1.0, letterSpacing: "-0.022em" }}>{a.title}</h2>
            <p style={{ fontFamily: "var(--ff-body)", fontSize: "clamp(18px,1.6vw,22px)", lineHeight: 1.45,
              color: "var(--fg-muted)", marginTop: 20, maxWidth: "40ch" }}>{a.dek}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 26 }}>
              <span className="btn btn-solid">Read the story</span>
              <span className="label" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <PlayGlyph /> Listen · {a.audio}
              </span>
            </div>
            <div className="label" style={{ marginTop: 26 }}>By {au?.name} · {au?.region} · {a.date}</div>
          </div>
          <Duotone hue={a.hue} ratio="4 / 5" cover={"images/cover-" + a.slug + ".jpg"} brief={a.img} />
        </a>
      </div>
    </header>
  );
}

function LatestGrid() {
  // Show 6 articles — fills 3-col (2 rows), 2-col (3 rows), and 1-col (6 rows) cleanly
  const items = ARTICLES.filter((a) => !a.feature).slice(0, 6);
  return (
    <section className="wrap" style={{ paddingTop: "clamp(56px,8vw,104px)" }}>
      <RuleLabel num="" text="Latest" right={
        <a href="#/section/all" onClick={(e) => { e.preventDefault(); go("/section/all"); }}
          className="label" style={{ color: "var(--accent)" }}>All stories →</a>
      } />
      <hr className="hairline" style={{ margin: "16px 0 40px" }} />
      <div className="fadeup" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(24px,3vw,48px)" }}>
        {items.map((a) => <ArticleCard key={a.slug} slug={a.slug} variant="standard" />)}
      </div>
    </section>
  );
}

function SectionNavigator() {
  return (
    <section style={{ paddingTop: "clamp(64px,9vw,120px)" }}>
      <div className="wrap">
        <RuleLabel num="" text="Read by experience" />
        <hr className="hairline" style={{ margin: "16px 0 0" }} />
        <div className="fadeup">
          {SECTIONS.map((s) =>
            <a key={s.id} href={"#/section/" + s.id} onClick={(e) => { e.preventDefault(); go("/section/" + s.id); }}
              className="sec-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto",
                alignItems: "baseline", gap: "clamp(18px,3vw,48px)",
                padding: "clamp(22px,2.6vw,38px) 0", borderBottom: "1px solid var(--hair)" }}>
              <span className="mono" style={{ fontSize: 13, color: "var(--accent)" }}>{s.num}</span>
              <div>
                <div style={{ fontFamily: "var(--ff-display)", fontWeight: 700,
                  fontSize: "clamp(26px,3.4vw,44px)", lineHeight: 1, letterSpacing: "-0.015em" }} className="sec-name">{s.name}</div>
                <div style={{ fontFamily: "var(--ff-body)", fontSize: 16.5, color: "var(--fg-muted)",
                  marginTop: 10, maxWidth: "54ch" }}>{s.blurb}</div>
              </div>
              <span className="sec-arrow" style={{ fontFamily: "var(--ff-display)", fontSize: 30, transition: "transform .3s" }}>→</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function EditorSpotlight() {
  const a = articleBySlug("the-cost-of-debate");
  const au = contributor(a.author);
  const sec = sectionById(a.section);
  return (
    <section className="surface-dark" style={{ marginTop: "clamp(64px,9vw,120px)", padding: "clamp(56px,8vw,110px) 0" }}>
      <div className="wrap">
        <div className="kicker">Editor's spotlight</div>
        <a href={"#/read/" + a.slug} onClick={(e) => { e.preventDefault(); go("/read/" + a.slug); }}
          className="card-hover" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr",
            gap: "clamp(28px,4vw,64px)", alignItems: "center", marginTop: "clamp(28px,3vw,44px)" }}>
          <div>
            <h2 style={{ fontFamily: "var(--ff-display)", fontWeight: 800,
              fontSize: "clamp(30px,4.4vw,58px)", lineHeight: 1.0, letterSpacing: "-0.022em" }}>{a.title}</h2>
            <p style={{ fontFamily: "var(--ff-body)", fontStyle: "italic",
              fontSize: "clamp(19px,1.9vw,25px)", lineHeight: 1.45,
              color: "rgba(244,242,248,0.72)", marginTop: 22, maxWidth: "44ch" }}>{a.dek}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 28 }}>
              <span className="btn btn-solid">Read the essay</span>
              <span className="label" style={{ color: "rgba(244,242,248,0.6)" }}>{sec?.name} · {au?.name}</span>
            </div>
          </div>
          <Duotone hue={a.hue} ratio="4 / 5" cover={"images/cover-" + a.slug + ".jpg"} brief={a.img} />
        </a>
      </div>
    </section>
  );
}

function MoreStories() {
  const items = ARTICLES.filter((a) => !a.feature).slice(3, 9);
  return (
    <section className="wrap" style={{ paddingTop: "clamp(56px,8vw,104px)" }}>
      <RuleLabel num="" text="More from the circuit" right={
        <a href="#/section/all" onClick={(e) => { e.preventDefault(); go("/section/all"); }}
          className="label" style={{ color: "var(--accent)" }}>See all →</a>
      } />
      <hr className="hairline" style={{ margin: "16px 0 28px" }} />
      <div className="fadeup" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "clamp(32px,5vw,80px)" }}>
        {items.map((a) => <ArticleCard key={a.slug} slug={a.slug} variant="text" />)}
      </div>
    </section>
  );
}

function ContributorsStrip(){
  const contribs = Object.values(CONTRIBUTORS)
    .map(c=>({ ...c, count: articlesByAuthor(c.id).length }))
    .sort((a,b)=>b.count - a.count);
  return (
    <section className="wrap" style={{paddingTop:"clamp(64px,9vw,120px)"}}>
      <RuleLabel num="" text="Voices" right={
        <a href="#/contributors" onClick={(e)=>{e.preventDefault();go("/contributors");}}
          className="label" style={{color:"var(--accent)"}}>View all contributors →</a>
      }/>
      <hr className="hairline" style={{margin:"16px 0 32px"}}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"clamp(12px,2vw,24px)"}}>
        {contribs.map(c=>{
          const firstArticle = articlesByAuthor(c.id)[0];
          const hue = firstArticle?.hue || 280;
          const articleCount = c.count;
          return (
            <a key={c.id} href={"#/contributor/"+c.id}
              onClick={(e)=>{e.preventDefault();go("/contributor/"+c.id);}}
              className="card-hover" style={{display:"block"}}>
              <Duotone hue={hue} ratio="1/1" compact
                style={{borderRadius:"50%",width:"100%",maxWidth:88,margin:"0 auto"}}/>
              <div style={{textAlign:"center",marginTop:13}}>
                <div style={{fontFamily:"var(--ff-display)",fontWeight:700,
                  fontSize:"clamp(13px,1.1vw,15px)",lineHeight:1.2}}>{c.name}</div>
                <div className="label" style={{marginTop:5,fontSize:9.5,lineHeight:1.4}}>{c.region}</div>
                <div className="mono" style={{marginTop:5,fontSize:9,color:"var(--accent)",letterSpacing:"0.08em"}}>
                  {articleCount} {articleCount===1?"story":"stories"}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function HomePage() {
  const ref = useReveal();
  return (
    <div ref={ref} className="route-enter">
      <HomeHero />
      <LatestGrid />
      <SectionNavigator />
      <EditorSpotlight />
      <MoreStories />
      <ContributorsStrip />
      <div style={{ marginTop: "clamp(56px,8vw,104px)" }}><Newsletter /></div>
    </div>
  );
}

Object.assign(window, { HomePage });
