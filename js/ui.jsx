// ui.jsx — shared primitives & components
const { useState, useEffect, useRef } = React;

function go(hash){ window.location.hash = hash; }

function getBookmarks(){ try{ return JSON.parse(localStorage.getItem("dt_bookmarks")||"[]"); }catch(e){ return []; } }
function toggleBookmark(slug){
  const bk = getBookmarks();
  const idx = bk.indexOf(slug);
  if(idx >= 0) bk.splice(idx,1); else bk.push(slug);
  localStorage.setItem("dt_bookmarks", JSON.stringify(bk));
  window.dispatchEvent(new CustomEvent("bookmarks_changed"));
  return idx < 0;
}
function isBookmarked(slug){ return getBookmarks().includes(slug); }
function shareArticle(article){
  const url = window.location.href.split("#")[0] + "#/read/" + article.slug;
  if(navigator.share){
    navigator.share({ title: article.title, text: article.dek, url }).catch(()=>{});
  } else {
    navigator.clipboard.writeText(url).then(()=>{
      window.dispatchEvent(new CustomEvent("show_toast", { detail:"Link copied to clipboard" }));
    }).catch(()=>{
      window.dispatchEvent(new CustomEvent("show_toast", { detail:"Copy the URL from your address bar" }));
    });
  }
}

function Mark({ size=26, color="currentColor" }){
  return (
    <svg width={size} height={size*0.62} viewBox="0 0 42 26" fill="none" aria-hidden="true" style={{display:"block"}}>
      <polygon points="0,13 13,0 13,8 7,13 13,18 13,26" fill={color} opacity="0.5"/>
      <polygon points="14,13 27,0 27,8 21,13 27,18 27,26" fill={color}/>
      <polygon points="28,13 41,0 41,8 35,13 41,18 41,26" fill="var(--accent)"/>
    </svg>
  );
}

function Wordmark({ small=false }){
  // Combination lockup: symbol mark + divider + wordmark
  // Adapted from brand-assets/logos/combination-lockup-reversed.svg
  // Background removed; fills use currentColor + var(--accent) to match theme
  const h = small ? 48 : 64;
  return (
    <a href="#/" onClick={(e)=>{e.preventDefault(); go("/");}} aria-label="The Debaters' Tribune"
      style={{display:"block",lineHeight:0}}>
      <svg height={h} viewBox="0 0 820 170" style={{display:"block"}} role="img"
        aria-label="The Debaters' Tribune">
        {/* Symbol mark */}
        <g transform="translate(24,30) scale(1.1)">
          <polygon points="6,8 6,92 47,50"  fill="currentColor"/>
          <polygon points="94,8 94,92 53,50" fill="var(--accent)"/>
        </g>
        {/* Vertical divider */}
        <line x1="178" y1="40" x2="178" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
        {/* Horizontal rules */}
        <line x1="210" y1="56"  x2="800" y2="56"  stroke="currentColor" strokeWidth="2"/>
        <line x1="210" y1="132" x2="800" y2="132" stroke="currentColor" strokeWidth="2"/>
        {/* Wordmark */}
        <text x="505" y="116" textAnchor="middle" textLength="590" lengthAdjust="spacingAndGlyphs"
          fontFamily="'Bodoni Moda', Georgia, serif" fontWeight="800" fontSize="58"
          fill="currentColor">Debaters' Tribune<tspan fill="var(--accent)">.</tspan></text>
      </svg>
    </a>
  );
}

function useReveal(){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
    }, { threshold:0.12, rootMargin:"0px 0px -8% 0px" });
    el.querySelectorAll(".fadeup").forEach((n,i)=>{ n.style.transitionDelay = (i%6)*60 + "ms"; io.observe(n); });
    return ()=>io.disconnect();
  });
  return ref;
}

function CameraIcon({ size=20 }){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4">
      <rect x="3" y="4" width="18" height="16" rx="1.5"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M3 17l5-4 4 3 3-2 6 4"/>
    </svg>
  );
}

function Duotone({ brief, cover, credit="Photo: DebaterVerse", ratio="4 / 5", hue=280, mark=true, compact=false, style }){
  return (
    <div className="duotone" style={{aspectRatio:ratio, "--accent":`oklch(0.52 0.19 ${hue})`, ...style}}>
      {cover ? (<>
        <img src={cover} alt={brief||"Cover photograph"} loading="lazy"
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
        {credit && <span className="duotone-credit">{credit}</span>}
      </>) : compact ? (
        <div className="duotone-brief"><CameraIcon size={22}/></div>
      ) : (<>
        {mark && <span className="duotone-mark"><Mark size={22} color="rgba(255,255,255,0.9)" /></span>}
        {brief && (
          <div className="duotone-brief">
            <CameraIcon/>
            <span className="duotone-brief-tag">Photo to come</span>
            <span className="duotone-brief-text">{brief}</span>
          </div>
        )}
      </>)}
    </div>
  );
}

