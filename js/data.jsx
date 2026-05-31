// data.jsx — content model for The Debaters' Tribune

const SECTIONS = [
  { id:"essays", name:"Essays", num:"01",
    blurb:"Reflections on growth, burnout, identity, competition, belonging and transformation — including the emotional realities after a major round.",
    line:"Personal essays" },
  { id:"histories", name:"Histories", num:"02",
    blurb:"Narratives documenting the evolution of circuits, rivalries and eras — with attention beyond the Anglophone mainstream.",
    line:"Debate histories" },
  { id:"beyond", name:"Beyond", num:"03",
    blurb:"Life after the circuit — how debate shapes careers, politics, communication and relationships.",
    line:"Beyond the circuit" },
];

const CIRCUITS = ["West Africa","East Africa","Southern Africa","North Africa","Europe","North America","South America","South Asia","Southeast Asia","Middle East","Global"];

const FRANCHISES = [
  { id:"the-ballot", name:"The Ballot", note:"One round that defined them." },
  { id:"prep-room", name:"Prep Room", note:"What really goes on behind the scenes." },
  { id:"first-affirmative", name:"First Affirmative", note:"Origin stories." },
  { id:"final-rebuttal", name:"Final Rebuttal", note:"Farewell essays." },
  { id:"unpopular-truths", name:"Unpopular Truths", note:"Challenging the norms." },
];

const CONTRIBUTORS = {
  "amara-okeke": { id:"amara-okeke", name:"Serg Mascot", byline:"Open finalist, 2024", region:"Abakaliki, Nigeria",
    bio:"Serg debated for six years across the Nigerian and Pan-African circuits, and now coaches novices and writes about the cost of access in competitive spaces.",
    based:"Now reading law at UI Ibadan." },
  "daniyal-r": { id:"daniyal-r", name:"Daniyal Rahman", byline:"WSDC, 2x national team", region:"Karachi, Pakistan",
    bio:"Daniyal spent his teens in airports and prep rooms. He writes about the strange grief of ageing out of an activity that raised you.",
    based:"Now a speechwriter." },
  "mei-tan": { id:"mei-tan", name:"Mei Tan", byline:"Adjudicator, AP & BP", region:"Singapore",
    bio:"Mei has judged more outrounds than she can count. She writes about what the back of the room sees that the front never does.",
    based:"Software engineer; judges on weekends." },
  "joaquin-vega": { id:"joaquin-vega", name:"Joaquín Vega", byline:"Coach", region:"Lima, Peru",
    bio:"Joaquín built a debate programme in a school that had never had one. He writes about teaching argument to kids the circuit forgot.",
    based:"Secondary-school teacher." },
  "priya-n": { id:"priya-n", name:"Priya Nair", byline:"Two-time octofinalist", region:"Nairobi, Kenya",
    bio:"Priya writes about burnout, ambition, and the quiet years after you stop winning.",
    based:"Public-health researcher." },
  "adaeze-o": { id:"adaeze-o", name:"Adaeze Okonkwo", byline:"WUDC Adjudicator, EA Circuit", region:"Lagos, Nigeria",
    bio:"Adaeze has been in and around debate for a decade — as a speaker, adjudicator, and reluctant organiser. She writes about the invisible labour that keeps circuits alive.",
    based:"Brand strategist." },
  "lena-park": { id:"lena-park", name:"Lena Park", byline:"KPDC champion, 2022", region:"Seoul, South Korea",
    bio:"Lena competed across South and East Asia before moving to competitive policy debate. She writes about the culture gap between circuits and what gets lost in translation.",
    based:"Graduate student in political science." },
};

