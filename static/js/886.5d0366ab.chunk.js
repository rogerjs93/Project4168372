"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[886],{2886:(e,r,t)=>{t.r(r),t.d(r,{default:()=>f});var o=t(5043),n=t(5464),a=t(6213),s=t(3204),l=t(579);const i=n.i7`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,c=n.Ay.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${e=>{let{theme:r}=e;return r.spacing.large}};
  background-color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.large}};
  box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.medium}};
  animation: ${i} 0.3s ease-out;
`,m=n.Ay.h1`
  color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.large}};
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:r}=e;return r.spacing.small}};
`,u=n.Ay.button`
  background-color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  padding: ${e=>{let{theme:r}=e;return r.spacing.medium}} ${e=>{let{theme:r}=e;return r.spacing.large}};
  border: none;
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.medium}};
  font-size: ${e=>{let{theme:r}=e;return r.fontSizes.medium}};
  cursor: pointer;
  transition: ${e=>{let{theme:r}=e;return r.transitions.fast}};
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:r}=e;return r.spacing.small}};

  &:hover {
    background-color: ${e=>{let{theme:r}=e;return r.colors.secondary}};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
    cursor: not-allowed;
  }
`,d=n.Ay.div`
  margin-top: ${e=>{let{theme:r}=e;return r.spacing.large}};
  padding: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  background-color: ${e=>{let{theme:r}=e;return r.colors.background}};
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.medium}};
  border: 1px solid ${e=>{let{theme:r}=e;return r.colors.borderColor}};
  animation: ${i} 0.3s ease-out;
`,h=n.Ay.h2`
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,g=n.Ay.p`
  color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
  line-height: 1.6;
`,p=n.Ay.p`
  color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
  font-style: italic;
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:r}=e;return r.spacing.small}};
`,y=n.Ay.p`
  color: ${e=>{let{theme:r}=e;return r.colors.error}};
  margin-top: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  padding: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  background-color: ${e=>{let{theme:r}=e;return r.colors.errorLight}};
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.medium}};
`,$=(0,n.Ay)(s.hW)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,b=n.Ay.button`
  background: none;
  border: none;
  color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
  cursor: pointer;
  transition: ${e=>{let{theme:r}=e;return r.transitions.fast}};

  &:hover {
    color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  }
`,f=()=>{const[e,r]=(0,o.useState)([]),[t,n]=(0,o.useState)(""),[i,f]=(0,o.useState)(!1),[x,k]=(0,o.useState)(""),[j,S]=(0,o.useState)(!1),A=(0,o.useCallback)((async()=>{try{const e=await a.A.get("http://localhost:3001/posts");r(e.data)}catch(x){console.error("Error fetching feed:",x),k("Failed to fetch feed. Please try again later.")}}),[]);(0,o.useEffect)((()=>{A()}),[A]);const w=(0,o.useCallback)((()=>{f(!0),k("");const r=e.map((e=>e.content)).join(" ");setTimeout((()=>{try{const e=r.split(" "),t="Based on your social feed, here's a summary of key topics and trends: "+e.filter(((e,r)=>r%3===0)).slice(0,50).join(" ")+(e.length>150?"...":"");n(t)}catch(x){k("An error occurred while generating the summary. Please try again.")}finally{f(!1)}}),2e3)}),[e]),C=(0,o.useCallback)((()=>{navigator.clipboard.writeText(t).then((()=>{S(!0),setTimeout((()=>S(!1)),2e3)}))}),[t]);return(0,l.jsxs)(c,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(s.y8Q,{})," AI Feed Summarizer"]}),(0,l.jsxs)(u,{onClick:w,disabled:i,children:[i?(0,l.jsx)($,{}):(0,l.jsx)(s.KP4,{})," Summarize My Feed"]}),i&&(0,l.jsxs)(p,{children:[(0,l.jsx)($,{})," Processing your feed..."]}),x&&(0,l.jsx)(y,{children:x}),t&&!i&&(0,l.jsxs)(d,{children:[(0,l.jsxs)(h,{children:["Your Feed Summary",(0,l.jsx)(b,{onClick:C,title:"Copy summary",children:j?(0,l.jsx)(s.CMH,{}):(0,l.jsx)(s.paH,{})})]}),(0,l.jsx)(g,{children:t})]})]})}}}]);
//# sourceMappingURL=886.5d0366ab.chunk.js.map