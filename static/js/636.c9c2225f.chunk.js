"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[636],{4636:(e,t,r)=>{r.r(t),r.d(t,{default:()=>k});var i=r(5043),o=r(5464),n=r(3204),a=r(579);const s=o.i7`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,l=o.Ay.div`
  padding: ${e=>{let{theme:t}=e;return t.spacing.large}};
  max-width: 1200px;
  margin: 0 auto;
`,m=o.Ay.h1`
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.large}};
`,c=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: ${e=>{let{theme:t}=e;return t.breakpoints.tablet}}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${e=>{let{theme:t}=e;return t.breakpoints.desktop}}) {
    grid-template-columns: repeat(3, 1fr);
  }
`,d=o.Ay.div`
  background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.medium}};
  transition: ${e=>{let{theme:t}=e;return t.transitions.medium}};
  animation: ${s} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.large}};
  }
`,u=o.Ay.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.small}};
`,h=o.Ay.h3`
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  margin: 0 0 ${e=>{let{theme:t}=e;return t.spacing.small}} 0;
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.large}};
`,p=o.Ay.p`
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.small}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,g=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,f=o.Ay.a`
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.small}};
  color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  text-decoration: none;
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.small}};
  transition: ${e=>{let{theme:t}=e;return t.transitions.fast}};

  &:hover {
    color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
  }
`,$=o.Ay.button`
  background: none;
  border: none;
  color: ${e=>{let{theme:t}=e;return t.colors.error}};
  cursor: pointer;
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.medium}};
  transition: ${e=>{let{theme:t}=e;return t.transitions.fast}};

  &:hover {
    color: ${e=>{let{theme:t}=e;return t.colors.errorDark}};
  }
`,y=(0,o.Ay)(n.hW)`
  animation: spin 1s linear infinite;
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.large}};
  color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  margin: ${e=>{let{theme:t}=e;return t.spacing.large}} auto;
  display: block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,b=o.Ay.div`
  color: ${e=>{let{theme:t}=e;return t.colors.error}};
  background-color: ${e=>{let{theme:t}=e;return t.colors.errorLight}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.small}};
`,x=o.Ay.button`
  background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border: none;
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.small}} ${e=>{let{theme:t}=e;return t.spacing.medium}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.medium}};
  cursor: pointer;
  transition: ${e=>{let{theme:t}=e;return t.transitions.fast}};
  margin-top: ${e=>{let{theme:t}=e;return t.spacing.large}};
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
  }

  &:disabled {
    background-color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
    cursor: not-allowed;
  }
`,k=()=>{const[e,t]=(0,i.useState)([]),[r,o]=(0,i.useState)(!0),[s,k]=(0,i.useState)(null),[v,j]=(0,i.useState)(1),[w,S]=(0,i.useState)(!0),A=[{id:1,title:"Top 10 Travel Destinations",image:"https://picsum.photos/id/401/300/180",description:"Explore the most beautiful places on Earth.",link:"#"},{id:2,title:"How to Start a Successful Blog",image:"https://picsum.photos/id/445/300/180",description:"Tips and tricks for aspiring bloggers.",link:"#"},{id:3,title:"Healthy Recipes for Busy Professionals",image:"https://picsum.photos/id/493/300/180",description:"Quick and nutritious meals for your workweek.",link:"#"},{id:4,title:"The Future of Artificial Intelligence",image:"https://picsum.photos/id/503/300/180",description:"Exploring the potential impacts of AI on society.",link:"#"},{id:5,title:"Mastering the Art of Photography",image:"https://picsum.photos/id/252/300/180",description:"Expert tips to take your photography skills to the next level.",link:"#"}],z=(0,i.useCallback)((async()=>{try{o(!0),k(null),await new Promise((e=>setTimeout(e,1e3)));const e=A.slice(3*(v-1),3*v);t((t=>[...t,...e])),S(3===e.length),o(!1)}catch(e){console.error("Error fetching saved items:",e),k("Failed to load saved items. Please try again later."),o(!1)}}),[v]);(0,i.useEffect)((()=>{z()}),[z]);const E=(0,i.useCallback)((async e=>{try{await new Promise((e=>setTimeout(e,500))),t((t=>t.filter((t=>t.id!==e))))}catch(r){console.error("Error removing saved item:",r),k("Failed to remove item. Please try again.")}}),[]);return(0,a.jsxs)(l,{children:[(0,a.jsxs)(m,{children:[(0,a.jsx)(n.U$b,{}),"Saved Items"]}),s&&(0,a.jsxs)(b,{children:[(0,a.jsx)(n.TNq,{})," ",s]}),(0,a.jsx)(c,{children:e.map((e=>(0,a.jsxs)(d,{children:[(0,a.jsx)(u,{src:e.image,alt:e.title,loading:"lazy"}),(0,a.jsx)(h,{children:e.title}),(0,a.jsx)(p,{children:e.description}),(0,a.jsxs)(g,{children:[(0,a.jsxs)(f,{href:e.link,target:"_blank",rel:"noopener noreferrer",children:["Read More ",(0,a.jsx)(n.EQc,{})]}),(0,a.jsx)($,{onClick:()=>E(e.id),"aria-label":"Remove saved item",children:(0,a.jsx)(n.qbC,{})})]})]},e.id)))}),r&&(0,a.jsx)(y,{}),!r&&w&&(0,a.jsx)(x,{onClick:()=>{j((e=>e+1))},disabled:r,children:"Load More"})]})}}}]);
//# sourceMappingURL=636.c9c2225f.chunk.js.map