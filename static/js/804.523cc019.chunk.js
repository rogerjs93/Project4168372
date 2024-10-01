"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[804],{4804:(e,t,r)=>{r.r(t),r.d(t,{default:()=>x});var n=r(5043),o=r(5464),i=r(3204),a=r(579);const s=o.i7`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,l=o.Ay.div`
  padding: ${e=>{let{theme:t}=e;return t.spacing.large}};
  max-width: 800px;
  margin: 0 auto;
`,m=o.Ay.h1`
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.large}};
`,c=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>{let{theme:t}=e;return t.spacing.large}};
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
`,u=o.Ay.p`
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.small}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.small}};
`,h=o.Ay.p`
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,g=o.Ay.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,p=o.Ay.div`
  display: flex;
  gap: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,$=o.Ay.button`
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.small}};
  background: none;
  border: none;
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
  cursor: pointer;
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.small}};
  transition: ${e=>{let{theme:t}=e;return t.transitions.fast}};

  &:hover {
    color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  }
`,y=(0,o.Ay)(i.hW)`
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
`,f=o.Ay.button`
  background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border: none;
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.small}} ${e=>{let{theme:t}=e;return t.spacing.medium}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.medium}};
  cursor: pointer;
  transition: ${e=>{let{theme:t}=e;return t.transitions.fast}};
  margin-top: ${e=>{let{theme:t}=e;return t.spacing.large}};
  align-self: center;

  &:hover {
    background-color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
  }

  &:disabled {
    background-color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
    cursor: not-allowed;
  }
`,x=()=>{const[e,t]=(0,n.useState)([]),[r,o]=(0,n.useState)(!0),[s,x]=(0,n.useState)(null),[k,j]=(0,n.useState)(1),[w,S]=(0,n.useState)(!0),v=[{id:1,date:"1 year ago",content:"Remember this amazing trip?",image:"https://picsum.photos/id/103/600/400",likes:42,comments:8},{id:2,date:"2 years ago",content:"Throwback to this incredible concert!",image:"https://picsum.photos/id/117/600/400",likes:87,comments:15},{id:3,date:"3 years ago",content:"My first day at the new job. Time flies!",image:"https://picsum.photos/id/155/600/400",likes:63,comments:12}],A=(0,n.useCallback)((async()=>{try{o(!0),x(null),await new Promise((e=>setTimeout(e,1e3)));const e=v.slice(2*(k-1),2*k);return t((t=>[...t,...e])),S(2===e.length),void o(!1)}catch(e){console.error("Error fetching memories:",e),x("Failed to load memories. Please try again later."),o(!1)}}),[k]);(0,n.useEffect)((()=>{A()}),[A]);const z=(0,n.useCallback)((async r=>{try{const n=e.find((e=>e.id===r)),o={...n,likes:n.likes+1};await new Promise((e=>setTimeout(e,500))),t((e=>e.map((e=>e.id===r?o:e))))}catch(n){console.error("Error liking memory:",n)}}),[e]);return(0,a.jsxs)(l,{children:[(0,a.jsxs)(m,{children:[(0,a.jsx)(i.OKX,{}),"Memories"]}),s&&(0,a.jsxs)(b,{children:[(0,a.jsx)(i.TNq,{})," ",s]}),(0,a.jsx)(c,{children:e.map((e=>(0,a.jsxs)(d,{children:[(0,a.jsx)(u,{children:e.date}),(0,a.jsx)(h,{children:e.content}),(0,a.jsx)(g,{src:e.image,alt:`Memory from ${e.date}`,loading:"lazy"}),(0,a.jsxs)(p,{children:[(0,a.jsxs)($,{onClick:()=>z(e.id),children:[(0,a.jsx)(i.Mbv,{})," ",e.likes," Likes"]}),(0,a.jsxs)($,{children:[(0,a.jsx)(i.j1Q,{})," ",e.comments," Comments"]})]})]},e.id)))}),r&&(0,a.jsx)(y,{}),!r&&w&&(0,a.jsx)(f,{onClick:()=>{j((e=>e+1))},disabled:r,children:"Load More Memories"})]})}}}]);
//# sourceMappingURL=804.523cc019.chunk.js.map