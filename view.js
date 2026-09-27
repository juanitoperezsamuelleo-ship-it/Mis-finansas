export default function view(v, html) {
  return html`<div class=${v.appCls}>
${(v.isNb) ? html`
<div class=${"nb " + (v.themeCls)} style="position: absolute; inset: 0; overflow: hidden; background: var(--bg); color: var(--fg); font-family: 'Manrope', sans-serif">
<div class="orb" style="width: 280px; height: 280px; left: -90px; top: -60px; background: var(--o1)"></div>
<div class="orb" style="width: 240px; height: 240px; right: -80px; top: 260px; background: var(--o2); animation-delay: -4s"></div>
<div class="orb" style="width: 260px; height: 260px; left: 40px; bottom: -120px; background: var(--o3); animation-delay: -8s"></div>

${(v.isInicio) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 16px">
  <div class="st" style="display: flex; align-items: center; justify-content: space-between">
    <div>
      <div style="font-size: 13px; color: rgba(var(--fgc),.6)">${v.fechaLarga}</div>
      <div style="font-family: 'Sora', sans-serif; font-size: 25px; font-weight: 600; margin-top: 2px">Hola, ${v.nombre}</div>
    </div>
    <button class="glass" onClick=${v.openLook} aria-label="Cambiar apariencia" style="color: var(--a1); width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.8-1.7H16a5 5 0 0 0 5-5c0-3.9-4-7.2-9-7.2z"></path><circle cx="7.5" cy="11" r="1.2" fill="currentColor"></circle><circle cx="10.5" cy="7.5" r="1.2" fill="currentColor"></circle><circle cx="15" cy="7.5" r="1.2" fill="currentColor"></circle></svg>
    </button>
  </div>

  <div class="seg glass st" style="animation-delay: 60ms">
    <div class="thumb" style=${"transform: " + (v.segX)}></div>
    ${((v.periods) || []).map((p, $index) => html`<button class=${p.cls} onClick=${p.pick}>${p.label}</button>`)}
  </div>

  <div class="glass st" style="border-radius: 30px; padding: 22px; animation-delay: 120ms">
    <div style="display: flex; justify-content: space-between; font-size: 13px; color: rgba(var(--fgc),.62)"><span>Gastado · ${v.per.label}</span><span>${v.per.range}</span></div>
    <div style="font-family: 'Sora', sans-serif; font-size: 44px; font-weight: 600; letter-spacing: -1.5px; margin-top: 8px">${v.shownTxt}</div>
    <div style="display: flex; gap: 8px; align-items: center; margin-top: 8px">
      <span style="padding: 5px 10px; border-radius: 999px; background: rgba(var(--a1c),.14); color: var(--a1); font-size: 12.5px; font-weight: 800">${v.deltaTxt}</span>
      <span style="font-size: 12.5px; color: rgba(var(--fgc),.6)">${v.per.vs}</span>
    </div>
    <div style="margin-top: 18px; height: 8px; border-radius: 99px; background: rgba(var(--wc),.08); overflow: hidden"><div class="fill" style=${"height: 100%; width: " + (v.usedPct) + "%; border-radius: 99px; background: linear-gradient(90deg,var(--a1),var(--a2))"}></div></div>
    <div style="display: flex; justify-content: space-between; margin-top: 9px; font-size: 12.5px; color: rgba(var(--fgc),.6)"><span>Ingreso ${v.ingresoTxt}</span><span>Disponible <b style="color: var(--strong)">${v.libreTxt}</b></span></div>
  </div>

  <button class="glass st" onClick=${v.openAsist} style="border-radius: 26px; padding: 16px; display: flex; gap: 14px; align-items: flex-start; text-align: left; animation-delay: 150ms">
  <span style="width: 42px; height: 42px; flex-shrink: 0; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: conic-gradient(from 200deg, var(--a1), var(--a2), var(--a3), var(--a1)); color: #06070c"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2l2 6.2L19.2 10 13 12l-2 6.2L9 12 2.8 10 9 8.2z"></path><path d="M19 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"></path></svg></span>
  <div style="flex: 1"><div style="font-size: 11.5px; font-weight: 800; color: var(--a1); letter-spacing: .8px">CONSEJO DEL DÍA</div><div style="font-size: 15px; font-weight: 700; margin-top: 3px; line-height: 1.3">${v.tip.title}</div><div style="font-size: 12.5px; color: rgba(var(--fgc),.65); margin-top: 4px; line-height: 1.4">${v.tip.impact}</div></div>
</button>
<div class="glass st" style="border-radius: 30px; padding: 18px; display: flex; gap: 16px; align-items: center; animation-delay: 180ms">
    <svg class="donut" width="128" height="128" viewBox="0 0 140 140">
      <g transform="rotate(-90 70 70)">
        <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(var(--wc),.07)" stroke-width="16"></circle>
        <circle class="sg" cx="70" cy="70" r="54" fill="none" stroke-width="16" stroke-dasharray=${v.donut.d0} stroke-dashoffset=${v.donut.o0} style="stroke: var(--a1)"></circle>
        <circle class="sg" cx="70" cy="70" r="54" fill="none" stroke-width="16" stroke-dasharray=${v.donut.d1} stroke-dashoffset=${v.donut.o1} style="stroke: var(--a2)"></circle>
        <circle class="sg" cx="70" cy="70" r="54" fill="none" stroke-width="16" stroke-dasharray=${v.donut.d2} stroke-dashoffset=${v.donut.o2} style="stroke: var(--a3)"></circle>
        <circle class="sg" cx="70" cy="70" r="54" fill="none" stroke-width="16" stroke-dasharray=${v.donut.d3} stroke-dashoffset=${v.donut.o3} style="stroke: var(--a4)"></circle>
      </g>
    </svg>
    <div style="flex: 1; display: flex; flex-direction: column; gap: 9px">
      ${((v.cats) || []).map((c, $index) => html`
        <div style="display: flex; align-items: center; gap: 8px; font-size: 13px">
          <span style=${"width: 9px; height: 9px; border-radius: 50%; background: " + (c.color) + "; box-shadow: 0 0 10px " + (c.color)}></span>
          <span style="flex: 1; color: rgba(var(--fgc),.8)">${c.name}</span>
          <b style="font-weight: 700">${c.pct}</b>
        </div>
      `)}
    </div>
  </div>

  <div class="st" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; animation-delay: 240ms">
    <button class="glass tile" onClick=${v.goTarjetas}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" style="stroke: var(--a2)"><rect x="3" y="5" width="18" height="14" rx="2.5"></rect><path d="M3 10h18M7 15h4"></path></svg>
      <span style="font-size: 12.5px; color: rgba(var(--fgc),.6); margin-top: 6px">Tarjetas · pago ${v.tarjPagoTxt}</span>
      <span style="font-family: 'Sora', sans-serif; font-size: 19px; font-weight: 600">${v.tarjTotalTxt}</span>
    </button>
    <button class="glass tile" onClick=${v.goVehiculo}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="stroke: var(--a3)"><circle cx="5.5" cy="16.5" r="3"></circle><circle cx="18.5" cy="16.5" r="3"></circle><path d="M5.5 16.5h6l3.5-7h3l.5 7M15 9.5l-2-3h-2.5"></path></svg>
      <span style="font-size: 12.5px; color: rgba(var(--fgc),.6); margin-top: 6px">${v.vehLbl} · ${v.per.label}</span>
      <span style="font-family: 'Sora', sans-serif; font-size: 19px; font-weight: 600">${v.vehTxt}</span>
    </button>
    <button class="glass tile" onClick=${v.goCerditos}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="stroke: var(--a1)"><path d="M19 11c0-3.3-3.1-6-7-6-1.3 0-2.5.3-3.5.8L6 4v3.3C4.8 8.3 4 9.6 4 11c0 1.9 1 3.6 2.6 4.6L7 19h3l.4-1.6c1 .2 2.2.2 3.2 0L14 19h3l.4-3.4c.6-.4 1.1-.9 1.5-1.4H21v-3z"></path></svg>
      <span style="font-size: 12.5px; color: rgba(var(--fgc),.6); margin-top: 6px">En ${v.pigCount} cerditos</span>
      <span style="font-family: 'Sora', sans-serif; font-size: 19px; font-weight: 600">${v.pigTotalTxt}</span>
    </button>
    <button class="glass tile" onClick=${v.goPlan}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke-width="1.8" style="stroke: var(--a4)"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1.5"></circle></svg>
      <span style="font-size: 12.5px; color: rgba(var(--fgc),.6); margin-top: 6px">Meta de ahorro ${v.mesCorto}</span>
      <span style="font-family: 'Sora', sans-serif; font-size: 19px; font-weight: 600">${v.septPct}%</span>
    </button>
  </div>

  <div class="glass st" style="border-radius: 30px; padding: 6px 18px 8px; animation-delay: 300ms">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0 4px"><b style="font-size: 15px">Recientes</b><button onClick=${v.goGastos} style="font-size: 13px; color: var(--a1); font-weight: 700; min-height: 44px">Ver todo</button></div>
    ${((v.recientes) || []).map((r, $index) => html`
      <div onClick=${r.open} tabindex="0" role="button" class="row">
        <span style="width: 40px; height: 40px; border-radius: 14px; background: rgba(var(--wc),.07); display: flex; align-items: center; justify-content: center"><span style=${"width: 10px; height: 10px; border-radius: 50%; background: " + (r.color) + "; box-shadow: 0 0 12px " + (r.color)}></span></span>
        <div style="flex: 1"><div style="font-size: 14.5px; font-weight: 600">${r.t}</div><div style="font-size: 12px; color: rgba(var(--fgc),.55)">${r.cat} · ${r.s}</div></div>
        <b style="font-size: 14.5px">${r.vTxt}</b>
      </div>
    `)}
  </div>
</div></div>
` : null}

${(v.isGastos) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 16px">
  <div class="st" style="font-family: 'Sora', sans-serif; font-size: 30px; font-weight: 600; letter-spacing: -.5px">Gastos</div>
  <div class="seg glass st" style="animation-delay: 60ms">
    <div class="thumb" style=${"transform: " + (v.subX)}></div>
    ${((v.subs) || []).map((p, $index) => html`<button class=${p.cls} onClick=${p.pick}>${p.label}</button>`)}
  </div>

  ${(v.isDiario) ? html`
  <div class="screen" style="display: flex; flex-direction: column; gap: 14px">
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px">
      <div class="glass st" style="border-radius: 24px; padding: 16px"><div style="font-size: 12.5px; color: rgba(var(--fgc),.6)">Hoy</div><div style="font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 600; margin-top: 4px">${v.hoyTxt}</div></div>
      <div class="glass st" style="border-radius: 24px; padding: 16px; animation-delay: 60ms"><div style="font-size: 12.5px; color: rgba(var(--fgc),.6)">Promedio diario</div><div style="font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 600; margin-top: 4px">${v.promTxt}</div></div>
    </div>
    <div class="glass" style="border-radius: 28px; padding: 4px 18px">
      ${((v.diario) || []).map((r, $index) => html`
        <div onClick=${r.open} tabindex="0" role="button" class="row st" style=${"animation-delay: " + (r.delay) + "ms"}>
          <span style="width: 40px; height: 40px; border-radius: 14px; background: rgba(var(--a1c),.12); display: flex; align-items: center; justify-content: center"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" style="stroke: var(--a1)"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"></path><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3"></path></svg></span>
          <div style="flex: 1"><div style="font-size: 14.5px; font-weight: 600">${r.t}</div><div style="font-size: 12px; color: rgba(var(--fgc),.55)">${r.s}</div></div>
          <b style="font-size: 14.5px">${r.vTxt}</b>
        </div>
      `)}
    </div>
  ${(v.noMovs) ? html`<div class="gen-empty">Aún no hay movimientos en este periodo. Toca + para registrar el primero.</div>` : null}</div>
  ` : null}

  ${(v.isTarjetas) ? html`
  <div class="screen" style="display: flex; flex-direction: column; gap: 14px">
    ${((v.tj) || []).map((t, $index) => html`
      <div class="cc glass st" style=${"animation-delay: " + (t.delay) + "ms; background: " + (t.bg)}>
        <div style="display: flex; justify-content: space-between; align-items: center"><b style="font-family: 'Sora', sans-serif; font-size: 17px">${t.name}</b><span style="font-size: 13px; letter-spacing: 2px; color: rgba(var(--wc),.75)">${t.last}</span></div>
        <div>
          <div style="font-size: 12px; color: rgba(var(--wc),.7)">Usado de ${t.cupoTxt}</div>
          <div style="font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 600; margin-top: 2px">${t.usedTxt}</div>
          <div style="height: 6px; border-radius: 9px; background: rgba(var(--wc),.18); margin-top: 10px; overflow: hidden"><div class="fill" style=${"height: 100%; width: " + (t.w) + "%; background: var(--strong); border-radius: 9px"}></div></div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 8px; color: rgba(var(--wc),.78)"><span>Corte ${t.corte}</span><span>Pago ${t.pago}</span></div>
        </div>
      </div>
    `)}
    <div class="glass" style="border-radius: 28px; padding: 4px 18px">
      <div style="padding: 14px 0 2px; font-weight: 700; font-size: 15px">Consumos recientes</div>
      ${((v.consumos) || []).map((r, $index) => html`
        <div onClick=${r.open} tabindex="0" role="button" class="row st" style=${"animation-delay: " + (r.delay) + "ms"}>
          <span style="width: 40px; height: 40px; border-radius: 14px; background: rgba(var(--a2c),.14); display: flex; align-items: center; justify-content: center"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" style="stroke: var(--a2)"><rect x="3" y="5" width="18" height="14" rx="2.5"></rect><path d="M3 10h18"></path></svg></span>
          <div style="flex: 1"><div style="font-size: 14.5px; font-weight: 600">${r.t}</div><div style="font-size: 12px; color: rgba(var(--fgc),.55)">${r.s}</div></div>
          <b style="font-size: 14.5px">${r.vTxt}</b>
        </div>
      `)}
    </div>
  <button onClick=${v.openTarjetas} class="gen-add" style="grid-column: 1 / -1">${v.tarjAddTxt}</button></div>
  ` : null}

  ${(v.isVehiculo) ? html`
  <div class="screen" style="display: flex; flex-direction: column; gap: 14px">${(v.noVeh) ? html`<button onClick=${v.openVehiculos} class="gen-add" style="grid-column: 1 / -1">+ Agrega tu moto o carro</button>` : null}${(v.vehMulti) ? html`<button onClick=${v.nextVeh} class="gen-add" style="grid-column: 1 / -1">Ver ${v.vehNext} ›</button>` : null}
    <div class="glass st" style="border-radius: 28px; padding: 20px; position: relative; overflow: hidden">
      <div style="display: flex; justify-content: space-between; align-items: flex-start">
        <div><div style="font-size: 12.5px; color: rgba(var(--fgc),.6)">${v.veh.nombre} · ${v.per.label}</div><div style="font-family: 'Sora', sans-serif; font-size: 30px; font-weight: 600; margin-top: 4px">${v.vehTxt}</div></div>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="stroke: var(--a3)"><circle cx="5.5" cy="16.5" r="3"></circle><circle cx="18.5" cy="16.5" r="3"></circle><path d="M5.5 16.5h6l3.5-7h3l.5 7M15 9.5l-2-3h-2.5"></path></svg>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 16px">
        <div><div style="font-size: 11.5px; color: rgba(var(--fgc),.55)">Kilometraje</div><b style="font-size: 15px">${v.veh.kmTxt}</b></div>
        <div><div style="font-size: 11.5px; color: rgba(var(--fgc),.55)">Movimientos</div><b style="font-size: 15px">${v.veh.movsTxt}</b></div>
        <div><div style="font-size: 11.5px; color: rgba(var(--fgc),.55)">Aceite a los</div><b style="font-size: 15px">${v.veh.aceiteAtTxt}</b></div>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px">
      <div class="glass st" style="border-radius: 22px; padding: 14px; animation-delay: 80ms; border-color: rgba(var(--a3c),.5)"><div style="font-size: 12px; color: var(--a3); font-weight: 700">Cambio de aceite</div><div style="font-size: 14px; margin-top: 4px">${v.veh.aceiteFaltaTxt}</div></div>
      <div class="glass st" style="border-radius: 22px; padding: 14px; animation-delay: 140ms"><div style="font-size: 12px; color: rgba(var(--fgc),.6); font-weight: 700">SOAT vence</div><div style="font-size: 14px; margin-top: 4px">${v.veh.soatTxt}</div></div>
    </div>
    <div class="glass" style="border-radius: 28px; padding: 4px 18px">
      ${((v.vehiculo) || []).map((r, $index) => html`
        <div onClick=${r.open} tabindex="0" role="button" class="row st" style=${"animation-delay: " + (r.delay) + "ms"}>
          <span style="width: 40px; height: 40px; border-radius: 14px; background: rgba(var(--a3c),.14); display: flex; align-items: center; justify-content: center"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="stroke: var(--a3)"><path d="M4 20V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15M3 20h12M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3M7 7h4"></path></svg></span>
          <div style="flex: 1"><div style="font-size: 14.5px; font-weight: 600">${r.t}</div><div style="font-size: 12px; color: rgba(var(--fgc),.55)">${r.s}</div></div>
          <b style="font-size: 14.5px">${r.vTxt}</b>
        </div>
      `)}
    </div>
  </div>
  ` : null}
</div></div>
` : null}

${(v.isCerditos) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 14px">
  <div class="st"><div style="font-family: 'Sora', sans-serif; font-size: 30px; font-weight: 600; letter-spacing: -.5px">Cerditos</div><div style="font-size: 14px; color: rgba(var(--fgc),.6); margin-top: 4px">Llevas <b style="color: var(--a1)">${v.pigTotalTxt}</b> guardados en total</div></div>
  ${((v.pigs) || []).map((g, $index) => html`
    <div class="glass st" style=${"border-radius: 28px; padding: 18px; animation-delay: " + (g.delay) + "ms"}>
      <div style="display: flex; justify-content: space-between; align-items: flex-start">
        <div><div style="font-size: 15.5px; font-weight: 700">${g.name}</div><div style="font-size: 12px; color: rgba(var(--fgc),.55); margin-top: 2px">Meta ${g.goal} · ${g.when}</div></div>
        <b style=${"font-family: 'Sora', sans-serif; font-size: 22px; color: " + (g.color)}>${g.pctTxt}</b>
      </div>
      <div style="height: 12px; border-radius: 99px; background: rgba(var(--wc),.07); margin-top: 14px; overflow: hidden"><div class="fill" style=${"height: 100%; width: " + (g.pct) + "%; border-radius: 99px; background: " + (g.color) + "; box-shadow: 0 0 16px " + (g.color)}></div></div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px">
        <span style="font-size: 13px; color: rgba(var(--fgc),.7)"><b style="color: var(--strong)">${g.amt}</b> · faltan ${g.faltan}</span>
        <button onClick=${g.open} class="chip">Abonar</button>
      </div>
    </div>
  `)}
  <button class="st" onClick=${v.newPig} style="height: 64px; border-radius: 26px; border: 1.5px dashed rgba(var(--wc),.28); color: rgba(var(--fgc),.75); font-weight: 700; animation-delay: 500ms">+ Nuevo cerdito</button>
</div></div>
` : null}

${(v.isPlan) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 14px">
  <div class="st" style="font-family: 'Sora', sans-serif; font-size: 30px; font-weight: 600; letter-spacing: -.5px">Plan de ahorro</div>
  <div class="st" style="display: flex; gap: 8px; animation-delay: 60ms">
    ${((v.plans) || []).map((o, $index) => html`
      <button class=${"glass plan " + (o.cls)} onClick=${o.pick}><div style="font-size: 14px; font-weight: 800">${o.n}</div><div style="font-size: 11px; color: rgba(var(--fgc),.6); margin-top: 3px">${o.d}</div></button>
    `)}
  </div>
  <div class="glass st" style="border-radius: 30px; padding: 20px; animation-delay: 120ms">
    <div style="font-size: 13px; color: rgba(var(--fgc),.6)">Ahorra cada mes</div>
    <div style="font-family: 'Sora', sans-serif; font-size: 38px; font-weight: 600; letter-spacing: -1px; margin-top: 4px">${v.metaTxt}</div>
    <div style="font-size: 13px; color: rgba(var(--fgc),.7); margin-top: 2px">${v.metaQTxt} por quincena</div>
    <div style="height: 10px; border-radius: 99px; background: rgba(var(--wc),.08); margin-top: 16px; overflow: hidden"><div class="fill" style=${"height: 100%; width: " + (v.septPct) + "%; border-radius: 99px; background: linear-gradient(90deg,var(--a1),var(--a2))"}></div></div>
    <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 12.5px; color: rgba(var(--fgc),.65)"><span>${v.mesNombre}: ${v.septTxt}</span><span>Faltan ${v.faltaSeptTxt}</span></div>
  </div>
  <div class="glass st" style="border-radius: 30px; padding: 20px; animation-delay: 180ms">
    <div style="display: flex; justify-content: space-between; align-items: baseline"><b style="font-size: 15px">${v.anio} mes a mes</b><span style="font-size: 12px; color: rgba(var(--fgc),.55)">línea = tu meta</span></div>
    <div style="position: relative; height: 124px; margin-top: 16px; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 6px; align-items: end">
      <div style=${"position: absolute; left: 0; right: 0; bottom: " + (v.goalH) + "px; border-top: 1.5px dashed rgba(var(--a4c),.8); transition: bottom .6s"}></div>
      ${((v.bars) || []).map((b, $index) => html`<div class=${b.cls} style=${"height: " + (b.h) + "px; animation-delay: " + (b.delay) + "ms; transition: height .6s cubic-bezier(.2,.8,.2,1)"}></div>`)}
    </div>
    <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 6px; margin-top: 8px; text-align: center; font-size: 10.5px; color: rgba(var(--fgc),.55)">${((v.bars) || []).map((b, $index) => html`<span>${b.m}</span>`)}</div>
    <div style="margin-top: 16px; padding: 14px; border-radius: 18px; background: rgba(var(--a1c),.1); font-size: 13.5px; line-height: 1.45">Con el plan <b>${v.plan.n}</b> cierras ${v.anio} con <b style="color: var(--a1)">${v.anualTxt}</b> ahorrados.</div>
  </div>
<div class="st" style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; animation-delay: 240ms"><div style="font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 600; letter-spacing: -.4px">Créditos</div><button class="chip" onClick=${v.openCred}>+ Agregar</button></div>
<div class="glass st" style="border-radius: 24px; padding: 16px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; animation-delay: 260ms">
  <div><div style="font-size: 11.5px; color: rgba(var(--fgc),.6)">Cuotas/mes</div><b style="font-size: 14.5px">${v.credCuotaTxt}</b></div>
  <div><div style="font-size: 11.5px; color: rgba(var(--fgc),.6)">Saldo total</div><b style="font-size: 14.5px">${v.credSaldoTxt}</b></div>
  <div><div style="font-size: 11.5px; color: rgba(var(--fgc),.6)">De tu ingreso</div><b style="font-size: 14.5px; color: var(--a1)">${v.credPctTxt}</b></div>
</div>
${((v.credits) || []).map((k, $index) => html`
  <div class="glass st" style=${"border-radius: 26px; padding: 18px; animation-delay: " + (k.delay) + "ms"}>
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px">
      <div><div style="font-size: 15.5px; font-weight: 700">${k.name}</div><div style="font-size: 12px; color: rgba(var(--fgc),.6); margin-top: 2px">${k.montoTxt} · ${k.tasaTxt} · ${k.plazoTxt}</div></div>
      <div style="text-align: right"><b style=${"font-family: 'Sora', sans-serif; font-size: 17px; color: " + (k.color)}>${k.cuotaTxt}</b><div style="font-size: 11px; color: rgba(var(--fgc),.6)">al mes</div></div>
    </div>
    <div style="height: 10px; border-radius: 99px; background: rgba(var(--wc),.08); margin-top: 14px; overflow: hidden"><div class="fill" style=${"height: 100%; width: " + (k.prog) + "%; border-radius: 99px; background: " + (k.color)}></div></div>
    <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 12.5px; color: rgba(var(--fgc),.72)"><span>${k.kTxt}</span><span>Saldo <b style="color: var(--strong)">${k.saldoTxt}</b></span></div>
    <div style="font-size: 12px; color: rgba(var(--fgc),.55); margin-top: 6px">Desde ${k.iniTxt} · termina ${k.endTxt} · intereses totales ${k.intTxt}</div>
  </div>
`)}
<button class="glass st" onClick=${v.openAsist} style="height: 58px; border-radius: 22px; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 800; color: var(--a1); animation-delay: 400ms"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2l2 6.2L19.2 10 13 12l-2 6.2L9 12 2.8 10 9 8.2z"></path><path d="M19 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"></path></svg> Ver recomendaciones</button>
</div></div>
` : null}

<nav class="tabbar glass">
  <div class="pill" style=${"transform: " + (v.pillX)}></div>
  <button class=${"tab " + (v.tb.inicio)} onClick=${v.goInicio}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"></path></svg>Inicio</button>
  <button class=${"tab " + (v.tb.gastos)} onClick=${v.goGastos}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"></path><path d="M9 8h6M9 12h6"></path></svg>Gastos</button>
  <div><button class="fab" onClick=${v.openSheet} aria-label="Agregar gasto"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"></path></svg></button></div>
  <button class=${"tab " + (v.tb.cerditos)} onClick=${v.goCerditos}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M19 11c0-3.3-3.1-6-7-6-1.3 0-2.5.3-3.5.8L6 4v3.3C4.8 8.3 4 9.6 4 11c0 1.9 1 3.6 2.6 4.6L7 19h3l.4-1.6c1 .2 2.2.2 3.2 0L14 19h3l.4-3.4c.6-.4 1.1-.9 1.5-1.4H21v-3z"></path></svg>Cerditos</button>
  <button class=${"tab " + (v.tb.plan)} onClick=${v.goPlan}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1.5"></circle></svg>Plan</button>
</nav>

${(v.sheetOn) ? html`
  <div class="scrim" onClick=${v.closeSheet}></div>
  <div class="sheet glass">
    <div style="width: 44px; height: 5px; border-radius: 9px; background: rgba(var(--wc),.3); margin: 0 auto 14px"></div>
    <div style="display: flex; justify-content: space-between; align-items: center"><b style="font-family: 'Sora', sans-serif; font-size: 20px">Nuevo movimiento</b><button onClick=${v.closeSheet} aria-label="Cerrar" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg></button></div>
    <label for="nb-monto" style="display: block; font-size: 12.5px; color: rgba(var(--fgc),.6); margin-top: 10px">Monto</label>
    <input id="nb-monto" value=${v.mv.monto} onInput=${v.mvMonto} inputmode="numeric" placeholder="$ 0" style="width: 100%; background: none; border: 0; outline: none; font-family: 'Sora', sans-serif; font-size: 40px; font-weight: 600; padding: 4px 0 10px; border-bottom: 1px solid rgba(var(--wc),.15)" />
    <div style="font-size: 12.5px; color: rgba(var(--fgc),.6); margin-top: 16px">Categoría</div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px">${((v.addCats) || []).map((a, $index) => html`<button class=${"chip " + (a.cls)} onClick=${a.pick}>${a.label}</button>`)}</div>${(v.mvHasTargets) ? html`<div style="font-size: 12.5px; opacity: .7; margin-top: 12px">${v.mvTargetLbl}</div><div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px">${((v.mvTargets) || []).map((a, $index) => html`<button class=${"chip " + (a.cls)} onClick=${a.pick}>${a.label}</button>`)}</div>` : null}${(v.mvHasErr) ? html`<div style="margin-top: 10px; font-size: 13px; font-weight: 700; color: #e5484d">${v.mvErr}</div>` : null}
    <label for="nb-nota" style="display: block; font-size: 12.5px; color: rgba(var(--fgc),.6); margin-top: 16px">Nota</label>
    <input id="nb-nota" value=${v.mv.nota} onInput=${v.mvNota} placeholder="Ej. almuerzo con el equipo" style="width: 100%; height: 48px; margin-top: 6px; padding: 0 16px; border-radius: 16px; background: rgba(var(--wc),.06); border: 1px solid rgba(var(--wc),.12); outline: none" />
    <button onClick=${v.save} style="width: 100%; height: 56px; margin-top: 20px; border-radius: 20px; background: var(--fg); color: var(--bg); font-weight: 800; font-size: 16px">Guardar</button>
  </div>
` : null}

${(v.toastOn) ? html`
  <div class="toast"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="stroke: var(--a1)"><path d="M5 12.5 10 17l9-10"></path></svg>Movimiento guardado</div>
` : null}

${(v.splashOn) ? html`
  <div class=${v.splashCls}>
    <div class="orb" style="width: 300px; height: 300px; left: 45px; top: 240px; background: var(--o1); opacity: .5"></div>
    <div style="position: relative; width: 130px; height: 130px">
      <div class="logoGlow" style="position: absolute; inset: 10px; border-radius: 50%; background: radial-gradient(circle, rgba(var(--a1c),.45), transparent 70%)"></div>
      <svg width="130" height="130" viewBox="0 0 110 110" style="position: absolute; inset: 0">
        <circle class="ring" cx="55" cy="55" r="48" fill="none" stroke-width="3" stroke-linecap="round" transform="rotate(-90 55 55)" style="stroke: var(--a1)"></circle>
        <circle class="ring2" cx="55" cy="55" r="31" fill="none" stroke-width="3" stroke-linecap="round" transform="rotate(90 55 55)" style="stroke: var(--a2)"></circle>
      </svg>
    </div>
    <div class="word" style="font-family: 'Sora', sans-serif; font-size: 44px; font-weight: 300; letter-spacing: 6px; position: relative">
      <span style="animation-delay: .55s">n</span><span style="animation-delay: .63s">i</span><span style="animation-delay: .71s">m</span><span style="animation-delay: .79s">b</span><span style="animation-delay: .87s">o</span>
    </div>
    <div class="tag" style="font-size: 14px; color: rgba(var(--fgc),.6); position: relative">Tu dinero, cada quincena, en claro</div>
  </div>
` : null}
</div>
` : null}
${(v.isVt) ? html`
<div class=${"vt " + (v.themeCls)} style="position: absolute; inset: 0; overflow: hidden; background: var(--bg); color: var(--fg); font-family: 'Archivo', sans-serif">

${(v.isInicio) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 12px">
  <div style="display: flex; justify-content: space-between; align-items: center">
    <div class="U" style="font-size: 20px; font-weight: 800; letter-spacing: -.5px">VOLT<span style="color: var(--limet)">.</span></div>
    <button onClick=${v.openLook} aria-label="Cambiar apariencia" style="width: 44px; height: 44px; border-radius: 14px; background: #d6ff3d; color: #0f0f0d; display: flex; align-items: center; justify-content: center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.8-1.7H16a5 5 0 0 0 5-5c0-3.9-4-7.2-9-7.2z"></path><circle cx="7.5" cy="11" r="1.2" fill="currentColor"></circle><circle cx="10.5" cy="7.5" r="1.2" fill="currentColor"></circle><circle cx="15" cy="7.5" r="1.2" fill="currentColor"></circle></svg></button>
  </div>
  <div class="per">
    ${((v.periods) || []).map((p, $index) => html`<button class=${p.cls} onClick=${p.pick}>${p.label}</button>`)}
  </div>
  <div class="pop" style="padding: 4px 2px 6px">
    <div style="font-size: 13px; font-weight: 700; color: var(--mut); text-transform: uppercase; letter-spacing: 1px">Gastado · ${v.per.label}</div>
    <div class="U" style="font-size: 38px; font-weight: 800; letter-spacing: -2px; margin-top: 6px">${v.shownTxt}</div>
    <div style="display: flex; gap: 10px; align-items: center; margin-top: 8px"><span style="background: #d6ff3d; color: #0f0f0d; font-weight: 800; font-size: 13px; padding: 4px 9px; border-radius: 8px">${v.deltaTxt}</span><span style="font-size: 13px; color: var(--mut)">${v.per.vs}</span></div>
  </div>
  <div class="pop" style="animation-delay: 60ms">
    <div class="stack">
      ${((v.cats) || []).map((c, $index) => html`<div style=${"flex-grow: " + (c.w) + "; background: " + (c.color)}></div>`)}
    </div>
    <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; margin-top: 10px">
      ${((v.cats) || []).map((c, $index) => html`<div><div style="display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--mut)"><span style=${"width: 8px; height: 8px; border-radius: 2px; background: " + (c.color)}></span>${c.name}</div><b style="font-size: 15px">${c.pct}</b></div>`)}
    </div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 6px">
    <div class="tile pop" style="grid-column: span 2; background: #d6ff3d; color: #0f0f0d; min-height: 136px; animation-delay: 120ms">
      <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: .8px"><span>Disponible</span><span>${v.usedPct}% usado</span></div>
      <div class="U" style="font-size: 32px; font-weight: 800; letter-spacing: -1.5px">${v.libreTxt}</div>
      <div style="height: 10px; border-radius: 6px; background: rgba(15,15,13,.16); overflow: hidden"><div class="fill" style=${"height: 100%; width: " + (v.usedPct) + "%; background: #0f0f0d; border-radius: 6px"}></div></div>
    </div>
    <button class="tile pop" onClick=${v.goTarjetas} style="background: var(--surf); border: 1px solid var(--line); animation-delay: 170ms">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="2.5"></rect><path d="M3 10h18M7 15h4"></path></svg>
      <div><div style="font-size: 12px; color: var(--mut); font-weight: 700">TARJETAS · ${v.tarjPagoUp}</div><div class="U" style="font-size: 18px; font-weight: 700; margin-top: 4px">${v.tarjTotalTxt}</div></div>
    </button>
    <button class="tile pop" onClick=${v.goVehiculo} style="background: #ff6b3d; color: #0f0f0d; animation-delay: 220ms">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0f0f0d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="16.5" r="3"></circle><circle cx="18.5" cy="16.5" r="3"></circle><path d="M5.5 16.5h6l3.5-7h3l.5 7M15 9.5l-2-3h-2.5"></path></svg>
      <div><div style="font-size: 12px; font-weight: 800">${v.vehUp}</div><div class="U" style="font-size: 18px; font-weight: 700; margin-top: 4px">${v.vehTxt}</div></div>
    </button>
    <button class="tile pop" onClick=${v.goCerditos} style="background: #7aa7ff; color: #0f0f0d; animation-delay: 270ms">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f0f0d" stroke-width="2" stroke-linejoin="round"><path d="M19 11c0-3.3-3.1-6-7-6-1.3 0-2.5.3-3.5.8L6 4v3.3C4.8 8.3 4 9.6 4 11c0 1.9 1 3.6 2.6 4.6L7 19h3l.4-1.6c1 .2 2.2.2 3.2 0L14 19h3l.4-3.4c.6-.4 1.1-.9 1.5-1.4H21v-3z"></path></svg>
      <div><div style="font-size: 12px; font-weight: 800">${v.pigCount} CERDITOS</div><div class="U" style="font-size: 18px; font-weight: 700; margin-top: 4px">${v.pigTotalTxt}</div></div>
    </button>
    <button class="tile pop" onClick=${v.goPlan} style="background: #e9e4d4; color: #0f0f0d; animation-delay: 320ms">
      <div class="U" style="font-size: 40px; font-weight: 800; letter-spacing: -2px; line-height: 1">${v.septPct}<span style="font-size: 20px">%</span></div>
      <div style="font-size: 12px; font-weight: 800">META DE AHORRO · SEP</div>
    </button>
  </div>

  <button class="pop" onClick=${v.openAsist} style="margin-top: 6px; border-radius: 26px; padding: 18px; background: var(--surf); border: 1px solid var(--line); text-align: left; display: flex; gap: 14px; animation-delay: 340ms">
  <span style="width: 46px; height: 46px; border-radius: 14px; background: #d6ff3d; color: #0f0f0d; display: flex; align-items: center; justify-content: center; flex-shrink: 0"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2l2 6.2L19.2 10 13 12l-2 6.2L9 12 2.8 10 9 8.2z"></path><path d="M19 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"></path></svg></span>
  <div><div style="font-size: 12px; font-weight: 800; color: var(--mut); letter-spacing: 1px">CONSEJO DEL DÍA</div><div style="font-weight: 800; font-size: 16px; margin-top: 4px; line-height: 1.25">${v.tip.title}</div><div style="font-size: 13px; color: var(--mut2); margin-top: 5px; line-height: 1.4">${v.tip.impact}</div></div>
</button>
<div class="pop" style="margin-top: 6px; animation-delay: 360ms">
    <div style="display: flex; justify-content: space-between; align-items: center"><b class="U" style="font-size: 15px">Recientes</b><button onClick=${v.goGastos} style="font-weight: 800; font-size: 13px; color: var(--limet); min-height: 44px">VER TODO →</button></div>
    ${((v.recientes) || []).map((r, $index) => html`
      <div onClick=${r.open} tabindex="0" role="button" class="row">
        <span style=${"width: 42px; height: 42px; border-radius: 13px; background: " + (r.color)}></span>
        <div style="flex: 1"><div style="font-weight: 700; font-size: 15px">${r.t}</div><div style="font-size: 12.5px; color: var(--mut)">${r.cat} · ${r.s}</div></div>
        <b class="U" style="font-size: 14px">${r.vTxt}</b>
      </div>
    `)}
  </div>
</div></div>
` : null}

${(v.isGastos) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 14px">
  <div class="U" style="font-size: 34px; font-weight: 800; letter-spacing: -1.5px">Gastos</div>
  <div class="subs">${((v.subs) || []).map((p, $index) => html`<button class=${p.cls} onClick=${p.pick}>${p.label}</button>`)}</div>

  ${(v.isDiario) ? html`
  <div class="screen" style="display: flex; flex-direction: column; gap: 10px">
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
      <div class="pop" style="border-radius: 22px; padding: 16px; background: #d6ff3d; color: #0f0f0d"><div style="font-size: 12px; font-weight: 800">HOY</div><div class="U" style="font-size: 22px; font-weight: 800; margin-top: 6px">${v.hoyTxt}</div></div>
      <div class="pop" style="border-radius: 22px; padding: 16px; background: var(--surf); border: 1px solid var(--line); animation-delay: 60ms"><div style="font-size: 12px; font-weight: 800; color: var(--mut)">PROMEDIO/DÍA</div><div class="U" style="font-size: 22px; font-weight: 800; margin-top: 6px">${v.promTxt}</div></div>
    </div>
    ${((v.diario) || []).map((r, $index) => html`
      <div onClick=${r.open} tabindex="0" role="button" class="row pop" style=${"animation-delay: " + (r.delay) + "ms"}>
        <span style="width: 42px; height: 42px; border-radius: 13px; background: var(--surf); border: 1px solid var(--line); display: flex; align-items: center; justify-content: center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d6ff3d" stroke-width="2" stroke-linecap="round"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"></path><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"></path></svg></span>
        <div style="flex: 1"><div style="font-weight: 700; font-size: 15px">${r.t}</div><div style="font-size: 12.5px; color: var(--mut)">${r.s}</div></div>
        <b class="U" style="font-size: 14px">${r.vTxt}</b>
      </div>
    `)}
  ${(v.noMovs) ? html`<div class="gen-empty">Aún no hay movimientos en este periodo. Toca + para registrar el primero.</div>` : null}</div>
  ` : null}

  ${(v.isTarjetas) ? html`
  <div class="screen" style="display: flex; flex-direction: column; gap: 10px">
    ${((v.tj) || []).map((t, $index) => html`
      <div class="pop" style=${"border-radius: 26px; padding: 20px; background: " + (t.solid) + "; color: #0f0f0d; animation-delay: " + (t.delay) + "ms"}>
        <div style="display: flex; justify-content: space-between; font-weight: 800"><span class="U" style="font-size: 16px">${t.name}</span><span style="letter-spacing: 2px">${t.last}</span></div>
        <div class="U" style="font-size: 30px; font-weight: 800; letter-spacing: -1.5px; margin-top: 22px">${t.usedTxt}</div>
        <div style="font-size: 12.5px; font-weight: 700; margin-top: 2px">usado de ${t.cupoTxt} · disponible ${t.dispTxt}</div>
        <div style="height: 10px; border-radius: 6px; background: rgba(15,15,13,.18); margin-top: 14px; overflow: hidden"><div class="fill" style=${"height: 100%; width: " + (t.w) + "%; background: #0f0f0d"}></div></div>
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 800; margin-top: 10px"><span>CORTE ${t.corte}</span><span>PAGO ${t.pago}</span></div>
      </div>
    `)}
    ${((v.consumos) || []).map((r, $index) => html`
      <div onClick=${r.open} tabindex="0" role="button" class="row pop" style=${"animation-delay: " + (r.delay) + "ms"}>
        <div style="flex: 1"><div style="font-weight: 700; font-size: 15px">${r.t}</div><div style="font-size: 12.5px; color: var(--mut)">${r.s}</div></div>
        <b class="U" style="font-size: 14px">${r.vTxt}</b>
      </div>
    `)}
  <button onClick=${v.openTarjetas} class="gen-add" style="grid-column: 1 / -1">${v.tarjAddTxt}</button></div>
  ` : null}

  ${(v.isVehiculo) ? html`
  <div class="screen" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">${(v.noVeh) ? html`<button onClick=${v.openVehiculos} class="gen-add" style="grid-column: 1 / -1">+ Agrega tu moto o carro</button>` : null}${(v.vehMulti) ? html`<button onClick=${v.nextVeh} class="gen-add" style="grid-column: 1 / -1">Ver ${v.vehNext} ›</button>` : null}
    <div class="pop" style="grid-column: span 2; border-radius: 26px; padding: 20px; background: #ff6b3d; color: #0f0f0d; display: flex; justify-content: space-between; align-items: flex-end">
      <div><div style="font-size: 12px; font-weight: 800">${v.veh.upper} · ${v.per.label}</div><div class="U" style="font-size: 30px; font-weight: 800; letter-spacing: -1.5px; margin-top: 6px">${v.vehTxt}</div></div>
      <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#0f0f0d" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="16.5" r="3"></circle><circle cx="18.5" cy="16.5" r="3"></circle><path d="M5.5 16.5h6l3.5-7h3l.5 7M15 9.5l-2-3h-2.5"></path></svg>
    </div>
    <div class="pop" style="border-radius: 22px; padding: 16px; background: var(--surf); border: 1px solid var(--line); animation-delay: 60ms"><div style="font-size: 12px; font-weight: 800; color: var(--mut)">KILOMETRAJE</div><div class="U" style="font-size: 20px; font-weight: 800; margin-top: 6px">${v.veh.kmNum}</div></div>
    <div class="pop" style="border-radius: 22px; padding: 16px; background: #d6ff3d; color: #0f0f0d; animation-delay: 110ms"><div style="font-size: 12px; font-weight: 800">ACEITE EN</div><div class="U" style="font-size: 20px; font-weight: 800; margin-top: 6px">${v.veh.faltaKmTxt}</div></div>
    <div style="grid-column: span 2">
      ${((v.vehiculo) || []).map((r, $index) => html`
        <div onClick=${r.open} tabindex="0" role="button" class="row pop" style=${"animation-delay: " + (r.delay) + "ms"}>
          <div style="flex: 1"><div style="font-weight: 700; font-size: 15px">${r.t}</div><div style="font-size: 12.5px; color: var(--mut)">${r.s}</div></div>
          <b class="U" style="font-size: 14px">${r.vTxt}</b>
        </div>
      `)}
    </div>
  </div>
  ` : null}
</div></div>
` : null}

${(v.isCerditos) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 14px">
  <div><div class="U" style="font-size: 34px; font-weight: 800; letter-spacing: -1.5px">Cerditos</div><div style="font-size: 14px; color: var(--mut); margin-top: 2px">Total guardado <b style="color: var(--limet)">${v.pigTotalTxt}</b></div></div>
  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
    ${((v.pigs) || []).map((g, $index) => html`
      <div class="pop" style=${"position: relative; height: 230px; border-radius: 26px; overflow: hidden; background: var(--surf); border: 1px solid var(--line); animation-delay: " + (g.delay) + "ms"}>
        <div class="vfill" style=${"height: " + (g.pct) + "%; background: " + (g.color)}></div>
        <div style="position: relative; height: 100%; padding: 16px; display: flex; flex-direction: column; justify-content: space-between">
          <div><div class="U" style="font-size: 30px; font-weight: 800; letter-spacing: -1.5px; mix-blend-mode: difference; color: #f3f2ea">${g.pctTxt}</div><div style="font-weight: 800; font-size: 14px; margin-top: 4px; mix-blend-mode: difference; color: #f3f2ea">${g.name}</div></div>
          <div>
            <div style="font-size: 12px; font-weight: 800; color: #0f0f0d; background: rgba(243,242,234,.92); display: inline-block; padding: 3px 7px; border-radius: 6px">${g.amt}</div>
            <button onClick=${g.open} style="margin-top: 8px; width: 100%; height: 44px; border-radius: 14px; background: #0f0f0d; color: #f3f2ea; font-weight: 800; font-size: 13.5px">ABONAR</button>
          </div>
        </div>
      </div>
    `)}
  </div>
  <button onClick=${v.newPig} style="height: 60px; border-radius: 20px; border: 2px dashed var(--line2); color: var(--mut); font-weight: 800">+ NUEVO CERDITO</button>
</div></div>
` : null}

${(v.isPlan) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 14px">
  <div class="U" style="font-size: 34px; font-weight: 800; letter-spacing: -1.5px; line-height: 1.05">Plan de<br />ahorro</div>
  <div style="display: flex; gap: 8px">${((v.plans) || []).map((o, $index) => html`<button class=${"plan " + (o.cls)} onClick=${o.pick}><div style="font-weight: 800; font-size: 14px">${o.n}</div><div style="font-size: 11px; margin-top: 3px; opacity: .75">${o.d}</div></button>`)}</div>
  <div class="pop" style="border-radius: 26px; padding: 20px; background: var(--surf); border: 1px solid var(--line)">
    <div style="font-size: 12px; font-weight: 800; color: var(--mut)">META MENSUAL</div>
    <div class="U" style="font-size: 34px; font-weight: 800; letter-spacing: -1.5px; margin-top: 4px; color: var(--limet)">${v.metaTxt}</div>
    <div style="font-size: 13px; color: var(--mut2)">${v.metaQTxt} cada quincena</div>
    <div style="position: relative; height: 128px; margin-top: 20px; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 5px; align-items: end">
      <div style=${"position: absolute; left: 0; right: 0; bottom: " + (v.goalH) + "px; border-top: 2px solid var(--fg); transition: bottom .6s"}></div>
      ${((v.bars) || []).map((b, $index) => html`<div class=${b.cls} style=${"height: " + (b.h) + "px; animation-delay: " + (b.delay) + "ms; transition: height .6s"}></div>`)}
    </div>
    <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 5px; margin-top: 8px; text-align: center; font-size: 11px; font-weight: 800; color: var(--mut3)">${((v.bars) || []).map((b, $index) => html`<span>${b.m}</span>`)}</div>
  </div>
  <div class="pop" style="border-radius: 26px; padding: 20px; background: #d6ff3d; color: #0f0f0d; animation-delay: 100ms">
    <div style="font-size: 12px; font-weight: 800">CIERRE ${v.anio} CON PLAN ${v.plan.n}</div>
    <div class="U" style="font-size: 30px; font-weight: 800; letter-spacing: -1.5px; margin-top: 6px">${v.anualTxt}</div>
    <div style="font-size: 13px; font-weight: 700; margin-top: 4px">${v.mesNombre} vas en ${v.septTxt} · faltan ${v.faltaSeptTxt}</div>
  </div>
<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px"><div class="U" style="font-size: 26px; font-weight: 800; letter-spacing: -1px">Créditos</div><button class="chip" onClick=${v.openCred}>+ AGREGAR</button></div>
<div class="pop" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px">
  <div style="border-radius: 18px; padding: 12px; background: #d6ff3d; color: #0f0f0d"><div style="font-size: 10.5px; font-weight: 800">CUOTAS/MES</div><div class="U" style="font-size: 13px; font-weight: 800; margin-top: 4px">${v.credCuotaTxt}</div></div>
  <div style="border-radius: 18px; padding: 12px; background: var(--surf); border: 1px solid var(--line)"><div style="font-size: 10.5px; font-weight: 800; color: var(--mut)">SALDO</div><div class="U" style="font-size: 13px; font-weight: 800; margin-top: 4px">${v.credSaldoTxt}</div></div>
  <div style="border-radius: 18px; padding: 12px; background: var(--surf); border: 1px solid var(--line)"><div style="font-size: 10.5px; font-weight: 800; color: var(--mut)">DEL INGRESO</div><div class="U" style="font-size: 13px; font-weight: 800; margin-top: 4px">${v.credPctTxt}</div></div>
</div>
${((v.credits) || []).map((k, $index) => html`
  <div class="pop" style=${"border-radius: 26px; padding: 18px; background: var(--surf); border: 1px solid var(--line); animation-delay: " + (k.delay) + "ms"}>
    <div style="display: flex; justify-content: space-between; align-items: center"><span style="font-weight: 800; font-size: 15px">${k.name}</span><span style=${"font-size: 11.5px; font-weight: 800; padding: 4px 8px; border-radius: 8px; background: " + (k.color) + "; color: #0f0f0d"}>${k.tasaTxt}</span></div>
    <div class="U" style="font-size: 26px; font-weight: 800; letter-spacing: -1px; margin-top: 12px">${k.cuotaTxt}<span style="font-size: 12px; letter-spacing: 0; color: var(--mut)"> /MES</span></div>
    <div style="display: flex; gap: 3px; margin-top: 12px; height: 12px"><div style=${"flex-grow: " + (k.prog) + "; background: " + (k.color) + "; border-radius: 4px"}></div><div style="flex-grow: 100; background: var(--line); border-radius: 4px"></div></div>
    <div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 700; margin-top: 8px; color: var(--mut2)"><span>${k.kTxt}</span><span>SALDO ${k.saldoTxt}</span></div>
    <div style="font-size: 12px; color: var(--mut); margin-top: 4px">${k.montoTxt} · desde ${k.iniTxt} · termina ${k.endTxt}</div>
  </div>
`)}
<button onClick=${v.openAsist} style="height: 60px; border-radius: 20px; background: #d6ff3d; color: #0f0f0d; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2l2 6.2L19.2 10 13 12l-2 6.2L9 12 2.8 10 9 8.2z"></path><path d="M19 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"></path></svg> VER RECOMENDACIONES</button>
</div></div>
` : null}

<nav class="dock">
  <button class=${"tab " + (v.tb.inicio)} onClick=${v.goInicio} aria-label="Inicio"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"></path></svg><span class="lbl">Inicio</span></button>
  <button class=${"tab " + (v.tb.gastos)} onClick=${v.goGastos} aria-label="Gastos"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"></path><path d="M9 8h6M9 12h6"></path></svg><span class="lbl">Gastos</span></button>
  <button class=${"tab " + (v.tb.cerditos)} onClick=${v.goCerditos} aria-label="Cerditos"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M19 11c0-3.3-3.1-6-7-6-1.3 0-2.5.3-3.5.8L6 4v3.3C4.8 8.3 4 9.6 4 11c0 1.9 1 3.6 2.6 4.6L7 19h3l.4-1.6c1 .2 2.2.2 3.2 0L14 19h3l.4-3.4c.6-.4 1.1-.9 1.5-1.4H21v-3z"></path></svg><span class="lbl">Cerditos</span></button>
  <button class=${"tab " + (v.tb.plan)} onClick=${v.goPlan} aria-label="Plan"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1.5"></circle></svg><span class="lbl">Plan</span></button>
</nav>
<button class="fab" onClick=${v.openSheet} aria-label="Agregar gasto"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"></path></svg></button>

${(v.sheetOn) ? html`
  <div class="scrim" onClick=${v.closeSheet}></div>
  <div class="sheet">
    <div style="display: flex; justify-content: space-between; align-items: center"><b class="U" style="font-size: 20px">Nuevo gasto</b><button onClick=${v.closeSheet} aria-label="Cerrar" style="width: 44px; height: 44px; border-radius: 14px; background: var(--line); display: flex; align-items: center; justify-content: center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg></button></div>
    <label for="vt-monto" style="display: block; font-size: 12px; font-weight: 800; color: var(--mut); margin-top: 14px">MONTO</label>
    <input id="vt-monto" value=${v.mv.monto} onInput=${v.mvMonto} inputmode="numeric" placeholder="$ 0" class="U" style="width: 100%; background: none; border: 0; outline: none; font-size: 40px; font-weight: 800; letter-spacing: -1.5px; padding: 4px 0 8px; border-bottom: 2px solid #d6ff3d" />
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px">${((v.addCats) || []).map((a, $index) => html`<button class=${"chip " + (a.cls)} onClick=${a.pick}>${a.label}</button>`)}</div>${(v.mvHasTargets) ? html`<div style="font-size: 12.5px; opacity: .7; margin-top: 12px">${v.mvTargetLbl}</div><div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px">${((v.mvTargets) || []).map((a, $index) => html`<button class=${"chip " + (a.cls)} onClick=${a.pick}>${a.label}</button>`)}</div>` : null}${(v.mvHasErr) ? html`<div style="margin-top: 10px; font-size: 13px; font-weight: 700; color: #e5484d">${v.mvErr}</div>` : null}
    <label for="vt-nota" style="display: block; font-size: 12px; font-weight: 800; color: var(--mut); margin-top: 16px">NOTA</label>
    <input id="vt-nota" value=${v.mv.nota} onInput=${v.mvNota} placeholder="Ej. almuerzo" style="width: 100%; height: 50px; margin-top: 6px; padding: 0 16px; border-radius: 16px; background: var(--bg); border: 1px solid var(--line); outline: none" />
    <button onClick=${v.save} style="width: 100%; height: 58px; margin-top: 18px; border-radius: 18px; background: #d6ff3d; color: #0f0f0d; font-weight: 800; font-size: 16px">GUARDAR</button>
  </div>
` : null}

${(v.toastOn) ? html`
  <div class="toast"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17l9-10"></path></svg>GUARDADO</div>
` : null}

${(v.splashOn) ? html`
  <div class=${v.splashCls}>
    <div style="font-weight: 800; font-size: 13px; letter-spacing: 2px">FINANZAS PERSONALES · ${v.anio}</div>
    <div class="U" style="font-weight: 800">
      <span class="mask" style="font-size: 104px; letter-spacing: -6px"><span style="animation-delay: .1s">VOLT</span></span>
      <span class="mask" style="font-size: 38px; letter-spacing: -2px; margin-top: 14px; line-height: 1.05"><span style="animation-delay: .25s">tu plata,</span></span>
      <span class="mask" style="font-size: 38px; letter-spacing: -2px; line-height: 1.05"><span style="animation-delay: .4s">sin rodeos.</span></span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 18px">
      <div class="marq"><div class="U" style="font-size: 16px; font-weight: 700">QUINCENA · MES · AÑO · CERDITOS · TARJETAS · MOTO · AHORRO · QUINCENA · MES · AÑO · CERDITOS · TARJETAS · MOTO · AHORRO · </div></div>
      <div class="load"><div></div></div>
    </div>
  </div>
` : null}
</div>
` : null}
${(v.isLb) ? html`
<div class=${"lb " + (v.themeCls)} style="position: absolute; inset: 0; overflow: hidden; background: var(--paper); color: var(--ink); font-family: 'Instrument Sans', sans-serif">

${(v.isInicio) ? html`
<div class="scroll"><div class="screen">
  <div style="display: flex; justify-content: space-between; align-items: center">
    <div class="F" style="font-size: 28px; font-weight: 700; letter-spacing: -.5px">La Libreta</div>
    <button onClick=${v.openLook} aria-label="Cambiar apariencia" style="width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid var(--ink); display: flex; align-items: center; justify-content: center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.8-1.7H16a5 5 0 0 0 5-5c0-3.9-4-7.2-9-7.2z"></path><circle cx="7.5" cy="11" r="1.2" fill="currentColor"></circle><circle cx="10.5" cy="7.5" r="1.2" fill="currentColor"></circle><circle cx="15" cy="7.5" r="1.2" fill="currentColor"></circle></svg></button>
  </div>
  <div style="display: flex; justify-content: space-between; font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mut); border-top: 1.5px solid var(--ink); border-bottom: 1px solid var(--ink); padding: 6px 0; margin-top: 8px"><span>${v.fechaCorta}</span><span>Edición n.º ${v.edicion}</span></div>

  <div class="tabs" style="margin-top: 12px">
    <div class="uline" style=${"transform: translateX(" + (v.uX) + "px); width: " + (v.uW) + "px"}></div>
    ${((v.periods) || []).map((p, $index) => html`<button class=${p.cls} onClick=${p.pick} style=${"width: " + (p.w) + "px; text-align: center"}>${p.label}</button>`)}
  </div>

  <h1 class="F fu" style="font-size: 31px; line-height: 1.12; font-weight: 300; letter-spacing: -.6px; margin: 18px 0 0">Llevas <em style="color: var(--t1); font-weight: 500">${v.shownTxt}</em> gastados ${v.per.lead}.</h1>
  <p class="fu" style="font-size: 15px; line-height: 1.5; color: var(--body); margin: 10px 0 0; animation-delay: 120ms">Es un <b>${v.deltaWord}</b> ${v.per.vsLong}. Te quedan <b>${v.libreTxt}</b> de ${v.ingresoTxt} que entraron.</p>

  <button class="fu" onClick=${v.openAsist} style="display: block; width: 100%; margin-top: 18px; padding: 14px 16px; background: var(--card); border: 1.5px solid var(--ink); animation-delay: 160ms">
  <div style="display: flex; justify-content: space-between; font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--t1); font-weight: 700"><span>Nota del asistente</span><span>Leer todas →</span></div>
  <div class="F" style="font-size: 19px; line-height: 1.3; margin-top: 6px">${v.tip.title}</div>
  <div style="font-size: 13.5px; color: var(--body); margin-top: 4px; line-height: 1.45; font-style: italic">${v.tip.impact}</div>
</button>
<div class="fu" style="margin-top: 22px; animation-delay: 200ms">
    <div style="font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mut); padding-bottom: 6px; border-bottom: 1.5px solid var(--ink)">En qué se fue</div>
    ${((v.cats) || []).map((c, $index) => html`
      <div class="trow">
        <span class="F" style="font-size: 16px">${c.name}</span>
        <div class="thin"><div class="fill" style=${"height: 100%; width: " + (c.w) + "%; background: " + (c.color)}></div></div>
        <span style="text-align: right; font-variant-numeric: tabular-nums">${c.val}</span>
        <span style="text-align: right; color: var(--mut); font-size: 12.5px">${c.pct}</span>
      </div>
    `)}
  </div>

  <div class="fu" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0; margin-top: 22px; animation-delay: 280ms">
    <button onClick=${v.goTarjetas} style="padding: 0 14px 0 0; border-right: 1px solid var(--r1)">
      <div style="font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--t1); font-weight: 700">Tarjetas</div>
      <div class="F" style="font-size: 22px; font-weight: 500; margin-top: 6px">${v.tarjTotalTxt}</div>
      <div style="font-size: 13px; line-height: 1.45; color: var(--body); margin-top: 4px">en tus tarjetas. Próximo pago: ${v.tarjPagoTxt} →</div>
    </button>
    <button onClick=${v.goVehiculo} style="padding: 0 0 0 14px">
      <div style="font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--t2); font-weight: 700">${v.vehLbl}</div>
      <div class="F" style="font-size: 22px; font-weight: 500; margin-top: 6px">${v.vehTxt}</div>
      <div style="font-size: 13px; line-height: 1.45; color: var(--body); margin-top: 4px">Cambio de aceite ${v.veh.aceiteFaltaTxt} →</div>
    </button>
  </div>

  <button class="fu" onClick=${v.goPlan} style="display: block; width: 100%; margin-top: 24px; padding: 18px 0; border-top: 1.5px solid var(--ink); border-bottom: 1.5px solid var(--ink); animation-delay: 340ms">
    <div class="F" style="font-size: 23px; font-style: italic; font-weight: 300; line-height: 1.25">“Vas en el <span style="color: var(--t1); font-weight: 500">${v.septPct}%</span> de tu meta de ahorro de ${v.mesLower} y tienes ${v.pigTotalTxt} en tus cerditos.”</div>
  </button>

  <div class="fu" style="margin-top: 22px; animation-delay: 400ms">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid var(--ink); padding-bottom: 2px"><span style="font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mut)">Últimos apuntes</span><button onClick=${v.goGastos} style="font-size: 13px; font-weight: 700; min-height: 40px; text-decoration: underline">Ver libreta</button></div>
    ${((v.recientes) || []).map((r, $index) => html`
      <div onClick=${r.open} tabindex="0" role="button" class="led"><span class="F">${r.t}</span><span style="font-size: 12px; color: var(--mut)">${r.cat}</span><span class="dots"></span><b style="font-variant-numeric: tabular-nums">${r.vTxt}</b></div>
    `)}
  </div>
</div></div>
` : null}

${(v.isGastos) ? html`
<div class="scroll"><div class="screen">
  <div style="font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mut)">Sección</div>
  <h1 class="F" style="font-size: 40px; font-weight: 300; letter-spacing: -1px; margin: 2px 0 0">Los <em style="font-weight: 500">gastos</em></h1>
  <div class="tabs" style="margin-top: 10px">
    <div class="uline" style=${"transform: translateX(" + (v.sX) + "px); width: " + (v.sW) + "px"}></div>
    ${((v.subs) || []).map((p, $index) => html`<button class=${p.cls} onClick=${p.pick} style=${"width: " + (p.w) + "px; text-align: center"}>${p.label}</button>`)}
  </div>

  ${(v.isDiario) ? html`
  <div class="screen" style="margin-top: 16px">
    <p class="F" style="font-size: 20px; font-weight: 300; line-height: 1.35; margin: 0">Hoy van <em style="color: var(--t1); font-weight: 500">${v.hoyTxt}</em>; tu promedio diario es ${v.promTxt}.</p>
    <div style="margin-top: 14px; border-top: 1.5px solid var(--ink)">
      ${((v.diario) || []).map((r, $index) => html`
        <div onClick=${r.open} tabindex="0" role="button" class="led fu" style=${"border-bottom: 1px solid var(--r2); animation-delay: " + (r.delay) + "ms"}><div><div class="F" style="font-size: 16px">${r.t}</div><div style="font-size: 12px; color: var(--mut)">${r.s}</div></div><span class="dots"></span><b style="font-variant-numeric: tabular-nums">${r.vTxt}</b></div>
      `)}
    </div>
  ${(v.noMovs) ? html`<div class="gen-empty">Aún no hay movimientos en este periodo. Toca + para registrar el primero.</div>` : null}</div>
  ` : null}

  ${(v.isTarjetas) ? html`
  <div class="screen" style="margin-top: 16px; display: flex; flex-direction: column; gap: 14px">
    ${((v.tj) || []).map((t, $index) => html`
      <div class="fu" style=${"border: 1.5px solid var(--ink); padding: 16px; background: var(--card); animation-delay: " + (t.delay) + "ms"}>
        <div style="display: flex; justify-content: space-between; align-items: baseline"><span class="F" style="font-size: 20px; font-weight: 500">${t.name}</span><span style="font-size: 13px; color: var(--mut); letter-spacing: 1.5px">${t.last}</span></div>
        <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 10px"><span class="F" style="font-size: 30px; font-weight: 300">${t.usedTxt}</span><span style="font-size: 13px; color: var(--mut)">de ${t.cupoTxt}</span></div>
        <div class="thin" style="margin-top: 10px"><div class="fill" style=${"height: 100%; width: " + (t.w) + "%; background: var(--t1)"}></div></div>
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; color: var(--body); margin-top: 8px"><span>Corte: ${t.corte}</span><span>Pago: <b>${t.pago}</b></span></div>
      </div>
    `)}
    <div style="border-top: 1.5px solid var(--ink)">
      ${((v.consumos) || []).map((r, $index) => html`
        <div onClick=${r.open} tabindex="0" role="button" class="led" style="border-bottom: 1px solid var(--r2)"><div><div class="F" style="font-size: 16px">${r.t}</div><div style="font-size: 12px; color: var(--mut)">${r.s}</div></div><span class="dots"></span><b style="font-variant-numeric: tabular-nums">${r.vTxt}</b></div>
      `)}
    </div>
  <button onClick=${v.openTarjetas} class="gen-add" style="grid-column: 1 / -1">${v.tarjAddTxt}</button></div>
  ` : null}

  ${(v.isVehiculo) ? html`
  <div class="screen" style="margin-top: 16px">${(v.noVeh) ? html`<button onClick=${v.openVehiculos} class="gen-add" style="grid-column: 1 / -1">+ Agrega tu moto o carro</button>` : null}${(v.vehMulti) ? html`<button onClick=${v.nextVeh} class="gen-add" style="grid-column: 1 / -1">Ver ${v.vehNext} ›</button>` : null}
    <p class="F" style="font-size: 20px; font-weight: 300; line-height: 1.35; margin: 0">${v.veh.nombre} te ha costado <em style="color: var(--t2); font-weight: 500">${v.vehTxt}</em> ${v.per.lead}. Va en <b style="font-weight: 500">${v.veh.kmTxt}</b>.</p>
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 16px; border-top: 1.5px solid var(--ink); border-bottom: 1.5px solid var(--ink)">
      <div style="padding: 12px 12px 12px 0; border-right: 1px solid var(--r1)"><div style="font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--t1); font-weight: 700">Pendiente</div><div class="F" style="font-size: 17px; margin-top: 4px">Aceite ${v.veh.aceiteFaltaTxt}</div></div>
      <div style="padding: 12px 0 12px 12px"><div style="font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mut); font-weight: 700">SOAT</div><div class="F" style="font-size: 17px; margin-top: 4px">Vence ${v.veh.soatTxt}</div></div>
    </div>
    ${((v.vehiculo) || []).map((r, $index) => html`
      <div onClick=${r.open} tabindex="0" role="button" class="led fu" style=${"border-bottom: 1px solid var(--r2); animation-delay: " + (r.delay) + "ms"}><div><div class="F" style="font-size: 16px">${r.t}</div><div style="font-size: 12px; color: var(--mut)">${r.s}</div></div><span class="dots"></span><b style="font-variant-numeric: tabular-nums">${r.vTxt}</b></div>
    `)}
  </div>
  ` : null}
</div></div>
` : null}

${(v.isCerditos) ? html`
<div class="scroll"><div class="screen">
  <div style="font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mut)">Sección</div>
  <h1 class="F" style="font-size: 40px; font-weight: 300; letter-spacing: -1px; margin: 2px 0 0">Los <em style="font-weight: 500">cerditos</em></h1>
  <p class="F" style="font-size: 19px; font-weight: 300; line-height: 1.35; margin: 8px 0 0">Entre los cuatro guardan <em style="color: var(--t3); font-weight: 500">${v.pigTotalTxt}</em>.</p>
  <div style="margin-top: 14px; border-top: 1.5px solid var(--ink)">
    ${((v.pigs) || []).map((g, $index) => html`
      <div class="fu" style=${"padding: 16px 0; border-bottom: 1px solid var(--r1); animation-delay: " + (g.delay) + "ms"}>
        <div style="display: flex; justify-content: space-between; align-items: baseline"><span class="F" style="font-size: 20px">${g.name}</span><span class="F" style=${"font-size: 26px; font-style: italic; color: " + (g.color)}>${g.pctTxt}</span></div>
        <div class="thin" style="height: 8px; margin-top: 10px"><div class="fill" style=${"height: 100%; width: " + (g.pct) + "%; background: " + (g.color)}></div></div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px"><span style="font-size: 13px; color: var(--body)">${g.amt} de ${g.goal} · ${g.when}</span><button class="pill" onClick=${g.open}>Abonar</button></div>
      </div>
    `)}
  </div>
  <button onClick=${v.newPig} class="F" style="margin-top: 16px; font-size: 17px; font-style: italic; text-decoration: underline; min-height: 44px">Abrir un nuevo cerdito →</button>
</div></div>
` : null}

${(v.isPlan) ? html`
<div class="scroll"><div class="screen">
  <div style="font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mut)">Sección</div>
  <h1 class="F" style="font-size: 40px; font-weight: 300; letter-spacing: -1px; margin: 2px 0 0">El <em style="font-weight: 500">plan</em></h1>
  <div style="display: flex; gap: 8px; margin-top: 14px">${((v.plans) || []).map((o, $index) => html`<button class=${"pill " + (o.cls)} onClick=${o.pick}>${o.n}</button>`)}</div>
  <p class="F fu" style="font-size: 22px; font-weight: 300; line-height: 1.3; margin: 16px 0 0">Guarda <em style="color: var(--t1); font-weight: 500">${v.metaTxt}</em> al mes —${v.metaQTxt} cada quincena— y cerrarás ${v.anio} con <em style="font-weight: 500">${v.anualTxt}</em>.</p>
  <div style="font-size: 13px; color: var(--mut); margin-top: 6px">${v.plan.d}</div>
  <div style="margin-top: 20px; border-top: 1.5px solid var(--ink); padding-top: 16px">
    <div style="position: relative; height: 130px; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 7px; align-items: end">
      <div style=${"position: absolute; left: 0; right: 0; bottom: " + (v.goalH) + "px; border-top: 1.5px dashed var(--t1); transition: bottom .6s"}></div>
      ${((v.bars) || []).map((b, $index) => html`<div class=${b.cls} style=${"height: " + (b.h) + "px; animation-delay: " + (b.delay) + "ms; transition: height .6s"}></div>`)}
    </div>
    <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 7px; margin-top: 8px; text-align: center; font-size: 11px; color: var(--mut)">${((v.bars) || []).map((b, $index) => html`<span>${b.m}</span>`)}</div>
    <div style="font-size: 12px; color: var(--mut); margin-top: 10px; border-top: 1px solid var(--r1); padding-top: 8px">Relleno: lo ahorrado · Contorno: proyección · Línea: tu meta</div>
  </div>
  <div style="margin-top: 18px; padding: 16px; background: var(--ink); color: var(--paper)">
    <div style="font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; opacity: .7">${v.mesNombre}</div>
    <div class="F" style="font-size: 20px; font-weight: 300; margin-top: 4px">${v.septTxt} ahorrados · faltan <em>${v.faltaSeptTxt}</em></div>
  </div>
<div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 28px"><h2 class="F" style="font-size: 32px; font-weight: 300; letter-spacing: -.8px; margin: 0">Los <em style="font-weight: 500">créditos</em></h2><button class="pill" onClick=${v.openCred}>+ Anotar</button></div>
<p class="F" style="font-size: 18px; font-weight: 300; line-height: 1.4; margin: 8px 0 0">Pagas <em style="color: var(--t1); font-weight: 500">${v.credCuotaTxt}</em> al mes en cuotas —el ${v.credPctTxt} de tu ingreso— y aún debes ${v.credSaldoTxt}.</p>
<div style="margin-top: 12px; border-top: 1.5px solid var(--ink)">
  ${((v.credits) || []).map((k, $index) => html`
    <div class="fu" style=${"padding: 14px 0; border-bottom: 1px solid var(--r1); animation-delay: " + (k.delay) + "ms"}>
      <div style="display: flex; justify-content: space-between; align-items: baseline"><span class="F" style="font-size: 20px">${k.name}</span><span class="F" style=${"font-size: 20px; font-style: italic; color: " + (k.color)}>${k.cuotaTxt}</span></div>
      <div style="font-size: 12.5px; color: var(--mut); margin-top: 2px">${k.montoTxt} a ${k.plazoTxt} · ${k.tasaTxt} · desde ${k.iniTxt}</div>
      <div class="thin" style="height: 8px; margin-top: 10px"><div class="fill" style=${"height: 100%; width: " + (k.prog) + "%; background: " + (k.color)}></div></div>
      <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--body); margin-top: 8px"><span>${k.kTxt} · termina ${k.endTxt}</span><span>Saldo <b>${k.saldoTxt}</b></span></div>
    </div>
  `)}
</div>
<button onClick=${v.openAsist} class="F" style="margin-top: 14px; font-size: 18px; font-style: italic; text-decoration: underline; min-height: 44px">Leer las recomendaciones del asistente →</button>
</div></div>
` : null}

