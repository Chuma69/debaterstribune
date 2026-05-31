// pages-volunteer.jsx
const { useEffect:useEVol, useState:useSVol } = React;

const ROLES = [
  {
    id: "editor",
    title: "Story editor",
    time: "4–6 hrs / month",
    desc: "Work one-on-one with a contributor to develop their piece from pitch to publication. You don't rewrite — you ask the right questions until the story finds its shape.",
    good: ["You've edited writing before", "You have patience for first drafts", "You care about voice as much as structure"],
  },
  {
    id: "researcher",
    title: "Fact researcher",
    time: "2–4 hrs / story",
    desc: "Check the record: names, dates, circuits, tournament histories. Debate culture is full of contested memories — you help us get it right.",
    good: ["Detail-oriented", "Comfortable with ambiguity", "You've been involved in a debate circuit"],
  },
  {
    id: "translator",
    title: "Translator",
    time: "Variable",
    desc: "Help stories reach circuits that don't read in English. We're building toward a multilingual archive. French, Portuguese, Arabic, Mandarin, Swahili — if you read and write fluently in a second language, we want to talk.",
    good: ["Fluent in English + another language", "Feel for nuance over literal translation", "Interest in debate culture"],
  },
  {
    id: "outreach",
    title: "Circuit outreach",
    time: "2–3 hrs / month",
    desc: "Help us find voices from circuits we haven't reached yet. You know coaches, alumni, and organisers we don't. You make introductions.",
    good: ["Connected in a specific circuit or region", "Good at asking people to share their stories", "Long memory for who did what when"],
  },
  {
    id: "audio",
    title: "Audio producer",
    time: "3–5 hrs / story",
    desc: "Record and produce the audio versions of published pieces. A voice reading a story changes what the story does. We want the audio to feel like a document, not a podcast.",
    good: ["Home recording setup", "Clear reading voice", "Interest in editorial audio"],
  },
];

