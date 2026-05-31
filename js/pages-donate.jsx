// pages-donate.jsx
const { useEffect:useEDon, useState:useSDon } = React;

const TIERS = [
  {
    id: "reader",
    label: "Reader",
    amount: "£5 / month",
    desc: "You keep the archive free for everyone who can't afford to pay.",
    perks: ["Our thanks", "Name in the annual acknowledgements"],
  },
  {
    id: "supporter",
    label: "Supporter",
    amount: "£15 / month",
    desc: "You fund one commissioned essay per year — the kind that wouldn't exist without support.",
    perks: ["All of the above", "Early access to new pieces", "The Dispatch (our editors' letter)"],
    featured: true,
  },
  {
    id: "patron",
    label: "Patron",
    amount: "£40 / month",
    desc: "You make it possible to pay contributors from circuits that have no institutional backing.",
    perks: ["All of the above", "Invitation to our annual editorial gathering", "Personal note from the editors"],
  },
];

function DonatePage(){
  useEDon(()=>{ window.scrollTo(0,0); },[]);
  const [selected, setSelected] = useSDon("supporter");

  return (
    <div className="route-enter">
      {/* Hero */}
      <header style={{paddingTop:"clamp(56px,8vw,100px)",paddingBottom:"clamp(48px,6vw,80px)"}}>
        <div className="wrap" style={{maxWidth:860}}>
          <div className="kicker">Support the Tribune</div>
          <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,
            fontSize:"clamp(40px,6.5vw,84px)",lineHeight:0.97,
            letterSpacing:"-0.026em",marginTop:20,maxWidth:"20ch"}}>
            Good writing from the debate world costs money to produce.
          </h1>
          <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(18px,1.8vw,23px)",
            lineHeight:1.5,color:"var(--fg-muted)",marginTop:24,maxWidth:"50ch"}}>
            We don't carry advertising. We don't take sponsored content. The archive stays free because readers choose to support it.
          </p>
        </div>
      </header>

      {/* What the money does */}
      <section style={{background:"var(--paper-2)",padding:"clamp(48px,7vw,88px) 0"}}>
        <div className="wrap" style={{maxWidth:980}}>
          <RuleLabel num="" text="Where it goes"/>
          <hr className="hairline" style={{margin:"16px 0 36px"}}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(20px,3vw,40px)"}}>
            {[
              { n:"£5", label:"pays for one editorial pass on a new submission" },
              { n:"£15", label:"covers the audio production of a single story" },
              { n:"£40", label:"commissions a reported piece from an underrepresented circuit" },
            ].map(item=>(
              <div key={item.n} style={{padding:"clamp(24px,2.5vw,36px)",
                background:"var(--bg)",borderRadius:3,border:"1px solid var(--hair)"}}>
                <div style={{fontFamily:"var(--ff-display)",fontWeight:800,
                  fontSize:"clamp(32px,3.5vw,48px)",color:"var(--accent)",
                  letterSpacing:"-0.02em",lineHeight:1}}>{item.n}</div>
                <p style={{fontFamily:"var(--ff-body)",fontSize:17,lineHeight:1.5,
                  color:"var(--fg-muted)",marginTop:14}}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="wrap" style={{paddingTop:"clamp(64px,9vw,110px)"}}>
        <RuleLabel num="" text="Choose a level"/>
        <hr className="hairline" style={{margin:"16px 0 40px"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(16px,2vw,28px)"}}>
          {TIERS.map(tier=>(
            <div key={tier.id}
              onClick={()=>setSelected(tier.id)}
              style={{padding:"clamp(28px,3vw,44px)",
                border:"2px solid "+(selected===tier.id?"var(--accent)":"var(--hair)"),
                borderRadius:3,cursor:"pointer",position:"relative",
                background:selected===tier.id
                  ?"color-mix(in oklab,var(--bg),var(--accent) 5%)"
                  :"var(--bg)",
                transition:"border-color .2s,background .2s"}}>
              {tier.featured && (
                <div style={{position:"absolute",top:-1,left:"50%",
                  transform:"translateX(-50%)",
                  background:"var(--accent)",color:"#fff",
                  fontFamily:"var(--ff-sans)",fontWeight:600,fontSize:10.5,
                  letterSpacing:"0.12em",textTransform:"uppercase",
                  padding:"4px 14px",borderRadius:"0 0 4px 4px"}}>Most popular</div>
              )}
              <div style={{fontFamily:"var(--ff-display)",fontWeight:800,
                fontSize:"clamp(22px,2.2vw,28px)",letterSpacing:"-0.01em"}}>{tier.label}</div>
              <div style={{fontFamily:"var(--ff-mono)",fontSize:13,
                color:"var(--accent)",letterSpacing:"0.06em",marginTop:8}}>{tier.amount}</div>
              <p style={{fontFamily:"var(--ff-body)",fontSize:16,lineHeight:1.55,
                color:"var(--fg-muted)",margin:"16px 0 20px"}}>{tier.desc}</p>
              <hr className="hairline" style={{marginBottom:16}}/>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:9}}>
                {tier.perks.map((p,i)=>(
                  <li key={i} style={{fontFamily:"var(--ff-body)",fontSize:15,
                    color:"var(--fg)",display:"flex",gap:10,alignItems:"baseline"}}>
                    <span style={{color:"var(--accent)",flexShrink:0}}>✓</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{marginTop:40,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
          <button className="btn btn-solid"
            onClick={()=>window.dispatchEvent(new CustomEvent("show_toast",{detail:"Payment integration coming soon — thank you for your support."}))}
            style={{fontSize:15,padding:"15px 28px"}}>
            Support as a {TIERS.find(t=>t.id===selected)?.label} →
          </button>
          <span style={{fontFamily:"var(--ff-body)",fontSize:15,color:"var(--fg-muted)"}}>
            Secure payment via Stripe. Cancel any time.
          </span>
        </div>

        {/* One-time */}
        <div style={{marginTop:48,padding:"clamp(24px,3vw,40px)",
          border:"1px solid var(--hair)",borderRadius:3,
          display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:200}}>
            <div style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:22}}>
              Prefer a one-time gift?
            </div>
            <p style={{fontFamily:"var(--ff-body)",fontSize:16,
              color:"var(--fg-muted)",marginTop:8,lineHeight:1.5}}>
              Any amount goes directly toward commissioning and editorial support.
            </p>
          </div>
          <button className="btn btn-ghost"
            onClick={()=>window.dispatchEvent(new CustomEvent("show_toast",{detail:"One-time payment coming soon — thank you."}))}
            style={{whiteSpace:"nowrap"}}>
            Give once →
          </button>
        </div>
      </section>

      {/* Institutional */}
      <section className="surface-dark" style={{marginTop:"clamp(64px,9vw,110px)",
        padding:"clamp(56px,8vw,100px) 0"}}>
        <div className="wrap" style={{maxWidth:760,textAlign:"center"}}>
          <div className="kicker">For organisations</div>
          <h2 style={{fontFamily:"var(--ff-display)",fontWeight:800,
            fontSize:"clamp(28px,4vw,50px)",lineHeight:1.02,
            letterSpacing:"-0.022em",marginTop:18}}>
            Debate unions, schools, and circuits
          </h2>
          <p style={{fontFamily:"var(--ff-body)",fontSize:19,lineHeight:1.55,
            color:"rgba(244,242,248,0.68)",marginTop:18,maxWidth:"46ch",margin:"18px auto 0"}}>
            If your organisation would like to support the Tribune — or sponsor coverage of a specific circuit or tournament — write to us directly.
          </p>
          <a href="mailto:hello@debaterstribune.com" className="btn btn-solid"
            style={{marginTop:28,display:"inline-flex"}}>
            Get in touch →
          </a>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { DonatePage });
