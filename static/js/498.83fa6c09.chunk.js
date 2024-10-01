"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[498],{4498:(e,r,t)=>{t.r(r),t.d(r,{default:()=>k});var i=t(5043),a=t(5464),o=t(3204),n=t(579);const l=a.DU`
  body {
    background-color: ${e=>{let{theme:r}=e;return r.colors.background}};
    color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  }
`,d=a.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`,s=a.Ay.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`,c=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.tablet}}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`,m=a.Ay.button`
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
`,b=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.tablet}}) {
    flex-direction: row;
    align-items: center;
    width: auto;
  }
`,u=a.Ay.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`,x=a.Ay.select`
  padding: 8px 16px;
  border: 1px solid ${e=>{let{theme:r}=e;return r.colors.borderColor}};
  border-radius: 6px;
  background-color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  font-size: 14px;
  margin-left: 10px;
`,p=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.tablet}}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.desktop}}) {
    grid-template-columns: repeat(5, 1fr);
  }
`,h=a.Ay.div`
  background-color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  border-radius: 8px;
  padding: 16px;
  box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.medium}};
  transition: box-shadow 0.3s ease;
  text-align: center;
  position: relative;

  &:hover {
    box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.large}};
  }
`,y=a.Ay.div`
  font-size: 2rem;
  color: ${e=>{let{obtained:r,theme:t}=e;return r?t.colors.primary:t.colors.textSecondary}};
  margin-bottom: 8px;
`,g=a.Ay.h3`
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`,f=a.Ay.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  color: ${e=>{let{theme:r}=e;return r.colors.warning}};
`,w=a.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${e=>{let{theme:r}=e;return`${r.colors.surfaceDark}80`}};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`,k=()=>{const[e,r]=(0,i.useState)([]),[t,a]=(0,i.useState)(""),[k,j]=(0,i.useState)("all"),v=(0,i.useCallback)((()=>[{id:1,name:"Golden Sword",rarity:5,obtained:!0},{id:2,name:"Magic Amulet",rarity:4,obtained:!0},{id:3,name:"Dragon Egg",rarity:5,obtained:!1},{id:4,name:"Ancient Scroll",rarity:3,obtained:!0},{id:5,name:"Mystic Orb",rarity:4,obtained:!1},{id:6,name:"Phoenix Feather",rarity:5,obtained:!1},{id:7,name:"Enchanted Bow",rarity:4,obtained:!0},{id:8,name:"Wizard Staff",rarity:5,obtained:!1},{id:9,name:"Invisibility Cloak",rarity:5,obtained:!0},{id:10,name:"Healing Potion",rarity:2,obtained:!0},{id:11,name:"Dragonscale Armor",rarity:5,obtained:!1},{id:12,name:"Flaming Sword",rarity:4,obtained:!0},{id:13,name:"Ice Crown",rarity:5,obtained:!1},{id:14,name:"Shadow Dagger",rarity:4,obtained:!0},{id:15,name:"Philosopher Stone",rarity:5,obtained:!1},{id:16,name:"Winged Boots",rarity:3,obtained:!0},{id:17,name:"Cursed Ring",rarity:4,obtained:!1},{id:18,name:"Mermaid Pearl",rarity:4,obtained:!0},{id:19,name:"Unicorn Horn",rarity:5,obtained:!1},{id:20,name:"Goblin Gold",rarity:3,obtained:!0},{id:21,name:"Fairy Dust",rarity:3,obtained:!0},{id:22,name:"Titan Gauntlet",rarity:5,obtained:!1},{id:23,name:"Elven Locket",rarity:4,obtained:!0},{id:24,name:"Dwarven Hammer",rarity:4,obtained:!1},{id:25,name:"Siren Flute",rarity:4,obtained:!0},{id:26,name:"Pegasus Feather",rarity:5,obtained:!1},{id:27,name:"Vampire Fang",rarity:3,obtained:!0},{id:28,name:"Werewolf Claw",rarity:3,obtained:!1},{id:29,name:"Gorgon Eye",rarity:5,obtained:!1},{id:30,name:"Phoenix Ash",rarity:4,obtained:!0}]),[]);(0,i.useEffect)((()=>{r(v())}),[v]);const $=(0,i.useCallback)((()=>{console.log("Create new collectible")}),[]),A=(0,i.useMemo)((()=>e.filter((e=>e.name.toLowerCase().includes(t.toLowerCase())&&("all"===k||"obtained"===k&&e.obtained||"locked"===k&&!e.obtained)))),[e,t,k]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l,{}),(0,n.jsxs)(d,{children:[(0,n.jsxs)(s,{children:[(0,n.jsx)(o.BJb,{}),"Game Collectibles"]}),(0,n.jsxs)(c,{children:[(0,n.jsxs)(m,{onClick:$,children:[(0,n.jsx)(o.OiG,{})," Create New Collectible"]}),(0,n.jsxs)(b,{children:[(0,n.jsx)(o.KSO,{color:"#65676b"}),(0,n.jsx)(u,{type:"text",placeholder:"Search collectibles...",value:t,onChange:e=>a(e.target.value)}),(0,n.jsxs)(x,{value:k,onChange:e=>j(e.target.value),children:[(0,n.jsx)("option",{value:"all",children:"All Collectibles"}),(0,n.jsx)("option",{value:"obtained",children:"Obtained"}),(0,n.jsx)("option",{value:"locked",children:"Locked"})]})]})]}),(0,n.jsx)(p,{children:A.map((e=>(0,n.jsxs)(h,{children:[(0,n.jsx)(y,{obtained:e.obtained,children:(0,n.jsx)(o.BJb,{})}),(0,n.jsx)(g,{children:e.name}),(0,n.jsx)(f,{children:[...Array(e.rarity)].map(((e,r)=>(0,n.jsx)(o.gt3,{},r)))}),!e.obtained&&(0,n.jsx)(w,{children:(0,n.jsx)(o.JhU,{size:24,color:"white"})})]},e.id)))})]})]})}}}]);
//# sourceMappingURL=498.83fa6c09.chunk.js.map