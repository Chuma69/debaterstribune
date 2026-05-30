// pages-legal.jsx
const { useEffect:useELg } = React;

const LEGAL = {
  "terms": {
    title:"Terms of Use",
    updated:"Last updated 30 May 2026",
    intro:"These terms govern your use of The Debaters' Tribune, a publication of DebaterVerse Limited. By reading, contributing to, or otherwise using the platform, you agree to them.",
    sections:[
      { h:"Using the platform", body:[
        "The Debaters' Tribune is a storytelling archive. You're welcome to read, share and link to our work for personal and non-commercial purposes.",
        "You agree not to misuse the platform — including attempting to disrupt it, scraping it at scale, or republishing whole pieces without written permission."] },
      { h:"Contributor submissions", body:[
        "When you pitch or submit a story, you confirm that the account is your own, that it is truthful to your experience, and that you have the right to share it.",
        "You retain ownership of your words. By publishing with us, you grant DebaterVerse Limited a non-exclusive, worldwide licence to edit, format, host and distribute your piece across our channels, with attribution."] },
      { h:"Intellectual property", body:[
        "All editorial design, branding and compiled content on the platform belongs to DebaterVerse Limited unless otherwise credited. Individual stories remain the work of their named authors."] },
      { h:"Liability", body:[
        "The platform is provided “as is”. To the fullest extent permitted by law, DebaterVerse Limited is not liable for any loss arising from your use of it."] },
      { h:"Changes", body:[
        "We may update these terms as the platform grows. Material changes will be noted here with a revised date."] },
    ],
  },
  "privacy": {
    title:"Privacy Policy",
    updated:"Last updated 30 May 2026",
    intro:"This policy explains what we collect, why, and the choices you have. We collect as little as we can, and we never sell your data.",
    sections:[
      { h:"What we collect", body:[
        "If you subscribe to the dispatch, we store the first name and email address you give us.",
        "If you pitch a story, we store the details you submit — your name, contact, and the pitch itself — so an editor can respond.",
        "We collect basic, anonymised analytics about how pages are used, to understand what stories resonate."] },
      { h:"How we use it", body:[
        "To send you the stories you asked for, to develop and publish work with you, and to improve the platform. Nothing more."] },
      { h:"Sharing", body:[
        "We do not sell or rent your information. We share it only with the service providers that help us run the platform (for example, our email tool), under agreements that protect it."] },
      { h:"Your choices", body:[
        "You can unsubscribe from the dispatch at any time using the link in any email. You can ask us to access or delete the personal data we hold about you by writing to privacy@thedebaterstribune.com."] },
    ],
  },
  "editorial": {
    title:"Editorial Policy",
    updated:"Last updated 30 May 2026",
    intro:"The Debaters' Tribune publishes narrative-driven, first-person storytelling about life inside debate. We prioritise truthfulness of experience over technical precision.",
    sections:[
      { h:"What we publish", body:[
        "Every published piece must be grounded in a real lived experience, written in a clear and personal narrative voice, centred on reflection rather than reporting, free of unnecessary jargon, and structured around a clear story or moment.",
        "We do not document results, rankings or tabs. We document what debate does to people."] },
      { h:"How we work with contributors", body:[
        "We commission as much as we collect. First-time writers can be paired with an editor who develops the story with them — from a voice note or an interview to a finished essay.",
        "We edit collaboratively and protect the authenticity of each voice. Nothing is published without the contributor in the room. Every piece carries full attribution unless a writer requests anonymity for their safety."] },
      { h:"Accuracy and fairness", body:[
        "Personal stories are true to the writer's memory and perspective. Where a piece names other people or institutions, we take reasonable care to be fair and, where appropriate, to seek response.",
        "Corrections are made promptly and noted transparently."] },
      { h:"Independence", body:[
        "Editorial decisions are made independently of any union, tournament or sponsor. We amplify voices from circuits that have long been underrepresented in the global debate narrative."] },
    ],
  },
};

function LegalPage({ doc }){
  useELg(()=>{ window.scrollTo(0,0); },[doc]);
  const d = LEGAL[doc];
  if(!d) return <div className="wrap" style={{padding:"120px 0"}}>Page not found.</div>;
  const others = Object.keys(LEGAL).filter(k=>k!==doc);
  return (
    <div className="route-enter">
      <header className="wrap" style={{maxWidth:760,paddingTop:"clamp(40px,6vw,76px)"}}>
        <div className="kicker">Legal</div>
        <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(36px,5.4vw,64px)",lineHeight:0.98,letterSpacing:"-0.024em",marginTop:14}}>{d.title}</h1>
        <div className="mono" style={{fontSize:11,letterSpacing:"0.08em",color:"var(--fg-muted)",marginTop:16}}>{d.updated.toUpperCase()}</div>
        <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(18px,1.7vw,21px)",lineHeight:1.55,marginTop:24}}>{d.intro}</p>
      </header>

      <article className="wrap" style={{maxWidth:760,paddingTop:"clamp(32px,4vw,48px)",paddingBottom:"clamp(48px,6vw,80px)"}}>
        {d.sections.map((s,i)=>(
          <section key={i} style={{paddingTop:36,borderTop:"1px solid var(--hair)",marginTop:36}}>
            <h2 style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:"clamp(21px,2.2vw,27px)",letterSpacing:"-0.01em"}}>{s.h}</h2>
            {s.body.map((p,j)=>(
              <p key={j} style={{fontFamily:"var(--ff-body)",fontSize:"clamp(16.5px,1.4vw,19px)",lineHeight:1.62,marginTop:16,color:"var(--fg)"}}>{p}</p>
            ))}
          </section>
        ))}
      </article>

      <div className="wrap" style={{maxWidth:760,paddingBottom:"clamp(56px,8vw,100px)"}}>
        <hr className="hairline"/>
        <div style={{display:"flex",gap:24,flexWrap:"wrap",marginTop:24}}>
          {others.map(k=>(
            <a key={k} href={"#/legal/"+k} onClick={(e)=>{e.preventDefault();go("/legal/"+k);}} className="label" style={{color:"var(--accent)"}}>{LEGAL[k].title} →</a>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LegalPage });
