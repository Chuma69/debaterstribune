// pages-profile.jsx
const { useEffect:useEPr } = React;

const SECTION_LABELS = { essays:"Essays", histories:"Histories", beyond:"Beyond" };
const SECTION_NUMS   = { essays:"01", histories:"02", beyond:"03" };

function ProfilePage({ id }){
  const c = contributor(id);
  const articles = articlesByAuthor(id);
  const circuits = contributorCircuits(id);
  const sections = contributorSections(id);
  useEPr(()=>{ window.scrollTo(0,0); },[id]);

  if(!c) return <div className="wrap" style={{padding:"120px 0",minHeight:"60vh"}}>
    <p style={{fontFamily:"var(--ff-body)",fontSize:20,color:"var(--fg-muted)"}}>Contributor not found.</p>
    <button onClick={()=>go("/")} className="btn btn-ghost" style={{marginTop:24}}>← Back home</button>
  </div>;

  const hue = articles[0]?.hue || 280;

  return (
    <div className="route-enter">
      <header style={{paddingTop:"clamp(56px,8vw,100px)",paddingBottom:"clamp(40px,5vw,64px)"}}>
        <div className="wrap" style={{maxWidth:960,display:"grid",gridTemplateColumns:"130px 1fr",gap:"clamp(24px,4vw,56px)",alignItems:"start"}}>
          <Duotone hue={hue} ratio="1/1" compact style={{borderRadius:"50%"}}/>
          <div>
            <div className="kicker">Contributor</div>
            <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(34px,5vw,62px)",
              lineHeight:0.98,letterSpacing:"-0.024em",marginTop:14}}>{c.name}</h1>

            {/* role + region */}
            <div className="label" style={{display:"flex",gap:14,flexWrap:"wrap",marginTop:16}}>
              <span style={{color:"var(--accent)"}}>{c.byline}</span>
              <span>·</span>
              <span>{c.region}</span>
              {c.debaterType && (<><span>·</span><span style={{textTransform:"capitalize"}}>{c.debaterType}</span></>)}
            </div>

            <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(17px,1.5vw,20px)",lineHeight:1.55,
              color:"var(--fg-muted)",marginTop:16,maxWidth:"52ch"}}>{c.bio}</p>

            {c.based && <div className="mono" style={{fontSize:11,letterSpacing:"0.1em",color:"var(--fg-muted)",marginTop:14}}>{c.based}</div>}

            {/* circuits + formats */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:22}}>
              {circuits.map(ci=>(
                <span key={ci} className="mono" style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",
                  padding:"5px 10px",border:"1px solid var(--hair)",borderRadius:2,color:"var(--fg-muted)"}}>{ci}</span>
              ))}
              {(c.formats||[]).map(f=>(
                <span key={f} className="mono" style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",
                  padding:"5px 10px",border:"1px solid var(--accent)",borderRadius:2,color:"var(--accent)"}}>{f}</span>
              ))}
            </div>

            {/* sections */}
            {sections.length > 0 && (
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:16}}>
                {sections.map(s=>(
                  <a key={s} href={"#/section/"+s} onClick={(e)=>{e.preventDefault();go("/section/"+s);}}
                    className="btn btn-ghost" style={{fontSize:11,padding:"7px 14px",display:"inline-flex",alignItems:"center",gap:7}}>
                    <span className="mono" style={{fontSize:9,color:"var(--accent)"}}>{SECTION_NUMS[s]}</span>
                    {SECTION_LABELS[s]}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="wrap" style={{maxWidth:960}}>
        <RuleLabel num="" text={articles.length + " " + (articles.length===1?"story":"stories")} />
        <hr className="hairline" style={{margin:"16px 0 0"}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"clamp(40px,6vw,96px)"}}>
          {articles.map(a=><ArticleCard key={a.slug} slug={a.slug} variant="text"/>)}
        </div>
      </div>

      <div style={{marginTop:"clamp(64px,9vw,120px)"}}><Newsletter/></div>
    </div>
  );
}

Object.assign(window, { ProfilePage });