<nav class="nav">
  <button class=${"nv " + (v.tb.inicio)} onClick=${v.goInicio}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 4h16v16H4zM4 9h16M9 9v11"></path></svg>Portada</button>
  <button class=${"nv " + (v.tb.gastos)} onClick=${v.goGastos}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4"></path></svg>Gastos</button>
  <div><button class="plus" onClick=${v.openSheet} aria-label="Anotar gasto"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"></path></svg></button></div>
  <button class=${"nv " + (v.tb.cerditos)} onClick=${v.goCerditos}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M19 11c0-3.3-3.1-6-7-6-1.3 0-2.5.3-3.5.8L6 4v3.3C4.8 8.3 4 9.6 4 11c0 1.9 1 3.6 2.6 4.6L7 19h3l.4-1.6c1 .2 2.2.2 3.2 0L14 19h3l.4-3.4c.6-.4 1.1-.9 1.5-1.4H21v-3z"></path></svg>Cerditos</button>
  <button class=${"nv " + (v.tb.plan)} onClick=${v.goPlan}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 20h16M6 16l4-5 3 3 5-7"></path></svg>Plan</button>
</nav>

${(v.sheetOn) ? html`
  <div class="scrim" onClick=${v.closeSheet}></div>
  <div class="sheet">
    <div style="display: flex; justify-content: space-between; align-items: center"><span class="F" style="font-size: 26px; font-weight: 300">Anotar un <em style="font-weight: 500">gasto</em></span><button onClick=${v.closeSheet} aria-label="Cerrar" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg></button></div>
    <label for="lb-monto" style="display: block; font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mut); margin-top: 12px">Monto</label>
    <input id="lb-monto" value=${v.mv.monto} onInput=${v.mvMonto} inputmode="numeric" placeholder="$ 0" class="F" style="width: 100%; background: none; border: 0; outline: none; font-size: 40px; font-weight: 300; padding: 2px 0 8px; border-bottom: 1.5px solid var(--ink)" />
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px">${((v.addCats) || []).map((a, $index) => html`<button class=${"pill " + (a.cls)} onClick=${a.pick}>${a.label}</button>`)}</div>${(v.mvHasTargets) ? html`<div style="font-size: 12.5px; opacity: .7; margin-top: 12px">${v.mvTargetLbl}</div><div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px">${((v.mvTargets) || []).map((a, $index) => html`<button class=${"pill " + (a.cls)} onClick=${a.pick}>${a.label}</button>`)}</div>` : null}${(v.mvHasErr) ? html`<div style="margin-top: 10px; font-size: 13px; font-weight: 700; color: #e5484d">${v.mvErr}</div>` : null}
    <label for="lb-nota" style="display: block; font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mut); margin-top: 16px">Nota al margen</label>
    <input id="lb-nota" value=${v.mv.nota} onInput=${v.mvNota} placeholder="Ej. almuerzo con el equipo" class="F" style="width: 100%; height: 46px; background: none; border: 0; border-bottom: 1px solid var(--r4); outline: none; font-style: italic; font-size: 17px" />
    <button onClick=${v.save} style="width: 100%; height: 56px; margin-top: 20px; background: var(--ink); color: var(--paper); font-weight: 700; font-size: 15px; letter-spacing: 1px; text-transform: uppercase">Anotar</button>
  </div>
` : null}

${(v.toastOn) ? html`
  <div class="toast">Anotado en la libreta.</div>
` : null}

${(v.splashOn) ? html`
  <div class=${v.splashCls}>
    <div style="display: flex; justify-content: space-between; font-size: 11.5px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--mut)"><span class="fu" style="animation-delay: .3s">Edición n.º ${v.edicion}</span><span class="fu" style="animation-delay: .4s">${v.qRange}</span></div>
    <div class="rule"></div>
    <div class="F" style="font-size: 50px; line-height: 1.02; font-weight: 300; letter-spacing: -1.5px">
      <span class="ln"><span style="animation-delay: .45s">Tu dinero,</span></span>
      <span class="ln"><span style="animation-delay: .6s; font-style: italic; font-weight: 500; color: var(--t1)">contado</span></span>
      <span class="ln"><span style="animation-delay: .75s">como una historia.</span></span>
    </div>
    <div class="rule" style="animation-delay: .9s"></div>
    <div class="F fu" style="font-size: 22px; font-weight: 700; animation-delay: 1.2s">La Libreta</div>
  </div>
` : null}
</div>
` : null}
${(v.isAl) ? html`
<div class=${"al " + (v.themeCls)} style="position: absolute; inset: 0; overflow: hidden; background: var(--bg); color: var(--fg); font-family: 'Nunito', sans-serif">

${(v.isInicio) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 16px">
  <div style="display: flex; justify-content: space-between; align-items: center">
    <div><div class="B" style="font-size: 27px; font-weight: 800; letter-spacing: -.5px">¡Hola, ${v.nombre}!</div><div style="font-size: 14px; font-weight: 700; color: var(--mut)">${v.fechaAl}</div></div>
    <div style="display: flex; gap: 8px"><span class="cd chunk" aria-label=${"Racha de " + (v.racha) + " días"} style="height: 46px; padding: 0 12px; border-radius: 16px; background: var(--card); display: flex; align-items: center; gap: 6px; font-weight: 900">
      <svg class="flame" width="20" height="20" viewBox="0 0 24 24" fill="#ff6f91" stroke="#2b2140" stroke-width="2" stroke-linejoin="round"><path d="M12 22c4 0 7-2.7 7-7 0-4-3-6-4-10-2 2-2.5 4-2.5 5.5C11 9 10 7.5 10 5c-3 2.5-5 6-5 10 0 4.3 3 7 7 7z"></path></svg>${v.racha}</span><button class="oc chunk" onClick=${v.openLook} aria-label="Cambiar apariencia" style="width: 46px; height: 46px; border-radius: 16px; background: #ffc94d; display: flex; align-items: center; justify-content: center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.8-1.7H16a5 5 0 0 0 5-5c0-3.9-4-7.2-9-7.2z"></path><circle cx="7.5" cy="11" r="1.2" fill="currentColor"></circle><circle cx="10.5" cy="7.5" r="1.2" fill="currentColor"></circle><circle cx="15" cy="7.5" r="1.2" fill="currentColor"></circle></svg></button></div>
  </div>

  <div class="seg chunk" style="border-radius: 22px">
    <div class="blob" style=${"transform: " + (v.segX)}></div>
    ${((v.periods) || []).map((p, $index) => html`<button class=${p.cls} onClick=${p.pick}>${p.label}</button>`)}
  </div>

  <div class="oc chunk pop" style="background: #ffc94d; padding: 18px; border-radius: 28px">
    <div style="display: flex; justify-content: space-between; align-items: flex-start">
      <div>
        <div style="font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: .6px">Gastado · ${v.per.label}</div>
        <div class="B" style="font-size: 36px; font-weight: 800; letter-spacing: -1px; margin-top: 2px">${v.shownTxt}</div>
        <div class="cd" style="display: inline-block; margin-top: 6px; padding: 4px 10px; border-radius: 10px; background: var(--card); border: 2px solid var(--line); font-weight: 900; font-size: 12.5px">${v.deltaTxt} ${v.per.vs}</div>
      </div>
      <svg width="110" height="66" viewBox="0 0 200 116">
        <path d="M18 100a82 82 0 0 1 164 0" fill="none" stroke-width="22" stroke-linecap="round" style="stroke: var(--card)"></path>
        <path d="M18 100a82 82 0 0 1 55-77" fill="none" stroke="#3cc59a" stroke-width="22" stroke-linecap="round"></path>
        <path d="M128 23a82 82 0 0 1 54 77" fill="none" stroke="#ff6f91" stroke-width="22" stroke-linecap="round"></path>
        <g class="needle" style=${"transform: rotate(" + (v.needle) + "deg)"}><path d="M100 100 L100 34" stroke="#2b2140" stroke-width="8" stroke-linecap="round"></path></g>
        <circle cx="100" cy="100" r="13" fill="#2b2140"></circle>
      </svg>
    </div>
    <div class="cd" style="margin-top: 14px; padding: 12px 14px; border-radius: 18px; background: var(--card); border: 2px solid var(--line); display: flex; justify-content: space-between; font-weight: 800; font-size: 14px"><span>Te quedan</span><span class="B" style="font-size: 17px">${v.libreTxt}</span></div>
  </div>

  <div class="cd chunk pop" style="background: var(--card); padding: 16px; animation-delay: 80ms">
    <div class="B" style="font-size: 17px; font-weight: 800; margin-bottom: 10px">¿En qué se fue?</div>
    <div style="display: flex; flex-direction: column; gap: 10px">
      ${((v.cats) || []).map((c, $index) => html`
        <div>
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 14px"><span>${c.name}</span><span>${c.val}</span></div>
          <div style="height: 16px; border-radius: 9px; border: 2px solid var(--line); background: var(--bg); margin-top: 5px; overflow: hidden"><div class="fill" style=${"height: 100%; width: " + (c.w) + "%; background: " + (c.color) + "; border-right: 2px solid var(--line); animation-delay: " + (c.delay) + "ms"}></div></div>
        </div>
      `)}
    </div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px">
    <button class="oc chunk pop" onClick=${v.goTarjetas} style="background: #6fa8ff; padding: 16px; text-align: left; animation-delay: 140ms">
      <svg width="30" height="30" viewBox="0 0 24 24" stroke="#2b2140" stroke-width="2" stroke-linecap="round" style="fill: var(--card)"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M3 10h18M7 15h4"></path></svg>
      <div style="font-size: 12.5px; font-weight: 900; margin-top: 8px">TARJETAS · ${v.tarjPagoUp}</div>
      <div class="B" style="font-size: 20px; font-weight: 800">${v.tarjTotalTxt}</div>
    </button>
    <button class="oc chunk pop" onClick=${v.goVehiculo} style="background: #3cc59a; padding: 16px; text-align: left; animation-delay: 190ms">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2b2140" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="16.5" r="3" style="fill: var(--card)"></circle><circle cx="18.5" cy="16.5" r="3" style="fill: var(--card)"></circle><path d="M5.5 16.5h6l3.5-7h3l.5 7M15 9.5l-2-3h-2.5"></path></svg>
      <div style="font-size: 12.5px; font-weight: 900; margin-top: 8px">${v.veh.upper}</div>
      <div class="B" style="font-size: 20px; font-weight: 800">${v.vehTxt}</div>
    </button>
  </div>

  <button class="chunk pop cd" onClick=${v.openAsist} style="background: var(--card); padding: 16px; display: flex; gap: 12px; text-align: left; animation-delay: 220ms">
  <span class="oc" style="width: 48px; height: 48px; border-radius: 16px; background: #ff6f91; border: 2px solid var(--line); display: flex; align-items: center; justify-content: center; flex-shrink: 0"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2l2 6.2L19.2 10 13 12l-2 6.2L9 12 2.8 10 9 8.2z"></path><path d="M19 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"></path></svg></span>
  <div><div style="font-size: 12px; font-weight: 900; color: var(--mut)">CONSEJO DEL DÍA</div><div class="B" style="font-size: 17px; font-weight: 800; line-height: 1.2; margin-top: 3px">${v.tip.title}</div><div style="font-size: 13px; font-weight: 700; color: var(--mut); margin-top: 5px; line-height: 1.35">${v.tip.impact}</div></div>
</button>
<div class="oc chunk pop" style="background: #b79cff; padding: 16px; animation-delay: 240ms">
    <div style="display: flex; justify-content: space-between; align-items: center"><div style="font-size: 12.5px; font-weight: 900">RETO DE LA SEMANA</div><div class="cd" style="font-weight: 900; font-size: 13px; background: var(--card); border: 2px solid var(--line); border-radius: 10px; padding: 2px 8px">${v.retoPts}</div></div>
    <div class="B" style="font-size: 20px; font-weight: 800; margin-top: 6px">Registra algo los 7 días</div>
    <div style="display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; margin-top: 12px">
      ${((v.reto) || []).map((d, $index) => html`<div style=${"height: 34px; border-radius: 10px; border: 2px solid var(--line); background: " + (d.bg) + "; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px"}>${d.l}</div>`)}
    </div>
  </div>

  <button class="oc chunk pop" onClick=${v.goCerditos} style="background: #ff6f91; padding: 16px; display: flex; align-items: center; gap: 14px; text-align: left; animation-delay: 290ms">
    <svg width="46" height="46" viewBox="0 0 24 24" fill="#ffd1dc" stroke="#2b2140" stroke-width="1.8" stroke-linejoin="round"><path d="M19 11c0-3.3-3.1-6-7-6-1.3 0-2.5.3-3.5.8L6 4v3.3C4.8 8.3 4 9.6 4 11c0 1.9 1 3.6 2.6 4.6L7 19h3l.4-1.6c1 .2 2.2.2 3.2 0L14 19h3l.4-3.4c.6-.4 1.1-.9 1.5-1.4H21v-3z"></path><circle cx="15.5" cy="10" r="1" fill="#2b2140"></circle></svg>
    <div style="flex: 1"><div style="font-size: 12.5px; font-weight: 900">TUS ${v.pigCount} CERDITOS</div><div class="B" style="font-size: 22px; font-weight: 800">${v.pigTotalTxt}</div></div>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b2140" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"></path></svg>
  </button>
</div></div>
` : null}

