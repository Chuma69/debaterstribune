// pages-pitch.jsx
const { useState:useSP, useEffect:useEP } = React;

const MAKE_WEBHOOK = "https://hook.eu1.make.com/spysp9ciyflzbxmfa6l1osacr1b14sgo";

const SECTION_NAMES = { essays:"Essays", histories:"Histories", beyond:"Beyond" };
const FORMAT_NAMES  = { draft:"I have a draft", voice:"A voice note", interview:"Interview me", idea:"Just an idea" };

async function submitToNotion(f) {
  const payload = {
    name:      f.name.trim()  || "Anonymous",
    email:     f.email.trim() || "",
    role:      f.role         || "",
    region:    f.region       || "",
    title:     f.title.trim() || "(no title)",
    section:   SECTION_NAMES[f.section] || f.section || "",
    format:    FORMAT_NAMES[f.format]   || f.format  || "",
    summary:   f.summary      || "",
    draftLink: f.draftLink    || "",
    support:   !!f.support,
    submitted: new Date().toISOString().slice(0, 10),
  };

  const res = await fetch(MAKE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Webhook error " + res.status);
}

const ROLES = ["Current debater","Alumni / oldie","Coach","Adjudicator","Debate union / org"];
const FORMATS = [
  { id:"draft", t:"I have a draft", d:"A finished or partial piece you've already written." },
  { id:"voice", t:"A voice note", d:"Talk it through — we'll transcribe and shape it with you." },
  { id:"interview", t:"Interview me", d:"An editor develops the story through conversation." },
  { id:"idea", t:"Just an idea", d:"A moment, a feeling, a sentence. We'll help you find the rest." },
];

function Field({ label, hint, children, error }){
  return (
    <label style={{display:"block",marginBottom:24}}>
      <div className="label" style={{color:"var(--fg)",marginBottom:8,display:"flex",justifyContent:"space-between"}}>
        <span>{label}</span>{hint && <span style={{color:"var(--fg-muted)"}}>{hint}</span>}
      </div>
      {children}
      {error && <div className="mono" style={{color:"#d6455f",fontSize:11,letterSpacing:"0.06em",marginTop:6}}>{error}</div>}
    </label>
  );
}
const inputStyle = {width:"100%",padding:"13px 16px",border:"1px solid var(--hair)",borderRadius:2,background:"transparent",outline:"none"};

function PitchPage(){
  const [step,setStep] = useSP(0);
  const [done,setDone] = useSP(false);
  const [errs,setErrs] = useSP({});
  const [f,setF] = useSP({ role:"", name:"", email:"", region:"", title:"", section:"", franchise:"", summary:"", format:"", support:false, draftLink:"" });
  const set = (k,v)=>{ setF(p=>({...p,[k]:v})); setErrs(p=>({...p,[k]:null})); };
  useEP(()=>{ window.scrollTo(0,0); },[step,done]);

  const steps = ["You","The story","The telling","Review"];

  function validate(s){
    const e = {};
    if(s===0){ if(!f.role)e.role="Pick the one that fits best."; if(!f.name.trim())e.name="We need a name to credit you."; if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email))e.email="A valid email, please."; }
    if(s===1){ if(!f.title.trim())e.title="Even a rough title helps."; if(!f.section)e.section="Which corner of the record?"; if(f.summary.trim().length<40)e.summary="A few sentences — what happened, and why it stayed with you."; }
    if(s===2){ if(!f.format)e.format="How would you like to tell it?"; }
    setErrs(e); return Object.keys(e).length===0;
  }
  const next = ()=>{ if(validate(step)) setStep(s=>Math.min(3,s+1)); };
  const back = ()=> setStep(s=>Math.max(0,s-1));
  const [submitting, setSubmitting] = useSP(false);
  const [submitErr, setSubmitErr] = useSP("");
  const submit = async ()=>{
    if(!validate(2)) return;
    setSubmitting(true);
    setSubmitErr("");
    try {
      await submitToNotion(f);
      setDone(true);
    } catch(e) {
      setSubmitErr("Something went wrong — please email us directly at hello@debaterstribune.com");
    } finally {
      setSubmitting(false);
    }
  };

  if(done){
    return (
      <div className="route-enter wrap" style={{maxWidth:680,minHeight:"70vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px 32px"}}>
        <Mark size={40}/>
        <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(34px,5vw,60px)",lineHeight:1.0,letterSpacing:"-0.02em",marginTop:28}}>
          Thank you, {f.name.split(" ")[0]}.<br/><span className="serif-it" style={{fontWeight:500}}>We've got your story.</span>
        </h1>
        <p style={{fontFamily:"var(--ff-body)",fontSize:20,lineHeight:1.55,color:"var(--fg-muted)",marginTop:22,maxWidth:"46ch"}}>
          An editor will read every word and write back within a week — not with a verdict, but with questions. {f.support?"Since you asked for support, we'll pair you with someone to develop it together.":"If it needs shaping, we'll shape it with you."} Nothing gets published without you in the room.
        </p>
        <div style={{display:"flex",gap:14,marginTop:36,flexWrap:"wrap"}}>
          <button onClick={()=>go("/")} className="btn btn-solid">Back to the front page</button>
          <button onClick={()=>{setDone(false);setStep(0);setF({role:"",name:"",email:"",region:"",title:"",section:"",franchise:"",summary:"",format:"",support:false,draftLink:""});}} className="btn btn-ghost">Pitch another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="route-enter">
      <header className="wrap" style={{maxWidth:760,paddingTop:"clamp(40px,6vw,72px)"}}>
        <div className="kicker">Tell your story</div>
        <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(34px,5.4vw,64px)",lineHeight:0.98,letterSpacing:"-0.024em",marginTop:16}}>
          This is a place where debaters are <span className="serif-it" style={{fontWeight:500}}>heard, not ranked.</span>
        </h1>
        <p style={{fontFamily:"var(--ff-body)",fontSize:19,lineHeight:1.5,color:"var(--fg-muted)",marginTop:18,maxWidth:"50ch"}}>
          You don't need to be a writer. You need a real moment and the willingness to be honest about it. We'll do the rest together.
        </p>
      </header>

      {/* progress steps */}
      <div className="wrap" style={{maxWidth:760,marginTop:"clamp(32px,4vw,48px)"}}>
        <div style={{display:"flex",gap:0,borderTop:"1px solid var(--hair)",borderBottom:"1px solid var(--hair)"}}>
          {steps.map((s,i)=>(
            <div key={s} style={{flex:1,padding:"14px 0",borderBottom:"2px solid "+(i===step?"var(--accent)":"transparent"),marginBottom:-1,display:"flex",alignItems:"center",gap:8,opacity:i<=step?1:0.4}}>
              <span className="mono" style={{fontSize:11,color:i<step?"var(--accent)":"var(--fg)"}}>{i<step?"✓":"0"+(i+1)}</span>
              <span className="label" style={{color:i===step?"var(--fg)":"var(--fg-muted)"}}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap" style={{maxWidth:760,paddingTop:"clamp(36px,4vw,52px)",paddingBottom:"clamp(56px,8vw,100px)"}}>
        {step===0 && (
          <div className="route-enter">
            <Field label="I am a…" error={errs.role}>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {ROLES.map(r=>(
                  <button key={r} onClick={()=>set("role",r)} className="mono" style={{
                    fontSize:12,padding:"11px 16px",borderRadius:2,
                    border:"1px solid "+(f.role===r?"var(--accent)":"var(--hair)"),
                    background:f.role===r?"var(--accent)":"transparent",color:f.role===r?"#fff":"var(--fg)"}}>{r}</button>
                ))}
              </div>
            </Field>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              <Field label="Your name" error={errs.name}><input style={inputStyle} value={f.name} onChange={e=>set("name",e.target.value)} placeholder="How you'd like to be credited"/></Field>
              <Field label="Email" error={errs.email}><input style={inputStyle} value={f.email} onChange={e=>set("email",e.target.value)} placeholder="you@example.com"/></Field>
            </div>
            <Field label="Circuit" hint="optional">
              <select style={inputStyle} value={f.region} onChange={e=>set("region",e.target.value)}>
                <option value="">Select a circuit…</option>
                {CIRCUITS.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
        )}

        {step===1 && (
          <div className="route-enter">
            <Field label="Working title" hint="rough is fine" error={errs.title}><input style={inputStyle} value={f.title} onChange={e=>set("title",e.target.value)} placeholder="The round that…"/></Field>
            <Field label="Section" error={errs.section}>
              <select style={inputStyle} value={f.section} onChange={e=>set("section",e.target.value)}>
                <option value="">Choose a section…</option>
                {SECTIONS.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </Field>
            <Field label="What's the story?" hint={f.summary.trim().length+" / 2,000"} error={errs.summary}>
              <textarea style={{...inputStyle,minHeight:140,resize:"vertical",lineHeight:1.5}} value={f.summary} maxLength={2000} onChange={e=>set("summary",e.target.value)}
                placeholder="Don't pitch a topic — tell us a moment. What happened, and why does it still sit with you?"/>
            </Field>
          </div>
        )}

        {step===2 && (
          <div className="route-enter">
            <Field label="How would you like to tell it?" error={errs.format}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {FORMATS.map(o=>(
                  <button key={o.id} onClick={()=>set("format",o.id)} style={{
                    textAlign:"left",padding:"18px 20px",borderRadius:3,
                    border:"1px solid "+(f.format===o.id?"var(--accent)":"var(--hair)"),
                    background:f.format===o.id?"color-mix(in oklab,var(--bg),var(--accent) 8%)":"transparent"}}>
                    <div style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:20}}>{o.t}</div>
                    <div style={{fontFamily:"var(--ff-body)",fontSize:15,color:"var(--fg-muted)",marginTop:6,lineHeight:1.4}}>{o.d}</div>
                  </button>
                ))}
              </div>
            </Field>
            {/* Draft link — only shown when "I have a draft" is selected */}
            {f.format === "draft" && (
              <div style={{marginTop:20,padding:"20px 24px",border:"1px solid var(--hair)",borderRadius:3,
                background:"color-mix(in oklab,var(--bg),var(--accent) 3%)"}}>
                <div className="label" style={{color:"var(--fg)",marginBottom:6}}>Share your draft</div>
                <p style={{fontFamily:"var(--ff-body)",fontSize:16,lineHeight:1.5,color:"var(--fg-muted)",marginBottom:16}}>
                  Paste a link to your draft — Google Docs, Dropbox, Notion, or anywhere it lives.
                </p>
                <input style={inputStyle} value={f.draftLink}
                  onChange={e=>set("draftLink",e.target.value)}
                  placeholder="https://docs.google.com/…"/>
                <div style={{display:"flex",gap:10,alignItems:"flex-start",marginTop:14,
                  padding:"12px 14px",background:"color-mix(in oklab,var(--bg),var(--accent) 8%)",
                  borderRadius:2,border:"1px solid var(--accent)"}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)"
                    strokeWidth="2" style={{flexShrink:0,marginTop:2}}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p style={{fontFamily:"var(--ff-body)",fontSize:14.5,lineHeight:1.5,color:"var(--fg)"}}>
                    <strong style={{fontWeight:600}}>Before submitting</strong> — make sure your link is set to <strong style={{fontWeight:600}}>"Anyone with the link can view"</strong>. If your link is private or requires a login, we won't be able to open it.
                  </p>
                </div>
              </div>
            )}

            <label style={{display:"flex",gap:12,alignItems:"flex-start",cursor:"pointer",marginTop:14,padding:"16px 0",borderTop:"1px solid var(--hair)"}}>
              <input type="checkbox" checked={f.support} onChange={e=>set("support",e.target.checked)} style={{marginTop:4,width:18,height:18,accentColor:"var(--accent)"}}/>
              <span style={{fontFamily:"var(--ff-body)",fontSize:16.5,lineHeight:1.45}}>
                <strong style={{fontWeight:600}}>Pair me with an editor.</strong> <span style={{color:"var(--fg-muted)"}}>First time writing? We commission as much as we collect — an editor will develop this with you, start to finish.</span>
              </span>
            </label>
          </div>
        )}

        {step===3 && (
          <div className="route-enter">
            <div className="label" style={{marginBottom:18}}>Review your pitch</div>
            {[
              ["Contributor", f.name+(f.region?" · "+f.region:"")],
              ["Role", f.role],
              ["Email", f.email],
              ["Title", f.title],
              ["Section", sectionById(f.section)?.name],
              ["Format", FORMATS.find(x=>x.id===f.format)?.t + (f.support?" · with editor support":"")],
              ...(f.draftLink ? [["Draft link", f.draftLink]] : []),
            ].map(([k,v])=>(
              <div key={k} style={{display:"grid",gridTemplateColumns:"160px 1fr",gap:16,padding:"14px 0",borderTop:"1px solid var(--hair)"}}>
                <span className="label">{k}</span>
                <span style={{fontFamily:"var(--ff-body)",fontSize:17}}>{v}</span>
              </div>
            ))}
            <div style={{padding:"14px 0",borderTop:"1px solid var(--hair)",borderBottom:"1px solid var(--hair)"}}>
              <span className="label">The story</span>
              <p style={{fontFamily:"var(--ff-body)",fontSize:17,lineHeight:1.55,marginTop:10,color:"var(--fg)"}}>{f.summary}</p>
            </div>
          </div>
        )}

        {/* nav */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:40}}>
          <button onClick={back} className="btn btn-ghost" style={{visibility:step===0?"hidden":"visible"}}>← Back</button>
          {step<3
            ? <button onClick={next} className="btn btn-solid">Continue</button>
            : <button onClick={submit} className="btn btn-solid" disabled={submitting}>
              {submitting ? "Sending…" : "Send to the editors"}
            </button>}
        </div>
        {submitErr && <div className="mono" style={{color:"#d6455f",fontSize:11,letterSpacing:"0.08em",marginTop:12}}>{submitErr.toUpperCase()}</div>}
      </div>
    </div>
  );
}

Object.assign(window, { PitchPage });
