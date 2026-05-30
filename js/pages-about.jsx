// pages-about.jsx
const { useEffect:useEAb } = React;

function AboutPage(){
  const ref = useReveal();
  useEAb(()=>{ window.scrollTo(0,0); },[]);
  const principles = [
    { k:"Memory", v:"Preserve the emotional history of debate before it vanishes with each graduating class." },
    { k:"Identity", v:"Hold the voice of every circuit — not only the most visible centres — as equal in the record." },
    { k:"Voice", v:"First-person, longform, emotionally honest. Not who won — but what it meant." },
  ];
  return (
    <div ref={ref} className="route-enter">
      {/* manifesto hero */}
      <header className="surface-dark" style={{padding:"clamp(64px,11vw,150px) 0"}}>
        <div className="wrap" style={{maxWidth:1000}}>
          <div className="kicker">The idea · 01 — Foundation</div>
          <h1 className="fadeup" style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(36px,6.4vw,86px)",lineHeight:0.98,letterSpacing:"-0.028em",marginTop:24}}>
            Debate teaches people how to speak. <span style={{color:"var(--accent)"}}>Almost nothing lets debaters tell their story.</span>
          </h1>
        </div>
      </header>

      {/* premise */}
      <section className="wrap" style={{maxWidth:1000,paddingTop:"clamp(56px,8vw,104px)"}}>
        <div style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:"clamp(24px,4vw,64px)"}} className="fadeup">
          <div className="mono" style={{fontSize:13,color:"var(--accent)",paddingTop:6}}>01<br/><span style={{color:"var(--fg-muted)",fontSize:11}}>THE PREMISE</span></div>
          <div>
            <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(20px,2vw,26px)",lineHeight:1.5}}>
              Every circuit is full of stories that never make the record. The round that broke someone open. The friendship forged in a prep room at 2am. The quiet exit nobody wrote down. <span style={{color:"var(--fg-muted)"}}>Results get archived; experiences evaporate the moment a class graduates.</span> The Debaters' Tribune exists to catch them.
            </p>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:"clamp(24px,4vw,64px)",marginTop:"clamp(40px,5vw,64px)"}} className="fadeup">
          <div className="mono" style={{fontSize:13,color:"var(--accent)",paddingTop:6}}>02<br/><span style={{color:"var(--fg-muted)",fontSize:11}}>THE PROMISE</span></div>
          <div>
            <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(20px,2vw,26px)",lineHeight:1.5}}>
              First-person, longform, emotionally honest. We commission as much as we collect — pairing first-time writers with editors so a voice note becomes an essay. The whole brand is built to make one promise visible: <span className="serif-it" style={{color:"var(--accent)"}}>this is a place where debaters are heard, not ranked.</span>
            </p>
          </div>
        </div>
      </section>

      {/* principles */}
      <section className="wrap" style={{maxWidth:1100,paddingTop:"clamp(56px,8vw,104px)"}}>
        <div className="fadeup" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(20px,2.5vw,36px)"}}>
          {principles.map(p=>(
            <div key={p.k} style={{border:"1px solid var(--hair)",borderRadius:3,padding:"clamp(24px,2.6vw,38px)"}}>
              <div className="label" style={{color:"var(--accent)"}}>{p.k}</div>
              <p style={{fontFamily:"var(--ff-body)",fontSize:18,lineHeight:1.5,marginTop:14,color:"var(--fg)"}}>{p.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* the name */}
      <section className="wrap" style={{maxWidth:1000,paddingTop:"clamp(64px,9vw,120px)"}}>
        <RuleLabel num="02" text="Story"/>
        <hr className="hairline" style={{margin:"16px 0 36px"}}/>
        <h2 className="fadeup" style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:"clamp(28px,4.6vw,58px)",lineHeight:1.02,letterSpacing:"-0.02em",maxWidth:"15ch"}}>
          A <span style={{color:"var(--accent)"}}>tribune</span> has always belonged to the people who speak.
        </h2>
        <div className="fadeup" style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:"clamp(24px,4vw,64px)",marginTop:"clamp(32px,4vw,52px)"}}>
          <div className="mono" style={{fontSize:11,color:"var(--fg-muted)",letterSpacing:"0.1em",paddingTop:6}}>ORIGIN</div>
          <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(18px,1.6vw,21px)",lineHeight:1.6,color:"var(--fg)"}}>
            In ancient Rome, a <em className="serif-it">tribune</em> was the official elected to defend the voice of ordinary people against power. It is also the raised platform you stand on to be heard — and, later, the name newspapers took to signal they spoke <em className="serif-it">for</em> their readers, not at them. The Debaters' Tribune inherits all three: a defender of voices, a platform to stand on, and a newsroom that belongs to the people in the room.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap" style={{maxWidth:1000,paddingTop:"clamp(64px,9vw,120px)",paddingBottom:"clamp(20px,3vw,40px)",textAlign:"center"}}>
        <h2 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(28px,4vw,48px)",lineHeight:1.02,letterSpacing:"-0.02em"}}>You lived a story worth keeping.</h2>
        <button onClick={()=>go("/pitch")} className="btn btn-solid" style={{marginTop:26}}>Pitch your story</button>
      </section>

      <div style={{marginTop:"clamp(40px,6vw,80px)"}}><Newsletter/></div>
    </div>
  );
}

Object.assign(window, { AboutPage });
