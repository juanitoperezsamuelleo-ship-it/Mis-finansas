const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const OUT='/tmp/claude-0/-home-claude/d01549d2-9f8a-527e-840b-1b466d08a66f/scratchpad/pwa/';
const t=new Date(), iso=(d)=>d.toISOString().slice(0,10), day=(k)=>iso(new Date(Date.now()-k*864e5));
const data={v:1,updatedAt:1,onboarded:true,plan:'bal',perfil:{nombre:'Patrick',ingresoQuincena:2450000},
 tarjetas:[{id:'t1',nombre:'Visa Oro',ult4:'4821',cupo:5000000,usadoInicial:1600000,corte:28,pago:12},{id:'t2',nombre:'Mastercard',ult4:'0937',cupo:3000000,usadoInicial:500000,corte:5,pago:20}],
 vehiculos:[{id:'v1',nombre:'Mi moto',tipo:'moto',km:11520,aceiteKm:12000,aceiteCada:3000,soat:'2027-03-14'},{id:'v2',nombre:'El carro',tipo:'carro',km:48000,aceiteKm:50000,aceiteCada:5000,soat:'2026-10-10'}],
 cerditos:[{id:'p1',nombre:'Viaje a Cartagena',meta:3000000,inicial:1250000,fecha:'2026-12'},{id:'p2',nombre:'Fondo de emergencia',meta:6000000,inicial:2800000,fecha:''}],
 creditos:[{id:'c1',name:'Crédito de la moto',monto:8500000,tasa:24,tipo:'ea',plazo:36,inicio:'2025-03'}],
 movs:[['diario',18000,'Almuerzo',0],['diario',20000,'Bus',0],['tarjeta',240000,'Celular cuota',1,'t1'],['vehiculo',42000,'Tanqueo',1,null,'v1'],['hogar',306000,'Servicios',2],['diario',86400,'Mercado',3],['diario',32900,'Domicilio',4],['diario',150000,'Salida',17]].map((m,i)=>({id:'m'+i,fecha:day(m[3]),ts:Date.now()-m[3]*864e5,tipo:'gasto',cat:m[0],monto:m[1],nota:m[2],tarjetaId:m[4]||undefined,vehiculoId:m[5]||undefined}))
   .concat([{id:'a1',fecha:day(1),ts:Date.now()-864e5,tipo:'aporte',cat:'cerdito',monto:100000,nota:'',cerditoId:'p1'}]),
 prefs:{look:'nb',theme:'dark'}};
(async()=>{const b=await chromium.launch();const errs=[];
for(const look of ['nb','vt','lb','al'])for(const th of ['dark','light']){
 const ctx=await b.newContext({viewport:{width:360,height:780}});
 const d=JSON.parse(JSON.stringify(data)); d.prefs={look,theme:th};
 await ctx.addInitScript((d)=>localStorage.setItem('mf-data-v1',JSON.stringify(d)),d);
 const p=await ctx.newPage();p.on('pageerror',e=>errs.push(look+th+e.message));await p.goto('http://localhost:8766/');await p.waitForTimeout(4500);
 const tab=async(n)=>{for(const x of await p.$$('nav button')){const t=(await x.innerText()).trim();const a=await x.getAttribute('aria-label');if(new RegExp(n,'i').test(t)||(a&&new RegExp(n,'i').test(a))){await x.click();break}}await p.waitForTimeout(1300)};
 await p.screenshot({path:`${OUT}L-${look}-${th}-1.png`});
 await tab('^(Gastos)$');await p.screenshot({path:`${OUT}L-${look}-${th}-2.png`});
 await tab('^Cerditos$');await p.screenshot({path:`${OUT}L-${look}-${th}-3.png`});
 await tab('^Plan$');await p.evaluate(()=>document.querySelectorAll('div').forEach(d=>{if(getComputedStyle(d).overflowY==='auto'&&d.scrollHeight>d.clientHeight)d.scrollTop=700}));await p.waitForTimeout(500);await p.screenshot({path:`${OUT}L-${look}-${th}-4.png`});
 await ctx.close();}
console.log(errs.join('\n')||'sin errores');await b.close();})();
