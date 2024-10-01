"use strict";(self.webpackChunknaama_online1=self.webpackChunknaama_online1||[]).push([[846],{3846:(e,t,i)=>{i.r(t),i.d(t,{default:()=>y});var n=i(5043),o=i(5464),a=i(3204),s=i(579);const d=o.DU`
  body {
    background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
    color: ${e=>{let{theme:t}=e;return t.colors.textPrimary}};
  }
`,r=o.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`,c=o.Ay.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`,m=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,p=o.Ay.button`
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
`,l=o.Ay.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`,g=o.Ay.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: #1c1e21;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`,h=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`,u=o.Ay.div`
  background-color: ${e=>{let{theme:t}=e;return t.colors.surfaceLight}};
  border-radius: 8px;
  padding: 16px;
  box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.medium}};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${e=>{let{theme:t}=e;return t.boxShadow.large}};
  }
`,x=o.Ay.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`,f=o.Ay.h3`
  color: #1c1e21;
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`,b=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${e=>{let{theme:t}=e;return t.colors.textSecondary}};
  font-size: 14px;
  margin-bottom: 4px;
`,A=o.Ay.button`
  background-color: ${e=>{let{isAttending:t}=e;return t?"#e4e6eb":"#1877f2"}};
  color: ${e=>{let{isAttending:t}=e;return t?"#050505":"#ffffff"}};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  margin-top: 12px;

  &:hover {
    background-color: ${e=>{let{isAttending:t}=e;return t?"#d8dadf":"#166fe5"}};
  }
`,y=()=>{const[e,t]=(0,n.useState)([]),[i,o]=(0,n.useState)(""),y=(0,n.useCallback)((()=>[{id:1,name:"Summer Music Festival",image:"https://picsum.photos/id/158/300/150",date:"2023-07-15",time:"14:00",location:"Central Park",isAttending:!1},{id:2,name:"Tech Conference 2023",image:"https://picsum.photos/id/180/300/150",date:"2023-08-22",time:"09:00",location:"Convention Center",isAttending:!0},{id:3,name:"Charity Run",image:"https://picsum.photos/id/195/300/150",date:"2023-09-10",time:"07:30",location:"City Stadium",isAttending:!1},{id:4,name:"Art Exhibition Opening",image:"https://picsum.photos/id/200/300/150",date:"2023-07-20",time:"18:00",location:"Modern Art Museum",isAttending:!1},{id:5,name:"Food Truck Festival",image:"https://picsum.photos/id/225/300/150",date:"2023-08-05",time:"11:00",location:"Downtown Square",isAttending:!0},{id:6,name:"Yoga in the Park",image:"https://picsum.photos/id/240/300/150",date:"2023-07-22",time:"08:00",location:"Sunset Park",isAttending:!1},{id:7,name:"Film Festival",image:"https://picsum.photos/id/250/300/150",date:"2023-09-15",time:"19:00",location:"City Cinema",isAttending:!1},{id:8,name:"Business Networking Event",image:"https://picsum.photos/id/260/300/150",date:"2023-08-17",time:"18:30",location:"Grand Hotel",isAttending:!0},{id:9,name:"Craft Beer Tasting",image:"https://picsum.photos/id/270/300/150",date:"2023-07-29",time:"16:00",location:"Local Brewery",isAttending:!1},{id:10,name:"Farmers Market",image:"https://picsum.photos/id/280/300/150",date:"2023-08-12",time:"09:00",location:"Community Center",isAttending:!1},{id:11,name:"Book Club Meeting",image:"https://picsum.photos/id/290/300/150",date:"2023-07-25",time:"19:00",location:"Public Library",isAttending:!0},{id:12,name:"Jazz Night",image:"https://picsum.photos/id/300/300/150",date:"2023-08-19",time:"20:00",location:"Blue Note Club",isAttending:!1},{id:13,name:"Science Fair",image:"https://picsum.photos/id/310/300/150",date:"2023-09-05",time:"10:00",location:"Science Museum",isAttending:!1},{id:14,name:"Stand-up Comedy Show",image:"https://picsum.photos/id/320/300/150",date:"2023-08-26",time:"21:00",location:"Laugh Factory",isAttending:!0},{id:15,name:"Pet Adoption Day",image:"https://picsum.photos/id/330/300/150",date:"2023-07-30",time:"11:00",location:"City Park",isAttending:!1},{id:16,name:"Antique Car Show",image:"https://picsum.photos/id/340/300/150",date:"2023-08-13",time:"10:00",location:"Fairgrounds",isAttending:!1},{id:17,name:"Photography Workshop",image:"https://picsum.photos/id/350/300/150",date:"2023-09-02",time:"14:00",location:"Art Studio",isAttending:!0},{id:18,name:"Wine Tasting Event",image:"https://picsum.photos/id/360/300/150",date:"2023-08-11",time:"18:00",location:"Vineyard",isAttending:!1},{id:19,name:"Salsa Dancing Night",image:"https://picsum.photos/id/370/300/150",date:"2023-07-28",time:"20:00",location:"Dance Studio",isAttending:!1},{id:20,name:"Gardening Workshop",image:"https://picsum.photos/id/380/300/150",date:"2023-08-20",time:"09:00",location:"Botanical Garden",isAttending:!0}]),[]);(0,n.useEffect)((()=>{t(y())}),[y]);const C=(0,n.useCallback)((e=>{t((t=>t.map((t=>t.id===e?{...t,isAttending:!t.isAttending}:t))))}),[]),k=(0,n.useCallback)((()=>{console.log("Create new event")}),[]),w=(0,n.useMemo)((()=>e.filter((e=>e.name.toLowerCase().includes(i.toLowerCase())||e.location.toLowerCase().includes(i.toLowerCase())))),[e,i]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d,{}),(0,s.jsxs)(r,{children:[(0,s.jsxs)(c,{children:[(0,s.jsx)(a.bfZ,{}),"Events"]}),(0,s.jsxs)(m,{children:[(0,s.jsxs)(p,{onClick:k,children:[(0,s.jsx)(a.OiG,{})," Create New Event"]}),(0,s.jsxs)(l,{children:[(0,s.jsx)(a.KSO,{color:"#65676b"}),(0,s.jsx)(g,{type:"text",placeholder:"Search events...",value:i,onChange:e=>o(e.target.value)})]})]}),(0,s.jsx)(h,{children:w.map((e=>(0,s.jsxs)(u,{children:[(0,s.jsx)(x,{src:e.image,alt:e.name}),(0,s.jsx)(f,{children:e.name}),(0,s.jsxs)(b,{children:[(0,s.jsx)(a.bfZ,{})," ",e.date]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(a.w_X,{})," ",e.time]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(a.vq8,{})," ",e.location]}),(0,s.jsx)(A,{onClick:()=>C(e.id),isAttending:e.isAttending,children:e.isAttending?"Cancel Attendance":"Attend Event"})]},e.id)))})]})]})}}}]);
//# sourceMappingURL=846.fe8776e9.chunk.js.map