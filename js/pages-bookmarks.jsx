// pages-bookmarks.jsx
const { useState:useSBk, useEffect:useEBk } = React;

function BookmarksPage(){
  const [slugs, setSlugs] = useSBk(()=>getBookmarks());
  useEBk(()=>{ window.scrollTo(0,0); },[]);
  useEBk(()=>{
    const on = ()=>setSlugs(getBookmarks());
    window.addEventListener("bookmarks_changed", on);
    return ()=>window.removeEventListener("bookmarks_changed", on);
  },[]);

  const articles = slugs.map(s=>articleBySlug(s)).filter(Boolean);

  return (
    <div className="route-enter">
      <header style={{paddingTop:"clamp(48px,7vw,88px)",paddingBottom:"clamp(32px,4vw,56px)"}}>
        <div className="wrap">
          <div className="kicker">Your library</div>
          <h1 style={{fontFamily:"var(--ff-display)",fontWeight:800,fontSize:"clamp(40px,6vw,80px)",
            lineHeight:0.98,letterSpacing:"-0.025em",marginTop:16}}>Saved stories</h1>
          <p style={{fontFamily:"var(--ff-body)",fontSize:"clamp(17px,1.5vw,20px)",lineHeight:1.55,
            color:"var(--fg-muted)",marginTop:18,maxWidth:"48ch"}}>
            Stories you've bookmarked while reading. Saved locally to this browser.
          </p>
        </div>
      </header>

      <div className="wrap">
        <hr className="hairline" style={{marginBottom:40}}/>
        {articles.length === 0 ? (
          <div style={{padding:"clamp(40px,8vw,100px) 0",textAlign:"center",maxWidth:480,margin:"0 auto"}}>
            <Mark size={36}/>
            <h2 style={{fontFamily:"var(--ff-display)",fontWeight:700,fontSize:"clamp(24px,3vw,34px)",
              letterSpacing:"-0.015em",marginTop:24,lineHeight:1.1}}>Nothing saved yet.</h2>
            <p style={{fontFamily:"var(--ff-body)",fontSize:18,color:"var(--fg-muted)",marginTop:14,lineHeight:1.5}}>
              Hit the Save button on any story to find it here later.
            </p>
            <button onClick={()=>go("/")} className="btn btn-solid" style={{marginTop:28}}>Browse stories</button>
          </div>
        ) : (
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"clamp(40px,6vw,96px)"}}>
              {articles.map(a=><ArticleCard key={a.slug} slug={a.slug} variant="text"/>)}
            </div>
            {articles.length > 0 && (
              <div style={{marginTop:48,paddingTop:24,borderTop:"1px solid var(--hair)"}}>
                <button onClick={()=>{
                  localStorage.removeItem("dt_bookmarks");
                  window.dispatchEvent(new CustomEvent("bookmarks_changed"));
                  window.dispatchEvent(new CustomEvent("show_toast",{detail:"All saved stories cleared"}));
                }} style={{fontFamily:"var(--ff-mono)",fontSize:11,letterSpacing:"0.08em",
                  textTransform:"uppercase",color:"var(--fg-muted)",padding:"8px 0"}}>
                  Clear all saved stories
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{marginTop:"clamp(64px,9vw,120px)"}}><Newsletter/></div>
    </div>
  );
}

Object.assign(window, { BookmarksPage });
