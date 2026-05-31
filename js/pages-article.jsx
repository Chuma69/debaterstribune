// pages-article.jsx
const { useState:useSA, useEffect:useEA, useRef:useRA } = React;

function parseDur(s){ if(!s) return 0; const [m,sec]=s.split(":").map(Number); return m*60+(sec||0); }
function fmt(t){ const m=Math.floor(t/60), s=Math.floor(t%60); return m+":"+String(s).padStart(2,"0"); }

function AudioPlayer({ article, author }){
  const audioRef = useRA(null);
  const hasFile = !!article.audioUrl;

  const [playing, setPlaying] = useSA(false);
  const [t, setT]             = useSA(0);
  const [total, setTotal]     = useSA(()=> parseDur(article.audio) || 0);
  const [rate, setRate]       = useSA(1);

  // ── Real audio element (when Sanity audio URL is present) ────────────────
  useEA(()=>{
    if(!hasFile) return;
    const el = audioRef.current;
    if(!el) return;
    const onMeta  = ()=> setTotal(el.duration || 0);
    const onTime  = ()=> setT(el.currentTime);
    const onEnded = ()=> setPlaying(false);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("timeupdate",     onTime);
    el.addEventListener("ended",          onEnded);
    return ()=>{
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("timeupdate",     onTime);
      el.removeEventListener("ended",          onEnded);
    };
  }, [hasFile, article.audioUrl]);

  useEA(()=>{
    if(!hasFile) return;
    const el = audioRef.current; if(!el) return;
    if(playing){ el.play(); } else { el.pause(); }
  }, [playing, hasFile]);

  useEA(()=>{
    if(!hasFile) return;
    const el = audioRef.current; if(!el) return;
    el.playbackRate = rate;
  }, [rate, hasFile]);

  // ── Simulated timer (static data fallback, no real file) ─────────────────
  useEA(()=>{
    if(hasFile || !playing) return;
    const id = setInterval(()=>{
      setT(prev=>{ const n=prev+rate; if(n>=total){ setPlaying(false); return total; } return n; });
    }, 1000);
    return ()=> clearInterval(id);
  }, [playing, rate, total, hasFile]);

  const pct = total > 0 ? (t / total) * 100 : 0;

  const seek = (e)=>{
    const r = e.currentTarget.getBoundingClientRect();
    const newT = Math.max(0, Math.min(total, ((e.clientX - r.left) / r.width) * total));
    setT(newT);
    if(hasFile && audioRef.current) audioRef.current.currentTime = newT;
  };

  const togglePlay = ()=> setPlaying(p => !p);
  const cycleRate  = ()=>{
    const next = rate === 1 ? 1.5 : rate === 1.5 ? 2 : 1;
    setRate(next);
  };

  return (
    <div style={{border:"1px solid var(--hair)",borderRadius:3,padding:"16px 18px",
      display:"flex",alignItems:"center",gap:16,
      background:"color-mix(in oklab, var(--bg), var(--accent) 3%)"}}>

      {/* hidden real audio element */}
      {hasFile && <audio ref={audioRef} src={article.audioUrl} preload="metadata" style={{display:"none"}}/>}

      <button onClick={togglePlay} aria-label={playing?"Pause":"Play"}
        className="play-btn"
        style={{flex:"0 0 auto",width:46,height:46,borderRadius:"50%",
          background:"var(--accent)",color:"#fff",display:"grid",placeItems:"center"}}>
        {playing
          ? <svg width="14" height="14" viewBox="0 0 12 12"><rect x="2" y="1" width="3" height="10" fill="#fff"/><rect x="7" y="1" width="3" height="10" fill="#fff"/></svg>
          : <svg width="14" height="14" viewBox="0 0 12 12" style={{marginLeft:2}}><polygon points="2,1 11,6 2,11" fill="#fff"/></svg>}
      </button>

      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
          <span className="label" style={{color:"var(--fg)"}}>Listen to this story</span>
          <span className="mono" style={{fontSize:11,color:"var(--fg-muted)"}}>
            {hasFile ? "read by " + (author?.name?.split(" ")[0] || "author") : "preview · no audio uploaded"}
          </span>
        </div>
        <div onClick={seek} style={{height:5,background:"var(--hair)",borderRadius:3,
          position:"relative",cursor:"pointer"}}>
          <div style={{position:"absolute",inset:0,width:pct+"%",background:"var(--accent)",borderRadius:3}}/>
          <div style={{position:"absolute",top:"50%",left:pct+"%",
            transform:"translate(-50%,-50%)",width:12,height:12,borderRadius:"50%",
            background:"var(--accent)",border:"2px solid var(--bg)"}}/>
        </div>
        <div className="mono" style={{display:"flex",justifyContent:"space-between",
          fontSize:10.5,color:"var(--fg-muted)",marginTop:7}}>
          <span>{fmt(t)}</span>
          <span>-{total > 0 ? fmt(total - t) : "--:--"}</span>
        </div>
      </div>

      <button onClick={cycleRate} className="mono"
        style={{flex:"0 0 auto",fontSize:11,border:"1px solid var(--hair)",
          borderRadius:2,padding:"7px 9px"}}>{rate}×</button>
    </div>
  );
}