function RuleLabel({ num, text, right }){
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
      <span className="label" style={{color:"var(--fg-muted)"}}>{num ? num+" — " : ""}{text}</span>
      {right}
    </div>
  );
}

function FranchiseTag({ id, light }){
  const f = franchiseById(id); if(!f) return null;
  return (
    <span style={{fontFamily:"var(--ff-display)",fontStyle:"italic",fontWeight:500,
      fontSize:14, color:light?"rgba(255,255,255,0.92)":"var(--accent)"}}>"{f.name}"</span>
  );
}

function ArticleCard({ slug, variant="standard" }){
  const a = articleBySlug(slug); if(!a) return null;
  const au = contributor(a.author);
  const sec = sectionById(a.section);
  const open = (e)=>{ e.preventDefault(); go("/read/"+a.slug); };

  const Meta = () => (
    <div className="label" style={{display:"flex",gap:14,flexWrap:"wrap",marginTop:12}}>
      <span style={{color:"var(--accent)"}}>{sec?.name}</span>
      <span>{au?.name}</span>
      <span>{a.read} min</span>
    </div>
  );

  if(variant==="text"){
    return (
      <a href={"#/read/"+a.slug} onClick={open} className="card-hover" style={{display:"block",padding:"22px 0",borderTop:"1px solid var(--hair)"}}>
        {a.franchise && <div style={{marginBottom:8}}><FranchiseTag id={a.franchise}/></div>}
        <h3 style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:"clamp(20px,2.4vw,27px)",lineHeight:1.08,letterSpacing:"-0.01em"}}>{a.title}</h3>
        <Meta/>
      </a>
    );
  }
  if(variant==="wide"){
    return (
      <a href={"#/read/"+a.slug} onClick={open} className="card-hover" style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:30,alignItems:"center"}}>
        <div>
          {a.franchise && <div style={{marginBottom:10}}><FranchiseTag id={a.franchise}/></div>}
          <h3 style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:"clamp(24px,3vw,36px)",lineHeight:1.04,letterSpacing:"-0.015em"}}>{a.title}</h3>
          <p style={{fontFamily:"var(--ff-body)",fontSize:18,lineHeight:1.5,color:"var(--fg-muted)",marginTop:14,maxWidth:"42ch"}}>{a.dek}</p>
          <Meta/>
        </div>
        <Duotone hue={a.hue} ratio="5 / 4" cover={"images/cover-"+a.slug+".jpg"} brief={a.img} />
      </a>
    );
  }
  return (
    <a href={"#/read/"+a.slug} onClick={open} className="card-hover" style={{display:"block"}}>
      <Duotone hue={a.hue} ratio="4 / 3" cover={"images/cover-"+a.slug+".jpg"} brief={a.img} />
      <div style={{marginTop:16}}>
        {a.franchise && <div style={{marginBottom:8}}><FranchiseTag id={a.franchise}/></div>}
        <h3 style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:"clamp(19px,1.9vw,23px)",lineHeight:1.1,letterSpacing:"-0.01em"}}>{a.title}</h3>
        <p style={{fontFamily:"var(--ff-body)",fontSize:15.5,lineHeight:1.45,color:"var(--fg-muted)",marginTop:9}}>{a.dek}</p>
        <Meta/>
      </div>
    </a>
  );
}