${(v.isGastos) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 14px">
  <div class="B" style="font-size: 32px; font-weight: 800; letter-spacing: -.5px">Gastos</div>
  <div class="seg chunk" style="border-radius: 22px">
    <div class="oc blob" style=${"transform: " + (v.subX) + "; background: #6fa8ff"}></div>
    ${((v.subs) || []).map((p, $index) => html`<button class=${p.cls} onClick=${p.pick}>${p.label}</button>`)}
  </div>

  ${(v.isDiario) ? html`
  <div class="screen" style="display: flex; flex-direction: column; gap: 10px">
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px">
      <div class="oc chunk" style="background: #ffc94d; padding: 14px"><div style="font-size: 12px; font-weight: 900">HOY</div><div class="B" style="font-size: 22px; font-weight: 800">${v.hoyTxt}</div></div>
      <div class="cd chunk" style="background: var(--card); padding: 14px"><div style="font-size: 12px; font-weight: 900">PROMEDIO/DÍA</div><div class="B" style="font-size: 22px; font-weight: 800">${v.promTxt}</div></div>
    </div>
    ${((v.diario) || []).map((r, $index) => html`
      <div onClick=${r.open} tabindex="0" role="button" class="cd chunk pop" style=${"background: var(--card); padding: 12px 14px; display: flex; align-items: center; gap: 12px; border-radius: 20px; box-shadow: 0 4px 0 var(--line); animation-delay: " + (r.delay) + "ms"}>
        <span class="oc" style="width: 42px; height: 42px; border-radius: 14px; background: #ffc94d; border: 2px solid var(--line); display: flex; align-items: center; justify-content: center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2b2140" stroke-width="2.2" stroke-linecap="round"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"></path><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"></path></svg></span>
        <div style="flex: 1"><div style="font-weight: 900; font-size: 15px">${r.t}</div><div style="font-size: 12.5px; font-weight: 700; color: var(--mut)">${r.s}</div></div>
        <b class="B" style="font-size: 16px">${r.vTxt}</b>
      </div>
    `)}
  ${(v.noMovs) ? html`<div class="gen-empty">Aún no hay movimientos en este periodo. Toca + para registrar el primero.</div>` : null}</div>
  ` : null}

  ${(v.isTarjetas) ? html`
  <div class="screen" style="display: flex; flex-direction: column; gap: 12px">
    ${((v.tj) || []).map((t, $index) => html`
      <div class="oc chunk pop" style=${"background: " + (t.solid) + "; padding: 18px; border-radius: 26px; animation-delay: " + (t.delay) + "ms"}>
        <div style="display: flex; justify-content: space-between; font-weight: 900"><span class="B" style="font-size: 18px">${t.name}</span><span>${t.last}</span></div>
        <div class="B" style="font-size: 28px; font-weight: 800; margin-top: 14px">${t.usedTxt}</div>
        <div style="font-size: 13px; font-weight: 800">de ${t.cupoTxt} · pagas el ${t.pago}</div>
        <div class="cd" style="height: 18px; border-radius: 10px; border: 2px solid var(--line); background: var(--card); margin-top: 12px; overflow: hidden"><div class="fill" style=${"height: 100%; width: " + (t.w) + "%; background: var(--fg)"}></div></div>
      </div>
    `)}
    ${((v.consumos) || []).map((r, $index) => html`
      <div onClick=${r.open} tabindex="0" role="button" class="cd chunk pop" style=${"background: var(--card); padding: 12px 14px; display: flex; align-items: center; gap: 12px; border-radius: 20px; box-shadow: 0 4px 0 var(--line); animation-delay: " + (r.delay) + "ms"}>
        <div style="flex: 1"><div style="font-weight: 900; font-size: 15px">${r.t}</div><div style="font-size: 12.5px; font-weight: 700; color: var(--mut)">${r.s}</div></div>
        <b class="B" style="font-size: 16px">${r.vTxt}</b>
      </div>
    `)}
  <button onClick=${v.openTarjetas} class="gen-add" style="grid-column: 1 / -1">${v.tarjAddTxt}</button></div>
  ` : null}

  ${(v.isVehiculo) ? html`
  <div class="screen" style="display: flex; flex-direction: column; gap: 12px">${(v.noVeh) ? html`<button onClick=${v.openVehiculos} class="gen-add" style="grid-column: 1 / -1">+ Agrega tu moto o carro</button>` : null}${(v.vehMulti) ? html`<button onClick=${v.nextVeh} class="gen-add" style="grid-column: 1 / -1">Ver ${v.vehNext} ›</button>` : null}
    <div class="oc chunk pop" style="background: #3cc59a; padding: 18px; border-radius: 26px">
      <div style="font-size: 12.5px; font-weight: 900">${v.veh.upper} · ${v.per.label}</div>
      <div class="B" style="font-size: 30px; font-weight: 800">${v.vehTxt}</div>
      <div style="font-size: 13px; font-weight: 800; margin-top: 2px">${v.veh.kmTxt} · ${v.veh.movsTxt}</div>
      <div style="margin-top: 14px; font-size: 12.5px; font-weight: 900">PRÓXIMO CAMBIO DE ACEITE</div>
      <div class="cd" style="height: 18px; border-radius: 10px; border: 2px solid var(--line); background: var(--card); margin-top: 6px; overflow: hidden"><div class="oc fill" style=${"height: 100%; width: " + (v.veh.aceitePct) + "%; background: #ffc94d; border-right: 2px solid var(--line)"}></div></div>
      <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; margin-top: 4px"><span>${v.veh.aceitePrevTxt}</span><span>${v.veh.faltanTxt}</span><span>${v.veh.aceiteAtTxt}</span></div>
    </div>
    ${((v.vehiculo) || []).map((r, $index) => html`
      <div onClick=${r.open} tabindex="0" role="button" class="cd chunk pop" style=${"background: var(--card); padding: 12px 14px; display: flex; align-items: center; gap: 12px; border-radius: 20px; box-shadow: 0 4px 0 var(--line); animation-delay: " + (r.delay) + "ms"}>
        <div style="flex: 1"><div style="font-weight: 900; font-size: 15px">${r.t}</div><div style="font-size: 12.5px; font-weight: 700; color: var(--mut)">${r.s}</div></div>
        <b class="B" style="font-size: 16px">${r.vTxt}</b>
      </div>
    `)}
  </div>
  ` : null}
</div></div>
` : null}

${(v.isCerditos) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 14px">
  <div><div class="B" style="font-size: 32px; font-weight: 800; letter-spacing: -.5px">Cerditos</div><div style="font-weight: 800; color: var(--mut)">Toca + para alimentarlos · total ${v.pigTotalTxt}</div></div>
  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px">
    ${((v.pigs) || []).map((g, $index) => html`
      <div class="pop" style=${"animation-delay: " + (g.delay) + "ms"}>
        <div class="jar chunk">
          <div class="liquid" style=${"background: " + (g.color)}></div>
          <div class="wave w2" style=${"top: calc(" + (g.level) + "% - 326px)"}></div>
          <div class="wave" style=${"top: calc(" + (g.level) + "% - 332px)"}></div>
          <div style="position: absolute; inset: 0; padding: 14px; display: flex; flex-direction: column; justify-content: space-between">
            <div class="B" style="font-size: 28px; font-weight: 800">${g.pctTxt}</div>
            <div class="cd" style="background: var(--card); border: 2px solid var(--line); border-radius: 12px; padding: 6px 8px; font-size: 12px; font-weight: 800; line-height: 1.3">${g.amt}<br /><span style="color: var(--mut)">de ${g.goal}</span></div>
          </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px; gap: 8px">
          <span style="font-weight: 900; font-size: 13.5px; line-height: 1.2">${g.name}</span>
          <button class="oc chunk" onClick=${g.open} aria-label="Abonar al cerdito" style="width: 44px; height: 44px; border-radius: 14px; background: #ffc94d; flex-shrink: 0; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 0 var(--line)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2b2140" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"></path></svg></button>
        </div>
      </div>
    `)}
  </div>
  <button class="cd chunk" onClick=${v.newPig} style="height: 60px; background: var(--card); font-weight: 900; border-style: dashed">+ Nuevo cerdito</button>
</div></div>
` : null}

