"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[464],{1545:(e,t,r)=>{r.r(t),r.d(t,{Home:()=>te,default:()=>re});var n=r(5043),i=r(5464),a=r(5475),o=r(3204),s=r(5843);const l=r.p+"static/media/people-playing-games.3f27a17727c4065a5bd9.webp";var c=r(6779),d=r(3546),m=r(579);const h=i.DU`
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`,u=(i.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,i.i7`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`),g=i.i7`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`,p=i.Ay.div`
  overflow-x: hidden;
`,x=(i.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${e=>{let{theme:t}=e;return t.spacing.large}};
`,i.Ay.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`),y=(0,i.Ay)(c.P.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${l});
  background-size: cover;
  background-position: center;
`,f=(0,i.Ay)(c.P.div)`
  position: relative;
  z-index: 1;
  text-align: center;
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  max-width: 800px;
  padding: ${e=>{let{theme:t}=e;return t.spacing.large}};
`,$=i.Ay.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${e=>{let{theme:t}=e;return t.fontWeights.bold}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
`,b=i.Ay.p`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.xlarge}};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  line-height: 1.5;
  max-width: 800px;
  margin: 0 auto ${e=>{let{theme:t}=e;return t.spacing.xlarge}};
`,j=i.Ay.div`
  display: flex;
  justify-content: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  flex-wrap: wrap;
  justify-content: center;
`,v=(0,i.Ay)(a.N_)`
  display: inline-flex;
  align-items: center;
  background-color: ${e=>{let{theme:t,primary:r}=e;return r?t.colors.primary:"transparent"}};
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.medium}} ${e=>{let{theme:t}=e;return t.spacing.xlarge}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  text-decoration: none;
  font-weight: ${e=>{let{theme:t}=e;return t.fontWeights.semibold}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.large}};
  transition: ${e=>{let{theme:t}=e;return t.transitions.medium}};
  border: 2px solid ${e=>{let{theme:t,primary:r}=e;return r?t.colors.primary:t.colors.surfaceLight}};
  margin: ${e=>{let{theme:t}=e;return t.spacing.small}};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${e=>{let{theme:t,primary:r}=e;return r?t.colors.secondary:"rgba(255, 255, 255, 0.1)"}};
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  svg {
    margin-left: ${e=>{let{theme:t}=e;return t.spacing.small}};
  }
`,w=i.Ay.div`
  position: absolute;
  bottom: ${e=>{let{theme:t}=e;return t.spacing.large}};
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  cursor: pointer;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-30px) translateX(-50%); }
    60% { transform: translateY(-15px) translateX(-50%); }
  }

  &:hover {
    transform: translateY(5px) translateX(-50%);
  }
`,A=i.Ay.section`
  padding: ${e=>{let{theme:t}=e;return t.spacing.xxxxlarge}} ${e=>{let{theme:t}=e;return t.spacing.large}};
  background-color: ${e=>{let{theme:t,alternate:r}=e;return r?t.colors.background:t.colors.surfaceLight}};
`,z=i.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,k=i.Ay.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.xlarge}};
  text-align: center;
  position: relative;
  padding-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${e=>{let{theme:t}=e;return t.colors.accent}};
  }
`,S=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${e=>{let{theme:t}=e;return t.spacing.xlarge}};
`,P=i.Ay.div`
  background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.xxlarge}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.large}};
  box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.large}};
  transition: ${e=>{let{theme:t}=e;return t.transitions.medium}};
  text-align: center;
  animation: ${u} 0.5s ease-out;
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.border}};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.xlarge}};
    border-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  }
`,L=i.Ay.div`
  font-size: 3rem;
  color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.large}};
  background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${e=>{let{theme:t}=e;return t.spacing.large}};
  transition: ${e=>{let{theme:t}=e;return t.transitions.medium}};

  ${P}:hover & {
    background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
    color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  }
`,C=i.Ay.h3`
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.xlarge}};
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,Y=i.Ay.p`
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.medium}};
  line-height: 1.6;
`,W=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${e=>{let{theme:t}=e;return t.spacing.xlarge}};
`,G=i.Ay.div`
  background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.large}};
  overflow: hidden;
  box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.medium}};
  transition: ${e=>{let{theme:t}=e;return t.transitions.medium}};
  animation: ${u} 0.5s ease-out;
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.border}};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.xlarge}};
  }
`,I=i.Ay.div`
  position: relative;
  overflow: hidden;
  height: 200px;
`,N=i.Ay.div`
  font-size: 5rem;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
  color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  transition: ${e=>{let{theme:t}=e;return t.transitions.medium}};

  ${G}:hover & {
    transform: scale(1.1);
  }
`,R=i.Ay.span`
  position: absolute;
  top: ${e=>{let{theme:t}=e;return t.spacing.small}};
  left: ${e=>{let{theme:t}=e;return t.spacing.small}};
  background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.tiny}} ${e=>{let{theme:t}=e;return t.spacing.small}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.small}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.small}};
  font-weight: ${e=>{let{theme:t}=e;return t.fontWeights.semibold}};
  z-index: 1;