const ARTICLES = [
  {
    slug:"the-final-round-that-changed-how-i-think",
    section:"essays", franchise:null,
    title:"What bottling every final taught me about consistency",
    dek:"The trophy does not define who I am.",
    author:"amara-okeke", date:"May 18, 2026", read:9, audio:"14:22",
    circuit:"West Africa", img:"Lone debater in an emptying final hall, chairs still askew",
    hue:280, feature:true,
    body:[
      {t:"p", v:"I had argued the motion both ways a hundred times. By the time it came up in a final, I could recite the case for and the case against in my sleep — the framing, the rebuttals, the inevitable point of information that someone always tried in the second half. None of it was supposed to mean anything. That was the whole point. You learn early that conviction is a liability; you learn to hold every belief at arm's length, the way you'd hold a tool you might need to put down."},
      {t:"q", v:"You learn early that conviction is a liability. Then one night the argument you were only performing turns out to be true.", by:"" },
      {t:"p", v:"Then one night, on the side I had been assigned by a coin toss I didn't see, I heard myself say something I actually believed. Not performed. Meant. The room went the way rooms go when something real happens in a place built for performance — a half-second too quiet, the judges' pens not moving."},
      {t:"h", v:"What the tab never recorded"},
      {t:"p", v:"We won. That part is in the record, a line in a spreadsheet that will outlive everyone who was in the room. What isn't in the record is the walk back to the dorms afterward, when I realised I no longer knew which arguments were mine and which I had borrowed to win. You spend years learning to argue anything. Nobody warns you that you might lose track of what you'd argue for free."},
      {t:"p", v:"This is the thing about the activity that I have never been able to explain to people who didn't do it: that the skill it teaches and the thing it costs you are the same skill. I can take any position and make it sound like the only reasonable one. That is a useful thing to be able to do. It is also a strange way to walk through the rest of your life."},
      {t:"q", v:"You spend years learning to argue anything. Nobody warns you that you might lose track of what you'd argue for free."},
      {t:"p", v:"I don't debate competitively anymore. But I still catch myself, in ordinary disagreements, reaching for the strongest version of the other person's argument before I've finished hearing my own. Sometimes I think that's the best thing debate gave me. Sometimes I think it's the reason I take so long to know what I want. Both are true. I've made my peace with arguing both sides of that, too."},
    ],
    tags:["identity","competition","aftermath"],
  },
  {
    slug:"why-i-almost-quit",
    section:"essays", franchise:null,
    title:"Why I almost quit debating",
    dek:"It wasn't the losing. It was how good I had become at pretending the losing didn't touch me.",
    author:"priya-n", date:"May 4, 2026", read:7, audio:"10:48", hue:265,
    circuit:"East Africa", img:"Debater in a corridor mid-shrug, scoresheet in hand",
    body:[
      {t:"p",v:"It wasn't the losing. I want to be clear about that, because everyone assumes it was the losing. It was how good I had become at pretending the losing didn't touch me — the practised shrug in the corridor, the immediate pivot to what we'd do differently next time, the way I'd already be analysing the round before the disappointment had finished arriving."},
      {t:"q",v:"I had gotten so fluent at managing how I felt that I'd stopped actually feeling it."},
      {t:"p",v:"I had gotten so fluent at managing how I felt that I'd stopped actually feeling it. That is a useful skill in a competitive round. It is a terrible way to be a person."},
      {t:"h",v:"The season I didn't break"},
      {t:"p",v:"There was a season I didn't break at a single major. I told everyone I was taking it in stride. I was not taking it in stride. I was lying in the dark doing speaker-point arithmetic, trying to find the version of the year where I'd been good enough."},
      {t:"p",v:"What kept me wasn't a win. It was a novice I was coaching who asked me, after a bad round, whether it was normal to feel like this. And I realised I'd spent three years teaching people to argue and not one minute teaching them — or myself — what to do with how it felt."},
      {t:"h",v:"The question nobody asks"},
      {t:"p",v:"There's a version of resilience that the debate community teaches extremely well: bounce back, analyse, improve, repeat. What it doesn't teach is the quieter version — sitting with the feeling long enough to understand what it's actually about. Most of the time it isn't about the round. It's about something older. Debate just gives it a scoreable surface."},
      {t:"p",v:"I'm still in the activity. Not the same way. I coach, I judge, I write. Some mornings I miss the specific adrenaline of standing up first. Some mornings I'm grateful I don't have to. Both are true at the same time, which is probably the most honest sentence I've ever written about any of it."},
    ],
    tags:["burnout","ambition","coaching"],
  },
  {
    slug:"how-debate-taught-me-to-survive-uncertainty",
    section:"essays", franchise:null,
    title:"How debate taught me to survive uncertainty",
    dek:"Fifteen minutes of prep, a motion you've never seen, and a room that expects you to sound certain anyway.",
    author:"daniyal-r", date:"Apr 22, 2026", read:6, audio:"09:30", hue:255,
    circuit:"Europe", img:"Hands and a stopwatch at the 15-minute prep table",
    body:[
      {t:"p",v:"Fifteen minutes. A motion you have never seen, on a topic you half-understand, and a room that expects you to walk to the front and sound certain anyway. For years I thought that was the cruel part. Now I think it was the gift."},
      {t:"q",v:"Certainty, it turns out, is a performance you can learn to give while you are still figuring out what you think."},
      {t:"p",v:"Certainty, it turns out, is a performance you can learn to give while you are still figuring out what you think. Not a lie — a scaffold. You commit to a structure and trust that the thinking will arrive to fill it. It almost always does."},
      {t:"p",v:"I have used that exact muscle in every uncertain room since: job interviews, hospital corridors, the first day of a thing I had no business being qualified for. Prep time is never enough. It is never supposed to be."},
      {t:"h",v:"The structure as a life skill"},
      {t:"p",v:"When people outside the activity ask what competitive debate gave me, they expect me to say: confidence. Persuasion. Vocabulary. All of those are true and all of them are the boring answer. The real answer is this: the ability to begin. To stand up before you know what you're going to say and trust that the act of standing will call something forward. That is the thing fifteen minutes teaches you, if you let it."},
    ],
    tags:["growth","pressure"],
  },
  {
    slug:"the-rise-of-the-pan-african-circuit",
    section:"histories", franchise:null,
    title:"How a borrowed projector built the Pan-African circuit",
    dek:"The story of African schools debate is mostly told secondhand. Here it is from inside the room.",
    author:"joaquin-vega", date:"Apr 9, 2026", read:11, audio:"17:05", hue:290,
    circuit:"South Africa", img:"A borrowed projector glowing in an after-hours classroom",
    body:[
      {t:"p",v:"The official histories of debate are written in the places that could afford to keep records. The story of the African schools circuit is mostly told secondhand, if it is told at all. So here it is from inside the room — beginning, as these things often do, with a borrowed projector and a teacher who refused to take no for an answer."},
      {t:"q",v:"Institutional memory disappears as students graduate. Somebody has to write it down before the room empties."},
      {t:"p",v:"Institutional memory disappears as students graduate. Within four years, an entire era of a circuit can vanish — the rivalries, the house style, the motions everyone argued about for a season and then forgot. Somebody has to write it down before the room empties."},
      {t:"h",v:"Before there was a tab"},
      {t:"p",v:"There was no tabbing software. Results were kept on paper and, more often, in argument. Two coaches in a stairwell, reconstructing a 4-1 decision from memory, each absolutely certain the other had misremembered the third speaker."},
      {t:"p",v:"The first Pan-African qualifier I attended had seventeen teams, four adjudicators, and a ballot box that was literally a cardboard box someone had written BALLOTS on in permanent marker. The tabbing was done in a notebook. It took three hours to release results. Nobody left."},
      {t:"h",v:"What the records leave out"},
      {t:"p",v:"The records that do exist focus on winners. What they leave out is the ecosystem: the coach who drove six hours each way, the school that couldn't afford accommodation so students slept on the floor of the community centre, the administrator who managed the logistics on a phone with a cracked screen. Those people built the circuit. Their names aren't in the tab."},
    ],
    tags:["circuits","memory","access"],
  },
  {
    slug:"what-the-back-of-the-room-sees",
    section:"essays", franchise:null,
    title:"What the back of the room sees",
    dek:"I have judged more outrounds than I can count. Here is what the front of the room never notices.",
    author:"mei-tan", date:"Mar 28, 2026", read:8, audio:"12:11", hue:275,
    circuit:"North America", img:"The adjudicator's view from the back of an outround",
    body:[
      {t:"p",v:"I have judged more outrounds than I can count, and from the back of the room you see a different debate than the one the speakers think they're having. You see who is performing for the panel and who is actually trying to win the argument. They are not always the same people, and the panel does not always reward the second kind."},
      {t:"q",v:"You see who is performing for the panel and who is actually trying to win the argument. They are not always the same people."},
      {t:"p",v:"You also see the cost. The team that drove six hours and slept in the gym. The kid whose blazer doesn't fit because it's a school loaner. The accent that a less careful panel would have marked down without ever noticing it was doing so."},
      {t:"h",v:"The feedback loop nobody talks about"},
      {t:"p",v:"Adjudicators learn from debaters and debaters learn from adjudicators, and the circuit eventually converges on a shared aesthetic of what 'good debating' looks like. The problem is that this aesthetic is not neutral. It reflects who has been doing most of the judging."},
      {t:"p",v:"Being good isn't always enough. Being legible to the people in the back of the room — that's the other skill, the one nobody names in the training."},
    ],
    tags:["judging","access","prep-room"],
  },
  {
    slug:"the-cost-of-debate",
    section:"essays", franchise:null,
    title:"We keep calling it a meritocracy. It costs four thousand dollars a year.",
    dek:"An honest accounting of what it takes to be 'good at debate' — and who gets quietly priced out.",
    author:"joaquin-vega", date:"Mar 14, 2026", read:10, audio:"15:40", hue:300,
    circuit:"South America", img:"Registration desk with an open invoice envelope",
    body:[
      {t:"p",v:"We keep calling it a meritocracy. We say the best arguments win, and we mean it, and we are mostly wrong. An honest accounting of what it actually takes to become 'good at debate' looks less like talent and more like an invoice."},
      {t:"q",v:"The best arguments win. We mean it. We are mostly wrong about who ever gets to make them."},
      {t:"p",v:"Registration. Travel. Coaching that the school can't provide and the family quietly does. The summer programme that everyone on the break 'just happened' to have attended. None of it shows up in the round. All of it shows up in the result."},
      {t:"h",v:"The visible and invisible costs"},
      {t:"p",v:"The visible costs are the ones that show up on forms: entry fees, travel, accommodation. What the bursary doesn't address are the invisible costs: the lost income when a parent takes time off to drive to a tournament, the opportunity cost of the hours spent in prep instead of working, the psychological tax of being the only person in the break who can't afford to stay for the full weekend."},
      {t:"h",v:"What we owe each other"},
      {t:"p",v:"The circuit I want to be part of is one that's honest about this. Not just 'we welcome everyone' — but the harder question: what are we actually doing, structurally, to make that true? We call it a meritocracy because it's more comfortable than calling it what it is."},
    ],
    tags:["access","elitism"],
  },
  {
    slug:"who-you-become-after",
    section:"beyond", franchise:null,
    title:"Who you become when the rounds stop",
    dek:"Nobody prepares you for the Tuesday you realise you are not going to a tournament ever again.",
    author:"daniyal-r", date:"Feb 26, 2026", read:7, audio:"11:02", hue:260,
    circuit:"Europe", img:"An empty bedroom desk where the laptop used to live",
    body:[
      {t:"p",v:"Nobody prepares you for the ordinary Tuesday when you realise you are not going to a tournament ever again. Not a dramatic last round — those you remember. This is quieter: a season starts without you, a group chat moves on, and you understand that the version of yourself that lived in those rooms has quietly closed up shop."},
      {t:"q",v:"A season starts without you, a group chat moves on, and the version of yourself that lived in those rooms has quietly closed up shop."},
      {t:"p",v:"What debate leaves you with isn't the trophies. It's a particular way of listening — for the unstated assumption, the load-bearing word, the place where someone's argument is secretly about something else. You can't turn it off. You mostly don't want to."},
      {t:"h",v:"The identity problem"},
      {t:"p",v:"For a long time, I was 'a debater' the way people are 'a runner' or 'a musician'. When I stopped competing, I didn't know what I was instead. Speechwriter, it turned out, which is the closest civilian analogue I've found. But for two years in between, I was just a person who had been a debater, and that was a stranger identity than I expected. The circuit is good at welcoming people in. It is less good at helping them leave with something."},
    ],
    tags:["transition","identity"],
  },
  {
    slug:"the-friendship-built-in-a-prep-room",
    section:"essays", franchise:null,
    title:"Every real friendship I have was built in a prep room at 2am",
    dek:"On the strange, fast intimacy of people who have argued next to you under pressure.",
    author:"priya-n", date:"Feb 10, 2026", read:6, audio:"08:54", hue:270,
    circuit:"East Africa", img:"Two debaters asleep over notes in a 2am prep room",
    body:[
      {t:"p",v:"Every real friendship I have was built in a prep room at 2am, and I have never been able to fully explain why those bonds hold the way they do. There is a strange, fast intimacy to people who have argued next to you under pressure — who have seen you panic and then watched you stand up anyway."},
      {t:"q",v:"There is a strange, fast intimacy to people who have seen you panic and then watched you stand up anyway."},
      {t:"p",v:"You learn someone completely in those rooms. Not the curated version — the version that emerges at 2am with twelve minutes left and a case that isn't working."},
      {t:"h",v:"What pressure reveals"},
      {t:"p",v:"I have seen people reveal things in prep rooms that they've never said anywhere else. You don't forget that. You don't forget the person who helped you when it was your turn to need it. My closest friends today are people I have never been in the same city as for more than a weekend at a time. We were formed in airports and hotel corridors and borrowed classrooms at 1am. The geography of those friendships is the circuit itself — not a place but a set of conditions."},
    ],
    tags:["friendship","prep-room","community"],
  },
  {
    slug:"the-invisible-labour-of-the-circuit",
    section:"histories", franchise:null,
    title:"The people who run the circuit don't make the tab",
    dek:"On the tournament directors, parent volunteers, and administrators who make debate possible — and whose names nobody remembers.",
    author:"adaeze-o", date:"Jan 28, 2026", read:8, audio:"12:30", hue:285,
    circuit:"West Africa", img:"Empty registration desk after the last team has checked in",
    body:[
      {t:"p",v:"Every tournament you've ever attended was organised by someone who slept four hours the night before it started. That person is almost never the person whose name appears on the trophy. They are the one who confirmed the room bookings twice, chased the caterer, printed the ballots, and stayed until the venue was cleared. They are, most often, a woman. She is rarely thanked by name."},
      {t:"q",v:"Every tournament you've ever attended was organised by someone who slept four hours the night before. They are almost never the person whose name appears on the trophy."},
      {t:"h",v:"The administrative layer"},
      {t:"p",v:"Debate culture celebrates speakers. It celebrates winning coaches. It has no real vocabulary for the people who hold the infrastructure together: the registrar who processes 200 entries over a three-day window, the tab director who is still troubleshooting at 11pm, the school administrator who fought with the finance office for three months to get the tournament fee approved."},
      {t:"p",v:"I became one of those people by accident. I stopped competing, started helping, and woke up one day to find I was running tournaments. The people I work with are some of the most competent humans I have ever met. They could organise a small country. Almost none of them get articles written about them."},
    ],
    tags:["circuits","memory","community"],
  },
  {
    slug:"what-gets-lost-in-translation",
    section:"histories", franchise:null,
    title:"What gets lost when the circuit crosses a border",
    dek:"I have debated in three languages and on four continents. Something different is always on the line.",
    author:"lena-park", date:"Jan 12, 2026", read:9, audio:"13:45", hue:270,
    circuit:"Southeast Asia", img:"A preparation room where two debate styles meet on a single whiteboard",
    body:[
      {t:"p",v:"When I first competed internationally, I was told my English was excellent. I understood, after a while, that this was not entirely a compliment. What it meant was: you have learned to argue in a way that the panel recognises. You have made yourself legible. What I had lost, in that process of making myself legible, was a kind of directness that Korean debate culture treats as a virtue and that British Parliamentary treats as aggression."},
      {t:"q",v:"I had made myself legible. What I had lost was a kind of directness that Korean debate culture treats as a virtue."},
      {t:"h",v:"The untranslatable"},
      {t:"p",v:"Every circuit has things that don't translate. The culture of Korean competition — the particular seriousness of it, the way preparation is understood as a form of respect — reads, to circuits that prize improvisation, as rigid. The improvisational energy that BP prizes reads, to more formal circuits, as undisciplined. None of these is wrong. They are different answers to the same question: what is debate for?"},
    ],
    tags:["circuits","identity","access"],
  },
  {
    slug:"the-coach-who-stayed",
    section:"beyond", franchise:null,
    title:"The coach who stayed after everyone else left",
    dek:"On what it means to give fifteen years to an activity that will give you no career, no trophy, and no recognition.",
    author:"mei-tan", date:"Dec 18, 2025", read:7, audio:"11:00", hue:295,
    circuit:"Southeast Asia", img:"An empty classroom at dusk, a whiteboard still covered in arguments",
    body:[
      {t:"p",v:"My coach stayed at our school for fifteen years after he stopped being a student there. He had no official role. He was not paid. He came in on Tuesday evenings and Sunday mornings and stayed until the last person had left, and in fifteen years I never heard him say he had something better to do."},
      {t:"q",v:"He had no official role. He was not paid. He came in on Tuesday evenings and Sunday mornings and stayed until the last person had left."},
      {t:"p",v:"I used to think he was unusual. The longer I've spent in circuits, the more I think he is the norm — that debate is sustained, everywhere, by people who have no rational reason to be doing it. Who came back after graduating because the activity gave them something real and they wanted to pass it forward."},
      {t:"h",v:"The economy of care"},
      {t:"p",v:"There is an economy of care in debate that never shows up in the official record. Coach hours. Parent drives. The alumnus who gives up a weekend every year to serve as a resource judge at the schools tournament. None of this is paid. Some of it is barely acknowledged. It runs the whole thing."},
    ],
    tags:["coaching","community","beyond"],
  },
  {
    slug:"the-motion-that-became-real",
    section:"essays", franchise:null,
    title:"The motion I argued for practice became the life I was living",
    dek:"On debating about mental health and burnout before any of it had happened to me. And then after.",
    author:"amara-okeke", date:"Nov 30, 2025", read:8, audio:"12:20", hue:278,
    circuit:"West Africa", img:"A debater re-reading their own old case notes, years later",
    body:[
      {t:"p",v:"I have argued 'This House Would mandate mental health days for competitive students' so many times that I could deliver it in my sleep. I have argued it from government and opposition. I know every counterargument. For three years I treated it as an exercise. Then I burned out, and suddenly I was living in the middle of a motion I had always treated as abstract."},
      {t:"q",v:"For three years I treated it as an exercise. Then I burned out, and I was living in the middle of a motion I had always treated as abstract."},
      {t:"h",v:"The gap between the argument and the person"},
      {t:"p",v:"The argument I used to give on government was good. I believed it. I just didn't apply it to myself. The gap between knowing an argument and letting it land in your own life is wider than any prep room exercise prepares you for."},
      {t:"p",v:"I am better now, for values of 'better' that include having changed how I think about what debate is for. It is for learning to think well. It is, maybe, also for learning to live well — to take your own arguments seriously enough to act on them."},
    ],
    tags:["burnout","identity","growth"],
  },
];