${(v.isPlan) ? html`
<div class="scroll"><div class="screen" style="display: flex; flex-direction: column; gap: 14px">
  <div class="B" style="font-size: 32px; font-weight: 800; letter-spacing: -.5px">Plan de ahorro</div>
  <div style="display: flex; gap: 10px">${((v.plans) || []).map((o, $index) => html`<button class=${"chunk plan " + (o.cls)} onClick=${o.pick}><div style="font-weight: 900; font-size: 14px">${o.n}</div><div style="font-size: 11.5px; font-weight: 800; margin-top: 2px">${o.d}</div></button>`)}</div>
  <div class="oc chunk pop" style="background: #3cc59a; padding: 18px; border-radius: 28px">
    <div style="font-size: 12.5px; font-weight: 900">GUARDA CADA MES</div>
    <div class="B" style="font-size: 34px; font-weight: 800">${v.metaTxt}</div>
    <div style="font-weight: 800; font-size: 13.5px">o ${v.metaQTxt} por quincena</div>
    <div class="cd" style="height: 22px; border-radius: 12px; border: 2px solid var(--line); background: var(--card); margin-top: 12px; overflow: hidden"><div class="oc fill" style=${"height: 100%; width: " + (v.septPct) + "%; background: #ffc94d; border-right: 2px solid var(--line)"}></div></div>
    <div style="font-size: 12.5px; font-weight: 800; margin-top: 6px">${v.mesNombre} ${v.septPct}% · faltan ${v.faltaSeptTxt}</div>
  </div>
  <div class="cd chunk pop" style="background: var(--card); padding: 16px; animation-delay: 80ms">
    <div class="B" style="font-size: 17px; font-weight: 800">Tu año en barras</div>
    <div style="position: relative; height: 126px; margin-top: 14px; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 5px; align-items: end">
      <div style=${"position: absolute; left: 0; right: 0; bottom: " + (v.goalH) + "px; border-top: 3px dotted #ff6f91; transition: bottom .6s"}></div>
      ${((v.bars) || []).map((b, $index) => html`<div class=${b.cls} style=${"height: " + (b.h) + "px; animation-delay: " + (b.delay) + "ms; transition: height .6s cubic-bezier(.34,1.56,.64,1)"}></div>`)}
    </div>
    <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 5px; margin-top: 6px; text-align: center; font-size: 11px; font-weight: 900; color: var(--mut)">${((v.bars) || []).map((b, $index) => html`<span>${b.m}</span>`)}</div>
    <div style="margin-top: 12px; font-weight: 800; font-size: 14px">Con el plan ${v.plan.n} cierras ${v.anio} con <span class="oc B" style="background: #ffc94d; padding: 0 6px; border-radius: 6px">${v.anualTxt}</span></div>
  </div>
  <div class="pop" style="animation-delay: 160ms">
    <div class="B" style="font-size: 17px; font-weight: 800; margin-bottom: 10px">Logros</div>
    <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px">
      <div class="oc chunk" style="background: #ffc94d; padding: 12px 8px; text-align: center; border-radius: 20px"><div class="B" style="font-size: 22px; font-weight: 800">${v.lg.ahorro}</div><div style="font-size: 11px; font-weight: 800">Ahorrado</div></div>
      <div class="oc chunk" style="background: #6fa8ff; padding: 12px 8px; text-align: center; border-radius: 20px"><div class="B" style="font-size: 22px; font-weight: 800">×${v.lg.meses}</div><div style="font-size: 11px; font-weight: 800">Meses en meta</div></div>
      <div class="cd chunk" style="background: var(--card); padding: 12px 8px; text-align: center; border-radius: 20px; border-style: dashed; box-shadow: none; color: var(--mut)"><div class="B" style="font-size: 22px; font-weight: 800">${v.lg.llenos}</div><div style="font-size: 11px; font-weight: 800">Cerditos llenos</div></div>
    </div>
  </div>
<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px"><div class="B" style="font-size: 26px; font-weight: 800">Créditos</div><button class="chunk oc" onClick=${v.openCred} style="height: 44px; padding: 0 14px; border-radius: 14px; background: #3cc59a; font-weight: 900; box-shadow: 0 3px 0 var(--line)">+ Agregar</button></div>
<div class="chunk oc pop" style="background: #6fa8ff; padding: 14px 16px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px">
  <div><div style="font-size: 11px; font-weight: 900">CUOTAS/MES</div><div class="B" style="font-size: 15px; font-weight: 800">${v.credCuotaTxt}</div></div>
  <div><div style="font-size: 11px; font-weight: 900">SALDO</div><div class="B" style="font-size: 15px; font-weight: 800">${v.credSaldoTxt}</div></div>
  <div><div style="font-size: 11px; font-weight: 900">DEL INGRESO</div><div class="B" style="font-size: 15px; font-weight: 800">${v.credPctTxt}</div></div>
</div>
${((v.credits) || []).map((k, $index) => html`
  <div class="chunk pop cd" style=${"background: var(--card); padding: 16px; animation-delay: " + (k.delay) + "ms"}>
    <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px"><span class="B" style="font-size: 17px; font-weight: 800">${k.name}</span><span class="oc" style=${"font-size: 12px; font-weight: 900; padding: 3px 8px; border-radius: 10px; border: 2px solid var(--line); background: " + (k.color)}>${k.tasaTxt}</span></div>
    <div class="B" style="font-size: 26px; font-weight: 800; margin-top: 8px">${k.cuotaTxt}<span style="font-size: 13px; font-weight: 800; color: var(--mut)"> al mes</span></div>
    <div style="height: 18px; border-radius: 10px; border: 2px solid var(--line); background: var(--bg); margin-top: 10px; overflow: hidden"><div class="fill" style=${"height: 100%; width: " + (k.prog) + "%; background: " + (k.color) + "; border-right: 2px solid var(--line)"}></div></div>
    <div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 800; margin-top: 6px"><span>${k.kTxt}</span><span>Saldo ${k.saldoTxt}</span></div>
    <div style="font-size: 12px; font-weight: 700; color: var(--mut); margin-top: 3px">${k.montoTxt} · desde ${k.iniTxt} · termina ${k.endTxt}</div>
  </div>
`)}
<button class="chunk oc" onClick=${v.openAsist} style="height: 60px; background: #ff6f91; font-weight: 900; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 8px"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2l2 6.2L19.2 10 13 12l-2 6.2L9 12 2.8 10 9 8.2z"></path><path d="M19 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"></path></svg> ¡Ver recomendaciones!</button>
</div></div>
` : null}

