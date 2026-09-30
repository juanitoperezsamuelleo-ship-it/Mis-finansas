const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const OUT='/tmp/claude-0/-home-claude-mis-finansas/d01549d2-9f8a-527e-840b-1b466d08a66f/scratchpad/s4/';
require('fs').mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const errs=[];
for(const [look,th] of [['nb','dark'],['vt','light'],['lb','light'],['al','dark']]){
const ctx=await b.newContext({viewport:{width:390,height:844}});
await ctx.addInitScript(([look,th])=>localStorage.setItem('mf-data-v1',JSON.stringify({onboarded:true,plan:'custom',metaMensual:800000,perfil:{nombre:'Patrick',ingresoQuincena:2450000},cerditos:[{id:'p1',nombre:'Viaje',meta:3000000,inicial:0}],prefs:{look,theme:th}})),[look,th]);
const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
const click=async(re)=>{const dlg=(await p.$$('[role=dialog]')).length>0;for(const x of await p.$$(dlg?'[role=dialog] button':'button')){if(!(await x.isVisible()))continue;const t=(await x.innerText()).trim();const a=await x.getAttribute('aria-label');if(re.test(t)||(a&&re.test(a))){await x.click();await p.waitForTimeout(500);return true}}errs.push(look+' no '+re);return false};
await p.goto('http://localhost:8766/');await p.waitForTimeout(4200);
await click(/^Plan$/);await p.waitForTimeout(1000);await p.screenshot({path:OUT+look+'-1.png'});
await click(/Registrar ahorro/);await p.fill('#ed-monto','300000');await p.fill('#ed-nota','Quincena');await click(/^Guardar ahorro$/);
await p.fill('#ed-monto','150000');await click(/^Viaje$/);await click(/^Guardar ahorro$/);await p.screenshot({path:OUT+look+'-2.png'});
await click(/^Cerrar$/);await p.waitForTimeout(800);await p.screenshot({path:OUT+look+'-3.png'});
const t=await p.evaluate(()=>document.querySelector('.gen-save').innerText.replace(/\n/g,' | '));console.log(look,t);
await ctx.close();}
console.log(errs.join('\n')||'sin errores');await b.close();})();
