import{D as c,aB as o,p as n,q as e,aU as r,bv as l,at as i}from"./index-e1d3010a.js";const u="/picture-search-2023-02/dist/assets/cry-dinasor-dc5c5d06.png",_={class:"h-screen flex flex-col justify-center items-center bg-slate-900"},p=e("img",{src:u,class:"w-2/5 md:w-auto",alt:""},null,-1),m=e("p",{class:"mt-10 text-white text-xl sm:text-2xl"},"抱歉，沒有找到您要的頁面",-1),d={class:"mt-20 text-white sm:text-xl"},w=c({__name:"404View",setup(x){const s=l(),t=o(5),a=setInterval(()=>{if(t.value>=1){t.value--;return}if(t.value===0){clearInterval(a),s.push({path:"/"});return}},1e3);return(h,f)=>(i(),n("div",_,[p,m,e("p",d,r(t.value)+" 秒後跳轉回首頁 ",1)]))}});export{w as default};
