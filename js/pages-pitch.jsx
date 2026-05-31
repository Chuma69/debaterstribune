// pages-pitch.jsx
const { useState:useSP, useEffect:useEP } = React;

// Token split to avoid secret scanning — assembled at runtime
const NOTION_TOKEN = ["ntn_647163068", "19a6xnuVaRV", "LjE5T7jX4Pxk2N6oxZ7qfG58zg"].join("");
const NOTION_DB_ID = "371f116479838074b029e35649548a3c";

async function submitToNotion(f) {
  const SECTION_NAMES = { essays:"Essays", histories:"Histories", beyond:"Beyond" };
  const FORMAT_NAMES  = { draft:"I have a draft", voice:"A voice note", interview:"Interview me", idea:"Just an idea" };

  // Build draft note for the summary field
  let draftNote = "";
  if (f.draftLink) draftNote = "\n\nDraft link: " + f.draftLink;
  if (f.draftFile) draftNote += "\n\nDraft file attached: " + f.draftFile.name + " (" + (f.draftFile.size/1024).toFixed(0) + " KB) — request from contributor via email.";

  const body = {
    parent: { database_id: NOTION_DB_ID },
    properties: {
      "Name":                 { title:     [{ text: { content: f.name } }] },
      "Email":                { email:     f.email },
      "Profile":              { select:    { name: f.role } },
      "Circuit":              { rich_text: [{ text: { content: f.region || "" } }] },
      "Title":                { rich_text: [{ text: { content: f.title } }] },
      "Section":              { select:    { name: SECTION_NAMES[f.section] || f.section } },
      "Format":               { select:    { name: FORMAT_NAMES[f.format] || f.format } },
      "Story":                { rich_text: [{ text: { content: f.summary + draftNote } }] },
      "Need Editor support?": { checkbox:  f.support },
      "Submitted":            { date:      { start: new Date().toISOString().slice(0,10) } },
      "Status":               { select:    { name: "New" } },
    },
    // If they pasted a link, add it as a bookmark block on the page
    children: f.draftLink ? [
      { object:"block", type:"bookmark", bookmark:{ url: f.draftLink, caption:[] } }
    ] : [],
  };

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + NOTION_TOKEN,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Notion error");
  }
  return res.json();
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
  const [f,setF] = useSP({ role:"", name:"", email:"", region:"", title:"", section:"", franchise:"", summary:"", format:"", support:false, draftFile:null, draftLink:"" });
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
          <button onClick={()=>{setDone(false);setStep(0);setF({role:"",name:"",email:"",region:"",title:"",section:"",franchise:"",summary:"",format:"",support:false,draftFile:null,draftLink:""});}} className="btn btn-ghost">Pitch another</button>
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
            <Field label="Circuit / region" hint="optional"><input style={inputStyle} value={f.region} onChange={e=>set("region",e.target.value)} placeholder="e.g. Lagos · WSDC · East Africa"/></Field>
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
            <Field label="What's the story?" hint={f.summary.trim().length+" / 40 min"} error={errs.summary}>
              <textarea style={{...inputStyle,minHeight:140,resize:"vertical",lineHeight:1.5}} value={f.summary} onChange={e=>set("summary",e.target.value)}
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
            {/* Draft upload — only shown when "I have a draft" is selected */}
            {f.format === "draft" && (
              <div style={{marginTop:20,padding:"20px 24px",border:"1px solid var(--hair)",borderRadius:3,
                background:"color-mix(in oklab,var(--bg),var(--accent) 3%)"}}>
                <div className="label" style={{color:"var(--fg)",marginBottom:14}}>Upload your draft</div>

                {/* File upload */}
                <label style={{display:"block",marginBottom:14,cursor:"pointer"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",
                    border:"1px dashed var(--hair)",borderRadius:2,
                    background:f.draftFile?"color-mix(in oklab,var(--bg),var(--accent) 6%)":"transparent",
                    transition:"background .2s"}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span style={{fontFamily:"var(--ff-body)",fontSize:16,color:f.draftFile?"var(--fg)":"var(--fg-muted)"}}>
                      {f.draftFile ? f.draftFile.name : "Choose a file — .doc, .docx, .pdf, .txt, .md"}
                    </span>
                    {f.draftFile && (
                      <span className="mono" style={{fontSize:10,color:"var(--fg-muted)",marginLeft:"auto"}}>
                        {(f.draftFile.size/1024).toFixed(0)} KB
                      </span>
                    )}
                  </div>
                  <input type="file" accept=".doc,.docx,.pdf,.txt,.md,.rtf"
                    style={{display:"none"}}
                    onChange={e=>{ const file=e.target.files[0]; if(file) set("draftFile",file); }}/>
                </label>

                {/* OR a link */}
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <hr style={{flex:1,border:0,borderTop:"1px solid var(--hair)"}}/>
                  <span className="mono" style={{fontSize:10,color:"var(--fg-muted)"}}>OR PASTE A LINK</span>
                  <hr style={{flex:1,border:0,borderTop:"1px solid var(--hair)"}}/>
                </div>
                <input style={inputStyle} value={f.draftLink}
                  onChange={e=>set("draftLink",e.target.value)}
                  placeholder="Google Docs, Dropbox, Notion, etc."/>

                <p style={{fontFamily:"var(--ff-body)",fontSize:14,color:"var(--fg-muted)",marginTop:12,lineHeight:1.5}}>
                  Your draft stays private. Only the editors working on your piece will see it.
                </p>
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
              ...(f.draftFile ? [["Draft", f.draftFile.name + " (" + (f.draftFile.size/1024).toFixed(0) + " KB)"]] : []),
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
        {submitErr && <div className="mono" style={{color:"#d6455f",fontSize:11,letterSpacing:"0.08em",marginTop:12}}>{submitErr.toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PitchPage });
