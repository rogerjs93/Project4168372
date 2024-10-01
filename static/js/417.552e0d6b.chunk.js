"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[417],{4179:(e,t,a)=>{a.r(t),a.d(t,{default:()=>w});var i=a(5043),r=a(5464),o=a(3204),l=a(2725),n=a(579);const s=r.DU`
  body {
    background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
    color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  }
`,p=r.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`,d=r.Ay.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`,c=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  @media (min-width: ${e=>{let{theme:t}=e;return t.breakpoints.tablet}}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`,m=r.Ay.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #166fe5;
  }
`,g=r.Ay.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`,u=r.Ay.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: #1c1e21;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`,x=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: ${e=>{let{theme:t}=e;return t.breakpoints.tablet}}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${e=>{let{theme:t}=e;return t.breakpoints.desktop}}) {
    grid-template-columns: repeat(3, 1fr);
  }

  overflow-y: auto;
  max-height: calc(100vh - 200px);
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`,h=r.Ay.div`
  background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border-radius: 8px;
  padding: 16px;
  box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.medium}};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.large}};
  }
`,f=r.Ay.h3`
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`,b=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
  font-size: 14px;
  margin-bottom: 4px;
`,z=r.Ay.button`
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  margin-top: 12px;

  &:hover {
    background-color: #166fe5;
  }
`,w=()=>{const[e,t]=(0,i.useState)([]),[a,r]=(0,i.useState)(""),w=(0,l.d)(),S=(0,i.useCallback)((()=>[{id:1,title:"Summer Showdown",game:"Battle Royale",date:"2023-07-15",participants:64,prizePool:1e4},{id:2,title:"Strategy Masters Cup",game:"Chess Championship",date:"2023-08-01",participants:32,prizePool:5e3},{id:3,title:"Speed Racers Grand Prix",game:"Turbo Racing Simulator",date:"2023-08-20",participants:100,prizePool:15e3},{id:4,title:"Puzzle Mania",game:"Tetris Tournament",date:"2023-09-05",participants:128,prizePool:7500},{id:5,title:"FPS Frenzy",game:"Shooter Elite",date:"2023-09-15",participants:64,prizePool:12e3},{id:6,title:"MOBA Mayhem",game:"League of Legends",date:"2023-10-01",participants:16,prizePool:2e4},{id:7,title:"Fighting Game Showdown",game:"Street Fighter VI",date:"2023-10-10",participants:32,prizePool:8e3},{id:8,title:"Card Masters Duel",game:"Hearthstone",date:"2023-10-20",participants:64,prizePool:6e3},{id:9,title:"Sports Spectacular",game:"FIFA 23",date:"2023-11-01",participants:32,prizePool:1e4},{id:10,title:"RTS Championship",game:"Starcraft II",date:"2023-11-15",participants:16,prizePool:15e3},{id:11,title:"Battle Royale Bonanza",game:"Fortnite",date:"2023-11-30",participants:100,prizePool:25e3},{id:12,title:"RPG Raid Race",game:"World of Warcraft",date:"2023-12-10",participants:20,prizePool:1e4},{id:13,title:"Rhythm Game Rave",game:"Beat Saber",date:"2023-12-20",participants:32,prizePool:5e3},{id:14,title:"Tactical Shooter Takedown",game:"Counter-Strike: Global Offensive",date:"2024-01-05",participants:16,prizePool:2e4},{id:15,title:"Racing Sim Showdown",game:"iRacing",date:"2024-01-15",participants:20,prizePool:1e4},{id:16,title:"Platformer Paradise",game:"Super Mario Maker 2",date:"2024-01-25",participants:64,prizePool:5e3},{id:17,title:"Arena Brawl",game:"Super Smash Bros. Ultimate",date:"2024-02-05",participants:128,prizePool:15e3},{id:18,title:"Space Strategy Summit",game:"Stellaris",date:"2024-02-15",participants:16,prizePool:7500},{id:19,title:"Virtual Reality Vendetta",game:"Half-Life: Alyx",date:"2024-02-25",participants:32,prizePool:1e4},{id:20,title:"Retro Gaming Rumble",game:"Multiple Classic Games",date:"2024-03-05",participants:64,prizePool:5e3},{id:21,title:"Survival Showdown",game:"Minecraft",date:"2024-03-15",participants:100,prizePool:8e3},{id:22,title:"Rogue-like Rampage",game:"Hades",date:"2024-03-25",participants:32,prizePool:6e3},{id:23,title:"Simulator Spectacular",game:"Microsoft Flight Simulator",date:"2024-04-05",participants:20,prizePool:1e4},{id:24,title:"Dungeon Crawler Contest",game:"Path of Exile",date:"2024-04-15",participants:64,prizePool:12e3},{id:25,title:"Mobile Gaming Masters",game:"Multiple Mobile Games",date:"2024-04-25",participants:128,prizePool:15e3},{id:26,title:"Esports Extravaganza",game:"Multiple Games",date:"2024-05-05",participants:256,prizePool:5e4},{id:27,title:"Speedrun Sensation",game:"Multiple Games",date:"2024-05-15",participants:32,prizePool:1e4},{id:28,title:"Grand Strategy Gala",game:"Europa Universalis IV",date:"2024-05-25",participants:16,prizePool:7500},{id:29,title:"Indie Game Invitational",game:"Multiple Indie Games",date:"2024-06-05",participants:64,prizePool:1e4},{id:30,title:"Crossplay Championship",game:"Rocket League",date:"2024-06-15",participants:48,prizePool:15e3}]),[]);(0,i.useEffect)((()=>{t(S())}),[S]);const P=(0,i.useCallback)((e=>{console.log(`Registered for tournament ${e}`),w("success","Registered for tournament successfully!")}),[w]),y=(0,i.useCallback)((()=>{console.log("Create new tournament"),w("success","New tournament created successfully!")}),[w]),k=(0,i.useMemo)((()=>e.filter((e=>e.title.toLowerCase().includes(a.toLowerCase())||e.game.toLowerCase().includes(a.toLowerCase())))),[e,a]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s,{}),(0,n.jsxs)(p,{children:[(0,n.jsxs)(d,{children:[(0,n.jsx)(o.SBv,{}),"Game Tournaments"]}),(0,n.jsxs)(c,{children:[(0,n.jsxs)(m,{onClick:y,children:[(0,n.jsx)(o.OiG,{})," Create New Tournament"]}),(0,n.jsxs)(g,{children:[(0,n.jsx)(o.KSO,{color:"#65676b"}),(0,n.jsx)(u,{type:"text",placeholder:"Search tournaments...",value:a,onChange:e=>r(e.target.value)})]})]}),(0,n.jsx)(x,{children:k.map((e=>(0,n.jsxs)(h,{children:[(0,n.jsx)(f,{children:e.title}),(0,n.jsxs)(b,{children:[(0,n.jsx)(o.pBr,{})," ",e.game]}),(0,n.jsxs)(b,{children:[(0,n.jsx)(o.bfZ,{})," ",e.date]}),(0,n.jsxs)(b,{children:[(0,n.jsx)(o.YXz,{})," ",e.participants," participants"]}),(0,n.jsxs)(b,{children:[(0,n.jsx)(o.cEG,{})," Prize Pool: $",e.prizePool.toLocaleString()]}),(0,n.jsx)(z,{onClick:()=>P(e.id),children:"Register Now"})]},e.id)))})]})]})}}}]);
//# sourceMappingURL=417.552e0d6b.chunk.js.map