`,X=i.Ay.div`
  padding: ${e=>{let{theme:t}=e;return t.spacing.large}};
`,O=i.Ay.h4`
  margin: 0;
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.large}};
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
`,T=i.Ay.p`
  margin: ${e=>{let{theme:t}=e;return t.spacing.small}} 0 0;
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.medium}};
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,_=i.Ay.div`
  display: flex;
  align-items: center;
  color: ${e=>{let{theme:t}=e;return t.colors.accent}};
  font-weight: ${e=>{let{theme:t}=e;return t.fontWeights.semibold}};
`,B=(0,i.Ay)(a.N_)`
  background-color: ${e=>{let{theme:t}=e;return t.colors.accent}};
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.small}} ${e=>{let{theme:t}=e;return t.spacing.medium}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.medium}};
  text-decoration: none;
  font-weight: ${e=>{let{theme:t}=e;return t.fontWeights.semibold}};
  transition: ${e=>{let{theme:t}=e;return t.transitions.fast}};
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.small}};

  &:hover {
    background-color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
    animation: ${g} 0.3s ease-in-out;
  }
`,D=(0,i.Ay)(A)`
  background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
`,J=i.Ay.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`,M=(0,i.Ay)(c.P.div)`
  background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  padding: ${e=>{let{theme:t}=e;return t.spacing.xlarge}};
  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.large}};
  box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.large}};
  position: relative;
  margin: 0 auto;
  max-width: 600px;
`,Z=(0,i.Ay)(o.JwJ)`
  position: absolute;
  top: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  left: ${e=>{let{theme:t}=e;return t.spacing.medium}};
  font-size: 2rem;
  color: ${e=>{let{theme:t}=e;return t.colors.accent}};
  opacity: 0.2;
`,q=i.Ay.p`
  font-style: italic;
  margin-bottom: ${e=>{let{theme:t}=e;return t.spacing.large}};
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.large}};
  line-height: 1.6;
`,H=i.Ay.div`
  display: flex;
  align-items: center;
  gap: ${e=>{let{theme:t}=e;return t.spacing.medium}};
`,K=i.Ay.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
`,U=i.Ay.div`
  display: flex;
  flex-direction: column;
`,F=i.Ay.p`
  font-weight: ${e=>{let{theme:t}=e;return t.fontWeights.semibold}};
  color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.large}};
  margin: 0;
`,V=i.Ay.p`
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
  font-size: ${e=>{let{theme:t}=e;return t.fontSizes.medium}};
  margin: 0;
`,Q=i.Ay.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${e=>{let{theme:t}=e;return t.transitions.fast}};
  z-index: 1;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    background-color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
  }

  ${e=>{let{left:t}=e;return t&&"left: 0;"}}
  ${e=>{let{right:t}=e;return t&&"right: 0;"}}