const LIST_ITEM_STYLE = {
  fontFamily:"var(--ff-body)",fontSize:"clamp(18px,1.45vw,21px)",
  lineHeight:1.62,color:"var(--fg)"
};

function Block({ b }){
  if(b.t==="h") return <h2 style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:"clamp(24px,2.8vw,34px)",
    lineHeight:1.08,letterSpacing:"-0.015em",margin:"44px 0 4px"}}>{b.v}</h2>;

  if(b.t==="ul") return (
    <ul style={{margin:"22px 0",paddingLeft:"clamp(20px,2vw,28px)",display:"flex",flexDirection:"column",gap:10}}>
      {b.v.map((item,i)=><li key={i} style={LIST_ITEM_STYLE}>{item}</li>)}
    </ul>
  );
  if(b.t==="ol") return (
    <ol style={{margin:"22px 0",paddingLeft:"clamp(20px,2vw,28px)",display:"flex",flexDirection:"column",gap:10}}>
      {b.v.map((item,i)=><li key={i} style={LIST_ITEM_STYLE}>{item}</li>)}
    </ol>
  );

  if(b.t==="q") return (
    <blockquote style={{margin:"40px 0",position:"relative",paddingLeft:8}}>
      <span aria-hidden="true" style={{position:"absolute",left:-14,top:-44,fontFamily:"var(--ff-display)",
        fontSize:120,lineHeight:1,color:"var(--accent)",opacity:0.22}}>"</span>
      <p style={{fontFamily:"var(--ff-display)",fontStyle:"italic",fontWeight:500,
        fontSize:"clamp(23px,2.9vw,34px)",lineHeight:1.22,letterSpacing:"-0.01em"}}>{b.v}</p>
    </blockquote>
  );
  return <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(18px,1.45vw,21px)",lineHeight:1.62,
    margin:"22px 0",color:"var(--fg)"}}>{b.v}</p>;
}

function ArticleActions({ article }){
  const [saved, setSaved] = React.useState(()=>isBookmarked(article.slug));
  React.useEffect(()=>{
    const on = ()=>setSaved(isBookmarked(article.slug));
    window.addEventListener("bookmarks_changed", on);
    return ()=>window.removeEventListener("bookmarks_changed", on);
  },[article.slug]);
  const handleBookmark = ()=>{
    toggleBookmark(article.slug);
    const nowSaved = isBookmarked(article.slug);
    window.dispatchEvent(new CustomEvent("show_toast", { detail: nowSaved ? "Story saved" : "Removed from saved" }));
  };
  return (
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:28}}>
      <button onClick={handleBookmark}
        className={"action-btn"+(saved?" saved":"")}
        style={{display:"inline-flex",alignItems:"center",gap:8,
          fontFamily:"var(--ff-mono)",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",
          padding:"10px 16px",border:"1px solid "+(saved?"var(--accent)":"var(--hair)"),borderRadius:2,
          color:saved?"var(--accent)":"var(--fg-muted)"}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill={saved?"var(--accent)":"none"} stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
        {saved ? "Saved" : "Save"}
      </button>
      <button onClick={()=>shareArticle(article)}
        className="action-btn"
        style={{display:"inline-flex",alignItems:"center",gap:8,
          fontFamily:"var(--ff-mono)",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",
          padding:"10px 16px",border:"1px solid var(--hair)",borderRadius:2,
          color:"var(--fg-muted)"}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
        Share
      </button>
    </div>
  );
}

