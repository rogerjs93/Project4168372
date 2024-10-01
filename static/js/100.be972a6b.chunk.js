"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[100],{9100:(e,t,r)=>{r.r(t),r.d(t,{default:()=>y});var n=r(5043),a=r(5464),o=r(3204),i=r(579);const s=a.i7`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,l=a.Ay.div`
  padding: ${e=>{let{theme:t}=e;return t.spacing.large}};
  max-width: 1200px;
  margin: 0 auto;
`,m=a.Ay.h1`
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.large}};
`,c=a.Ay.div`
  display: flex;
  align-items: center;
  background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.small}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.large}};
`,u=a.Ay.input`
  border: none;
  background: none;
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.medium}};
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.small}};
  width: 100%;

  &:focus {
    outline: none;
  }
`,d=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${e=>{let{theme:t}=e;return t.spacing.large}};
`,g=a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.large}};
  box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.medium}};
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  animation: ${s} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.large}};
  }
`,h=a.Ay.div`
  font-size: 3rem;
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  color: ${e=>{let{theme:t}=e;return t.colors.primary}};
`,p=a.Ay.h3`
  margin: 0;
  text-align: center;
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.small}};
`,f=a.Ay.p`
  text-align: center;
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,x=a.Ay.a`
  display: inline-flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.small}};
  background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.small}} ${e=>{let{theme:t}=e;return t.spacing.medium}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.small}};
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${e=>{let{theme:t}=e;return t.colors.primaryDark}};
  }
`,b=(0,a.Ay)(o.hW)`
  animation: spin 1s linear infinite;
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.large}};
  color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  margin: ${e=>{let{theme:t}=e;return t.spacing.large}} auto;
  display: block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,y=()=>{const[e,t]=(0,n.useState)([]),[r,a]=(0,n.useState)(!0),[s,y]=(0,n.useState)(""),$=(0,n.useCallback)((async()=>{a(!0);try{await new Promise((e=>setTimeout(e,1e3)));const e=[{name:"Twitch",icon:(0,i.jsx)(o.JV,{}),url:"https://www.twitch.tv/",description:"Live streaming platform for gamers"},{name:"YouTube Gaming",icon:(0,i.jsx)(o.Vk6,{}),url:"https://www.youtube.com/gaming",description:"Gaming content and live streams"},{name:"Steam",icon:(0,i.jsx)(o.Q5v,{}),url:"https://store.steampowered.com/",description:"Digital distribution platform for PC gaming"},{name:"Facebook Gaming",icon:(0,i.jsx)(o.D2F,{}),url:"https://www.facebook.com/gaming/",description:"Social gaming and streaming platform"}];t(e)}catch(e){console.error("Error fetching platforms:",e)}finally{a(!1)}}),[]);(0,n.useEffect)((()=>{$()}),[$]);const w=e.filter((e=>e.name.toLowerCase().includes(s.toLowerCase())||e.description.toLowerCase().includes(s.toLowerCase())));return(0,i.jsxs)(l,{children:[(0,i.jsxs)(m,{children:[(0,i.jsx)(o.GH9,{}),"Watch Gaming Platforms"]}),(0,i.jsxs)(c,{children:[(0,i.jsx)(o.KSO,{}),(0,i.jsx)(u,{type:"text",placeholder:"Search platforms...",value:s,onChange:e=>y(e.target.value)})]}),r?(0,i.jsx)(b,{}):(0,i.jsx)(d,{children:w.map((e=>(0,i.jsxs)(g,{children:[(0,i.jsx)(h,{children:e.icon}),(0,i.jsx)(p,{children:e.name}),(0,i.jsx)(f,{children:e.description}),(0,i.jsxs)(x,{href:e.url,target:"_blank",rel:"noopener noreferrer",children:["View Platform ",(0,i.jsx)(o.EQc,{})]})]},e.name)))})]})}}}]);
//# sourceMappingURL=100.be972a6b.chunk.js.map