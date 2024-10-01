"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[395],{395:(e,r,a)=>{a.r(r),a.d(r,{default:()=>b});var t=a(5043),n=a(5464),i=a(3204),o=a(2725),d=a(579);const s=n.DU`
  body {
    background-color: ${e=>{let{theme:r}=e;return r.colors.background}};
    color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  }
`,l=n.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`,m=n.Ay.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`,g=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.tablet}}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`,c=n.Ay.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${e=>{let{theme:r}=e;return r.colors.primaryDark}};
  }
`,u=n.Ay.div`
  display: flex;
  align-items: center;
  background-color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.small}};
`,h=n.Ay.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`,p=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.tablet}}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.desktop}}) {
    grid-template-columns: repeat(3, 1fr);
  }
`,w=n.Ay.div`
  background-color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  border-radius: 8px;
  padding: 16px;
  box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.medium}};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.large}};
  }
`,f=n.Ay.h3`
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
  font-size: 14px;
  margin-bottom: 4px;
`,y=n.Ay.button`
  background-color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
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
    background-color: ${e=>{let{theme:r}=e;return r.colors.primaryDark}};
  }
`,b=()=>{const[e,r]=(0,t.useState)([]),[a,n]=(0,t.useState)(""),b=((0,o.d)(),(0,t.useCallback)((()=>[{id:1,name:"Speed Run Challenge",game:"Adventure Quest",timeLeft:"2 days",reward:"1000 coins"},{id:2,name:"High Score Challenge",game:"Puzzle Mania",timeLeft:"1 week",reward:"Exclusive Avatar"},{id:3,name:"Multiplayer Tournament",game:"Strategy Master",timeLeft:"3 days",reward:"Champion Trophy"},{id:4,name:"Boss Rush Challenge",game:"Epic RPG",timeLeft:"5 days",reward:"Legendary Weapon"},{id:5,name:"Time Attack Mode",game:"Racing Fever",timeLeft:"4 days",reward:"Custom Car Skin"},{id:6,name:"Survival Challenge",game:"Zombie Outbreak",timeLeft:"6 days",reward:"Unique Character"},{id:7,name:"Puzzle Master",game:"Brain Teasers",timeLeft:"1 day",reward:"500 gems"},{id:8,name:"PvP Arena",game:"Battle Royale",timeLeft:"2 weeks",reward:"Rare Weapon Skin"},{id:9,name:"Endless Runner",game:"Jungle Dash",timeLeft:"3 days",reward:"Double XP Boost"},{id:10,name:"Treasure Hunt",game:"Pirate's Quest",timeLeft:"5 days",reward:"Golden Compass"},{id:11,name:"Tower Defense",game:"Kingdom Guard",timeLeft:"1 week",reward:"Legendary Tower"},{id:12,name:"Stealth Mission",game:"Shadow Ops",timeLeft:"4 days",reward:"Invisibility Cloak"},{id:13,name:"Ultimate Speed Run",game:"Cyber Quest",timeLeft:"3 days",reward:"5000 coins"},{id:14,name:"Combo Master Challenge",game:"Fighter Arena",timeLeft:"2 days",reward:"Exclusive Fighter Skin"},{id:15,name:"Mega Boss Fight",game:"Monster Hunter",timeLeft:"1 week",reward:"Epic Sword"},{id:16,name:"Endurance Race",game:"Super Racer",timeLeft:"4 days",reward:"Nitro Boost"},{id:17,name:"Treasure Hoard",game:"Dragon Den",timeLeft:"5 days",reward:"Dragon Egg"},{id:18,name:"Survival Mode",game:"Alien Invasion",timeLeft:"6 days",reward:"Plasma Cannon"},{id:19,name:"Mind Bender Challenge",game:"Mystery Puzzles",timeLeft:"2 days",reward:"1000 gems"},{id:20,name:"King of the Hill",game:"Battle Zone",timeLeft:"1 week",reward:"Crown of Glory"},{id:21,name:"Speed Demon",game:"Turbo Drift",timeLeft:"3 days",reward:"Supercar"},{id:22,name:"Warrior Gauntlet",game:"Ancient Battles",timeLeft:"5 days",reward:"Warrior Shield"},{id:23,name:"Sniper Challenge",game:"Sharp Shooter",timeLeft:"4 days",reward:"Golden Rifle"},{id:24,name:"Dungeon Crawl",game:"Cave Explorer",timeLeft:"3 days",reward:"Treasure Map"},{id:25,name:"Defense Strategy",game:"Fortress Builder",timeLeft:"1 week",reward:"Ultimate Tower"},{id:26,name:"Arena Showdown",game:"Gladiator Wars",timeLeft:"2 weeks",reward:"Champion Helmet"},{id:27,name:"Escape the Maze",game:"Labyrinth Escape",timeLeft:"3 days",reward:"Compass of Truth"},{id:28,name:"Hero Journey",game:"Epic Quest",timeLeft:"5 days",reward:"Hero Medal"},{id:29,name:"Nightmare Mode",game:"Horror Tales",timeLeft:"6 days",reward:"Fearless Badge"},{id:30,name:"Puzzle Genius",game:"Mind Games",timeLeft:"2 days",reward:"2000 gems"},{id:31,name:"Time Traveler",game:"Chrono Quest",timeLeft:"1 week",reward:"Temporal Artifact"},{id:32,name:"Battle Royale",game:"Warzone Alpha",timeLeft:"2 weeks",reward:"Victory Crown"},{id:33,name:"Climbing Challenge",game:"Mountain Climber",timeLeft:"3 days",reward:"Summit Flag"},{id:34,name:"Space Explorer",game:"Galactic Odyssey",timeLeft:"5 days",reward:"Space Helmet"}]),[]));(0,t.useEffect)((()=>{r(b())}),[b]);const L=(0,t.useCallback)((e=>{console.log(`Joined challenge ${e}`)}),[]),C=(0,t.useCallback)((()=>{console.log("Create new challenge")}),[]),k=(0,t.useMemo)((()=>e.filter((e=>{var r,t;const n=null===(r=e.name)||void 0===r?void 0:r.toLowerCase().includes(a.toLowerCase()),i=null===(t=e.game)||void 0===t?void 0:t.toLowerCase().includes(a.toLowerCase());return n||i||!1}))),[e,a]);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s,{}),(0,d.jsxs)(l,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(i.SBv,{}),"Game Challenges"]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(c,{onClick:C,children:[(0,d.jsx)(i.OiG,{})," Create New Challenge"]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(i.KSO,{color:"#65676b"}),(0,d.jsx)(h,{type:"text",placeholder:"Search challenges...",value:a,onChange:e=>n(e.target.value)})]})]}),(0,d.jsx)(p,{children:k.map((e=>(0,d.jsxs)(w,{children:[(0,d.jsx)(f,{children:e.name}),(0,d.jsxs)(x,{children:[(0,d.jsx)(i.pBr,{})," ",e.game]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(i.w_X,{})," ",e.timeLeft," left"]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(i.tz0,{})," Reward: ",e.reward]}),(0,d.jsx)(y,{onClick:()=>L(e.id),children:"Join Challenge"})]},e.id)))})]})]})}}}]);
//# sourceMappingURL=395.3d6b602c.chunk.js.map