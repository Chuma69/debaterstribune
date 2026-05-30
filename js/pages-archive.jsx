// pages-archive.jsx
const { useState:useSAr, useEffect:useEAr } = React;

function ArchivePage({ section }){
  const [filter, setFilter] = useSAr("all");
  const sec = sectionById(section);
  const isAll = section === "all" || !sec;
  const articles = articlesBySection(isAll ? "all" : section);
  useEAr(()=>{ window.scrollTo(0,0); },[section]);

  const filtered = filter === "all" ? articles :
    articles.filter(a => (a.tags||[]).includes(filter) || a.circuit === filter || a.author === filter);

  const allTags = [...new Set(articles.flatMap(a=>a.tags||[]))].slice(0,10);

  const title = isAll ? "All Stories" : sec.name;
  const blurb = isAll ? "Every essay, history and reflection published in the Tribune — in reverse chronological order." : sec.blurb;

  return (
    <div className="route-enter">
      <header style={{paddingTop:"clamp(48px,7vw,88px)",paddingBottom:"clamp(32px,4vw,56px)"}}>
        <div className="wrap">
          <div className="kicker">{isAll ? "Archive" : "Section · " + (sec?.num||"")}</div>
          <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(40px,6vw,80px)",
            lineHeight:0.98,letterSpacing:"-0.025em",marginTop:16,maxWidth:"14ch"}}>{title}</h1>
          <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(17px,1.5vw,20px)",lineHeight:1.55,
            color:"var(--fg-muted)",marginTop:18,maxWidth:"52ch"}}>{blurb}</p>

          {!isAll && (
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:28}}>
              {SECTIONS.map(s=>(
                <a key={s.id} href={"#/section/"+s.id} onClick={(e)=>{e.preventDefault();go("/section/"+s.id);}}
                  className="btn" style={{fontSize:12,padding:"9px 18px",
                    background:section===s.id?"var(--accent)":"transparent",
                    color:section===s.id?"#fff":"var(--fg)",
                    border:"1px solid "+(section===s.id?"var(--accent)":"var(--hair)")}}>{s.name}</a>
              ))}
            </div>
          )}
        </div>
      </header>

      {allTags.length > 0 && (
        <div className="wrap" style={{marginBottom:32}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <span className="label" style={{marginRight:4}}>Filter:</span>
            <button onClick={()=>setFilter("all")} className="mono"
              style={{fontSize:10.5,letterSpacing:"0.1em",textTransform:"uppercase",
                padding:"6px 14px",border:"1px solid var(--hair)",borderRadius:2,
                background:filter==="all"?"var(--accent)":"transparent",
                color:filter==="all"?"#fff":"var(--fg-muted)"}}>All</button>
            {allTags.map(tag=>(
              <button key={tag} onClick={()=>setFilter(tag===filter?"all":tag)} className="mono"
                style={{fontSize:10.5,letterSpacing:"0.1em",textTransform:"uppercase",
                  padding:"6px 14px",border:"1px solid var(--hair)",borderRadius:2,
                  background:filter===tag?"var(--accent)":"transparent",
                  color:filter===tag?"#fff":"var(--fg-muted)"}}>{tag}</button>
            ))}
          </div>
        </div>
      )}

      <div className="wrap">
        <hr className="hairline" style={{marginBottom:40}}/>
        {filtered.length === 0 ? (
          <p style={{fontFamily:"var(--ff-body)",fontSize:18,color:"var(--fg-muted)",padding:"40px 0"}}>
            No stories match that filter.
          </p>
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