function articleBySlug(slug){ return ARTICLES.find(a=>a.slug===slug); }
function articlesBySection(id){ return id === "all" ? ARTICLES : ARTICLES.filter(a=>a.section===id); }
function sectionById(id){ return SECTIONS.find(s=>s.id===id); }
function franchiseById(id){ return FRANCHISES.find(f=>f.id===id); }
function contributor(id){ return CONTRIBUTORS[id]; }
function articlesByAuthor(id){ return ARTICLES.filter(a=>a.author===id); }
function searchArticles(query){
  if(!query || query.trim().length < 2) return [];
  const q = query.toLowerCase();
  return ARTICLES.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.dek.toLowerCase().includes(q) ||
    (a.tags||[]).some(t => t.toLowerCase().includes(q)) ||
    (contributor(a.author)?.name || "").toLowerCase().includes(q) ||
    (a.circuit||"").toLowerCase().includes(q) ||
    (sectionById(a.section)?.name||"").toLowerCase().includes(q)
  ).slice(0, 8);
}

Object.assign(window, {
  SECTIONS, FRANCHISES, CIRCUITS, CONTRIBUTORS, ARTICLES,
  articleBySlug, articlesBySection, sectionById, franchiseById,
  contributor, articlesByAuthor, searchArticles
});

// If the contributor has explicit circuits from Sanity, use those.
// Otherwise derive from the circuits of their articles (static data fallback).
function contributorCircuits(id){
  const c = contributor(id);
  // Sanity now stores a single `circuit` string (dropdown) on the contributor
  if(c && c.circuit) return [c.circuit];
  // Fall back: derive from the circuits of their articles
  return [...new Set(articlesByAuthor(id).map(a=>a.circuit).filter(Boolean))];
}

// Returns the sections a contributor writes for.
// Uses the Sanity `sections` field if present, else derives from their articles.
function contributorSections(id){
  const c = contributor(id);
  if(c && c.sections && c.sections.length) return c.sections;
  return [...new Set(articlesByAuthor(id).map(a=>a.section).filter(Boolean))];
}

Object.assign(window, { contributorCircuits, contributorSections });
