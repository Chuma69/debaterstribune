// pages-contributors.jsx
const { useState:useSCs, useEffect:useECs, useMemo:useMCs } = React;

function ContributorsPage(){
  useECs(()=>{ window.scrollTo(0,0); },[]);
  const people = Object.values(CONTRIBUTORS);
  const [circuit,setCircuit] = useSCs("all");
  const [q,setQ] = useSCs("");

  const results = useMCs(()=>{
    return people.filter(p=>{
      const circuits = contributorCircuits(p.id);
      if(circuit!=="all" && !circuits.includes(circuit)) return false;
      if(q.trim()){
        const hay = (p.name+" "+p.role+" "+p.region+" "+p.bio+" "+circuits.join(" ")).toLowerCase();
        if(!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  },[circuit,q]);

  const Chip = ({active,onClick,children}) => (
    <button onClick={onClick} className="mono" style={{
      fontSize:11.5,letterSpacing:"0.08em",textTransform:"uppercase",
      padding:"9px 14px",borderRadius:2,
      border:"1px solid "+(active?"var(--accent)":"var(--hair)"),
      background:active?"var(--accent)":"transparent",
      color:active?"#fff":"var(--fg-muted)",transition:"all .2s"
    }}>{children}</button>
  );

  return (
    <div className="route-enter">
      <header className="wrap" style={{paddingTop:"clamp(40px,6vw,76px)"}}>
        <RuleLabel num="" text="The voices behind the record"/>
        <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(40px,7vw,92px)",
          lineHeight:0.96,letterSpacing:"-0.025em",marginTop:18}}>
          Contributors
        </h1>
        <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(18px,1.7vw,22px)",lineHeight:1.45,
          color:"var(--fg-muted)",marginTop:18,maxWidth:"56ch"}}>
          Debaters, coaches and adjudicators from circuits around the world — writing, in the first person, about what the activity actually did to them.
        </p>
      </header>

      {/* sticky filter bar */}
      <div style={{position:"sticky",top:0,zIndex:40,
        background:"color-mix(in oklab, var(--bg), transparent 4%)",
        backdropFilter:"blur(10px)",
        borderTop:"1px solid var(--hair)",borderBottom:"1px solid var(--hair)",
        marginTop:"clamp(28px,4vw,44px)"}}>
        <div className="wrap" style={{display:"flex",gap:16,alignItems:"center",
          flexWrap:"wrap",padding:"14px 32px"}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Chip active={circuit==="all"} onClick={()=>setCircuit("all")}>All circuits</Chip>
            {CIRCUITS.map(c=>(
              <Chip key={c} active={circuit===c} onClick={()=>setCircuit(c)}>{c}</Chip>
            ))}
          </div>
          <div style={{flex:1}}/>
          <input value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Search contributors…"
            style={{width:"min(260px,100%)",padding:"10px 14px",
              border:"1px solid var(--hair)",borderRadius:2,
              background:"transparent",outline:"none",fontSize:14,
              fontFamily:"var(--ff-sans)"}}/>
        </div>
      </div>

      {/* list */}
      <section className="wrap" style={{paddingTop:"clamp(32px,4vw,52px)",
        paddingBottom:"clamp(20px,3vw,40px)",minHeight:"32vh"}}>
        <div className="label" style={{marginBottom:"clamp(20px,2.5vw,32px)"}}>
          {results.length} {results.length===1?"contributor":"contributors"}
        </div>

        {results.length===0 ? (
          <div style={{padding:"40px 0",textAlign:"center"}}>
            <p style={{fontFamily:"var(--ff-display)",fontStyle:"italic",
              fontSize:24,color:"var(--fg-muted)"}}>No contributors match yet.</p>
            <button onClick={()=>{setCircuit("all");setQ("");}}
              className="btn btn-ghost" style={{marginTop:20}}>Clear filters</button>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",
            gap:"clamp(28px,3vw,52px) clamp(32px,5vw,72px)"}}>
            {results.map(p=>{
              const pieces = articlesByAuthor(p.id);
              const hue = pieces[0]?.hue || 280;
              const cover = pieces[0] ? "images/cover-"+pieces[0].slug+".jpg" : null;
              const circuits = contributorCircuits(p.id);
              const sections = contributorSections(p.id);
              const SECTION_LABELS = { essays:"Essays", histories:"Histories", beyond:"Beyond" };
              return (
                <a key={p.id} href={"#/contributor/"+p.id}
                  onClick={(e)=>{e.preventDefault();go("/contributor/"+p.id);}}
                  className="card-hover"
                  style={{display:"grid",gridTemplateColumns:"96px 1fr",gap:22,
                    alignItems:"start",padding:"clamp(22px,2.4vw,32px) 0",
                    borderTop:"1px solid var(--hair)"}}>
                  <Duotone hue={hue} ratio="1 / 1" cover={cover} compact={!cover}
                    mark={false} credit="" style={{borderRadius:"50%"}}/>
                  <div>
                    <div style={{fontFamily:"var(--ff-display)",fontWeight:700,
                      fontSize:"clamp(22px,2.2vw,28px)",lineHeight:1.05}}>{p.name}</div>
                    <div className="label" style={{display:"flex",gap:14,flexWrap:"wrap",marginTop:8}}>
                      <span style={{color:"var(--accent)"}}>{p.role}</span>
                      <span>{p.region}</span>
                    </div>
                    <p style={{fontFamily:"var(--ff-body)",fontSize:16,lineHeight:1.5,
                      color:"var(--fg-muted)",marginTop:12,maxWidth:"42ch"}}>{p.bio}</p>
                    {/* sections badges */}
                    {sections.length > 0 && (
                      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:12}}>
                        {sections.map(s=>(
                          <span key={s} className="mono" style={{fontSize:9.5,
                            letterSpacing:"0.1em",textTransform:"uppercase",
                            color:"var(--accent)",border:"1px solid var(--accent)",
                            borderRadius:2,padding:"3px 8px"}}>
                            {SECTION_LABELS[s]||s}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{display:"flex",alignItems:"center",gap:12,
                      flexWrap:"wrap",marginTop:14}}>
                      <span className="mono" style={{fontSize:11,letterSpacing:"0.08em",
                        color:"var(--fg)",display:"flex",alignItems:"center",gap:8}}>
                        {pieces.length} {pieces.length===1?"STORY":"STORIES"}
                        <span style={{display:"inline-block",transition:"transform .3s"}}>→</span>
                      </span>
                      {circuits.map(c=>(
                        <span key={c} className="mono" style={{fontSize:9.5,
                          letterSpacing:"0.1em",textTransform:"uppercase",
                          color:"var(--fg-muted)",border:"1px solid var(--hair)",
                          borderRadius:2,padding:"3px 7px"}}>{c}</span>
                      ))}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="wrap" style={{paddingTop:"clamp(48px,7vw,90px)",textAlign:"center"}}>
        <hr className="hairline" style={{marginBottom:"clamp(40px,5vw,64px)"}}/>
        <h2 style={{fontFamily:"var(--ff-display)",fontWeight:800,
          fontSize:"clamp(26px,4vw,46px)",lineHeight:1.02,letterSpacing:"-0.02em"}}>
          Your name belongs here too.
        </h2>
        <p style={{fontFamily:"var(--ff-body)",fontSize:18,color:"var(--fg-muted)",
          margin:"16px auto 0",maxWidth:"42ch"}}>
          You don't need to be a writer — just to have lived a story worth keeping.
        </p>
        <button onClick={()=>go("/pitch")} className="btn btn-solid" style={{marginTop:26}}>
          Pitch your story
        </button>
      </section>

      <div style={{marginTop:"clamp(40px,6vw,80px)"}}><Newsletter dark/></div>
    </div>
  );
}

Object.assign(window, { ContributorsPage });
