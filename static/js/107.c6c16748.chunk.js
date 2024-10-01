"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[107],{2107:(e,i,r)=>{r.r(i),r.d(i,{default:()=>w});var o=r(5043),t=r(5464),s=r(3204),n=r(579);const a=t.DU`
  body {
    background-color: ${e=>{let{theme:i}=e;return i.colors.background}};
    color: ${e=>{let{theme:i}=e;return i.colors.textPrimary}};
  }
`,m=t.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`,d=t.Ay.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${e=>{let{theme:i}=e;return i.colors.primary}};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`,p=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,c=t.Ay.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #166fe5;
  }
`,u=t.Ay.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`,l=t.Ay.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: #1c1e21;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`,h=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`,b=t.Ay.div`
  background-color: ${e=>{let{theme:i}=e;return i.colors.surfaceLight}};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: ${e=>{let{theme:i}=e;return i.boxShadow.medium}};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${e=>{let{theme:i}=e;return i.boxShadow.large}};
  }
`,g=t.Ay.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`,x=t.Ay.h3`
  color: ${e=>{let{theme:i}=e;return i.colors.textPrimary}};
  margin: 0 0 4px 0;
  font-size: 17px;
  font-weight: 600;
`,f=t.Ay.p`
  color: ${e=>{let{theme:i}=e;return i.colors.textSecondary}};
  margin: 0 0 12px 0;
  font-size: 13px;
`,y=t.Ay.span`
  font-size: 13px;
  color: #65676b;
  display: block;
  margin-bottom: 12px;
`,C=t.Ay.button`
  background-color: ${e=>{let{isMember:i}=e;return i?"#e4e6eb":"#1877f2"}};
  color: ${e=>{let{isMember:i}=e;return i?"#050505":"#ffffff"}};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;

  &:hover {
    background-color: ${e=>{let{isMember:i}=e;return i?"#d8dadf":"#166fe5"}};
  }
`,w=()=>{const[e,i]=(0,o.useState)([]),[r,t]=(0,o.useState)(""),w=(0,o.useCallback)((()=>[{id:1,name:"The Strategists",image:"https://picsum.photos/id/201/300/150",description:"A group for gamers to discuss their favorite strategy games.",memberCount:150,isMember:!1},{id:2,name:"Book Club",image:"https://picsum.photos/id/403/300/150",description:"Monthly book discussions and recommendations.",memberCount:75,isMember:!0},{id:3,name:"Fitness Motivation",image:"https://picsum.photos/id/390/300/150",description:"Share your fitness journey and motivate others.",memberCount:200,isMember:!1},{id:4,name:"Tech Innovators",image:"https://picsum.photos/id/180/300/150",description:"Discussing the latest in technology and innovation.",memberCount:120,isMember:!0},{id:5,name:"Cooking Enthusiasts",image:"https://picsum.photos/id/292/300/150",description:"Share recipes and cooking tips with fellow food lovers.",memberCount:180,isMember:!1},{id:6,name:"Travel Adventures",image:"https://picsum.photos/id/450/300/150",description:"Share travel stories and get tips for your next adventure.",memberCount:250,isMember:!1},{id:7,name:"Photography Club",image:"https://picsum.photos/id/250/300/150",description:"For photography enthusiasts to share their work and techniques.",memberCount:95,isMember:!0},{id:8,name:"Movie Buffs",image:"https://picsum.photos/id/310/300/150",description:"Discuss and review the latest films and classics.",memberCount:130,isMember:!1},{id:9,name:"Gardening Gurus",image:"https://picsum.photos/id/320/300/150",description:"Tips and tricks for growing beautiful gardens.",memberCount:80,isMember:!0},{id:10,name:"Pet Lovers",image:"https://picsum.photos/id/330/300/150",description:"A community for pet owners to share advice and cute pictures.",memberCount:220,isMember:!1},{id:11,name:"Startup Founders",image:"https://picsum.photos/id/340/300/150",description:"Network and share experiences with fellow entrepreneurs.",memberCount:65,isMember:!0},{id:12,name:"Yoga and Meditation",image:"https://picsum.photos/id/350/300/150",description:"Find inner peace and improve flexibility together.",memberCount:110,isMember:!1},{id:13,name:"DIY Crafters",image:"https://picsum.photos/id/360/300/150",description:"Share your DIY projects and get inspired by others.",memberCount:140,isMember:!0},{id:14,name:"Language Exchange",image:"https://picsum.photos/id/370/300/150",description:"Practice speaking new languages with native speakers.",memberCount:85,isMember:!1},{id:15,name:"Science Enthusiasts",image:"https://picsum.photos/id/380/300/150",description:"Discuss the latest scientific discoveries and theories.",memberCount:70,isMember:!0},{id:16,name:"Art Appreciation",image:"https://picsum.photos/id/390/300/150",description:"Explore and discuss various forms of art.",memberCount:100,isMember:!1},{id:17,name:"Sustainable Living",image:"https://picsum.photos/id/400/300/150",description:"Tips for living an eco-friendly lifestyle.",memberCount:90,isMember:!0},{id:18,name:"Music Makers",image:"https://picsum.photos/id/410/300/150",description:"Connect with fellow musicians and share your creations.",memberCount:160,isMember:!1},{id:19,name:"Home Brewers",image:"https://picsum.photos/id/420/300/150",description:"Share recipes and tips for brewing your own beer.",memberCount:55,isMember:!0},{id:20,name:"Mindfulness Practice",image:"https://picsum.photos/id/430/300/150",description:"Learn and share techniques for living mindfully.",memberCount:75,isMember:!1}]),[]);(0,o.useEffect)((()=>{i(w())}),[w]);const M=(0,o.useCallback)((e=>{i((i=>i.map((i=>i.id===e?{...i,isMember:!i.isMember,memberCount:i.isMember?i.memberCount-1:i.memberCount+1}:i))))}),[]),v=(0,o.useCallback)((()=>{console.log("Create new group")}),[]),k=(0,o.useMemo)((()=>e.filter((e=>e.name.toLowerCase().includes(r.toLowerCase())||e.description.toLowerCase().includes(r.toLowerCase())))),[e,r]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{}),(0,n.jsxs)(m,{children:[(0,n.jsxs)(d,{children:[(0,n.jsx)(s.YXz,{}),"Groups"]}),(0,n.jsxs)(p,{children:[(0,n.jsxs)(c,{onClick:v,children:[(0,n.jsx)(s.OiG,{})," Create New Group"]}),(0,n.jsxs)(u,{children:[(0,n.jsx)(s.KSO,{color:"#65676b"}),(0,n.jsx)(l,{type:"text",placeholder:"Search groups...",value:r,onChange:e=>t(e.target.value)})]})]}),(0,n.jsx)(h,{children:k.map((e=>(0,n.jsxs)(b,{children:[(0,n.jsx)(g,{src:e.image,alt:e.name}),(0,n.jsx)(x,{children:e.name}),(0,n.jsx)(f,{children:e.description}),(0,n.jsxs)(y,{children:[e.memberCount," members"]}),(0,n.jsx)(C,{onClick:()=>M(e.id),isMember:e.isMember,children:e.isMember?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.Dby,{})," Leave Group"]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.NPy,{})," Join Group"]})})]},e.id)))})]})]})}}}]);
//# sourceMappingURL=107.c6c16748.chunk.js.map