// app.jsx — router, chrome, tweaks, mount
const { useState: useS, useEffect: useE, useRef: useR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "frontTheme": "light",
  "accent": "#7A37CF",
  "headline": "refined",
  "reveal": false
} /*EDITMODE-END*/;

function parseRoute() {
  const h = (window.location.hash || "#/").replace(/^#/, "");
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "read") return { name: "article", slug: parts[1] };
  if (parts[0] === "section") return { name: "archive", section: parts[1] };
  if (parts[0] === "pitch") return { name: "pitch" };
  if (parts[0] === "about") return { name: "about" };
  if (parts[0] === "contributor") return { name: "profile", id: parts[1] };
  if (parts[0] === "legal") return { name: "legal", doc: parts[1] };
  if (parts[0] === "bookmarks") return { name: "bookmarks" };
  if (parts[0] === "contributors") return { name: "contributors" };
  return { name: "home" };
}

function Header({ route, onSearch }) {
  const [scrolled, setScrolled] = useS(false);
  const [open, setOpen] = useS(false);
  useE(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useE(() => { setOpen(false); }, [route]);

  const nav = [
    { label: "All Stories", hash: "/section/all", active: route.name === "archive" && (route.section === "all" || !sectionById(route.section)) },
    ...SECTIONS.map((s) => ({ label: s.name, hash: "/section/" + s.id, active: route.name === "archive" && route.section === s.id })),
    { label: "About", hash: "/about", active: route.name === "about" }
  ];

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 90,
      background: scrolled ? "color-mix(in oklab, var(--bg), transparent 6%)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: "1px solid " + (scrolled ? "var(--hair)" : "transparent"),
      transition: "all .3s" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, gap: 20 }}>
        <Wordmark small />
        <nav className="desk-nav" style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {nav.map((n) =>
            <a key={n.hash} href={"#" + n.hash} onClick={(e) => { e.preventDefault(); go(n.hash); }}
              className="nav-link" style={{ fontFamily: "var(--ff-sans)", fontWeight: n.active ? 600 : 500, fontSize: 13.5, whiteSpace: "nowrap",
                color: n.active ? "var(--accent)" : "var(--fg)", opacity: n.active ? 1 : 0.82 }}>{n.label}</a>
          )}
          <button onClick={onSearch} aria-label="Search" title="Search (Ctrl+K)"
            style={{ color: "var(--fg)", opacity: 0.7, padding: 4, display: "flex", alignItems: "center" }}
            className="nav-link">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
          <a href="#/bookmarks" onClick={(e) => { e.preventDefault(); go("/bookmarks"); }}
            aria-label="Bookmarks" title="Saved stories"
            className="nav-link" style={{ opacity: route.name === "bookmarks" ? 1 : 0.7, color: route.name === "bookmarks" ? "var(--accent)" : "var(--fg)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={route.name === "bookmarks" ? "var(--accent)" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </a>
          <button onClick={() => go("/pitch")} className="btn btn-solid" style={{ padding: "10px 18px", fontSize: 12.5, whiteSpace: "nowrap" }}>Pitch a story</button>
        </nav>
        <div style={{ display: "none" }} className="burger-wrap">
          <button onClick={onSearch} aria-label="Search" style={{ padding: 8, color: "var(--fg)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu"
            style={{ width: 36, height: 36, display: "grid", placeItems: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
              <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="13" x2="21" y2="13" /><line x1="3" y1="19" x2="21" y2="19" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="wrap" style={{ paddingBottom: 18, display: "flex", flexDirection: "column", gap: 4, borderTop: "1px solid var(--hair)", paddingTop: 14 }}>
          {nav.map((n) =>
            <a key={n.hash} href={"#" + n.hash} onClick={(e) => { e.preventDefault(); go(n.hash); }}
              style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 24, padding: "8px 0", color: n.active ? "var(--accent)" : "var(--fg)" }}>{n.label}</a>
          )}
          <a href="#/bookmarks" onClick={(e) => { e.preventDefault(); go("/bookmarks"); }}
            style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: 24, padding: "8px 0", color: route.name === "bookmarks" ? "var(--accent)" : "var(--fg)" }}>Saved</a>
          <button onClick={() => go("/pitch")} className="btn btn-solid" style={{ marginTop: 12, justifyContent: "center" }}>Pitch a story</button>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="surface-dark" style={{ paddingTop: "clamp(56px,7vw,90px)", paddingBottom: 40, borderTop: "1px solid rgba(244,242,248,0.12)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <Wordmark />
            <p style={{ fontFamily: "var(--ff-body)", fontStyle: "italic", fontSize: 18, color: "rgba(244,242,248,0.62)", marginTop: 18, maxWidth: "30ch" }}>
              We don't document who won. We document what debate does to people.
            </p>
          </div>
          {[
            { h: "Read", items: [{ l: "All Stories", a: "/section/all" }, ...SECTIONS.map((s) => ({ l: s.name, a: "/section/" + s.id }))] },
            { h: "Contribute", items: [{ l: "Pitch a story", a: "/pitch" }, { l: "Contributors", a: "/contributors" }, { l: "Volunteer", a: "/about" }, { l: "Donate", a: "/about" }] },
            { h: "The platform", items: [{ l: "About", a: "/about" }, { l: "All Stories", a: "/section/all" }, { l: "The dispatch", a: "/about" }, { l: "Saved stories", a: "/bookmarks" }] }
          ].map((col) =>
            <div key={col.h}>
              <div className="label" style={{ color: "rgba(244,242,248,0.5)", marginBottom: 16 }}>{col.h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {col.items.map((it) =>
                  <a key={it.l} href={"#" + it.a} onClick={(e) => { e.preventDefault(); go(it.a); }}
                    className="foot-link" style={{ fontFamily: "var(--ff-sans)", fontSize: 14, color: "rgba(244,242,248,0.78)" }}>{it.l}</a>
                )}
              </div>
            </div>
          )}
        </div>
        <hr style={{ border: 0, borderTop: "1px solid rgba(244,242,248,0.12)", margin: "40px 0 22px" }} />
        <div style={{ display: "flex", gap: "14px 26px", flexWrap: "wrap", marginBottom: 18 }}>
          {[{ l: "Terms of Use", a: "/legal/terms" }, { l: "Privacy Policy", a: "/legal/privacy" }, { l: "Editorial Policy", a: "/legal/editorial" }].map((it) =>
            <a key={it.l} href={"#" + it.a} onClick={(e) => { e.preventDefault(); go(it.a); }}
              className="foot-link mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(244,242,248,0.6)" }}>{it.l}</a>
          )}
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: "rgba(244,242,248,0.4)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span>© 2026 DebaterVerse Limited. All rights reserved.</span>
          <span>VOICES · MEMORY · ARGUMENT</span>
        </div>
      </div>
    </footer>
  );
}

function useReadingProgress(route) {
  useE(() => {
    const bar = document.getElementById("read-progress");
    const on = () => {
      const el = document.getElementById("article-content");
      if (route.name !== "article" || !el) { bar.style.width = "0%"; return; }
      const start = el.offsetTop - window.innerHeight * 0.4;
      const end = el.offsetTop + el.offsetHeight - window.innerHeight * 0.6;
      const p = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
      bar.style.width = p * 100 + "%";
    };
    on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [route]);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useS(parseRoute());
  const [searchOpen, setSearchOpen] = useS(false);

  useE(() => {
    const on = () => setRoute(parseRoute());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  useE(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useReadingProgress(route);

  useE(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.body.classList.toggle("type-grand", t.headline === "grand");
    document.documentElement.classList.toggle("do-reveal", !!t.reveal);
  }, [t]);

  const homeDark = route.name === "home" && t.frontTheme === "dark";

  let page;
  switch (route.name) {
    case "article":   page = <ArticlePage slug={route.slug} />; break;
    case "archive":   page = <ArchivePage section={route.section} />; break;
    case "pitch":     page = <PitchPage />; break;
    case "about":     page = <AboutPage />; break;
    case "profile":   page = <ProfilePage id={route.id} />; break;
    case "legal":     page = <LegalPage doc={route.doc} />; break;
    case "bookmarks":     page = <BookmarksPage />; break;
    case "contributors":  page = <ContributorsPage />; break;
    default:          page = <HomePage />;
  }

  return (
    <div className={homeDark ? "surface-dark" : ""} style={homeDark ? { minHeight: "100vh" } : undefined}>
      <Header route={route} onSearch={() => setSearchOpen(true)} />
      <main key={route.name + (route.slug || route.section || route.id || "")}>{page}</main>
      <Footer />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <Toast />
      <TweaksPanel>
        <TweakSection label="Front page" />
        <TweakRadio label="Theme" value={t.frontTheme} options={["light", "dark"]} onChange={(v) => setTweak("frontTheme", v)} />
        <TweakSection label="Identity" />
        <TweakColor label="Accent" value={t.accent} options={["#7A37CF", "#5E27A8", "#B23A8E", "#3551C9"]} onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Headlines" value={t.headline} options={["refined", "grand"]} onChange={(v) => setTweak("headline", v)} />
        <TweakSection label="Reading" />
        <TweakToggle label="Scroll reveal" value={t.reveal} onChange={(v) => setTweak("reveal", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
window.addEventListener("load", () => { const l = document.getElementById("loading"); if (l) { l.style.opacity = 0; setTimeout(() => l.remove(), 500); } });
setTimeout(() => { const l = document.getElementById("loading"); if (l) { l.style.opacity = 0; setTimeout(() => l.remove(), 500); } }, 1400);
