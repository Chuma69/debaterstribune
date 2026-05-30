// pages-profile.jsx
const { useEffect:useEPr } = React;

function ProfilePage({ id }){
  const c = contributor(id);
  const articles = articlesByAuthor(id);
  useEPr(()=>{ window.scrollTo(0,0); },[id]);

  if(!c) return <div className="wrap" style={{padding:"120px 0",minHeight:"60vh"}}>
    <p style={{fontFamily:"var(--ff-body)",fontSize:20,color:"var(--fg-muted)"}}>Contributor not found.</p>
    <button onClick={()=>go("/")} className="btn btn-ghost" style={{marginTop:24}}>← Back home</button>
  </div>;

  return (
    <div className="route-enter">
      <header style={{paddingTop:"clamp(56px,8vw,100px)",paddingBottom:"clamp(40px,5vw,64px)"}}>
        <div className="wrap" style={{maxWidth:900,display:"grid",gridTemplateColumns:"120px 1fr",gap:"clamp(24px,4vw,56px)",alignItems:"start"}}>
          <Duotone hue={articles[0]?.hue||280} ratio="1/1" compact style={{borderRadius:"50%"}}/>
          <div>
            <div className="kicker">Contributor</div>
            <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(34px,5vw,62px)",
              lineHeight:0.98,letterSpacing:"-0.024em",marginTop:14}}>{c.name}</h1>
            <div className="label" style={{display:"flex",gap:16,flexWrap:"wrap",marginTop:16}}>
              <span style={{color:"var(--accent)"}}>{c.role}</span>
              <span>·</span>
              <span>{c.region}</span>
            </div>
            <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(17px,1.5vw,20px)",lineHeight:1.55,
              color:"var(--fg-muted)",marginTop:16,maxWidth:"52ch"}}>{c.bio}</p>
            {c.based && <div className="mono" style={{fontSize:11,letterSpacing:"0.1em",color:"var(--fg-muted)",marginTop:14}}>{c.based}</div>}
          </div>
        </div>
      </header>

      <div className="wrap" style={{maxWidth:900}}>
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
