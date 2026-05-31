// pages-legal.jsx
const { useEffect:useELg } = React;

const LEGAL = {
  “terms”: {
    title:”Terms of Use”,
    updated:”Last Updated: 31 May 2026”,
    intro:”Welcome to Debaters' Tribune, a publication of DebaterVerse Limited. These Terms of Use govern your access to and use of DebatersTribune.com, including all articles, contributor profiles, newsletters, submissions, and related services. By accessing, reading, contributing to, or otherwise using the platform, you agree to these terms.”,
    sections:[
      { h:”About Debaters' Tribune”, body:[
        “Debaters' Tribune is an editorial publication dedicated to preserving the stories, experiences, histories, and human realities of debate communities around the world.”,
        “The platform exists to document what debate does to people, not simply who wins competitions.”] },
      { h:”Using the platform”, body:[
        “You may access, read, share, and link to content published on Debaters' Tribune for personal and non-commercial purposes.”,
        “You agree not to interfere with or disrupt the operation of the website, attempt unauthorized access to systems, accounts, or data, scrape, harvest, or reproduce content at scale without permission, republish complete articles, essays, interviews, or other content without written authorization, or misrepresent your identity or affiliation when interacting with the platform.”,
        “We reserve the right to restrict access to any user who violates these terms.”] },
      { h:”Contributor submissions”, body:[
        “Debaters' Tribune welcomes pitches, essays, personal narratives, interviews, historical accounts, and other contributions from members of the global debate community.”,
        “By submitting content, you confirm that the work is your own or you have the right to submit it, the information provided is accurate to the best of your knowledge, the submission does not knowingly infringe on the rights of others, and you have obtained any permissions necessary for third-party materials included in the submission.”,
        “Submission does not guarantee publication. All submissions are subject to editorial review, fact-checking, editing, and publication decisions at the discretion of Debaters' Tribune.”] },
      { h:”Rights and ownership”, body:[
        “Contributors retain ownership of their original work.”,
        “By publishing with Debaters' Tribune, you grant DebaterVerse Limited a non-exclusive, worldwide, royalty-free license to edit and format the work for publication, host and archive the work indefinitely, distribute the work through the website, newsletters, social media channels, podcasts, video content, and future publication formats, and promote the work with appropriate attribution.”,
        “Unless otherwise agreed in writing, contributors remain free to republish their work elsewhere.”] },
      { h:”Editorial independence”, body:[
        “Debaters' Tribune reserves the right to edit, decline, remove, update, or archive content in accordance with its editorial standards and policies.”,
        “Publication does not imply endorsement of every opinion expressed by contributors. Views expressed by authors are their own and do not necessarily represent the views of Debaters' Tribune, DebaterVerse Limited, its editors, partners, or affiliates.”] },
      { h:”Intellectual property”, body:[
        “The Debaters' Tribune name, branding, visual identity, website design, logos, editorial compilations, and original platform materials are the intellectual property of DebaterVerse Limited unless otherwise indicated.”,
        “Individual articles, essays, interviews, and contributor content remain the property of their respective authors.”,
        “Unauthorized commercial use of platform content is prohibited.”] },
      { h:”Accuracy and historical content”, body:[
        “Many articles on Debaters' Tribune discuss personal experiences, memories, historical events, and community perspectives.”,
        “While we strive for accuracy, we do not guarantee that all content will be complete, current, or error-free. Readers should understand that personal narratives and opinion pieces reflect individual viewpoints.”] },
      { h:”Third-party links”, body:[
        “The platform may contain links to third-party websites, organizations, tournaments, publications, or resources.”,
        “Debaters' Tribune is not responsible for the content, availability, or practices of external websites.”] },
      { h:”Limitation of liability”, body:[
        “The platform is provided on an \”as is\” and \”as available\” basis.”,
        “To the fullest extent permitted by applicable law, DebaterVerse Limited shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from use of the platform, inability to access the platform, reliance on published content, or errors, interruptions, or technical failures.”] },
      { h:”Changes to these terms”, body:[
        “We may update these Terms of Use as the publication evolves.”,
        “Material changes will be reflected by updating the \”Last Updated\” date above. Continued use of the platform after changes take effect constitutes acceptance of the revised terms.”] },
      { h:”Contact”, body:[
        “Questions regarding these Terms of Use may be directed to DebaterVerse Limited — Debaters' Tribune at hello@debaterstribune.com.”] },
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