<nav class="dock chunk">
  <button class=${"tab " + (v.tb.inicio)} onClick=${v.goInicio}><span class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"></path></svg></span>Inicio</button>
  <button class=${"tab " + (v.tb.gastos)} onClick=${v.goGastos}><span class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"></path><path d="M9 8h6M9 12h6"></path></svg></span>Gastos</button>
  <div><button class="fab chunk" onClick=${v.openSheet} aria-label="Agregar gasto"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"></path></svg></button></div>
  <button class=${"tab " + (v.tb.cerditos)} onClick=${v.goCerditos}><span class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M19 11c0-3.3-3.1-6-7-6-1.3 0-2.5.3-3.5.8L6 4v3.3C4.8 8.3 4 9.6 4 11c0 1.9 1 3.6 2.6 4.6L7 19h3l.4-1.6c1 .2 2.2.2 3.2 0L14 19h3l.4-3.4c.6-.4 1.1-.9 1.5-1.4H21v-3z"></path></svg></span>Cerditos</button>
  <button class=${"tab " + (v.tb.plan)} onClick=${v.goPlan}><span class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1.5"></circle></svg></span>Plan</button>
</nav>

${(v.sheetOn) ? html`
  <div class="scrim" onClick=${v.closeSheet}></div>
  <div class="sheet chunk" style="border-radius: 30px">
    <div style="display: flex; justify-content: space-between; align-items: center"><span class="B" style="font-size: 24px; font-weight: 800">¿Qué gastaste?</span><button class="cd chunk" onClick=${v.closeSheet} aria-label="Cerrar" style="width: 44px; height: 44px; border-radius: 14px; background: var(--card); display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 0 var(--line)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg></button></div>
    <label for="al-monto" style="display: block; font-size: 12.5px; font-weight: 900; margin-top: 14px">MONTO</label>
    <input id="al-monto" value=${v.mv.monto} onInput=${v.mvMonto} inputmode="numeric" placeholder="$ 0" class="B chunk" style="width: 100%; height: 72px; margin-top: 6px; padding: 0 16px; background: var(--card); outline: none; font-size: 34px; font-weight: 800; box-shadow: 0 4px 0 var(--line)" />
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px">${((v.addCats) || []).map((a, $index) => html`<button class=${"chip " + (a.cls)} onClick=${a.pick}>${a.label}</button>`)}</div>${(v.mvHasTargets) ? html`<div style="font-size: 12.5px; opacity: .7; margin-top: 12px">${v.mvTargetLbl}</div><div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px">${((v.mvTargets) || []).map((a, $index) => html`<button class=${"chip " + (a.cls)} onClick=${a.pick}>${a.label}</button>`)}</div>` : null}${(v.mvHasErr) ? html`<div style="margin-top: 10px; font-size: 13px; font-weight: 700; color: #e5484d">${v.mvErr}</div>` : null}
    <label for="al-nota" style="display: block; font-size: 12.5px; font-weight: 900; margin-top: 16px">NOTA</label>
    <input id="al-nota" value=${v.mv.nota} onInput=${v.mvNota} placeholder="Ej. almuerzo" style="width: 100%; height: 50px; margin-top: 6px; padding: 0 16px; border-radius: 16px; border: 2px solid var(--line); background: var(--card); outline: none; font-weight: 700" />
    <button class="oc chunk" onClick=${v.save} style="width: 100%; height: 60px; margin-top: 18px; background: #ff6f91; font-weight: 900; font-size: 17px">¡Guardar!</button>
  </div>
` : null}

${(v.toastOn) ? html`
  <div class="toast chunk" style="border-radius: 18px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2b2140" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17l9-10"></path></svg>¡Listo! Guardado</div>
` : null}

${(v.splashOn) ? html`
  <div class=${v.splashCls}>
    <div style="position: relative; width: 200px; height: 170px">
      <div class="coin"></div>
      <svg class="pig" width="200" height="170" viewBox="0 0 200 170">
        <ellipse cx="100" cy="98" rx="78" ry="58" fill="#ffd1dc" stroke="#2b2140" stroke-width="5"></ellipse>
        <path d="M52 52 L44 22 L74 42" fill="#ffd1dc" stroke="#2b2140" stroke-width="5" stroke-linejoin="round"></path>
        <rect x="160" y="84" width="28" height="30" rx="12" fill="#ffb3c6" stroke="#2b2140" stroke-width="5"></rect>
        <circle cx="170" cy="99" r="3" fill="#2b2140"></circle><circle cx="179" cy="99" r="3" fill="#2b2140"></circle>
        <circle cx="140" cy="80" r="6" fill="#2b2140"></circle>
        <rect x="84" y="38" width="36" height="8" rx="4" fill="#2b2140"></rect>
        <rect x="52" y="140" width="22" height="26" rx="6" fill="#ffd1dc" stroke="#2b2140" stroke-width="5"></rect>
        <rect x="120" y="140" width="22" height="26" rx="6" fill="#ffd1dc" stroke="#2b2140" stroke-width="5"></rect>
      </svg>
    </div>
    <div class="B" style="font-size: 56px; font-weight: 800; letter-spacing: -2px; color: var(--fg)">
      <span class="lt" style="animation-delay: 1.3s">a</span><span class="lt" style="animation-delay: 1.36s">l</span><span class="lt" style="animation-delay: 1.42s">c</span><span class="lt" style="animation-delay: 1.48s">a</span><span class="lt" style="animation-delay: 1.54s">n</span><span class="lt" style="animation-delay: 1.6s">c</span><span class="lt" style="animation-delay: 1.66s">í</span><span class="lt" style="animation-delay: 1.72s">a</span>
    </div>
    <div class="lt" style="animation-delay: 1.9s; font-weight: 900; font-size: 16px; color: var(--fg)">Ahorrar también puede ser divertido</div>
  </div>
` : null}
</div>
` : null}
${(v.panelOn) ? html`
  <div class="ap-scrim" onClick=${v.closePanel}></div>
  <div class="ap tall" role="dialog" aria-label="Ajustes">
    <div style="width: 40px; height: 5px; border-radius: 9px; background: var(--apline); margin: 0 auto 12px"></div>
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-shrink: 0">
      <div>
        <div style="font-family: 'Sora', sans-serif; font-size: 21px; font-weight: 600; letter-spacing: -.3px">${v.apTitle}</div>
        <div style="font-size: 13px; color: var(--apmut); margin-top: 3px; line-height: 1.4">${v.apSub}</div>
      </div>
      <button onClick=${v.closePanel} aria-label="Cerrar" style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 14px; background: var(--apcard); display: flex; align-items: center; justify-content: center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg></button>
    </div>
<div class="as-scroll">
    ${(v.showAcc) ? html`<div class="ap-lbl">Mis cuentas</div><div class="ap-rows">
${((v.accRows) || []).map((ar, $index) => html`<button class="ap-row" onClick=${ar.open}><span class="ap-ico" style=${"background: " + (ar.color)}></span><span style="flex: 1; min-width: 0"><b style="display: block; font-size: 14px">${ar.label}</b><span style="display: block; font-size: 12px; color: var(--apmut); margin-top: 1px">${ar.sub}</span></span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg></button>`)}
</div>` : null}<div class="ap-lbl">Estilo</div>
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
      ${((v.looks) || []).map((l, $index) => html`
        <button class=${"ap-card " + (l.cls)} onClick=${l.pick} aria-label=${"Estilo " + (l.name)}>
          <div class="ap-prev" style=${"background: " + (l.bg) + "; color: " + (l.fg) + "; border: 1px solid " + (l.edge)}>
            <div style="display: flex; gap: 5px"><span style=${"width: 10px; height: 10px; border-radius: " + (l.rad) + "; background: " + (l.a0)}></span><span style=${"width: 10px; height: 10px; border-radius: " + (l.rad) + "; background: " + (l.a1)}></span><span style=${"width: 10px; height: 10px; border-radius: " + (l.rad) + "; background: " + (l.a2)}></span></div>
            <div style=${"font-family: " + (l.font) + "; font-size: 21px; font-weight: " + (l.weight) + "; font-style: " + (l.fstyle) + "; letter-spacing: -.5px; margin-top: 10px; line-height: 1"}>$ 1,6 M</div>
            <div style="display: flex; gap: 4px; margin-top: 10px"><span style=${"height: 6px; flex-grow: 5; border-radius: " + (l.rad) + "; background: " + (l.a0)}></span><span style=${"height: 6px; flex-grow: 3; border-radius: " + (l.rad) + "; background: " + (l.a1)}></span><span style=${"height: 6px; flex-grow: 2; border-radius: " + (l.rad) + "; background: " + (l.a2)}></span></div>
            ${(l.on) ? html`<span class="ap-check" style=${"background: " + (l.fg) + "; color: " + (l.bg)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17l9-10"></path></svg></span>` : null}
          </div>
          <div style="padding: 8px 4px 2px"><div style="font-weight: 800; font-size: 14px">${l.name}</div><div style="font-size: 12px; color: var(--apmut); margin-top: 1px">${l.desc}</div></div>
        </button>
      `)}
    </div>

    <div class="ap-lbl">Tema</div>
    <div class="ap-seg">
      <div class="th" style=${"transform: " + (v.themeX)}></div>
      <button class=${v.th.light} onClick=${v.setLight}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>Claro</button>
      <button class=${v.th.dark} onClick=${v.setDark}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"></path></svg>Oscuro</button>
      <button class=${v.th.auto} onClick=${v.setAuto}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="3"></rect><path d="M12 7v10"></path></svg>Sistema</button>
    </div>

    <button onClick=${v.replayFromPanel} style="width: 100%; height: 50px; margin-top: 14px; border-radius: 16px; border: 1px solid var(--apline); font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 8px"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"></path></svg>Ver animación de inicio</button></div>
  </div>
` : null}

