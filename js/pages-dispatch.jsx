// pages-dispatch.jsx — The Dispatch standalone page
const { useState:useSDis, useEffect:useEDis } = React;

const PAST_ISSUES = [
  {
    n: "06",
    date: "May 2026",
    title: "On bottling finals and what it costs",
    preview: "This month: Serg Mascot on conviction, Priya Nair on the season she didn't break, and a note from the editors on why we publish slowly.",
  },
  {
    n: "05",
    date: "April 2026",
    title: "The back of the room",
    preview: "Mei Tan on what adjudicators see that speakers never notice. Plus: the Pan-African circuit's earliest records, told by someone who was there.",
  },
  {
    n: "04",
    date: "March 2026",
    title: "The invoice",
    preview: "An honest accounting of what it costs to be 'good at debate'. Joaquín Vega on the circuits that the money forgot.",
  },
  {
    n: "03",
    date: "February 2026",
    title: "2am",
    preview: "Priya Nair on the prep-room friendships that outlasted the circuit. And Daniyal Rahman on the identity problem nobody names when you stop competing.",
  },
];

function DispatchPage(){
  useEDis(()=>{ window.scrollTo(0,0); },[]);
  const [first, setFirst] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | done | error
  const [errMsg, setErrMsg] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if(!first.trim()){ setState("error"); setErrMsg("Tell us your first name."); return; }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ setState("error"); setErrMsg("Enter a valid email."); return; }
    setState("done");
  };

  return (
    <div className="route-enter">

      {/* Hero */}
      <header className="surface-dark" style={{padding:"clamp(72px,11vw,140px) 0"}}>
        <div className="wrap" style={{maxWidth:860}}>
          <div className="kicker">The Dispatch</div>
          <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,
            fontSize:"clamp(44px,7vw,96px)",lineHeight:0.96,
            letterSpacing:"-0.028em",marginTop:20}}>
            One or two stories a month.<br/>
            <span className="serif-it" style={{fontWeight:500,color:"rgba(244,242,248,0.55)"}}>
              Nothing you didn't ask for.
            </span>
          </h1>
          <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(18px,1.9vw,24px)",
            lineHeight:1.5,color:"rgba(244,242,248,0.65)",
            marginTop:28,maxWidth:"50ch"}}>
            The Dispatch is our editorial letter — new stories, a note on why we published them, and occasionally something we noticed about the circuits that didn't make it into a piece.
          </p>
          <div className="label" style={{marginTop:28,color:"rgba(244,242,248,0.4)"}}>
            Monthly · Free · No advertising · Unsubscribe any time
          </div>
        </div>
      </header>

      {/* Sign-up */}
      <section className="wrap" style={{maxWidth:680,paddingTop:"clamp(64px,9vw,110px)"}}>
        <RuleLabel num="" text="Subscribe"/>
        <hr className="hairline" style={{margin:"16px 0 36px"}}/>

        {state === "done" ? (
          <div>
            <Mark size={36}/>
            <h2 style={{fontFamily:"var(--ff-display)",fontWeight:800,
              fontSize:"clamp(28px,3.5vw,44px)",letterSpacing:"-0.02em",
              lineHeight:1.02,marginTop:24}}>
              You're in, {first.trim()}.
            </h2>
            <p style={{fontFamily:"var(--ff-body)",fontSize:19,lineHeight:1.55,
              color:"var(--fg-muted)",marginTop:16,maxWidth:"44ch"}}>
              Check your inbox to confirm. The next issue lands when the next story does — we don't send on a fixed schedule. When something is ready, you'll hear about it.
            </p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
              <input value={first}
                onChange={e=>{ setFirst(e.target.value); if(state==="error")setState("idle"); }}
                placeholder="First name" aria-label="First name"
                style={{width:"min(200px,100%)",padding:"14px 18px",
                  border:"1px solid var(--hair)",borderRadius:2,
                  background:"transparent",outline:"none"}}/>
              <input value={email}
                onChange={e=>{ setEmail(e.target.value); if(state==="error")setState("idle"); }}
                placeholder="you@example.com" aria-label="Email" type="email"
                style={{flex:1,minWidth:"min(260px,100%)",padding:"14px 18px",
                  border:"1px solid "+(state==="error"?"#d6455f":"var(--hair)"),
                  borderRadius:2,background:"transparent",outline:"none"}}/>
              <button className="btn btn-solid" type="submit"
                style={{whiteSpace:"nowrap"}}>Subscribe</button>
            </div>
            {state === "error" && (
              <div className="mono" style={{color:"#d6455f",fontSize:11,
                letterSpacing:"0.08em"}}>{errMsg.toUpperCase()}</div>
            )}
            <p style={{fontFamily:"var(--ff-body)",fontSize:15,
              color:"var(--fg-muted)",marginTop:14,lineHeight:1.5}}>
              We store only your name and email. No tracking, no third-party sharing. Unsubscribe with one click from any issue.
            </p>
          </form>
        )}
      </section>

      {/* What to expect */}
      <section className="wrap" style={{maxWidth:980,paddingTop:"clamp(64px,9vw,110px)"}}>
        <RuleLabel num="" text="What you get"/>
        <hr className="hairline" style={{margin:"16px 0 40px"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
          gap:"clamp(20px,3vw,40px)"}}>
          {[
            { h:"New stories", b:"Each issue leads with one or two new pieces — full essays, not excerpts. You read the whole thing in the email, or click through to the archive." },
            { h:"An editors' note", b:"A short paragraph on why this story, why now. What we were thinking about when we commissioned it. The context that doesn't fit in the dek." },
            { h:"From the circuits", b:"Occasional notes on what's happening in the debate world that didn't become a full piece — a tournament worth documenting, a voice worth knowing about." },
          ].map(item=>(
            <div key={item.h}>
              <div style={{fontFamily:"var(--ff-display)",fontWeight:700,
                fontSize:"clamp(18px,1.8vw,22px)",letterSpacing:"-0.01em",
                marginBottom:12}}>{item.h}</div>
              <p style={{fontFamily:"var(--ff-body)",fontSize:16.5,lineHeight:1.6,
                color:"var(--fg-muted)"}}>{item.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Past issues */}
      <section className="wrap" style={{paddingTop:"clamp(64px,9vw,110px)"}}>
        <RuleLabel num="" text="Recent issues"/>
        <hr className="hairline" style={{margin:"16px 0 0"}}/>
        <div>
          {PAST_ISSUES.map(issue=>(
            <div key={issue.n} style={{display:"grid",
              gridTemplateColumns:"60px 1fr",gap:24,
              padding:"clamp(24px,2.5vw,36px) 0",
              borderBottom:"1px solid var(--hair)",alignItems:"start"}}>
              <div>
                <div className="mono" style={{fontSize:11,letterSpacing:"0.1em",
                  color:"var(--accent)"}}>No. {issue.n}</div>
                <div className="mono" style={{fontSize:10,letterSpacing:"0.06em",
                  color:"var(--fg-muted)",marginTop:5}}>{issue.date}</div>
              </div>
              <div>
                <div style={{fontFamily:"var(--ff-display)",fontWeight:700,
                  fontSize:"clamp(18px,1.9vw,24px)",lineHeight:1.1,
                  letterSpacing:"-0.01em"}}>{issue.title}</div>
                <p style={{fontFamily:"var(--ff-body)",fontSize:16,lineHeight:1.55,
                  color:"var(--fg-muted)",marginTop:10}}>{issue.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{marginTop:"clamp(64px,9vw,110px)"}}>
        <div style={{borderTop:"1px solid var(--hair)",padding:"clamp(48px,7vw,88px) 0",
          textAlign:"center"}}>
          <div className="wrap" style={{maxWidth:560}}>
            <h2 style={{fontFamily:"var(--ff-display)",fontWeight:800,
              fontSize:"clamp(28px,4vw,48px)",lineHeight:1.02,
              letterSpacing:"-0.022em"}}>
              It's free. It's slow. It's yours.
            </h2>
            <button className="btn btn-solid" style={{marginTop:26}}
              onClick={()=>document.querySelector('form')?.scrollIntoView({behavior:"smooth",block:"center"})}>
              Subscribe to The Dispatch
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

Object.assign(window, { DispatchPage });
