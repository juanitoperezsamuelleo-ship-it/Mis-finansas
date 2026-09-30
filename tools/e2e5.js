const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const OUT='/tmp/claude-0/-home-claude-mis-finansas/d01549d2-9f8a-527e-840b-1b466d08a66f/scratchpad/s5/';
require('fs').mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const errs=[];
for(const [look,th] of [['nb','dark'],['vt','light'],['lb','light'],['al','dark']]){
const ctx=await b.newContext({viewport:{width:390,height:844}});
await ctx.addInitScript(([look,th])=>localStorage.setItem('mf-data-v1',JSON.stringify({onboarded:true,plan:'bal',perfil:{nombre:'Patrick',ingresoQuincena:2450000},creditos:[{id:'c1',name:'Moto',monto:8500000,tasa:24,tipo:'ea',plazo:36,inicio:'2025-10',cargos:25000}],prefs:{look,theme:th}})),[look,th]);
const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
const click=async(re)=>{const dlg=(await p.$$('[role=dialog]')).length>0;for(const x of await p.$$(dlg?'[role=dialog] button':'button')){if(!(await x.isVisible()))continue;const t=(await x.innerText()).trim();const a=await x.getAttribute('aria-label');if(re.test(t)||(a&&re.test(a))){await x.click();await p.waitForTimeout(500);return true}}errs.push(look+' no '+re);return false};
await p.goto('http://localhost:8766/');await p.waitForTimeout(4200);
await click(/^Plan$/);await p.waitForTimeout(1000);await p.screenshot({path:OUT+look+'-1.png'});
const card=(await p.$$('[role=button]')).find(Boolean);let ok=false;for(const x of await p.$$('[role=button]')){if((await x.innerText()).includes('toca para abonar')){await x.click();ok=true;break}} if(!ok)errs.push(look+' no card');
await p.waitForTimeout(700);await p.screenshot({path:OUT+look+'-2.png'});
await p.fill('#crv-monto','1000000');await p.waitForTimeout(300);await p.screenshot({path:OUT+look+'-3.png'});
await click(/^Abonar a capital$/);
console.log(look, await p.evaluate(()=>document.querySelector('[role=dialog] .ap-ok')?.innerText));
await click(/como gasto/);console.log(look, await p.evaluate(()=>[...document.querySelectorAll('[role=dialog] .ap-ok')].map(e=>e.innerText).join(' || ')));
await p.screenshot({path:OUT+look+'-4.png',fullPage:false});
await ctx.close();}
console.log(errs.join('\n')||'sin errores');await b.close();})();
