"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[768],{1768:(e,r,o)=>{o.r(r),o.d(r,{default:()=>f});var a=o(5043),i=o(5464),n=o(3204),t=o(579);const m=i.DU`
  body {
    background-color: ${e=>{let{theme:r}=e;return r.colors.background}};
    color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  }
`,s=i.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`,d=i.Ay.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`,l=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.tablet}}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`,c=i.Ay.button`
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
`,g=i.Ay.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`,b=i.Ay.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: #1c1e21;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`,u=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.tablet}}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.desktop}}) {
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
`,p=i.Ay.div`
  background-color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  border-radius: 8px;
  padding: 16px;
  box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.medium}};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.large}};
  }
`,x=i.Ay.h3`
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`,h=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
  font-size: 14px;
  margin-bottom: 4px;
`,j=i.Ay.button`
  background-color: ${e=>{let{joined:r,theme:o}=e;return r?o.colors.background:o.colors.primary}};
  color: ${e=>{let{joined:r,theme:o}=e;return r?o.colors.textPrimary:o.colors.surfaceLight}};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: ${e=>{let{joined:r,theme:o}=e;return r?o.colors.borderColor:o.colors.primaryDark}};
  }
`,f=()=>{const[e,r]=(0,a.useState)([]),[o,i]=(0,a.useState)(""),f=(0,a.useCallback)((()=>[{id:1,name:"RPG Enthusiasts",members:5e3,game:"Various RPGs",joined:!1},{id:2,name:"FPS Pros",members:7500,game:"First-Person Shooters",joined:!1},{id:3,name:"Strategy Masterminds",members:3e3,game:"Strategy Games",joined:!1},{id:4,name:"Indie Game Lovers",members:2e3,game:"Indie Games",joined:!1},{id:5,name:"MOBA Masters",members:1e4,game:"Multiplayer Online Battle Arenas",joined:!1},{id:6,name:"Retro Gamers",members:3500,game:"Classic Video Games",joined:!1},{id:7,name:"Sandbox Builders",members:6e3,game:"Minecraft",joined:!1},{id:8,name:"Battle Royale Squad",members:8e3,game:"Fortnite",joined:!1},{id:9,name:"Racing Enthusiasts",members:4e3,game:"Forza Horizon",joined:!1},{id:10,name:"Puzzle Solvers",members:2500,game:"Portal",joined:!1},{id:11,name:"Open World Explorers",members:5500,game:"The Legend of Zelda",joined:!1},{id:12,name:"Survival Experts",members:3200,game:"Do Starve",joined:!1},{id:13,name:"MMO Adventurers",members:7e3,game:"World of Warcraft",joined:!1},{id:14,name:"Fighting Game Pros",members:2800,game:"Street Fighter",joined:!1},{id:15,name:"Sports Gamers United",members:4500,game:"FIFA",joined:!1},{id:16,name:"Roguelike Fans",members:1800,game:"Hades",joined:!1},{id:17,name:"Sim City Planners",members:3300,game:"Cities: Skylines",joined:!1},{id:18,name:"Rhythm Game Maestros",members:2200,game:"Beat Saber",joined:!1},{id:19,name:"Stealth Mission Experts",members:2600,game:"Metal Gear Solid",joined:!1},{id:20,name:"Card Game Strategists",members:3700,game:"Hearthstone",joined:!1},{id:21,name:"Horror Game Survivors",members:2900,game:"Resident Evil",joined:!1},{id:22,name:"Space Sim Pilots",members:1900,game:"Elite Dangerous",joined:!1},{id:23,name:"Platformer Pros",members:3100,game:"Super Mario",joined:!1},{id:24,name:"Visual Novel Readers",members:1500,game:"Doki Doki Literature Club",joined:!1},{id:25,name:"Tactical Shooter Squad",members:4200,game:"Rainbow Six Siege",joined:!1},{id:26,name:"Farming Sim Enthusiasts",members:2700,game:"Stardew Valley",joined:!1},{id:27,name:"Speedrunners United",members:1600,game:"Various Games",joined:!1},{id:28,name:"Esports Fanatics",members:5800,game:"Various Competitive Games",joined:!1},{id:29,name:"VR Explorers",members:2100,game:"Half-Life: Alyx",joined:!1},{id:30,name:"Narrative Adventure Fans",members:2400,game:"Life is Strange",joined:!1}]),[]);(0,a.useEffect)((()=>{r(f())}),[f]);const y=(0,a.useCallback)((e=>{r((r=>r.map((r=>r.id===e?{...r,joined:!r.joined,members:r.joined?r.members-1:r.members+1}:r))))}),[]),S=(0,a.useCallback)((()=>{console.log("Create new community")}),[]),w=(0,a.useMemo)((()=>e.filter((e=>e.name.toLowerCase().includes(o.toLowerCase())||e.game.toLowerCase().includes(o.toLowerCase())))),[e,o]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(m,{}),(0,t.jsxs)(s,{children:[(0,t.jsxs)(d,{children:[(0,t.jsx)(n.YXz,{}),"Game Communities"]}),(0,t.jsxs)(l,{children:[(0,t.jsxs)(c,{onClick:S,children:[(0,t.jsx)(n.OiG,{})," Create New Community"]}),(0,t.jsxs)(g,{children:[(0,t.jsx)(n.KSO,{color:"#65676b"}),(0,t.jsx)(b,{type:"text",placeholder:"Search communities...",value:o,onChange:e=>i(e.target.value)})]})]}),(0,t.jsx)(u,{children:w.map((e=>(0,t.jsxs)(p,{children:[(0,t.jsx)(x,{children:e.name}),(0,t.jsxs)(h,{children:[(0,t.jsx)(n.YXz,{})," ",e.members.toLocaleString()," members"]}),(0,t.jsxs)(h,{children:[(0,t.jsx)(n.pBr,{})," ",e.game]}),(0,t.jsx)(j,{joined:e.joined,onClick:()=>y(e.id),children:e.joined?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.Dby,{})," Leave Community"]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.NPy,{})," Join Community"]})})]},e.id)))})]})]})}}}]);
//# sourceMappingURL=768.7691bd9c.chunk.js.map