${(v.morphOn) ? html`
  <div class=${v.morphCls} style=${"background: " + (v.morphBg)}></div>
` : null}
${(v.asistOn) ? html`
  <div class="ap-scrim" onClick=${v.closeAsist}></div>
  <div class="ap tall" role="dialog" aria-label="Asistente financiero">
    <div style="width: 40px; height: 5px; border-radius: 9px; background: var(--apline); margin: 0 auto 12px; flex-shrink: 0"></div>
    <div style="display: flex; align-items: center; gap: 12px; flex-shrink: 0">
      <span class="as-orb"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2l2 6.2L19.2 10 13 12l-2 6.2L9 12 2.8 10 9 8.2z"></path><path d="M19 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"></path></svg></span>
      <div style="flex: 1">
        <div style="font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 600; letter-spacing: -.3px">Asistente financiero</div>
        <div style="font-size: 12.5px; color: var(--apmut); margin-top: 2px">Calculado con tus números y reglas · sin IA, funciona sin internet</div>
      </div>
      <button onClick=${v.closeAsist} aria-label="Cerrar" style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 14px; background: var(--apcard); display: flex; align-items: center; justify-content: center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg></button>
    </div>
    <div class="as-scroll">
      ${(v.asistLoading) ? html`
        <div style="padding: 18px 2px">
          <div class="as-msg">${v.asistMsg}</div>
          <div class="sk" style="width: 92%; margin-top: 16px"></div>
          <div class="sk" style="width: 74%"></div>
          <div class="sk" style="width: 84%"></div>
          <div class="sk" style="width: 60%"></div>
        </div>
      ` : null}
      ${(v.asistDone) ? html`
        <div style="font-size: 13px; color: var(--apmut); margin: 14px 2px 10px">Encontré <b style="color: var(--apfg)">${v.recCount} recomendaciones</b> para ti con tus datos de hoy.</div>
        <div style="display: flex; flex-direction: column; gap: 10px">
          ${((v.recs) || []).map((rc, $index) => html`
            <div class=${rc.cls} style=${"animation-delay: " + (rc.delay) + "ms"}>
              <div style="display: flex; gap: 6px; align-items: center"><span class="as-tone">${rc.toneTxt}</span><span style="font-size: 11.5px; font-weight: 700; color: var(--apmut)">${rc.tag}</span></div>
              <div style="font-size: 15.5px; font-weight: 800; line-height: 1.3; margin-top: 8px">${rc.title}</div>
              <div style="font-size: 13px; line-height: 1.45; color: var(--apmut); margin-top: 5px">${rc.body}</div>
              <div class="as-imp">${rc.impact}</div>
            </div>
          `)}
        </div>
        <div style="font-size: 11.5px; color: var(--apmut); line-height: 1.45; margin: 14px 2px 4px">Son sugerencias calculadas con tus propios datos; no son asesoría financiera profesional.</div>
      ` : null}
    </div>
  </div>
` : null}

