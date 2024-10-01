"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[744],{9744:(e,t,r)=>{r.r(t),r.d(t,{default:()=>N});var o=r(5043),n=r(5464),l=r(6213),i=r(3204),a=r(9209),s=r(579);const d=n.Ay.article`
  background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.medium}};
  overflow: hidden;
  transition: ${e=>{let{theme:t}=e;return t.transitions.fast}};
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover, &:focus-within {
    transform: translateY(-5px);
    box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.large}};
  }
`,m=n.Ay.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
`,c=n.Ay.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${d}:hover & {
    transform: scale(1.05);
  }
`,h=n.Ay.div`
  padding: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`,u=n.Ay.h3`
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.small}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.large}};
`,g=n.Ay.p`
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.small}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  flex-grow: 1;
`,p=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.small}};
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
`,x=n.Ay.span`
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.tiny}};
`,b=n.Ay.span`
  background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.tiny}} ${e=>{let{theme:t}=e;return t.spacing.small}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.small}};
  font-weight: ${e=>{let{theme:t}=e;return t.fontWeights.bold}};
`,y=e=>{let{game:t}=e;const{id:r,title:o,description:n,thumbnail:l,rating:a,genre:y,image:f}=t;return(0,s.jsxs)(d,{children:[(0,s.jsx)(m,{children:f&&(0,s.jsx)(c,{src:f,alt:o})}),(0,s.jsxs)(h,{children:[(0,s.jsx)(u,{children:o}),(0,s.jsx)(g,{children:n}),(0,s.jsxs)(p,{children:[(0,s.jsxs)(x,{children:[(0,s.jsx)(i.gt3,{"aria-hidden":"true"}),a?a.toFixed(1):"N/A"]}),y&&(0,s.jsx)(b,{children:y})]})]})]})},f=o.memo(y);var $=r(9144),j=r(6255),w=r(5271),v=r(6256),A=r(3461),S=r(2725),k=r(741);const z=n.Ay.div`
  padding: ${e=>{let{theme:t}=e;return t.spacing.large}};
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`,C=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.large}};
  flex-wrap: wrap;
  gap: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,R=n.Ay.h1`
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.small}};
`,L=n.Ay.button`
  background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border: none;
  padding: ${e=>{let{theme:t}=e;return t.spacing.medium}} ${e=>{let{theme:t}=e;return t.spacing.large}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.medium}};
  font-weight: ${e=>{let{theme:t}=e;return t.fontWeights.semibold}};
  cursor: pointer;
  transition: ${e=>{let{theme:t}=e;return t.transitions.fast}};
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.small}};
  box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.medium}};

  &:hover {
    background-color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
    transform: translateY(-2px);
    box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.large}};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.small}};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${e=>{let{theme:t}=e;return t.colors.primary}}40;
  }
`,P=n.Ay.input`
  padding: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.borderColor}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.medium}};
  width: 100%;
  max-width: 300px;

  &:focus {
    outline: none;
    border-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
    box-shadow: 0 0 0 2px ${e=>{let{theme:t}=e;return t.colors.primary}}40;
  }
`,T=n.Ay.div`
  color: ${e=>{let{theme:t}=e;return t.colors.error}};
  text-align: center;
  padding: ${e=>{let{theme:t}=e;return t.spacing.large}};
  background-color: ${e=>{let{theme:t}=e;return t.colors.errorLight}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,_=n.Ay.select`
  padding: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.borderColor}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.medium}};
  background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
    box-shadow: 0 0 0 2px ${e=>{let{theme:t}=e;return t.colors.primary}}40;
  }
`,F=n.Ay.div`
  flex-grow: 1;
  position: relative;

  .scrollable-content {
    overflow-y: scroll !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`,G=(0,n.Ay)(L)`
  background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.borderColor}};

  &:hover {
    background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  }
`,I=n.Ay.div`
  text-align: center;
  padding: ${e=>{let{theme:t}=e;return t.spacing.large}};