`,ee=e=>{let{children:t}=e;const[r,n]=(0,s.Wx)({triggerOnce:!0,rootMargin:"-50px 0px"});return(0,m.jsx)("div",{ref:r,style:{opacity:n?1:0,transition:"opacity 0.5s ease-in-out"},children:t})},te=()=>{const[e,t]=(0,n.useState)(!1),[r,i]=(0,n.useState)(0),a=(0,n.useRef)(null);(0,n.useEffect)((()=>{t(!0)}),[]);const s=(0,n.useMemo)((()=>["Action","Puzzle","Strategy","Adventure"]),[]),l=[{text:"Naama Online has revolutionized the way I create and share games. The platform's intuitive tools and supportive community have helped me grow as a developer.",author:"Sarah J.",role:"Game Developer"},{text:"I've discovered so many unique and creative games on Naama. It's not just a platform, it's a thriving ecosystem of innovative ideas and passionate creators.",author:"Mike T.",role:"Avid Gamer"},{text:"As a hobbyist, Naama Online has made game creation accessible and enjoyable. I've learned so much and connected with amazing people in the process.",author:"Emma L.",role:"Hobbyist Creator"}],[c,u]=(0,n.useState)(0),g=(0,n.useCallback)((e=>(0,m.jsxs)(G,{children:[(0,m.jsxs)(I,{children:[(0,m.jsx)(N,{children:(e=>{switch(e){case"Action":return(0,m.jsx)(o.pBr,{});case"Puzzle":return(0,m.jsx)(o.yRn,{});case"Strategy":return(0,m.jsx)(o.oxP,{});case"Adventure":return(0,m.jsx)(o.f35,{});default:return(0,m.jsx)(o.uoG,{})}})(s[e-1])}),(0,m.jsx)(R,{children:s[e-1]})]}),(0,m.jsxs)(X,{children:[(0,m.jsxs)(O,{children:["Awesome Game ",e]}),(0,m.jsxs)(T,{children:["by Creator ",e]}),(0,m.jsxs)(E,{children:[(0,m.jsxs)(_,{children:[(0,m.jsx)(o.gt3,{"aria-hidden":"true"})," 4.",e," (1",e,"0 ratings)"]}),(0,m.jsxs)(B,{to:`/games/${e}`,children:[(0,m.jsx)(o.gSK,{"aria-hidden":"true"})," Play"]})]})]})]},e)),[s]);return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(h,{}),(0,m.jsxs)(p,{children:[(0,m.jsxs)(x,{ref:a,children:[(0,m.jsx)(y,{variants:{hidden:{opacity:0,scale:1.1},visible:{opacity:1,scale:1,transition:{duration:1.5,ease:"easeOut"}}},initial:"hidden",animate:"visible"}),(0,m.jsxs)(f,{variants:{hidden:{opacity:0,y:50},visible:{opacity:1,y:0,transition:{duration:.8,delay:.5}}},initial:"hidden",animate:"visible",children:[(0,m.jsx)($,{children:"Welcome to Naama Online"}),(0,m.jsx)(b,{children:"Create, Play, and Share Amazing Games in a Thriving Community"}),(0,m.jsxs)(j,{children:[(0,m.jsxs)(v,{to:"/register",primary:!0,children:["Get Started ",(0,m.jsx)(o.Z0P,{"aria-hidden":"true"})]}),(0,m.jsxs)(v,{to:"/games",children:["Explore Games ",(0,m.jsx)(o.gSK,{"aria-hidden":"true"})]})]})]}),(0,m.jsx)(w,{onClick:()=>{const e=document.getElementById("features");e&&e.scrollIntoView({behavior:"smooth"})},children:(0,m.jsx)(o.Z0P,{style:{transform:"rotate(90deg)"},"aria-hidden":"true"})})]}),(0,m.jsx)(ee,{children:(0,m.jsx)(A,{id:"features",children:(0,m.jsxs)(z,{children:[(0,m.jsx)(k,{children:"Why Choose Naama"}),(0,m.jsxs)(S,{children:[(0,m.jsxs)(P,{children:[(0,m.jsx)(L,{children:(0,m.jsx)(o.pBr,{"aria-hidden":"true"})}),(0,m.jsx)(C,{children:"Create Games"}),(0,m.jsx)(Y,{children:"Design and build your own games with our intuitive tools and powerful engine. Bring your ideas to life effortlessly."})]}),(0,m.jsxs)(P,{children:[(0,m.jsx)(L,{children:(0,m.jsx)(o.YXz,{"aria-hidden":"true"})}),(0,m.jsx)(C,{children:"Play Together"}),(0,m.jsx)(Y,{children:"Enjoy multiplayer games with friends, challenge players worldwide, and experience the thrill of competition."})]}),(0,m.jsxs)(P,{children:[(0,m.jsx)(L,{children:(0,m.jsx)(o.Zzu,{"aria-hidden":"true"})}),(0,m.jsx)(C,{children:"Share & Discover"}),(0,m.jsx)(Y,{children:"Showcase your creations to a global audience and explore a vast library of unique games made by the community."})]})]})]})})}),(0,m.jsx)(ee,{children:(0,m.jsx)(A,{alternate:!0,children:(0,m.jsxs)(z,{children:[(0,m.jsx)(k,{children:"Trending Games"}),(0,m.jsx)(W,{children:[1,2,3,4].map(g)})]})})}),(0,m.jsx)(ee,{children:(0,m.jsx)(D,{children:(0,m.jsxs)(z,{children:[(0,m.jsx)(k,{children:"What Our Users Say"}),(0,m.jsxs)(J,{children:[(0,m.jsx)(d.N,{initial:!1,custom:c,children:(0,m.jsxs)(M,{custom:c,variants:{enter:e=>({x:e>0?1e3:-1e3,opacity:0}),center:{zIndex:1,x:0,opacity:1},exit:e=>({zIndex:0,x:e<0?1e3:-1e3,opacity:0})},initial:"enter",animate:"center",exit:"exit",transition:{x:{type:"spring",stiffness:300,damping:30},opacity:{duration:.2}},children:[(0,m.jsx)(Z,{"aria-hidden":"true"}),(0,m.jsx)(q,{children:l[r].text}),(0,m.jsxs)(H,{children:[(0,m.jsx)(K,{children:(0,m.jsx)(o.x$1,{"aria-hidden":"true"})}),(0,m.jsxs)(U,{children:[(0,m.jsx)(F,{children:l[r].author}),(0,m.jsx)(V,{children:l[r].role})]})]})]},r)}),(0,m.jsx)(Q,{left:!0,onClick:()=>{u(-1),i((e=>(e-1+l.length)%l.length))},children:(0,m.jsx)(o._Jj,{"aria-hidden":"true"})}),(0,m.jsx)(Q,{right:!0,onClick:()=>{u(1),i((e=>(e+1)%l.length))},children:(0,m.jsx)(o.X6T,{"aria-hidden":"true"})})]})]})})})]})]})},re=n.memo(te)}}]);
//# sourceMappingURL=464.0db113a6.chunk.js.map