"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[582],{8582:(e,r,t)=>{t.r(r),t.d(r,{default:()=>b});var n=t(5043),o=t(5464),a=t(3204),i=t(579);const s=o.DU`
  body {
    background-color: ${e=>{let{theme:r}=e;return r.colors.background}};
    color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  }
`,d=o.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`,l=o.Ay.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`,c=o.Ay.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  margin-bottom: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`,x=o.Ay.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: #1c1e21;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`,p=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.tablet}}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${e=>{let{theme:r}=e;return r.breakpoints.desktop}}) {
    grid-template-columns: repeat(3, 1fr);
  }
`,u=o.Ay.div`
  background-color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.medium}};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.large}};
  }
`,m=o.Ay.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 12px;
  object-fit: cover;
`,h=o.Ay.h3`
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  margin: 0 0 4px 0;
  font-size: 17px;
  font-weight: 600;
`,f=o.Ay.p`
  color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
  margin: 0 0 12px 0;
  font-size: 13px;
`,g=o.Ay.button`
  background-color: ${e=>{let{isFriend:r}=e;return r?"#e4e6eb":"#1877f2"}};
  color: ${e=>{let{isFriend:r}=e;return r?"#050505":"#ffffff"}};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;

  &:hover {
    background-color: ${e=>{let{isFriend:r}=e;return r?"#d8dadf":"#166fe5"}};
  }
`,b=()=>{const[e,r]=(0,n.useState)([]),[t,o]=(0,n.useState)(""),b=(0,n.useCallback)((()=>Array.from({length:30},((e,r)=>({id:r+1,name:`Friend ${r+1}`,avatar:"https://i.pravatar.cc/150?img="+(r+1)%70,status:["Online","Offline","Away","Busy"][Math.floor(4*Math.random())],isFriend:Math.random()>.5})))),[]);(0,n.useEffect)((()=>{r(b())}),[b]);const y=(0,n.useCallback)((e=>{r((r=>r.map((r=>r.id===e?{...r,isFriend:!r.isFriend}:r))))}),[]),w=(0,n.useMemo)((()=>e.filter((e=>e.name.toLowerCase().includes(t.toLowerCase())))),[e,t]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s,{}),(0,i.jsxs)(d,{children:[(0,i.jsxs)(l,{children:[(0,i.jsx)(a.M5n,{}),"Friends"]}),(0,i.jsxs)(c,{children:[(0,i.jsx)(a.KSO,{color:"#65676b"}),(0,i.jsx)(x,{type:"text",placeholder:"Search friends...",value:t,onChange:e=>o(e.target.value)})]}),(0,i.jsx)(p,{children:w.map((e=>(0,i.jsxs)(u,{children:[(0,i.jsx)(m,{src:e.avatar,alt:e.name}),(0,i.jsx)(h,{children:e.name}),(0,i.jsx)(f,{children:e.status}),(0,i.jsx)(g,{onClick:()=>y(e.id),isFriend:e.isFriend,children:e.isFriend?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.Dby,{})," Unfriend"]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.NPy,{})," Add Friend"]})})]},e.id)))})]})]})}}}]);
//# sourceMappingURL=582.65c25f48.chunk.js.map