"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[758],{1758:(e,r,t)=>{t.r(r),t.d(r,{default:()=>P});var n=t(5043),s=t(5464),o=t(3204),a=t(6213),l=t(342),i=t(1877),m=t(2725),c=t(579);const d=s.i7`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,u=s.Ay.div`
  padding: ${e=>{let{theme:r}=e;return r.spacing.large}};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  max-width: 1200px;
  margin: 0 auto;
`,g=s.Ay.h1`
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  color: ${e=>{let{theme:r}=e;return r.colors.textPrimary}};
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.medium}};
`,h=s.Ay.div`
  flex-grow: 1;
  background-color: ${e=>{let{theme:r}=e;return r.colors.surfaceLight}};
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.medium}};
  padding: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  overflow-y: auto;
  box-shadow: ${e=>{let{theme:r}=e;return r.boxShadow.medium}};
`,p=s.Ay.div`
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  animation: ${d} 0.3s ease-out;
`,y=s.Ay.div`
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.small}};
  display: flex;
  flex-direction: column;
  align-items: ${e=>{let{isCurrentUser:r}=e;return r?"flex-end":"flex-start"}};
`,x=s.Ay.div`
  background-color: ${e=>{let{theme:r,isCurrentUser:t}=e;return t?r.colors.primary:r.colors.background}};
  color: ${e=>{let{theme:r,isCurrentUser:t}=e;return t?r.colors.textOnPrimary:r.colors.textPrimary}};
  padding: ${e=>{let{theme:r}=e;return r.spacing.small}} ${e=>{let{theme:r}=e;return r.spacing.medium}};
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.large}};
  max-width: 70%;
  word-wrap: break-word;
`,f=s.Ay.span`
  font-weight: bold;
  color: ${e=>{let{theme:r,isCurrentUser:t}=e;return t?r.colors.secondary:r.colors.primary}};
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.tiny}};
`,b=s.Ay.small`
  color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
  font-size: ${e=>{let{theme:r}=e;return r.fontSizes.tiny}};
  margin-top: ${e=>{let{theme:r}=e;return r.spacing.tiny}};
`,$=s.Ay.div`
  display: flex;
  gap: ${e=>{let{theme:r}=e;return r.spacing.small}};
  background-color: ${e=>{let{theme:r}=e;return r.colors.background}};
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.medium}};
  padding: ${e=>{let{theme:r}=e;return r.spacing.small}};
  position: relative;
`,j=s.Ay.input`
  flex-grow: 1;
  padding: ${e=>{let{theme:r}=e;return r.spacing.small}};
  border: none;
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.small}};
  font-size: ${e=>{let{theme:r}=e;return r.fontSizes.medium}};
  background-color: transparent;

  &:focus {
    outline: none;
  }
`,k=s.Ay.button`
  background-color: transparent;
  border: none;
  color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
  font-size: ${e=>{let{theme:r}=e;return r.fontSizes.large}};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${e=>{let{theme:r}=e;return r.colors.primary}};
  }

  &:disabled {
    color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
    cursor: not-allowed;
  }
`,v=(0,s.Ay)(k)`
  color: ${e=>{let{theme:r}=e;return r.colors.primary}};

  &:hover {
    color: ${e=>{let{theme:r}=e;return r.colors.primaryDark}};
  }
`,A=s.Ay.div`
  color: ${e=>{let{theme:r}=e;return r.colors.error}};
  padding: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>{let{theme:r}=e;return r.spacing.small}};
  background-color: ${e=>{let{theme:r}=e;return r.colors.errorLight}};
  border-radius: ${e=>{let{theme:r}=e;return r.borderRadius.medium}};
  margin-bottom: ${e=>{let{theme:r}=e;return r.spacing.medium}};
