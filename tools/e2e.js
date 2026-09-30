const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const OUT='/tmp/claude-0/-home-claude/d01549d2-9f8a-527e-840b-1b466d08a66f/scratchpad/pwa/';
(async()=>{
  const b=await chromium.launch(); const errs=[];
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const p=await ctx.newPage(); p.on('pageerror',e=>errs.push('pageerror: '+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text().slice(0,300))});
  let n=0; const shot=async(name)=>{await p.screenshot({path:OUT+String(++n).padStart(2,'0')+'-'+name+'.png'})};
  const click=async(re)=>{const dlg=(await p.$$('[role=dialog]')).length>0 && !(await p.$('.sheet'));const sel=dlg?'[role=dialog] button, [role=dialog] label':'button, [role=button], label';for(const x of await p.$$(sel)){if(!(await x.isVisible()))continue;const t=(await x.innerText()).trim();const a=await x.getAttribute('aria-label');if(re.test(t)||(a&&re.test(a))){await x.click();await p.waitForTimeout(450);return true}}errs.push('no encontré '+re);return false};
  await p.goto('http://localhost:8766/'); await p.waitForTimeout(1200); await shot('splash');
  await p.waitForTimeout(3000); await shot('bienvenida');
  await p.fill('#ed-nombre','Patrick'); await p.fill('#ed-ingresoQuincena','2450000'); await shot('perfil-lleno');
  await click(/^Continuar$/); await p.waitForTimeout(400); await shot('nube');
  await click(/Usar sin nube/); await p.waitForTimeout(700); await shot('estilo');
  await click(/Cerrar/); await p.waitForTimeout(500); await shot('inicio-vacio');
  // ajustes -> tarjeta
  await click(/Cambiar apariencia/); await click(/^Tarjetas/);
  await p.fill('#ed-nombre','Visa Oro'); await p.fill('#ed-ult4','4821'); await p.fill('#ed-cupo','5000000'); await p.fill('#ed-usadoInicial','1200000'); await p.fill('#ed-corte','28'); await p.fill('#ed-pago','12');
  await click(/^Agregar tarjeta$/); await shot('tarjeta-creada');
  await click(/^Cerrar$/);
  await click(/Cambiar apariencia/); await click(/^Vehículos/);
  await p.fill('#ed-nombre','Mi moto'); await p.fill('#ed-km','11520'); await p.fill('#ed-aceiteKm','12000'); await p.fill('#ed-soat','2027-03-14');
  await click(/^Agregar vehículo$/); await click(/^Cerrar$/);
  await click(/Cambiar apariencia/); await click(/^Cerditos/);
  await p.fill('#ed-nombre','Viaje a Cartagena'); await p.fill('#ed-meta','3000000'); await p.fill('#ed-inicial','1350000');
  await click(/^Crear cerdito$/); await shot('cerdito'); await click(/^Cerrar$/);
  // gastos
  const add=async(cat,monto,nota)=>{ await click(/Agregar gasto/); await click(new RegExp('^'+cat+'$')); await p.fill('#nb-monto',monto); await p.fill('#nb-nota',nota); await click(/^Guardar$/); await p.waitForTimeout(300); };
  await add('Diario','18000','Almuerzo'); await add('Tarjeta','240000','Celular cuota'); await add('Vehículo','42000','Tanqueo'); await add('Hogar','306000','Servicios'); await add('Cerdito','100000','');
  await click(/Agregar gasto/); await shot('form-cerdito'); await click(/Cerrar/);
  await p.waitForTimeout(1300); await shot('inicio-datos');
  await p.evaluate(()=>document.querySelectorAll('div').forEach(d=>{if(getComputedStyle(d).overflowY==='auto'&&d.scrollHeight>d.clientHeight)d.scrollTop=600})); await p.waitForTimeout(400); await shot('inicio-abajo');
  await click(/^Gastos$/); await shot('gastos-todo');
  await click(/^Tarjetas$/); await p.waitForTimeout(700); await shot('gastos-tarjetas');
  await click(/^Vehículo$/); await p.waitForTimeout(700); await shot('gastos-vehiculo');
  await click(/^Todo$/); await p.waitForTimeout(500);
  const rows=await p.$$('[role=button]'); if(rows[0]){await rows[0].click(); await p.waitForTimeout(500); await shot('detalle');}
  await click(/Cerrar/);
  await click(/^Cerditos$/); await p.waitForTimeout(1000); await click(/50 mil/); await p.waitForTimeout(800); await shot('cerditos');
  await click(/^Plan$/); await p.waitForTimeout(1200); await shot('plan');
  await click(/Ver recomendaciones/); await p.waitForTimeout(2300); await shot('asistente');
  const txt = await p.evaluate(()=>[...document.querySelectorAll('.as-card')].map(x=>x.innerText.replace(/\n+/g,' | ')).join('\n'));
  console.log(txt);
  await click(/Cerrar/);
  // recargar: persistencia
  await p.reload(); await p.waitForTimeout(4500); await shot('tras-recargar');
  const ls = await p.evaluate(()=>JSON.parse(localStorage.getItem('mf-data-v1')));
  console.log('movs', ls.movs.length, 'tarjetas', ls.tarjetas.length, 'onboarded', ls.onboarded, 'nombre', ls.perfil.nombre);
  console.log(errs.join('\n')||'sin errores');
  await b.close();
})();