function Newsletter({ dark=false }){
  const [first,setFirst] = useState("");
  const [email,setEmail] = useState("");
  const [state,setState] = useState("idle");
  const [errMsg,setErrMsg] = useState("");
  const submit = (e)=>{
    e.preventDefault();
    if(!first.trim()){ setState("error"); setErrMsg("Tell us your first name."); return; }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ setState("error"); setErrMsg("Enter a valid email address."); return; }
    setState("done");
  };
  return (
    <div className={dark?"surface-dark":""} style={{padding:"clamp(48px,7vw,96px) 0"}}>
      <div className="wrap" style={{maxWidth:760,textAlign:"center"}}>
        <div className="kicker" style={{justifyContent:"center"}}>The dispatch</div>
        <h2 style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:"clamp(30px,4.4vw,52px)",lineHeight:1.02,letterSpacing:"-0.02em",margin:"18px 0 0"}}>
          One or two stories a month.<br/><span className="serif-it" style={{fontWeight:500}}>Nothing you didn't ask for.</span>
        </h2>
        <p style={{fontFamily:"var(--ff-body)",fontSize:18,color:"var(--fg-muted)",margin:"18px auto 0",maxWidth:"46ch"}}>
          We publish slowly and on the rhythm of the circuit. Leave your name and an address and we'll send the new stories when they land.
        </p>
        {state==="done" ? (
          <p className="mono" style={{marginTop:32,color:"var(--accent)",fontSize:13,letterSpacing:"0.1em"}}>
            ✓ THANKS, {first.trim().toUpperCase()} — CHECK YOUR INBOX TO CONFIRM.
          </p>
        ) : (
          <form onSubmit={submit} style={{display:"flex",gap:10,justifyContent:"center",marginTop:32,flexWrap:"wrap"}}>
            <input value={first} onChange={e=>{setFirst(e.target.value);if(state==="error")setState("idle");}}
              placeholder="First name" aria-label="First name"
              style={{width:"min(180px,70vw)",padding:"14px 18px",background:"transparent",
                border:"1px solid var(--hair)",borderRadius:2,outline:"none"}}/>
            <input value={email} onChange={e=>{setEmail(e.target.value);if(state==="error")setState("idle");}}
              placeholder="you@example.com" aria-label="Email address"
              style={{width:"min(300px,70vw)",padding:"14px 18px",background:"transparent",
                border:"1px solid "+(state==="error"?"#d6455f":"var(--hair)"),borderRadius:2,outline:"none"}}/>
            <button className="btn btn-solid" type="submit">Subscribe</button>
            {state==="error" && <div className="mono" style={{flexBasis:"100%",color:"#d6455f",fontSize:11,letterSpacing:"0.08em",marginTop:2}}>{errMsg.toUpperCase()}</div>}
          </form>
        )}
      </div>
    </div>
  );
}

function SearchOverlay({ onClose }){
  const [q, setQ] = useState("");
  const results = searchArticles(q);
  const inputRef = useRef(null);
  useEffect(()=>{ inputRef.current?.focus(); },[]);
  useEffect(()=>{
    const onKey = (e)=>{ if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return ()=>window.removeEventListener("keydown", onKey);
  },[onClose]);
  const pick = (slug)=>{ onClose(); go("/read/"+slug); };
  return (
    <div className="search-overlay" onClick={(e)=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="search-box">
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"0 24px",borderBottom:"1px solid var(--hair)"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Search stories, authors, circuits…"
            style={{flex:1,padding:"20px 0",border:"none",outline:"none",background:"transparent",
              fontFamily:"var(--ff-sans)",fontSize:18,color:"var(--fg)"}}/>
          <button onClick={onClose} className="mono"
            style={{fontSize:11,color:"var(--fg-muted)",padding:"6px 10px",border:"1px solid var(--hair)",borderRadius:2}}>ESC</button>
        </div>
        {q.trim().length >= 2 ? (
          results.length > 0 ? (
            <div className="search-results">
              {results.map(a=>{
                const au = contributor(a.author);
                const sec = sectionById(a.section);
                return (
                  <div key={a.slug} className="search-result-item" onClick={()=>pick(a.slug)}>
                    <Duotone hue={a.hue} ratio="1/1" cover={"images/cover-"+a.slug+".jpg"} brief=""
                      style={{width:48,height:48,flexShrink:0,borderRadius:2}}/>
                    <div style={{minWidth:0}}>
                      <div style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:16,lineHeight:1.2,
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.title}</div>
                      <div className="label" style={{marginTop:4,display:"flex",gap:10}}>
                        <span style={{color:"var(--accent)"}}>{sec?.name}</span>
                        <span>{au?.name}</span>
                        <span>{a.read} min</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="search-empty">No stories found for "{q}"</div>
          )
        ) : (
          <div style={{padding:"20px 24px"}}>
            <div className="label" style={{marginBottom:14}}>Browse sections</div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {SECTIONS.map(s=>(
                <button key={s.id} onClick={()=>{ onClose(); go("/section/"+s.id); }}
                  className="btn btn-ghost" style={{fontSize:12,padding:"9px 16px"}}>{s.name}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Toast(){
  const [msg, setMsg] = useState(null);
  useEffect(()=>{
    const on = (e)=>{ setMsg(e.detail); setTimeout(()=>setMsg(null), 2800); };
    window.addEventListener("show_toast", on);
    return ()=>window.removeEventListener("show_toast", on);
  },[]);
  if(!msg) return null;
  return <div className="share-toast">{msg}</div>;
}

Object.assign(window, {
  go, Mark, Wordmark, useReveal, Duotone, RuleLabel, FranchiseTag,
  ArticleCard, Newsletter, SearchOverlay, Toast,
  getBookmarks, toggleBookmark, isBookmarked, shareArticle
});