function ArticlePage({ slug }){
  const a = articleBySlug(slug);
  useEA(()=>{ window.scrollTo(0,0); },[slug]);
  if(!a) return <div className="wrap" style={{padding:"120px 0",minHeight:"60vh"}}>
    <p style={{fontFamily:"var(--ff-body)",fontSize:20,color:"var(--fg-muted)"}}>Story not found.</p>
    <button onClick={()=>go("/")} className="btn btn-ghost" style={{marginTop:24}}>← Back home</button>
  </div>;

  const au = contributor(a.author);
  const sec = sectionById(a.section);
  const related = ARTICLES.filter(x=>x.slug!==a.slug && x.section===a.section).slice(0,3);
  const relPool = related.length?related:ARTICLES.filter(x=>x.slug!==a.slug).slice(0,3);

  return (
    <article className="route-enter article-body">
      <div className="wrap" style={{maxWidth:1080,paddingTop:"clamp(36px,5vw,68px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:22}}>
          <a href={"#/section/"+a.section} onClick={(e)=>{e.preventDefault();go("/section/"+a.section);}} className="kicker">{sec?.name}</a>
          {a.circuit && <span className="label">· {a.circuit}</span>}
        </div>
        <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(34px,5.4vw,68px)",
          lineHeight:1.0,letterSpacing:"-0.025em",maxWidth:"16ch"}}>{a.title}</h1>
        <p style={{fontFamily:"var(--ff-body)",fontStyle:"italic",fontSize:"clamp(20px,2vw,26px)",
          lineHeight:1.4,color:"var(--fg-muted)",marginTop:22,maxWidth:"40ch"}}>{a.dek}</p>
        <div className="label" style={{display:"flex",gap:18,flexWrap:"wrap",marginTop:26}}>
          <a href={"#/contributor/"+au.id} onClick={(e)=>{e.preventDefault();go("/contributor/"+au.id);}}
            style={{color:"var(--accent)"}}>By {au.name}</a>
          <span>{au.region}</span><span>{a.date}</span><span>{a.read} min read</span>
        </div>
        <ArticleActions article={a} />
      </div>

      <div className="wrap" style={{maxWidth:1080,marginTop:"clamp(28px,4vw,44px)"}}>
        <Duotone hue={a.hue} ratio="16 / 9" cover={"images/cover-"+a.slug+".jpg"} brief={a.img}/>
      </div>

      <div className="wrap" style={{maxWidth:680,marginTop:"clamp(34px,4vw,52px)"}}>
        <div style={{marginBottom:40}}><AudioPlayer article={a} author={au}/></div>
        <div id="article-content">
          {a.body.map((b,i)=><Block key={i} b={b}/>)}
        </div>

        {a.tags && a.tags.length > 0 && (
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:48}}>
            {a.tags.map(tag=>(
              <span key={tag} className="mono" style={{fontSize:10.5,letterSpacing:"0.12em",textTransform:"uppercase",
                padding:"6px 12px",border:"1px solid var(--hair)",borderRadius:2,color:"var(--fg-muted)"}}>{tag}</span>
            ))}
          </div>
        )}

        <hr className="hairline" style={{margin:"52px 0 28px"}}/>
        <a href={"#/contributor/"+au.id} onClick={(e)=>{e.preventDefault();go("/contributor/"+au.id);}}
          className="card-hover" style={{display:"grid",gridTemplateColumns:"84px 1fr",gap:20,alignItems:"start"}}>
          <Duotone hue={a.hue} ratio="1 / 1" compact mark={false} style={{borderRadius:"50%"}}/>
          <div>
            <div className="label">Written by</div>
            <div style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:24,marginTop:4}}>{au.name}</div>
            <div style={{fontFamily:"var(--ff-body)",fontSize:16.5,lineHeight:1.5,color:"var(--fg-muted)",marginTop:8}}>{au.bio}</div>
          </div>
        </a>
      </div>

      <section className="wrap" style={{marginTop:"clamp(64px,9vw,110px)"}}>
        <RuleLabel num="" text="Keep reading"/>
        <hr className="hairline" style={{margin:"16px 0 40px"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(24px,3vw,48px)"}}>
          {relPool.map(x=><ArticleCard key={x.slug} slug={x.slug} variant="standard"/>)}
        </div>
      </section>

      <div style={{marginTop:"clamp(56px,8vw,104px)"}}><Newsletter dark/></div>
    </article>
  );
}

Object.assign(window, { ArticlePage });