function VolunteerPage(){
  useEVol(()=>{ window.scrollTo(0,0); },[]);
  const [selected, setSelected] = useSVol(null);
  const [submitted, setSubmitted] = useSVol(false);
  const [f, setF] = useSVol({ name:"", email:"", role:"", note:"" });
  const set = (k,v) => setF(p=>({...p,[k]:v}));

  const submit = (e) => {
    e.preventDefault();
    if(!f.name.trim() || !f.email.trim() || !f.role) return;
    setSubmitted(true);
  };

  return (
    <div className="route-enter">
      {/* Hero */}
      <header className="surface-dark" style={{padding:"clamp(72px,11vw,140px) 0"}}>
        <div className="wrap" style={{maxWidth:980}}>
          <div className="kicker">Get involved</div>
          <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,
            fontSize:"clamp(40px,6.5vw,86px)",lineHeight:0.97,
            letterSpacing:"-0.026em",marginTop:20,maxWidth:"18ch"}}>
            The archive runs on people who care about the record.
          </h1>
          <p style={{fontFamily:"var(--ff-body)",fontStyle:"italic",
            fontSize:"clamp(18px,1.8vw,24px)",lineHeight:1.5,
            color:"rgba(244,242,248,0.65)",marginTop:24,maxWidth:"48ch"}}>
            We commission as much as we collect. None of it happens without editors, researchers, translators, and connectors giving a few hours a month.
          </p>
        </div>
      </header>

      {/* Roles */}
      <section className="wrap" style={{paddingTop:"clamp(56px,8vw,100px)"}}>
        <RuleLabel num="" text="Open roles"/>
        <hr className="hairline" style={{margin:"16px 0 40px"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",
          gap:"clamp(2px,0.2vw,3px)"}}>
          {ROLES.map((r,i)=>(
            <div key={r.id}
              onClick={()=>{ setSelected(r.id); document.getElementById("volunteer-form")?.scrollIntoView({behavior:"smooth",block:"start"}); }}
              style={{padding:"clamp(28px,3vw,44px)",border:"1px solid var(--hair)",
                margin:"-1px 0 0 -1px",cursor:"pointer",
                background:selected===r.id?"color-mix(in oklab,var(--bg),var(--accent) 5%)":"var(--bg)",
                borderColor:selected===r.id?"var(--accent)":"var(--hair)",
                transition:"background .2s,border-color .2s",position:"relative"}}>
              {selected===r.id && (
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"var(--accent)"}}/>
              )}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",
                gap:12,flexWrap:"wrap",marginBottom:14}}>
                <div style={{fontFamily:"var(--ff-display)",fontWeight:700,
                  fontSize:"clamp(20px,2vw,26px)",letterSpacing:"-0.01em"}}>{r.title}</div>
                <span className="mono" style={{fontSize:10.5,letterSpacing:"0.08em",
                  color:"var(--accent)"}}>{r.time}</span>
              </div>
              <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(15px,1.3vw,17.5px)",
                lineHeight:1.55,color:"var(--fg-muted)",marginBottom:18}}>{r.desc}</p>
              <div>
                <div className="label" style={{marginBottom:10}}>Good fit if</div>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:7}}>
                  {r.good.map((g,j)=>(
                    <li key={j} style={{fontFamily:"var(--ff-body)",fontSize:15,
                      color:"var(--fg)",display:"flex",gap:10,alignItems:"baseline"}}>
                      <span style={{color:"var(--accent)",flexShrink:0}}>—</span>{g}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{marginTop:20}}>
                <span className="btn btn-ghost" style={{fontSize:12,padding:"8px 16px"}}>
                  {selected===r.id ? "Selected ✓" : "Apply for this role →"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section id="volunteer-form" className="wrap"
        style={{maxWidth:680,paddingTop:"clamp(64px,9vw,110px)",paddingBottom:"clamp(64px,9vw,110px)"}}>
        <RuleLabel num="" text="Tell us about yourself"/>
        <hr className="hairline" style={{margin:"16px 0 36px"}}/>

        {submitted ? (
          <div>
            <Mark size={36}/>
            <h2 style={{fontFamily:"var(--ff-display)",fontWeight:800,
              fontSize:"clamp(28px,3.5vw,44px)",letterSpacing:"-0.02em",
              lineHeight:1.02,marginTop:24}}>
              Thanks, {f.name.split(" ")[0]}.<br/>
              <span className="serif-it" style={{fontWeight:500}}>We'll be in touch.</span>
            </h2>
            <p style={{fontFamily:"var(--ff-body)",fontSize:19,lineHeight:1.55,
              color:"var(--fg-muted)",marginTop:18,maxWidth:"44ch"}}>
              We read every application carefully. If there's a match, an editor will write back within two weeks — not with a form response, but with a conversation.
            </p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
              <label style={{display:"block"}}>
                <div className="label" style={{marginBottom:8,color:"var(--fg)"}}>Your name</div>
                <input value={f.name} onChange={e=>set("name",e.target.value)}
                  placeholder="How you'd like to be credited"
                  style={{width:"100%",padding:"13px 16px",border:"1px solid var(--hair)",
                    borderRadius:2,background:"transparent",outline:"none"}}/>
              </label>
              <label style={{display:"block"}}>
                <div className="label" style={{marginBottom:8,color:"var(--fg)"}}>Email</div>
                <input value={f.email} onChange={e=>set("email",e.target.value)}
                  placeholder="you@example.com" type="email"
                  style={{width:"100%",padding:"13px 16px",border:"1px solid var(--hair)",
                    borderRadius:2,background:"transparent",outline:"none"}}/>
              </label>
            </div>
            <label style={{display:"block",marginBottom:20}}>
              <div className="label" style={{marginBottom:8,color:"var(--fg)"}}>Role you're interested in</div>
              <select value={f.role} onChange={e=>set("role",e.target.value)}
                style={{width:"100%",padding:"13px 16px",border:"1px solid var(--hair)",
                  borderRadius:2,background:"transparent",outline:"none"}}>
                <option value="">Choose a role…</option>
                {ROLES.map(r=><option key={r.id} value={r.id}>{r.title}</option>)}
              </select>
            </label>
            <label style={{display:"block",marginBottom:28}}>
              <div className="label" style={{marginBottom:8,color:"var(--fg)"}}>
                A bit about you
                <span style={{color:"var(--fg-muted)",marginLeft:8}}>optional but useful</span>
              </div>
              <textarea value={f.note} onChange={e=>set("note",e.target.value)}
                placeholder="What you've done, what you care about, what circuit you came from."
                rows={4}
                style={{width:"100%",padding:"13px 16px",border:"1px solid var(--hair)",
                  borderRadius:2,background:"transparent",outline:"none",
                  resize:"vertical",lineHeight:1.5}}/>
            </label>
            <button type="submit" className="btn btn-solid"
              disabled={!f.name.trim()||!f.email.trim()||!f.role}>
              Send application
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

Object.assign(window, { VolunteerPage });
