// pages-archive.jsx
const { useState:useSAr, useEffect:useEAr, useMemo:useMMAr } = React;

function ArchivePage({ section }){
  const [activeSection, setActiveSection] = useSAr(section === "all" || !sectionById(section) ? "all" : section);
  const [q, setQ] = useSAr("");
  useEAr(()=>{ window.scrollTo(0,0); },[section]);

  // Sync active section chip when URL changes
  useEAr(()=>{
    setActiveSection(section === "all" || !sectionById(section) ? "all" : section);
    setQ("");
  },[section]);

  const filtered = useMMAr(()=>{
    let list = activeSection === "all" ? ARTICLES : ARTICLES.filter(a => a.section === activeSection);
    if(q.trim().length >= 2){
      const query = q.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.dek.toLowerCase().includes(query) ||
        (contributor(a.author)?.name||"").toLowerCase().includes(query)
      );
    }
    return list;
  },[activeSection, q]);

  const Chip = ({id, label}) => {
    const active = activeSection === id;
    return (
      <button onClick={()=>{ setActiveSection(id); go("/section/"+id); }}
        className="mono" style={{
          fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",
          padding:"9px 16px",borderRadius:2,
          border:"1px solid "+(active?"var(--accent)":"var(--hair)"),
          background:active?"var(--accent)":"transparent",
          color:active?"#fff":"var(--fg-muted)",
          transition:"all .2s"
        }}>{label}</button>
    );
  };

  const title = activeSection === "all" ? "All Stories" : (sectionById(activeSection)?.name || "All Stories");
  const blurb = activeSection === "all"
    ? "Every essay, history and reflection published in the Tribune — in reverse chronological order."
    : sectionById(activeSection)?.blurb;

  return (
    <div className="route-enter">
      <header style={{paddingTop:"clamp(48px,7vw,88px)",paddingBottom:"clamp(32px,4vw,48px)"}}>
        <div className="wrap">
          <div className="kicker">Archive</div>
          <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(40px,6vw,80px)",
            lineHeight:0.98,letterSpacing:"-0.025em",marginTop:16,maxWidth:"14ch"}}>{title}</h1>
          <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(17px,1.5vw,20px)",lineHeight:1.55,
            color:"var(--fg-muted)",marginTop:18,maxWidth:"52ch"}}>{blurb}</p>
        </div>
      </header>

      {/* filter bar */}
      <div style={{position:"sticky",top:0,zIndex:40,
        background:"color-mix(in oklab, var(--bg), transparent 4%)",
        backdropFilter:"blur(10px)",
        borderTop:"1px solid var(--hair)",borderBottom:"1px solid var(--hair)"}}>
        <div className="wrap" style={{display:"flex",gap:10,alignItems:"center",
          flexWrap:"wrap",padding:"12px 32px"}}>
          <Chip id="all"       label="All" />
          <Chip id="essays"    label="Essays" />
          <Chip id="histories" label="Histories" />
          <Chip id="beyond"    label="Beyond" />
          <div style={{flex:1}}/>
          <div style={{position:"relative",display:"flex",alignItems:"center"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)"
              strokeWidth="2" style={{position:"absolute",left:10,pointerEvents:"none"}}>
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Search stories…"
              style={{paddingLeft:32,paddingRight:14,paddingTop:9,paddingBottom:9,
                width:"min(240px,100%)",border:"1px solid var(--hair)",borderRadius:2,
                background:"transparent",outline:"none",fontSize:13,
                fontFamily:"var(--ff-sans)",color:"var(--fg)"}}/>
          </div>
        </div>
      </div>

      <div className="wrap" style={{paddingTop:"clamp(32px,4vw,52px)"}}>
        <div className="label" style={{marginBottom:"clamp(20px,2.5vw,32px)"}}>
          {filtered.length} {filtered.length===1?"story":"stories"}
        </div>
        <hr className="hairline" style={{marginBottom:40}}/>

        {filtered.length === 0 ? (
          <div style={{padding:"clamp(40px,6vw,80px) 0",textAlign:"center"}}>
            <p style={{fontFamily:"var(--ff-display)",fontStyle:"italic",fontSize:24,color:"var(--fg-muted)"}}>
              No stories match.
            </p>
            <button onClick={()=>{setActiveSection("all");setQ("");}}
              className="btn btn-ghost" style={{marginTop:20}}>Clear filters</button>
          </div>
        ) : (
          <>
            {filtered[0] && (
              <div style={{marginBottom:"clamp(40px,5vw,64px)"}}>
                <ArticleCard slug={filtered[0].slug} variant="wide"/>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"clamp(40px,6vw,96px)"}}>
              {filtered.slice(1).map(a=><ArticleCard key={a.slug} slug={a.slug} variant="text"/>)}
            </div>
          </>
        )}
      </div>

      <div style={{marginTop:"clamp(64px,9vw,120px)"}}><Newsletter/></div>
    </div>
  );
}

Object.assign(window, { ArchivePage });