`,Y=(0,n.Ay)(L)`
  margin-top: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,E=n.Ay.div`
  background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  height: 300px; // Adjust based on your GameCard height
`,M=()=>{const[e,t]=(0,o.useState)([]),[r,n]=(0,o.useState)(!1),[d,m]=(0,o.useState)(null),[c,h]=(0,o.useState)(""),[u,g]=(0,o.useState)("all"),[p,x]=(0,o.useState)(!0),[b,y]=(0,o.useState)("asc"),M=(0,j.A)(c,300),N=(0,o.useRef)(1),W=(0,S.d)(),q=(0,o.useCallback)((async()=>{if(p){n(!0),m(null);try{const e=(await l.A.get("http://localhost:3001/games",{params:{_page:N.current,_limit:20,q:M,gameType:"all"!==u?u:void 0,_sort:"title",_order:b}})).data;t((t=>[...t,...e])),x(20===e.length),N.current+=1}catch(e){console.error("Error fetching games:",e),m("Failed to load games. Please check your internet connection and try again."),W("error","Failed to load games. Please try again later.")}finally{n(!1)}}}),[M,u,p,b,W]);(0,o.useEffect)((()=>{t([]),N.current=1,x(!0),q()}),[M,u,b,q]);const B=(0,o.useMemo)((()=>o.memo(f)),[]),Z=t=>{let{index:r,style:o}=t;if(r>=e.length)return(0,s.jsxs)(E,{children:[(0,s.jsx)(k.Ay.Rect,{height:"150px"}),(0,s.jsx)(k.Ay.Line,{height:"24px",width:"80%",style:{marginTop:"16px"}}),(0,s.jsx)(k.Ay.Line,{height:"16px",width:"60%",style:{marginTop:"8px"}}),(0,s.jsx)(k.Ay.Line,{height:"16px",width:"40%",style:{marginTop:"8px"}})]});const n=e[r];return(0,s.jsx)("div",{style:{...o,paddingBottom:"16px"},children:(0,s.jsx)(B,{game:n})})},O=p?e.length+1:e.length,X=r?()=>{}:q,D=t=>!p||t<e.length;return(0,s.jsx)(a.A,{children:(0,s.jsxs)(z,{children:[(0,s.jsxs)(C,{children:[(0,s.jsxs)(R,{children:[(0,s.jsx)(i.pBr,{})," Games"]}),(0,s.jsx)(P,{type:"text",placeholder:"Search games...",value:c,onChange:e=>{h(e.target.value)},"aria-label":"Search games"}),(0,s.jsxs)(_,{value:u,onChange:e=>{g(e.target.value)},"aria-label":"Filter games",children:[(0,s.jsx)("option",{value:"all",children:"All Games"}),(0,s.jsx)("option",{value:"action",children:"Action"}),(0,s.jsx)("option",{value:"puzzle",children:"Puzzle"}),(0,s.jsx)("option",{value:"strategy",children:"Strategy"}),(0,s.jsx)("option",{value:"rpg",children:"RPG"})]}),(0,s.jsxs)(G,{onClick:()=>{y((e=>"asc"===e?"desc":"asc"))},"aria-label":"Sort games",children:[(0,s.jsx)(i.MjW,{})," Sort ","asc"===b?"A-Z":"Z-A"]}),(0,s.jsxs)(L,{onClick:()=>{console.log("Connecting to external program..."),alert("This feature will be implemented in the future to connect with an external game creation program.")},children:[(0,s.jsx)(i.O2x,{})," Connect External Program"]})]}),d?(0,s.jsxs)(I,{children:[(0,s.jsxs)(T,{children:[(0,s.jsx)(i.TNq,{"aria-hidden":"true"})," ",d]}),(0,s.jsxs)(Y,{onClick:()=>q(),"aria-label":"Retry loading games",children:[(0,s.jsx)(i.Lsu,{"aria-hidden":"true"})," Retry"]})]}):(0,s.jsx)(F,{children:(0,s.jsx)(v.Ay,{children:e=>{let{height:t,width:r}=e;return(0,s.jsx)(A.A,{isItemLoaded:D,itemCount:O,loadMoreItems:X,children:e=>{let{onItemsRendered:o,ref:n}=e;return(0,s.jsx)(w.Y1,{ref:n,height:t,itemCount:O,itemSize:300,width:r,onItemsRendered:o,className:"scrollable-content",style:{overflowX:"hidden"},children:Z})}})}})}),r&&0===e.length&&(0,s.jsxs)("div",{"aria-live":"polite","aria-busy":"true",children:[(0,s.jsx)($.A,{}),(0,s.jsx)("p",{children:"Loading games..."})]})]})})},N=o.memo(M)}}]);
//# sourceMappingURL=744.881e448f.chunk.js.map