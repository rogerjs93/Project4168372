"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[959],{1959:(e,r,t)=>{t.r(r),t.d(r,{default:()=>k});var a=t(5043),n=t(5464),l=t(3204),o=t(579);const s=n.i7`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,i=n.Ay.div`
  padding: ${e=>{let{theme:r}=e;return r.spacing.large}};
  max-width: 1000px;
  margin: 0 auto;
`,c=n.Ay.h1`
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.large}};
`,d=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.large}};
`,m=n.Ay.select`
  padding: ${e=>{let{theme:r}=e;return r.spacing.small}};
  border: 1px solid ${e=>{let{theme:r}=e;return r.colors.borderColor}};
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.small}};
  background-color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  font-size: ${e=>{let{theme:r}=e;return r.fontSizes.small}};
`,u=n.Ay.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 ${e=>{let{theme:r}=e;return r.spacing.small}};
`,h=n.Ay.th`
  text-align: left;
  padding: ${e=>{let{theme:r}=e;return r.spacing.small}};
  color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
  font-size: ${e=>{let{theme:r}=e;return r.fontSizes.small}};
  text-transform: uppercase;
`,g=n.Ay.tr`
  background-color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.medium}};
  transition: ${e=>{let{theme:r}=e;return r.transitions.fast}};
  animation: ${s} 0.3s ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.medium}};
  }
`,p=n.Ay.td`
  padding: ${e=>{let{theme:r}=e;return r.spacing.medium}};
`,y=(0,n.Ay)(p)`
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:r}=e;return r.spacing.small}};
`,x=n.Ay.span`
  font-weight: ${e=>{let{theme:r}=e;return r.fontWeights.bold}};
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
`,$=n.Ay.span`
  font-weight: ${e=>{let{theme:r}=e;return r.fontWeights.semibold}};
  color: ${e=>{let{theme:r}=e;return r.colors.secondary}};
`,f=(0,n.Ay)(l.hW)`
  animation: spin 1s linear infinite;
  font-size: ${e=>{let{theme:r}=e;return r.fontSizes.large}};
  color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  margin: ${e=>{let{theme:r}=e;return r.spacing.large}} auto;
  display: block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,b=n.Ay.div`
  color: ${e=>{let{theme:r}=e;return r.colors.error}};
  background-color: ${e=>{let{theme:r}=e;return r.colors.errorLight}};
  padding: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.medium}};
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:r}=e;return r.spacing.small}};
`,j=n.Ay.button`
  background-color: ${e=>{let{theme:r}=e;return r.colors.secondary}};
  color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  border: none;
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.medium}};
  padding: ${e=>{let{theme:r}=e;return r.spacing.small}} ${e=>{let{theme:r}=e;return r.spacing.medium}};
  font-size: ${e=>{let{theme:r}=e;return r.fontSizes.medium}};
  cursor: pointer;
  transition: ${e=>{let{theme:r}=e;return r.transitions.fast}};
  margin-top: ${e=>{let{theme:r}=e;return r.spacing.large}};
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: ${e=>{let{theme:r}=e;return r.colors.secondaryDark}};
  }

  &:disabled {
    background-color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
    cursor: not-allowed;
  }
`,k=()=>{const[e,r]=(0,a.useState)([]),[t,n]=(0,a.useState)(!0),[s,k]=(0,a.useState)(null),[v,P]=(0,a.useState)("overall"),[z,S]=(0,a.useState)(1),[A,w]=(0,a.useState)(!0),C=(0,a.useCallback)((async()=>{const e=[{id:1,rank:1,name:"Player1",score:1e4},{id:2,rank:2,name:"Player2",score:9500},{id:3,rank:3,name:"Player3",score:9e3},{id:4,rank:4,name:"Player4",score:8500},{id:5,rank:5,name:"Player5",score:8e3},{id:6,rank:6,name:"Player6",score:7500},{id:7,rank:7,name:"Player7",score:7e3},{id:8,rank:8,name:"Player8",score:6500},{id:9,rank:9,name:"Player9",score:6e3},{id:10,rank:10,name:"Player10",score:5500}];try{n(!0),k(null),await new Promise((e=>setTimeout(e,1e3)));const t=("overall"===v?e:e.filter((e=>e.game===v))).slice(5*(z-1),5*z);r((e=>1===z?t:[...e,...t])),w(5===t.length),n(!1)}catch(t){console.error("Error fetching leaderboard data:",t),k("Failed to load leaderboard data. Please try again later."),n(!1)}}),[v,z]);(0,a.useEffect)((()=>{C()}),[C]);const L=e=>{switch(e){case 1:return(0,o.jsx)(l.tz0,{color:"gold"});case 2:return(0,o.jsx)(l.tz0,{color:"silver"});case 3:return(0,o.jsx)(l.tz0,{color:"#CD7F32"});default:return(0,o.jsx)(l.x$1,{})}};return(0,o.jsxs)(i,{children:[(0,o.jsxs)(c,{children:[(0,o.jsx)(l.tz0,{}),"Leaderboards"]}),(0,o.jsx)(d,{children:(0,o.jsxs)(m,{value:v,onChange:e=>{P(e.target.value),S(1),r([])},children:[(0,o.jsx)("option",{value:"overall",children:"Overall"}),(0,o.jsx)("option",{value:"puzzle",children:"Puzzle Games"}),(0,o.jsx)("option",{value:"action",children:"Action Games"}),(0,o.jsx)("option",{value:"strategy",children:"Strategy Games"})]})}),s&&(0,o.jsxs)(b,{children:[(0,o.jsx)(l.TNq,{})," ",s]}),(0,o.jsxs)(u,{children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)(h,{children:"Rank"}),(0,o.jsx)(h,{children:"Player"}),(0,o.jsx)(h,{children:"Score"})]})}),(0,o.jsx)("tbody",{children:e.map((e=>(0,o.jsxs)(g,{children:[(0,o.jsxs)(y,{children:[L(e.rank),e.rank]}),(0,o.jsx)(p,{children:(0,o.jsx)(x,{children:e.name})}),(0,o.jsx)(p,{children:(0,o.jsx)($,{children:e.score.toLocaleString()})})]},e.id)))})]}),t&&(0,o.jsx)(f,{}),!t&&A&&(0,o.jsx)(j,{onClick:()=>{S((e=>e+1))},disabled:t,children:"Load More"})]})}}}]);
//# sourceMappingURL=959.ae14b7f7.chunk.js.map