`,w=s.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>{let{theme:r}=e;return r.spacing.medium}};
  color: ${e=>{let{theme:r}=e;return r.colors.textSecondary}};
`,C=(0,s.Ay)(o.hW)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,S=s.Ay.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  z-index: 1000;
`,E=s.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`,P=()=>{const[e,r]=(0,n.useState)([]),[t,s]=(0,n.useState)(""),[d,P]=(0,n.useState)(""),[U,z]=(0,n.useState)(!1),[L,R]=(0,n.useState)(!1),T=(0,n.useRef)(null),_=(0,n.useRef)(null),{user:F}=(0,l.A)(),D=(0,m.d)(),I=(0,n.useCallback)((async()=>{try{z(!0);const e=await a.A.get("http://localhost:3001/messages?_sort=timestamp&_order=desc&_limit=50");r(e.data.reverse()),P("")}catch(e){console.error("Error fetching messages:",e),P("Failed to load messages. Please try again."),D("error","Failed to load messages. Please try again.")}finally{z(!1)}}),[D]);(0,n.useEffect)((()=>{I();const e=setInterval(I,5e3);return()=>clearInterval(e)}),[I]),(0,n.useEffect)((()=>{T.current&&(T.current.scrollTop=T.current.scrollHeight)}),[e]),(0,n.useEffect)((()=>{const e=e=>{_.current&&!_.current.contains(e.target)&&R(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}}),[]);const M=(0,n.useCallback)((async()=>{if(""===t.trim())return;const e={sender:F.username,content:t.trim(),timestamp:(new Date).toISOString()};try{z(!0),await a.A.post("http://localhost:3001/messages",e),r((r=>[...r,e])),s(""),P(""),D("success","Message sent successfully!")}catch(n){console.error("Error sending message:",n),P("Failed to send message. Please try again."),D("error","Failed to send message. Please try again.")}finally{z(!1)}}),[t,F.username,D]),O=(0,n.useMemo)((()=>e=>new Date(e).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),[]),K=(0,n.useMemo)((()=>e.reduce(((e,r)=>{const t=e[e.length-1];return t&&t.sender===r.sender?t.messages.push(r):e.push({sender:r.sender,messages:[r]}),e}),[])),[e]);return(0,c.jsxs)(u,{children:[(0,c.jsxs)(g,{children:[(0,c.jsx)(o.uN,{}),"Global Chat"]}),d&&(0,c.jsxs)(A,{children:[(0,c.jsx)(o.TNq,{})," ",d]}),(0,c.jsx)(h,{ref:T,children:U&&0===e.length?(0,c.jsxs)(w,{children:[(0,c.jsx)(C,{})," Loading messages..."]}):K.map(((e,r)=>(0,c.jsxs)(p,{children:[(0,c.jsx)(f,{isCurrentUser:e.sender===F.username,children:e.sender}),e.messages.map(((r,t)=>(0,c.jsxs)(y,{isCurrentUser:e.sender===F.username,children:[(0,c.jsx)(x,{isCurrentUser:e.sender===F.username,children:r.content}),(0,c.jsx)(b,{children:O(r.timestamp)})]},t)))]},r)))}),(0,c.jsxs)($,{children:[(0,c.jsx)(k,{onClick:()=>{R((e=>!e))},"aria-label":"Open emoji picker",children:(0,c.jsx)(o.Ky9,{})}),L&&(0,c.jsxs)(S,{ref:_,children:[(0,c.jsx)(E,{onClick:()=>R(!1)}),(0,c.jsx)(i.Ay,{onEmojiClick:(e,r)=>{s((e=>e+r.emoji))}})]}),(0,c.jsx)(k,{"aria-label":"Upload image",children:(0,c.jsx)(o.dkL,{})}),(0,c.jsx)(j,{type:"text",value:t,onChange:e=>s(e.target.value),placeholder:"Type your message...",onKeyPress:e=>"Enter"===e.key&&M(),disabled:U,"aria-label":"Type a message"}),(0,c.jsx)(v,{onClick:M,disabled:U||""===t.trim(),"aria-label":"Send message",children:U?(0,c.jsx)(C,{}):(0,c.jsx)(o.Cer,{})})]})]})}}}]);
//# sourceMappingURL=758.96a3d380.chunk.js.map