${(v.credOn) ? html`
  <div class="ap-scrim" onClick=${v.closeCred}></div>
  <div class="ap tall" role="dialog" aria-label="Nuevo crédito">
    <div style="width: 40px; height: 5px; border-radius: 9px; background: var(--apline); margin: 0 auto 12px; flex-shrink: 0"></div>
    <div style="display: flex; justify-content: space-between; align-items: center; flex-shrink: 0">
      <div><div style="font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 600">Nuevo crédito</div><div style="font-size: 12.5px; color: var(--apmut); margin-top: 2px">Calculo la cuota y lo que llevas pagado</div></div>
      <button onClick=${v.closeCred} aria-label="Cerrar" style="width: 44px; height: 44px; border-radius: 14px; background: var(--apcard); display: flex; align-items: center; justify-content: center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg></button>
    </div>
    <div class="as-scroll">
      <label class="ap-fl" for="cr-name">Nombre</label>
      <input id="cr-name" class="ap-in" placeholder="Ej. Crédito del carro" value=${v.cf.name} onInput=${v.cfName} />
      <label class="ap-fl" for="cr-monto">Monto prestado</label>
      <input id="cr-monto" class="ap-in" inputmode="numeric" placeholder="Ej. 15000000" value=${v.cf.monto} onInput=${v.cfMonto} />
      <div style="font-size: 12px; color: var(--apmut); margin-top: 5px">${v.cfMontoTxt}</div>
      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
        <div>
          <label class="ap-fl" for="cr-tasa">Tasa de interés (%)</label>
          <input id="cr-tasa" class="ap-in" inputmode="decimal" placeholder="Ej. 24" value=${v.cf.tasa} onInput=${v.cfTasa} />
        </div>
        <div>
          <div class="ap-fl">Tipo de tasa</div>
          <div class="ap-seg two">
            <div class="th" style=${"transform: " + (v.cfTipoX)}></div>
            <button class=${v.cfTipo.ea} onClick=${v.cfEa}>E.A.</button>
            <button class=${v.cfTipo.mv} onClick=${v.cfMv}>M.V.</button>
          </div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
        <div>
          <label class="ap-fl" for="cr-plazo">Plazo (meses)</label>
          <input id="cr-plazo" class="ap-in" inputmode="numeric" placeholder="Ej. 36" value=${v.cf.plazo} onInput=${v.cfPlazo} />
        </div>
        <div>
          <label class="ap-fl" for="cr-inicio">Empezó en</label>
          <input id="cr-inicio" class="ap-in" type="month" value=${v.cf.inicio} onInput=${v.cfInicio} />
        </div>
      </div>
      <div class="cr-prev">
        <div style="font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--apmut)">Así queda</div>
        <div style="display: flex; align-items: baseline; gap: 6px; margin-top: 6px"><span style="font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 600; letter-spacing: -.5px">${v.cfCuotaTxt}</span><span style="font-size: 13px; color: var(--apmut)">cuota mensual</span></div>
        <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 12px; font-size: 12.5px">
          <div><div style="color: var(--apmut)">Cuotas pagadas</div><b>${v.cfKTxt}</b></div>
          <div><div style="color: var(--apmut)">Saldo hoy</div><b>${v.cfSaldoTxt}</b></div>
          <div><div style="color: var(--apmut)">Intereses totales</div><b>${v.cfIntTxt}</b></div>
          <div><div style="color: var(--apmut)">Terminas en</div><b>${v.cfEndTxt}</b></div>
        </div>
      </div>
      <button class=${v.cfCls} onClick=${v.saveCred}>Guardar crédito</button>
    </div>
  </div>
` : null}

