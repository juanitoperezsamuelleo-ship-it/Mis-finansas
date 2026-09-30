const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const OUT='/tmp/claude-0/-home-claude-mis-finansas/d01549d2-9f8a-527e-840b-1b466d08a66f/scratchpad/s3/';
require('fs').mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const errs=[];
for(const look of ['nb','al']){
const ctx=await b.newContext({viewport:{width:390,height:844}});
await ctx.addInitScript((look)=>localStorage.setItem('mf-data-v1',JSON.stringify({onboarded:true,perfil:{nombre:'Patrick',ingresoQuincena:2450000},cerditos:[{id:'p1',nombre:'Viaje a Cartagena',meta:3000000,inicial:1000000,fecha:'2026-12'}],prefs:{look,theme:'dark'}})),look);
const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
let n=0;const shot=async(nm)=>p.screenshot({path:OUT+look+'-'+String(++n).padStart(2,'0')+'-'+nm+'.png'});
const click=async(re)=>{const dlg=(await p.$$('[role=dialog]')).length>0;const sel=dlg?'[role=dialog] button':'button';for(const x of await p.$$(sel)){if(!(await x.isVisible()))continue;const t=(await x.innerText()).trim();const a=await x.getAttribute('aria-label');if(re.test(t)||(a&&re.test(a))){await x.click();await p.waitForTimeout(500);return true}}errs.push(look+' no encontré '+re);return false};
await p.goto('http://localhost:8766/');await p.waitForTimeout(4200);
await click(/^Cerditos$/);await p.waitForTimeout(900);await shot('cerditos');
await click(/^(Abonar|Abonar al cerdito)$/);await shot('hoja');
await p.fill('#pg-monto','175000');await p.fill('#pg-nota','Prima');await click(/^Abonar$/);await shot('abono');
await p.fill('#pg-monto','25000');await click(/^Retirar$/);
await p.fill('#pg-meta','3500000');await click(/^Guardar cambios$/);await shot('editado');
await click(/^Cerrar$/);await p.waitForTimeout(700);await shot('cerditos-2');
await click(/^Plan$/);await p.waitForTimeout(900);await click(/^Mi meta/);await shot('meta');
await p.fill('#ed-metaMensual','800000');await click(/^Guardar meta$/);await p.waitForTimeout(900);await shot('plan');
const d=await p.evaluate(()=>JSON.parse(localStorage.getItem('mf-data-v1')));
console.log(look,'meta cerdito',d.cerditos[0].meta,'aportes',d.movs.map(m=>m.monto),'plan',d.plan,d.metaMensual);
await ctx.close();}
console.log(errs.join('\n')||'sin errores');await b.close();})();