${(v.edOn) ? html`
  <div class="ap-scrim" onClick=${v.closeEd}></div>
  <div class="ap tall" role="dialog" aria-label=${v.ed.title}>
    <div style="width: 40px; height: 5px; border-radius: 9px; background: var(--apline); margin: 0 auto 12px; flex-shrink: 0"></div>
    <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-shrink: 0">
      <div><div style="font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 600">${v.ed.title}</div><div style="font-size: 12.5px; color: var(--apmut); margin-top: 2px; line-height: 1.4">${v.ed.sub}</div></div>
      ${(v.ed.canClose) ? html`<button onClick=${v.closeEd} aria-label="Cerrar" style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 14px; background: var(--apcard); display: flex; align-items: center; justify-content: center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg></button>` : null}
    </div>
    <div class="as-scroll">
      ${(v.ed.hasList) ? html`
        <div class="ap-lbl">${v.ed.listTitle}</div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          ${((v.ed.items) || []).map((it, $index) => html`
            <div class="ed-item">
              <span style=${"width: 10px; height: 36px; border-radius: 6px; flex-shrink: 0; background: " + (it.color)}></span>
              <div style="flex: 1; min-width: 0"><div style="font-weight: 800; font-size: 14.5px">${it.name}</div><div style="font-size: 12px; color: var(--apmut); margin-top: 2px">${it.sub}</div></div>
              ${(it.canEdit) ? html`<button class="ed-btn" onClick=${it.edit} aria-label=${"Editar " + (it.name)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"></path></svg></button>` : null}
              <button class=${"ed-btn " + (it.delCls)} onClick=${it.del} aria-label=${"Eliminar " + (it.name)}>${it.delTxt}</button>
            </div>
          `)}
        </div>
        ${(v.ed.empty) ? html`<div style="font-size: 13px; color: var(--apmut); padding: 6px 2px">${v.ed.emptyTxt}</div>` : null}
      ` : null}

      ${(v.ed.hasForm) ? html`
        <div class="ap-lbl">${v.ed.formTitle}</div>
        ${(v.ed.hasNote) ? html`<div class="ed-note">${v.ed.note}</div>` : null}
        ${(v.ed.hasQr) ? html`
          <div class="qr-box">
            <img src=${v.ed.qr} alt="Código QR para la app autenticadora" width="168" height="168" />
            <div style="font-size: 12.5px; color: var(--apmut); margin-top: 10px">¿Estás en este mismo teléfono? Usa el botón o copia la clave:</div>
            <div class="qr-secret">${v.ed.secret}</div>
            <div style="display: flex; gap: 8px; width: 100%"><a class="ap-alt" style="margin-top: 0; display: flex; align-items: center; justify-content: center; text-decoration: none" href=${v.ed.otpUri}>Abrir autenticador</a><button class="ap-alt" style="margin-top: 0" onClick=${v.ed.copySecret}>${v.ed.copyTxt}</button></div>
          </div>
        ` : null}
        ${((v.ed.fields) || []).map((fd, $index) => html`
          <div>
            <label class="ap-fl" for=${fd.id}>${fd.label}</label>
            ${(fd.isChoice) ? html`
              <div style="display: flex; gap: 8px; flex-wrap: wrap">${((fd.opts) || []).map((op, $index) => html`<button class=${"ap-chip " + (op.cls)} onClick=${op.pick}>${op.label}</button>`)}</div>
            ` : null}
            ${(fd.isInput) ? html`
              <input id=${fd.id} class="ap-in" type=${fd.type} inputmode=${fd.mode} placeholder=${fd.ph} value=${fd.value} onInput=${fd.set} autocomplete=${fd.ac} />
            ` : null}
            ${(fd.hasHint) ? html`<div style="font-size: 12px; color: var(--apmut); margin-top: 5px">${fd.hint}</div>` : null}
          </div>
        `)}
        ${(v.ed.hasMeter) ? html`<div class="pw-meter"><span style=${"width: " + (v.ed.meterW) + "%; background: " + (v.ed.meterC)}></span></div><div style="font-size: 12px; color: var(--apmut); margin-top: 6px; line-height: 1.4">${v.ed.meterTxt}</div>` : null}
        ${(v.ed.hasOk) ? html`<div class="ap-ok">${v.ed.ok}</div>` : null}
        ${(v.ed.hasErr) ? html`<div class="ap-err">${v.ed.err}</div>` : null}
        <button class=${v.ed.saveCls} onClick=${v.ed.save}>${v.ed.saveTxt}</button>
        ${(v.ed.hasAlt) ? html`<button class="ap-alt" onClick=${v.ed.alt}>${v.ed.altTxt}</button>` : null}
        ${(v.ed.hasAlt2) ? html`<button class="ap-alt danger-t" onClick=${v.ed.alt2}>${v.ed.alt2Txt}</button>` : null}
        ${(v.ed.hasCancelEdit) ? html`<button class="ap-alt" onClick=${v.ed.cancelEdit}>Cancelar edición</button>` : null}
      ` : null}

      ${(v.ed.isDatos) ? html`
        <div class="cr-prev" style="margin-top: 14px">
          <div style="display: flex; align-items: center; gap: 8px"><span class=${"sync-dot " + (v.sync.cls)}></span><b style="font-size: 14px">${v.sync.title}</b></div>
          <div style="font-size: 12.5px; color: var(--apmut); margin-top: 4px; line-height: 1.45">${v.sync.txt}</div>
          ${(v.sync.logged) ? html`
            <div style="display: flex; gap: 8px; margin-top: 12px"><button class="ap-alt" style="margin-top: 0" onClick=${v.syncNow}>Sincronizar ahora</button><button class="ap-alt" style="margin-top: 0" onClick=${v.logout}>Cerrar sesión</button></div>
            <button class="ap-alt" onClick=${v.logoutAll}>Cerrar sesión en todos mis dispositivos</button>
          ` : null}
        </div>
        <div class="ap-lbl">Copia de seguridad</div>
        <div style="font-size: 12.5px; color: var(--apmut); line-height: 1.45">Descarga un archivo con todos tus datos o recupéralos desde uno. El archivo no va cifrado: guárdalo en un lugar seguro.</div>
        <div style="display: flex; gap: 8px; margin-top: 10px">
          <button class="ap-alt" style="margin-top: 0" onClick=${v.exportData}>Exportar (.json)</button>
          <label class="ap-alt" style="margin-top: 0; display: flex; align-items: center; justify-content: center; cursor: pointer">Importar<input type="file" accept="application/json,.json" style="display: none" onChange=${v.importData} /></label>
        </div>
        ${(v.ed.welcome) ? html`<button class="ap-alt" onClick=${v.skipCloud}>Usar sin nube por ahora</button>` : null}
      ` : null}
    </div>
  </div>
` : null}

${(v.movOn) ? html`
  <div class="ap-scrim" onClick=${v.closeMov}></div>
  <div class="ap" role="dialog" aria-label="Detalle del movimiento">
    <div style="width: 40px; height: 5px; border-radius: 9px; background: var(--apline); margin: 0 auto 12px"></div>
    <div style="display: flex; justify-content: space-between; align-items: flex-start">
      <div><div style="font-size: 12.5px; color: var(--apmut)">${v.movD.tipo} · ${v.movD.cat}</div><div style="font-family: 'Sora', sans-serif; font-size: 30px; font-weight: 600; letter-spacing: -.5px; margin-top: 2px">${v.movD.monto}</div></div>
      <button onClick=${v.closeMov} aria-label="Cerrar" style="width: 44px; height: 44px; border-radius: 14px; background: var(--apcard); display: flex; align-items: center; justify-content: center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg></button>
    </div>
    <div class="cr-prev" style="margin-top: 12px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; font-size: 13px">
      <div><div style="color: var(--apmut)">Nota</div><b>${v.movD.nota}</b></div>
      <div><div style="color: var(--apmut)">Fecha</div><b>${v.movD.fecha}</b></div>
      <div style="grid-column: 1 / -1"><div style="color: var(--apmut)">Asociado a</div><b>${v.movD.dest}</b></div>
    </div>
    <button class=${v.movD.delCls} onClick=${v.movD.del}>${v.movD.delTxt}</button>
  </div>
` : null}

${(v.lockOn) ? html`
  <div class="lk" role="dialog" aria-label="Desbloquear Mis Finanzas">
    <div class="lk-logo"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="3"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></div>
    <div style="font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 600; margin-top: 16px">${v.lk.title}</div>
    <div class=${"lk-msg " + (v.lk.msgCls)}>${v.lk.msg}</div>
    <div class="lk-dots">${((v.lk.dots) || []).map((dt, $index) => html`<span class=${"lk-dot " + (dt.cls)}></span>`)}</div>
    <div class="lk-pad">
      ${((v.lk.keys) || []).map((ky, $index) => html`<button class=${"lk-key " + (ky.cls)} onClick=${ky.press} aria-label=${ky.aria}>${ky.label}</button>`)}
    </div>
    ${(v.lk.hasBio) ? html`<button class="lk-bio" onClick=${v.lk.bio}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 11v3M8.5 8.5A5 5 0 0 1 17 12v1M7 12a5 5 0 0 0 .5 2.2M12 5a7 7 0 0 1 7 7v1M5 12a7 7 0 0 1 3-5.7M9.5 18a8 8 0 0 0 1.5-4M14.5 17.5a11 11 0 0 0 .5-3.5"></path></svg>Usar huella / Face ID</button>` : null}
  </div>
` : null}

${(v.pigOn) ? html`
  <div class="ap-scrim" onClick=${v.pg.close}></div>
  <div class="ap tall" role="dialog" aria-label=${"Cerdito " + (v.pg.name)}>
    <div style="width: 40px; height: 5px; border-radius: 9px; background: var(--apline); margin: 0 auto 12px; flex-shrink: 0"></div>
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-shrink: 0">
      <div style="min-width: 0"><div style="font-family: 'Sora', sans-serif; font-size: 21px; font-weight: 600">${v.pg.name}</div><div style="font-size: 13px; color: var(--apmut); margin-top: 3px">${v.pg.amt} de ${v.pg.goal} · ${v.pg.when}</div></div>
      <button onClick=${v.pg.close} aria-label="Cerrar" style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 14px; background: var(--apcard); display: flex; align-items: center; justify-content: center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg></button>
    </div>
    <div class="as-scroll">
      <div style="display: flex; align-items: baseline; justify-content: space-between; margin-top: 14px"><span style="font-family: 'Sora', sans-serif; font-size: 34px; font-weight: 600; letter-spacing: -.5px">${v.pg.pctTxt}</span><span style="font-size: 13px; color: var(--apmut)">faltan ${v.pg.faltan}</span></div>
      <div class="pw-meter" style="height: 12px"><span style=${"width: " + (v.pg.pct) + "%; background: #22b573"}></span></div>

      <div class="ap-lbl">Abonar o retirar</div>
      <label class="ap-fl" for="pg-monto" style="margin-top: 0">Monto</label>
      <input id="pg-monto" class="ap-in" inputmode="numeric" placeholder="$ 0" value=${v.pg.monto} onInput=${v.pg.setMonto} style="font-size: 22px; height: 56px" />
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px">${((v.pg.quick) || []).map((qq, $index) => html`<button class="ap-chip" onClick=${qq.pick}>${qq.label}</button>`)}</div>
      <label class="ap-fl" for="pg-nota">Nota (opcional)</label>
      <input id="pg-nota" class="ap-in" placeholder="Ej. prima de junio" value=${v.pg.nota} onInput=${v.pg.setNota} />
      ${(v.pg.hasErr) ? html`<div class="ap-err">${v.pg.err}</div>` : null}
      ${(v.pg.hasOk) ? html`<div class="ap-ok">${v.pg.ok}</div>` : null}
      <div style="display: flex; gap: 8px; margin-top: 12px"><button class="ap-go" style="margin-top: 0" onClick=${v.pg.abonar}>Abonar</button><button class="ap-alt" style="margin-top: 0; height: 54px" onClick=${v.pg.retirar}>Retirar</button></div>

      <div class="ap-lbl">Historial</div>
      <div style="display: flex; flex-direction: column; gap: 8px">
        ${((v.pg.movs) || []).map((pm, $index) => html`
          <div class="ed-item">
            <span style=${"width: 10px; height: 36px; border-radius: 6px; flex-shrink: 0; background: " + (pm.color)}></span>
            <div style="flex: 1; min-width: 0"><div style="font-weight: 800; font-size: 14.5px">${pm.vTxt}</div><div style="font-size: 12px; color: var(--apmut); margin-top: 2px">${pm.sub}</div></div>
            <button class=${"ed-btn " + (pm.delCls)} onClick=${pm.del} aria-label="Eliminar movimiento">${pm.delTxt}</button>
          </div>
        `)}
      </div>
      ${(v.pg.noMovs) ? html`<div style="font-size: 13px; color: var(--apmut); padding: 4px 2px">Aún no hay abonos.</div>` : null}

      <div class="ap-lbl">Editar cerdito</div>
      <label class="ap-fl" for="pg-nombre" style="margin-top: 0">Nombre</label>
      <input id="pg-nombre" class="ap-in" value=${v.pg.fNombre} onInput=${v.pg.setNombre} />
      <label class="ap-fl" for="pg-meta">Meta de ahorro</label>
      <input id="pg-meta" class="ap-in" inputmode="numeric" placeholder="$ 0" value=${v.pg.fMeta} onInput=${v.pg.setMeta} />
      <label class="ap-fl" for="pg-fecha">Meta para (opcional)</label>
      <input id="pg-fecha" class="ap-in" type="month" value=${v.pg.fFecha} onInput=${v.pg.setFecha} />
      <button class="ap-go" onClick=${v.pg.guardar}>Guardar cambios</button>
      <button class="ap-alt danger-t" onClick=${v.pg.eliminar}>${v.pg.delPigTxt}</button>
    </div>
  </div>
` : null}
</div>`;
}
