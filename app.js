import { h, render, Component } from './vendor/preact.mjs';
import htm from './vendor/htm.mjs';
import view from './view.js';
const html = htm.bind(h);

/* ============ utilidades ============ */
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MESL = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const pDate = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d || 1); };
const lastDay = (y, m) => new Date(y, m + 1, 0).getDate();
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const num = (v) => { const n = parseFloat(String(v == null ? '' : v).replace(/[^0-9,.-]/g, '').replace(/\./g, '').replace(',', '.')); return isFinite(n) ? n : 0; };
const fmt = (n) => (n < 0 ? '−' : '') + '$ ' + String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const miles = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const short = (n) => n >= 1e6 ? (Math.round(n / 1e5) / 10).toString().replace('.', ',') + 'M' : (n >= 1000 ? Math.round(n / 1000) + 'K' : String(Math.round(n)));
const pctTxt = (x) => String(Math.round(x * 10) / 10).replace('.', ',') + '%';
const dayTxt = (s) => { const d = pDate(s); return d.getDate() + ' ' + MES[d.getMonth()]; };
function nextDayOfMonth(day, from) {
  if (!day) return null;
  let y = from.getFullYear(), m = from.getMonth();
  let d = new Date(y, m, Math.min(day, lastDay(y, m)));
  if (d < new Date(from.getFullYear(), from.getMonth(), from.getDate())) { m += 1; if (m > 11) { m = 0; y += 1; } d = new Date(y, m, Math.min(day, lastDay(y, m))); }
  return d;
}

/* ============ datos ============ */
const KEY = 'mf-data-v1', CLOUD = 'mf-cloud-v1';
function blank() {
  return { v: 1, updatedAt: 0, perfil: { nombre: '', ingresoQuincena: 0 }, movs: [], tarjetas: [], vehiculos: [], cerditos: [], creditos: [], plan: 'bal', prefs: { look: null, theme: 'auto' }, onboarded: false };
}
function normalize(d) {
  const b = blank(); d = d && typeof d === 'object' ? d : {};
  const o = Object.assign(b, d);
  o.perfil = Object.assign(blank().perfil, d.perfil || {});
  o.prefs = Object.assign(blank().prefs, d.prefs || {});
  ['movs', 'tarjetas', 'vehiculos', 'cerditos', 'creditos'].forEach((k) => { if (!Array.isArray(o[k])) o[k] = []; });
  return o;
}
function loadLocal() { try { return normalize(JSON.parse(localStorage.getItem(KEY))); } catch (e) { return blank(); } }
function saveLocal(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
function loadCloudCfg() { try { return JSON.parse(localStorage.getItem(CLOUD)) || null; } catch (e) { return null; } }

const ADDS = ['Diario', 'Tarjeta', 'Vehículo', 'Hogar', 'Cerdito', 'Ingreso', 'Pago tarjeta'];
const ADD_MAP = [
  { tipo: 'gasto', cat: 'diario' }, { tipo: 'gasto', cat: 'tarjeta', need: 'tarjetas' }, { tipo: 'gasto', cat: 'vehiculo', need: 'vehiculos', optional: true },
  { tipo: 'gasto', cat: 'hogar' }, { tipo: 'aporte', cat: 'cerdito', need: 'cerditos' }, { tipo: 'ingreso', cat: 'ingreso' }, { tipo: 'pagoTarjeta', cat: 'tarjeta', need: 'tarjetas' }
];
const CAT_IDX = { diario: 0, tarjeta: 1, vehiculo: 2, hogar: 3 };
const CAT_NAME = { diario: 'Diario', tarjeta: 'Tarjeta', vehiculo: 'Vehículo', hogar: 'Hogar', cerdito: 'Cerdito', ingreso: 'Ingreso' };
const TIPO_NAME = { gasto: 'Gasto', ingreso: 'Ingreso', aporte: 'Ahorro', pagoTarjeta: 'Pago de tarjeta' };

/* ============ configuración de estilos ============ */
const CFG = {
  nb: { splash: [2400, 2950], periods: ['15 días', 'Mes', 'Año'], subs: ['Todo', 'Tarjetas', 'Vehículo'],
    cat: ['var(--a1)', 'var(--a2)', 'var(--a3)', 'var(--a4)'], pig: ['var(--a1)', 'var(--a2)', 'var(--a3)', 'var(--a4)'], cred: ['var(--a2)', 'var(--a3)', 'var(--a1)', 'var(--a4)'],
    catW: 'pct', bar: [120, 6], vPre: 'minus', planD: { con: '10% del ingreso', bal: '20% · 50/30/20', amb: '30% del ingreso' },
    tjBg: ['linear-gradient(135deg, rgba(var(--a2c),.5), rgba(var(--a2c),.14))', 'linear-gradient(135deg, rgba(var(--a1c),.45), rgba(var(--a1c),.12))', 'linear-gradient(135deg, rgba(var(--a3c),.45), rgba(var(--a3c),.12))'], tjSolid: [''] },
  vt: { splash: [2400, 3050], periods: ['15D', 'MES', 'AÑO'], subs: ['Todo', 'Tarjetas', 'Vehículo'],
    cat: ['#d6ff3d', '#e9e4d4', '#ff6b3d', '#7aa7ff'], pig: ['#d6ff3d', '#7aa7ff', '#ff6b3d', '#e9e4d4'], cred: ['#ff6b3d', '#7aa7ff', '#d6ff3d', '#e9e4d4'],
    catW: 'grow', bar: [124, 6], vPre: 'minus2', planD: { con: '10%', bal: '20% · 50/30/20', amb: '30%' }, tjBg: [''], tjSolid: ['#e9e4d4', '#7aa7ff', '#d6ff3d'] },
  lb: { splash: [2500, 3250], periods: ['Quincena', 'Mes', 'Año'], subs: ['Todo', 'Tarjetas', 'Vehículo'],
    cat: ['var(--t1)', 'var(--t2)', 'var(--t3)', 'var(--t4)'], pig: ['var(--t1)', 'var(--t2)', 'var(--t3)', 'var(--t4)'], cred: ['var(--t1)', 'var(--t2)', 'var(--t3)', 'var(--t4)'],
    catW: 'rel', bar: [126, 6], vPre: 'none', planD: { con: 'Plan suave: el 10% de lo que entra.', bal: 'Plan balanceado: regla 50/30/20.', amb: 'Plan intenso: el 30% de lo que entra.' }, tjBg: [''], tjSolid: [''] },
  al: { splash: [2800, 3500], periods: ['15 días', 'Mes', 'Año'], subs: ['Todo', 'Tarjetas', 'Vehículo'],
    cat: ['#ffc94d', '#6fa8ff', '#3cc59a', '#b79cff'], pig: ['#6fa8ff', '#3cc59a', '#ffc94d', '#ff6f91'], cred: ['#ff6f91', '#6fa8ff', '#3cc59a', '#ffc94d'],
    catW: 'rel', bar: [122, 8], vPre: 'none', planD: { con: '10%', bal: '20%', amb: '30%' }, tjBg: [''], tjSolid: ['#6fa8ff', '#b79cff', '#3cc59a'] }
};
const LOOKS = [
  { id: 'nb', name: 'Nimbo', desc: 'Vidrio y luz', font: "'Sora', sans-serif", weight: 600, fstyle: 'normal', rad: '50%',
    dark: { bg: '#06070c', fg: '#eef1ff', edge: 'rgba(255,255,255,.12)', a: ['#7cf3ff', '#b69cff', '#ff9ecf'] }, light: { bg: '#eef0f7', fg: '#12142a', edge: 'rgba(18,20,42,.1)', a: ['#0a8fb0', '#6d4dff', '#d63f86'] } },
  { id: 'vt', name: 'Volt', desc: 'Bento audaz', font: "'Unbounded', sans-serif", weight: 800, fstyle: 'normal', rad: '3px',
    dark: { bg: '#0f0f0d', fg: '#f3f2ea', edge: '#2e2e29', a: ['#d6ff3d', '#ff6b3d', '#7aa7ff'] }, light: { bg: '#efeee6', fg: '#0f0f0d', edge: '#d9d7cc', a: ['#b8e000', '#ff6b3d', '#7aa7ff'] } },
  { id: 'lb', name: 'Libreta', desc: 'Editorial', font: "'Fraunces', serif", weight: 300, fstyle: 'italic', rad: '0',
    dark: { bg: '#16140f', fg: '#ede5d5', edge: '#3d372d', a: ['#e8805f', '#8fb0d6', '#a9bd74'] }, light: { bg: '#f3ede2', fg: '#1d1b17', edge: '#cfc6b4', a: ['#b8492a', '#3e5a7a', '#58683a'] } },
  { id: 'al', name: 'Alcancía', desc: 'Táctil y jugable', font: "'Bricolage Grotesque', sans-serif", weight: 800, fstyle: 'normal', rad: '4px',
    dark: { bg: '#1b1429', fg: '#fff4e6', edge: '#07040d', a: ['#ffc94d', '#ff6f91', '#3cc59a'] }, light: { bg: '#fff4e6', fg: '#2b2140', edge: '#2b2140', a: ['#ffc94d', '#ff6f91', '#3cc59a'] } }
];
const PLANS = { con: { n: 'Suave', p: 0.10 }, bal: { n: 'Balanceado', p: 0.20 }, amb: { n: 'Intenso', p: 0.30 } };

/* ============ créditos ============ */
function credCalc(c, today) {
  const P = c.monto, n = Math.max(1, c.plazo);
  const i = c.tipo === 'mv' ? c.tasa / 100 : Math.pow(1 + c.tasa / 100, 1 / 12) - 1;
  const cuota = i > 0 ? P * i / (1 - Math.pow(1 + i, -n)) : P / n;
  const [y, m] = String(c.inicio).split('-').map(Number);
  const el = (today.getFullYear() - y) * 12 + (today.getMonth() + 1 - m);
  const k = Math.max(0, Math.min(n, el));
  let saldo = k >= n ? 0 : (i > 0 ? P * Math.pow(1 + i, k) - cuota * (Math.pow(1 + i, k) - 1) / i : P - cuota * k);
  saldo = Math.max(0, saldo);
  const endIdx = (m - 1) + n;
  const ea = c.tipo === 'mv' ? (Math.pow(1 + i, 12) - 1) * 100 : c.tasa;
  return { i, cuota, k, n, saldo, totalInt: cuota * n - P, restInt: Math.max(0, cuota * (n - k) - saldo), endTxt: MES[endIdx % 12] + ' ' + (y + Math.floor(endIdx / 12)), iniTxt: MES[m - 1] + ' ' + y, ea };
}
function simExtra(calc, extra) {
  let b = calc.saldo, months = 0, int = 0;
  while (b > 0.5 && months < 600) { const it = b * calc.i; int += it; b = b + it - calc.cuota - extra; months++; }
  return { months, int };
}

/* ============ app ============ */
class App extends Component {
  constructor() {
    super();
    const data = loadLocal();
    this.cloud = loadCloudCfg();
    this.state = {
      data, splash: 'in', tab: 'inicio', sub: 'diario', period: 'q', shown: 0, sysDark: this.sysDark(),
      sheet: false, addCat: 0, mv: { monto: '', nota: '' }, mvTarget: null, mvErr: '', toast: false,
      panel: false, welcome: false, morph: null, cred: false, cf: this.emptyCf(), asist: false, asistStep: 0,
      ed: null, movSel: null, movConfirm: false, vehSel: 0,
      sync: { status: this.cloud ? 'idle' : 'off', last: 0, email: '', msg: '' },
      cloudForm: { url: (this.cloud && this.cloud.url) || '', key: (this.cloud && this.cloud.key) || '', email: '', password: '', modo: 'entrar' }
    };
  }
  /* ---------- ciclo de vida ---------- */
  sysDark() { try { return matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) { return true; } }
  componentDidMount() {
    try { this.mq = matchMedia('(prefers-color-scheme: dark)'); this.mq.addEventListener('change', (e) => this.setState({ sysDark: e.matches })); } catch (e) {}
    addEventListener('online', () => this.schedulePush(200));
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') this.pull(); });
    this.initCloud();
    this.boot();
  }
  look() { return CFG[this.state.data.prefs.look] ? this.state.data.prefs.look : 'nb'; }
  isDark() { const t = this.state.data.prefs.theme; return t === 'dark' || (t === 'auto' && this.state.sysDark); }
  boot() {
    const c = CFG[this.look()];
    clearTimeout(this.t1); clearTimeout(this.t2);
    this.t1 = setTimeout(() => this.setState({ splash: 'out' }), c.splash[0]);
    this.t2 = setTimeout(() => {
      this.setState({ splash: false });
      this.countTo(this.per().total, 0);
      if (!this.state.data.onboarded && !this.state.ed) setTimeout(() => this.openEd('perfil', { welcome: true }), 500);
    }, c.splash[1]);
  }
  replay() { cancelAnimationFrame(this.raf); this.setState({ splash: 'in', shown: 0, tab: 'inicio', sheet: false, panel: false }); this.boot(); }
  countTo(target, from) {
    cancelAnimationFrame(this.raf);
    const t0 = performance.now(), d = 1000;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 4);
      this.setState({ shown: Math.round(from + (target - from) * e) });
      if (k < 1) this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }
  toast() { clearTimeout(this.t3); this.setState({ toast: true }); this.t3 = setTimeout(() => this.setState({ toast: false }), 2300); }

  /* ---------- mutaciones ---------- */
  mut(fn, opts) {
    const d = JSON.parse(JSON.stringify(this.state.data));
    fn(d);
    d.updatedAt = Date.now();
    saveLocal(d);
    this.setState({ data: d }, () => { if (opts && opts.recount) this.countTo(this.per().total, this.state.shown); });
    this.schedulePush();
  }
  go(t) {
    if (t === this.state.tab) return;
    if (t === 'inicio') { this.setState({ tab: t, shown: 0 }); this.countTo(this.per().total, 0); } else this.setState({ tab: t });
  }
  setPeriod(id) { this.setState({ period: id }, () => this.countTo(this.per().total, this.state.shown)); }

  /* ---------- periodos ---------- */
  bounds(kind, ref) {
    const y = ref.getFullYear(), m = ref.getMonth(), d = ref.getDate();
    if (kind === 'q') {
      if (d <= 15) { const pm = m === 0 ? 11 : m - 1, py = m === 0 ? y - 1 : y; return { from: new Date(y, m, 1), to: new Date(y, m, 15), pf: new Date(py, pm, 16), pt: new Date(py, pm, lastDay(py, pm)), nQ: 1 }; }
      return { from: new Date(y, m, 16), to: new Date(y, m, lastDay(y, m)), pf: new Date(y, m, 1), pt: new Date(y, m, 15), nQ: 1 };
    }
    if (kind === 'm') { const pm = m === 0 ? 11 : m - 1, py = m === 0 ? y - 1 : y; return { from: new Date(y, m, 1), to: new Date(y, m, lastDay(y, m)), pf: new Date(py, pm, 1), pt: new Date(py, pm, lastDay(py, pm)), nQ: 2 }; }
    return { from: new Date(y, 0, 1), to: new Date(y, m, d), pf: new Date(y - 1, 0, 1), pt: new Date(y - 1, m, Math.min(d, lastDay(y - 1, m))), nQ: m * 2 + (d > 15 ? 2 : 1) };
  }
  sumRange(movs, from, to, pred) { const a = iso(from), b = iso(to); let t = 0; for (const x of movs) if (x.fecha >= a && x.fecha <= b && pred(x)) t += x.monto; return t; }
  per(kind) {
    kind = kind || this.state.period;
    const D = this.state.data, now = new Date(), b = this.bounds(kind, now), movs = D.movs;
    const isG = (x) => x.tipo === 'gasto';
    const total = this.sumRange(movs, b.from, b.to, isG), prev = this.sumRange(movs, b.pf, b.pt, isG);
    const cats = ['diario', 'tarjeta', 'vehiculo', 'hogar'].map((c) => this.sumRange(movs, b.from, b.to, (x) => isG(x) && x.cat === c));
    const ingreso = D.perfil.ingresoQuincena * b.nQ + this.sumRange(movs, b.from, b.to, (x) => x.tipo === 'ingreso');
    const y = now.getFullYear(), m = now.getMonth(), pm = m === 0 ? 11 : m - 1;
    const L = {
      q: { label: 'Esta quincena', range: b.from.getDate() + ' – ' + b.to.getDate() + ' ' + MES[m], lead: 'esta quincena', vs: 'vs quincena anterior', vsLong: 'que la quincena pasada' },
      m: { label: cap(MESL[m]), range: '1 – ' + b.to.getDate() + ' ' + MES[m], lead: 'en ' + MESL[m], vs: 'vs ' + MESL[pm], vsLong: 'que en ' + MESL[pm] },
      a: { label: 'Año ' + y, range: 'ene – ' + MES[m], lead: 'en lo que va de ' + y, vs: 'vs mismo corte ' + (y - 1), vsLong: 'que al mismo corte de ' + (y - 1) }
    }[kind];
    return Object.assign(L, { total, prev, cats, ingreso, from: b.from, to: b.to });
  }

  /* ---------- movimientos ---------- */
  itemOf(x, c) {
    const D = this.state.data, name = (arr, id) => { const o = arr.find((z) => z.id === id); return o ? o.nombre : '(eliminado)'; };
    let t = x.nota, dest = '';
    if (x.tipo === 'aporte') { dest = name(D.cerditos, x.cerditoId); t = t || 'Aporte a ' + dest; }
    else if (x.tipo === 'pagoTarjeta') { dest = name(D.tarjetas, x.tarjetaId); t = t || 'Pago de ' + dest; }
    else if (x.tipo === 'ingreso') t = t || 'Ingreso';
    else {
      if (x.tarjetaId) dest = name(D.tarjetas, x.tarjetaId);
      if (x.vehiculoId) dest = name(D.vehiculos, x.vehiculoId);
      t = t || { diario: 'Gasto diario', tarjeta: 'Compra con tarjeta', vehiculo: 'Gasto del vehículo', hogar: 'Hogar' }[x.cat] || 'Gasto';
    }
    const today = iso(new Date()), yest = iso(new Date(Date.now() - 864e5));
    const dt = x.fecha === today ? 'Hoy' : (x.fecha === yest ? 'Ayer' : dayTxt(x.fecha));
    const hr = x.ts && x.fecha === today ? ' · ' + pad(new Date(x.ts).getHours()) + ':' + pad(new Date(x.ts).getMinutes()) : '';
    const sign = x.tipo === 'ingreso' ? '+' : (x.tipo === 'aporte' ? '→' : '−');
    const vTxt = c.vPre === 'minus' ? sign + ' ' + fmt(x.monto) : (c.vPre === 'minus2' ? sign + fmt(x.monto).slice(1) : (sign === '−' ? fmt(x.monto) : sign + ' ' + fmt(x.monto)));
    const cat = x.tipo === 'aporte' ? 'Cerdito' : (x.tipo === 'ingreso' ? 'Ingreso' : (x.tipo === 'pagoTarjeta' ? 'Pago tarjeta' : CAT_NAME[x.cat]));
    const ci = x.tipo === 'gasto' ? CAT_IDX[x.cat] : (x.tipo === 'aporte' ? 0 : 3);
    return { id: x.id, dest, t, s: dt + hr + (dest && x.tipo === 'gasto' ? ' · ' + dest : ''), v: x.monto, vTxt, cat, color: (x.tipo === 'aporte' ? c.pig : c.cat)[ci], open: () => this.setState({ movSel: x.id, movConfirm: false }) };
  }
  sortMovs(arr) { return arr.slice().sort((a, b) => (b.fecha + (b.ts || 0)).localeCompare(a.fecha + (a.ts || 0)) || (b.ts || 0) - (a.ts || 0)); }
  saveMov() {
    const s = this.state, map = ADD_MAP[s.addCat], monto = num(s.mv.monto), D = s.data;
    if (!(monto > 0)) return this.setState({ mvErr: 'Escribe el monto.' });
    const opts = map.need ? D[map.need] : [];
    let target = s.mvTarget && opts.some((o) => o.id === s.mvTarget) ? s.mvTarget : (opts[0] && opts[0].id);
    if (map.need && !map.optional && !target) return this.setState({ mvErr: { tarjetas: 'Primero agrega una tarjeta en Ajustes → Tarjetas.', cerditos: 'Primero crea un cerdito en Ajustes → Cerditos.' }[map.need] });
    const mov = { id: uid(), fecha: iso(new Date()), ts: Date.now(), tipo: map.tipo, cat: map.cat, monto, nota: s.mv.nota.trim() };
    if (map.need === 'tarjetas') mov.tarjetaId = target;
    if (map.need === 'vehiculos' && target) mov.vehiculoId = target;
    if (map.need === 'cerditos') mov.cerditoId = target;
    this.setState({ sheet: false, mv: { monto: '', nota: '' }, mvErr: '' });
    this.mut((d) => d.movs.push(mov), { recount: true });
    this.toast();
  }
  delMov(id) { this.mut((d) => { d.movs = d.movs.filter((x) => x.id !== id); }, { recount: true }); this.setState({ movSel: null, movConfirm: false }); }

  /* ---------- editor genérico ---------- */
  openEd(kind, extra) { this.setState({ ed: Object.assign({ kind, editId: null, form: this.edDefaults(kind), err: '', confirm: null, welcome: false }, extra || {}), panel: false, sheet: false }); }
  edDefaults(kind) {
    const P = this.state.data.perfil;
    return {
      perfil: { nombre: P.nombre, ingresoQuincena: P.ingresoQuincena ? String(P.ingresoQuincena) : '' },
      tarjetas: { nombre: '', ult4: '', cupo: '', usadoInicial: '', corte: '', pago: '' },
      vehiculos: { nombre: '', tipo: 'moto', km: '', aceiteKm: '', aceiteCada: '', soat: '' },
      cerditos: { nombre: '', meta: '', inicial: '', fecha: '' },
      creditos: {}, datos: {}
    }[kind];
  }
  setEdF(k, v) { const ed = this.state.ed; this.setState({ ed: Object.assign({}, ed, { form: Object.assign({}, ed.form, { [k]: v }), err: '' }) }); }
  edSave() {
    const ed = this.state.ed, f = ed.form, k = ed.kind;
    const err = (m) => this.setState({ ed: Object.assign({}, ed, { err: m }) });
    if (k === 'perfil') {
      if (!f.nombre.trim()) return err('Escribe tu nombre.');
      this.mut((d) => { d.perfil.nombre = f.nombre.trim(); d.perfil.ingresoQuincena = num(f.ingresoQuincena); }, { recount: true });
      if (ed.welcome) return this.openEd('datos', { welcome: true });
      return this.setState({ ed: null });
    }
    if (k === 'creditos') return this.setState({ ed: null, cred: true });
    if (k === 'datos') return this.cloudSubmit();
    let item;
    if (k === 'tarjetas') {
      if (!f.nombre.trim()) return err('Ponle un nombre a la tarjeta.');
      if (!(num(f.cupo) > 0)) return err('Escribe el cupo de la tarjeta.');
      item = { nombre: f.nombre.trim(), ult4: String(f.ult4).replace(/\D/g, '').slice(-4), cupo: num(f.cupo), usadoInicial: num(f.usadoInicial), corte: Math.min(31, Math.max(0, Math.round(num(f.corte)))), pago: Math.min(31, Math.max(0, Math.round(num(f.pago)))) };
    }
    if (k === 'vehiculos') {
      if (!f.nombre.trim()) return err('Ponle un nombre, por ejemplo "Mi moto".');
      const cada = num(f.aceiteCada) || (f.tipo === 'carro' ? 5000 : 3000);
      item = { nombre: f.nombre.trim(), tipo: f.tipo, km: num(f.km), aceiteKm: num(f.aceiteKm), aceiteCada: cada, soat: f.soat || '' };
    }
    if (k === 'cerditos') {
      if (!f.nombre.trim()) return err('Ponle un nombre al cerdito.');
      if (!(num(f.meta) > 0)) return err('Escribe cuánto quieres ahorrar.');
      item = { nombre: f.nombre.trim(), meta: num(f.meta), inicial: num(f.inicial), fecha: f.fecha || '' };
    }
    const id = ed.editId;
    this.mut((d) => {
      if (id) d[k] = d[k].map((o) => (o.id === id ? Object.assign({}, o, item) : o));
      else d[k].push(Object.assign({ id: uid() }, item));
    });
    this.setState({ ed: Object.assign({}, ed, { editId: null, form: this.edDefaults(k), err: '' }) });
  }
  edEdit(o) {
    const k = this.state.ed.kind, S = (x) => (x ? String(x) : '');
    const form = k === 'tarjetas' ? { nombre: o.nombre, ult4: o.ult4 || '', cupo: S(o.cupo), usadoInicial: S(o.usadoInicial), corte: S(o.corte), pago: S(o.pago) }
      : k === 'vehiculos' ? { nombre: o.nombre, tipo: o.tipo || 'moto', km: S(o.km), aceiteKm: S(o.aceiteKm), aceiteCada: S(o.aceiteCada), soat: o.soat || '' }
      : { nombre: o.nombre, meta: S(o.meta), inicial: S(o.inicial), fecha: o.fecha || '' };
    this.setState({ ed: Object.assign({}, this.state.ed, { editId: o.id, form, err: '' }) });
  }
  edDel(id) {
    const ed = this.state.ed;
    if (ed.confirm !== id) return this.setState({ ed: Object.assign({}, ed, { confirm: id }) });
    this.mut((d) => { d[ed.kind] = d[ed.kind].filter((o) => o.id !== id); }, { recount: true });
    this.setState({ ed: Object.assign({}, this.state.ed, { confirm: null, editId: ed.editId === id ? null : ed.editId }) });
  }
  closeEd() {
    const ed = this.state.ed;
    this.setState({ ed: null });
    if (ed && ed.welcome) this.finishWelcome();
  }
  finishWelcome() {
    if (!this.state.data.onboarded) { this.mut((d) => { d.onboarded = true; }); this.setState({ ed: null, panel: true, welcome: true }); }
  }

  /* ---------- nube (Supabase) ---------- */
  initCloud() {
    if (!this.cloud || !window.supabase) return;
    try {
      this.sb = window.supabase.createClient(this.cloud.url, this.cloud.key, { auth: { persistSession: true, autoRefreshToken: true, storageKey: 'mf-auth' } });
    } catch (e) { this.setSync({ status: 'err', msg: 'La URL o la clave de Supabase no son válidas.' }); return; }
    this.sb.auth.onAuthStateChange((_ev, session) => { this.session = session; this.setSync({ email: session ? session.user.email : '', status: session ? this.state.sync.status : 'idle' }); });
    this.sb.auth.getSession().then(({ data }) => { this.session = data.session; if (this.session) { this.setSync({ email: this.session.user.email }); this.pull(); } else this.setSync({ status: 'idle' }); });
  }
  setSync(o) { this.setState({ sync: Object.assign({}, this.state.sync, o) }); }
  async pull() {
    if (!this.sb || !this.session) return;
    if (!navigator.onLine) return this.setSync({ status: 'offline' });
    this.setSync({ status: 'busy' });
    const { data: row, error } = await this.sb.from('finanzas').select('data, updated_at').eq('user_id', this.session.user.id).maybeSingle();
    if (error) return this.setSync({ status: 'err', msg: this.errTxt(error) });
    const local = this.state.data;
    if (row && new Date(row.updated_at).getTime() > (local.updatedAt || 0)) {
      const d = normalize(row.data); d.updatedAt = new Date(row.updated_at).getTime();
      saveLocal(d); this.setState({ data: d }, () => this.countTo(this.per().total, 0));
      this.setSync({ status: 'ok', last: Date.now(), msg: '' });
    } else if (!row || (local.updatedAt || 0) > new Date(row.updated_at).getTime()) {
      await this.push();
    } else this.setSync({ status: 'ok', last: Date.now(), msg: '' });
  }
  schedulePush(ms) { clearTimeout(this.tp); if (this.sb && this.session) this.tp = setTimeout(() => this.push(), ms || 1200); }
  async push() {
    if (!this.sb || !this.session) return;
    if (!navigator.onLine) return this.setSync({ status: 'offline' });
    this.setSync({ status: 'busy' });
    const d = this.state.data;
    const { error } = await this.sb.from('finanzas').upsert({ user_id: this.session.user.id, data: d, updated_at: new Date(d.updatedAt || Date.now()).toISOString() });
    if (error) return this.setSync({ status: 'err', msg: this.errTxt(error) });
    this.setSync({ status: 'ok', last: Date.now(), msg: '' });
  }
  errTxt(e) {
    const m = (e && e.message) || String(e);
    if (/relation .*finanzas.* does not exist|Could not find the table/i.test(m)) return 'Falta crear la tabla: ejecuta el script supabase.sql en el SQL Editor.';
    if (/Invalid login credentials/i.test(m)) return 'Correo o contraseña incorrectos.';
    if (/Email not confirmed/i.test(m)) return 'Confirma tu correo (revisa tu bandeja) y vuelve a entrar.';
    if (/Failed to fetch|NetworkError/i.test(m)) return 'No hay conexión con Supabase. Revisa la URL o tu internet.';
    if (/already registered/i.test(m)) return 'Ese correo ya tiene cuenta: elige "Entrar".';
    return m;
  }
  async cloudSubmit() {
    const f = this.state.cloudForm, ed = this.state.ed;
    const err = (m) => this.setState({ ed: Object.assign({}, this.state.ed, { err: m }) });
    if (!this.sb) {
      const url = f.url.trim().replace(/\/+$/, ''), key = f.key.trim();
      if (!/^https:\/\/.+/.test(url)) return err('Pega la Project URL (empieza por https://).');
      if (key.length < 20) return err('Pega la clave anon / publishable.');
      if (!window.supabase) return err('No se pudo cargar el cliente de Supabase. Revisa tu conexión.');
      this.cloud = { url, key };
      try { localStorage.setItem(CLOUD, JSON.stringify(this.cloud)); } catch (e) {}
      this.initCloud();
    }
    if (!/.+@.+\..+/.test(f.email)) return err('Escribe tu correo.');
    if (f.password.length < 6) return err('La contraseña debe tener al menos 6 caracteres.');
    this.setState({ ed: Object.assign({}, ed, { err: '', busy: true }) });
    const res = f.modo === 'crear' ? await this.sb.auth.signUp({ email: f.email.trim(), password: f.password })
      : await this.sb.auth.signInWithPassword({ email: f.email.trim(), password: f.password });
    this.setState({ ed: Object.assign({}, this.state.ed, { busy: false }) });
    if (res.error) return err(this.errTxt(res.error));
    if (!res.data.session) return err('Te enviamos un correo para confirmar la cuenta. Confírmala y luego entra aquí con "Entrar".');
    this.session = res.data.session;
    this.setState({ cloudForm: Object.assign({}, this.state.cloudForm, { password: '' }) });
    this.setSync({ email: this.session.user.email });
    await this.pull();
    if (ed && ed.welcome) { this.setState({ ed: null }); this.finishWelcome(); }
  }
  async logout() { if (this.sb) await this.sb.auth.signOut(); this.session = null; this.setSync({ status: 'idle', email: '' }); }
  resetCloud() { try { localStorage.removeItem(CLOUD); } catch (e) {} this.cloud = null; this.sb = null; this.session = null; this.setSync({ status: 'off', email: '', msg: '' }); this.setState({ cloudForm: Object.assign({}, this.state.cloudForm, { url: '', key: '' }) }); }
  exportData() {
    const blob = new Blob([JSON.stringify(this.state.data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'mis-finanzas-' + iso(new Date()) + '.json';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  importData(e) {
    const file = e.target.files && e.target.files[0]; if (!file) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const d = normalize(JSON.parse(rd.result));
        if (!Array.isArray(d.movs)) throw new Error('x');
        d.onboarded = true; this.mut((x) => { Object.keys(x).forEach((k) => delete x[k]); Object.assign(x, d); }, { recount: true });
        this.setState({ ed: Object.assign({}, this.state.ed, { err: '' }) }); this.toast();
      } catch (er) { this.setState({ ed: Object.assign({}, this.state.ed, { err: 'Ese archivo no es una copia válida de Mis Finanzas.' }) }); }
    };
    rd.readAsText(file); e.target.value = '';
  }

  /* ---------- asistente ---------- */
  openAsist() {
    [this.a1, this.a2, this.a3].forEach((t) => clearTimeout(t));
    this.setState({ asist: true, asistStep: 0, panel: false, sheet: false });
    this.a1 = setTimeout(() => this.setState({ asistStep: 1 }), 550);
    this.a2 = setTimeout(() => this.setState({ asistStep: 2 }), 1100);
    this.a3 = setTimeout(() => this.setState({ asistStep: 3 }), 1650);
  }
  buildRecs(ctx) {
    const D = this.state.data, recs = [], f = fmt;
    const { credx, cards, pigs, meta, savedCur, q, veh } = ctx;
    const activos = credx.filter((o) => o.x.saldo > 0);
    if (activos.length) {
      const top = activos.slice().sort((a, b) => b.x.ea - a.x.ea)[0], sim = simExtra(top.x, 200000);
      const mSaved = (top.x.n - top.x.k) - sim.months, iSaved = top.x.restInt - sim.int;
      if (mSaved > 0) recs.push({ tag: 'Crédito', tone: 'tip', title: 'Abona $ 200.000 extra al mes a “' + top.c.name + '”', body: 'Es tu deuda más cara (' + pctTxt(top.x.ea) + ' E.A.). Pide al banco que el abono vaya a capital con reducción de plazo.', impact: 'Terminas ' + mSaved + ' meses antes y ahorras ' + f(iSaved) + ' en intereses' });
    }
    const hot = cards.filter((t) => t.cupo > 0).sort((a, b) => b.used / b.cupo - a.used / a.cupo)[0];
    if (hot && hot.used / hot.cupo > 0.3) recs.push({ tag: 'Tarjeta', tone: 'warn', title: 'Baja el uso de tu ' + hot.name + ' al 30%', body: 'Hoy usas el ' + Math.round(hot.used / hot.cupo * 100) + '% del cupo.' + (hot.pagoD ? ' Paga el total antes del ' + hot.pago + '.' : '') + ' Evita diferir compras: no pagas intereses y cuidas tu historial.', impact: 'Meta: dejarla por debajo de ' + f(hot.cupo * 0.3) });
    if (q.total > 0) {
      const share = q.cats[0] / q.total * 100, pig = pigs.find((p) => p.faltaN > 0);
      if (share >= 30) {
        let impact = 'Recortar $ 10.000 al día libera $ 150.000 por quincena';
        if (pig) { const a = Math.ceil(pig.faltaN / (pig.rate + 150000)); impact = 'Pasándolo a “' + pig.name + '” llegas en ' + a + ' quincenas' + (pig.rate > 0 ? ' en vez de ' + Math.ceil(pig.faltaN / pig.rate) : ''); }
        recs.push({ tag: 'Gasto diario', tone: 'tip', title: 'Diario se lleva el ' + Math.round(share) + '% de tu quincena', body: 'Almuerzos, transporte, mercado y domicilios. Un recorte pequeño y constante rinde más que uno grande.', impact });
      }
    }
    if (meta > 0 && savedCur < meta) recs.push({ tag: 'Ahorro', tone: 'tip', title: 'Te faltan ' + f(meta - savedCur) + ' para la meta de ' + MESL[new Date().getMonth()], body: 'Programa el traslado a tus cerditos apenas te paguen: lo que se ahorra primero no se gasta.', impact: 'Con eso cumples tu plan ' + PLANS[D.plan].n + ' al 100%' });
    if (activos.length && D.perfil.ingresoQuincena > 0) {
      const cuotas = activos.reduce((a, o) => a + o.x.cuota, 0), carga = cuotas / (D.perfil.ingresoQuincena * 2) * 100;
      recs.push({ tag: 'Deuda', tone: carga < 30 ? 'good' : 'warn', title: 'Tus cuotas son el ' + pctTxt(carga) + ' de tu ingreso', body: carga < 30 ? 'Estás por debajo del 30%, un nivel sano. Antes de pedir un crédito nuevo, espera a terminar uno de los actuales.' : 'Pasas del 30% recomendado. Prioriza abonar a la deuda más cara y no tomes créditos nuevos por ahora.', impact: 'Pagas ' + f(cuotas) + ' al mes en cuotas' });
    }
    if (veh && veh.real) {
      if (veh.faltaKm !== null && veh.faltaKm <= 500) recs.push({ tag: veh.nombre, tone: veh.faltaKm < 0 ? 'warn' : 'tip', title: veh.faltaKm < 0 ? 'El cambio de aceite está vencido' : 'Cambio de aceite en ' + miles(veh.faltaKm) + ' km', body: 'Apártalo desde ya para no sacarlo del gasto diario. Si ya lo hiciste, actualiza el kilometraje en Ajustes → Vehículos.', impact: 'Próximo cambio a los ' + miles(veh.aceiteKm) + ' km' });
      if (veh.soatDays !== null && veh.soatDays <= 30) recs.push({ tag: veh.nombre, tone: 'warn', title: veh.soatDays < 0 ? 'El SOAT está vencido' : 'El SOAT vence en ' + veh.soatDays + ' días', body: 'Renovarlo a tiempo evita multas e inmovilización.', impact: 'Vence el ' + veh.soatTxt });
    }
    if (q.prev > 0) {
      const delta = (q.total - q.prev) / q.prev * 100;
      if (delta < 0) recs.push({ tag: 'Resumen', tone: 'good', title: 'Vas ' + pctTxt(Math.abs(delta)) + ' por debajo de la quincena pasada', body: 'Buen ritmo. Si lo mantienes, cierras la quincena con dinero libre para tus cerditos.', impact: 'Disponible: ' + f(q.ingreso - q.total) });
      else if (delta > 10) recs.push({ tag: 'Resumen', tone: 'warn', title: 'Vas ' + pctTxt(delta) + ' por encima de la quincena pasada', body: 'Revisa en Gastos qué categoría subió más y ponle un tope para lo que queda.', impact: 'Llevas ' + f(q.total) + ' vs ' + f(q.prev) });
    }
    if (!D.movs.length) recs.push({ tag: 'Empezar', tone: 'tip', title: 'Registra tu primer gasto', body: 'Toca + cada vez que pagues algo. Con una semana de datos el asistente ya puede darte consejos útiles.', impact: 'Tarda menos de 5 segundos' });
    if (!D.perfil.ingresoQuincena) recs.push({ tag: 'Perfil', tone: 'tip', title: 'Agrega tu ingreso por quincena', body: 'Con él calculo cuánto te queda disponible y tu meta de ahorro.', impact: 'Ajustes → Perfil e ingreso' });
    if (!recs.length) recs.push({ tag: 'Resumen', tone: 'good', title: 'Todo en orden por ahora', body: 'No encontré alertas. Sigue registrando para detectar oportunidades.', impact: 'Vuelve a revisar la próxima quincena' });
    const tones = { tip: 'Oportunidad', warn: 'Atención', good: 'Vas bien' };
    return recs.map((r, i) => Object.assign(r, { cls: 'as-card ' + r.tone, toneTxt: tones[r.tone], delay: i * 110 }));
  }

  /* ---------- apariencia ---------- */
  pickLook(id) {
    if (id === this.look() || this.state.morph) return;
    const L = LOOKS.find((x) => x.id === id), bg = L[this.isDark() ? 'dark' : 'light'].bg;
    clearTimeout(this.t5); clearTimeout(this.t6);
    this.setState({ morph: { bg, out: false } });
    this.t5 = setTimeout(() => {
      this.mut((d) => { d.prefs.look = id; });
      this.setState({ panel: false, welcome: false, shown: 0, morph: { bg, out: true } }, () => this.countTo(this.per().total, 0));
    }, 480);
    this.t6 = setTimeout(() => this.setState({ morph: null }), 1000);
  }
  emptyCf() { const d = new Date(); return { name: '', monto: '', tasa: '', tipo: 'ea', plazo: '', inicio: d.getFullYear() + '-' + pad(d.getMonth() + 1) }; }
  cfParsed() { const cf = this.state.cf; return { name: cf.name.trim() || 'Mi crédito', monto: num(cf.monto), tasa: num(cf.tasa), tipo: cf.tipo, plazo: Math.round(num(cf.plazo)), inicio: cf.inicio }; }
  setCf(k, v) { this.setState({ cf: Object.assign({}, this.state.cf, { [k]: v }) }); }
  saveCred() {
    const c = this.cfParsed();
    if (!(c.monto > 0 && c.tasa > 0 && c.plazo > 0 && /^\d{4}-\d{2}$/.test(c.inicio))) return;
    this.mut((d) => d.creditos.push(Object.assign({ id: uid() }, c)));
    this.setState({ cred: false, cf: this.emptyCf(), tab: 'plan' });
  }

  /* ============ valores para la vista ============ */
  vals() {
    const s = this.state, D = s.data, lk = this.look(), c = CFG[lk], p = this.per(), now = new Date(), f = fmt;
    const dark = this.isDark(), mode = dark ? 'dark' : 'light';
    const y = now.getFullYear(), mI = now.getMonth(), todayIso = iso(now);
    // categorías
    const Cc = 339.29; let cum = 0; const donut = {};
    const cats = ['Diario', 'Tarjetas', 'Vehículo', 'Hogar'].map((name, i) => {
      const v = p.cats[i], fr = p.total > 0 ? v / p.total : 0, len = fr * Cc;
      donut['d' + i] = len.toFixed(1) + ' ' + (Cc - len).toFixed(1); donut['o' + i] = (-cum).toFixed(1); cum += len;
      const w = c.catW === 'grow' ? Math.round(fr * 1000) : (c.catW === 'rel' ? Math.min(100, Math.round(fr / 0.4 * 100)) : Math.round(fr * 100));
      return { name, val: f(v), pct: Math.round(fr * 100) + '%', w, color: c.cat[i], delay: 150 + i * 80 };
    });
    const pIdx = { q: 0, m: 1, a: 2 }[s.period], pT = [[0, 84], [104, 48], [172, 48]];
    const periods = ['q', 'm', 'a'].map((id, i) => ({ label: c.periods[i], w: pT[i][1], cls: s.period === id ? 'on' : '', pick: () => this.setPeriod(id) }));
    const sIds = ['diario', 'tarjetas', 'vehiculo'], sT = [[0, 64], [84, 76], [180, 80]], subIdx = sIds.indexOf(s.sub);
    const subs = sIds.map((id, i) => ({ label: c.subs[i], w: sT[i][1], cls: s.sub === id ? 'on' : '', pick: () => this.setState({ sub: id }) }));
    const hasPrev = p.prev > 0, delta = hasPrev ? Math.round((p.total - p.prev) / p.prev * 1000) / 10 : 0;
    const usedPct = p.ingreso > 0 ? Math.min(100, Math.round(p.total / p.ingreso * 100)) : 0;
    const tabIdx = { inicio: 0, gastos: 1, cerditos: 3, plan: 4 }[s.tab];
    const tb = {}; ['inicio', 'gastos', 'cerditos', 'plan'].forEach((t) => { tb[t] = s.tab === t ? 'on' : ''; });
    // movimientos
    const pm = this.sortMovs(D.movs.filter((x) => x.fecha >= iso(p.from) && x.fecha <= iso(p.to)));
    const all = this.sortMovs(D.movs);
    const it = (arr) => arr.map((x, i) => Object.assign(this.itemOf(x, c), { delay: 120 + Math.min(i, 8) * 55 }));
    const daysIn = Math.max(1, Math.floor((Math.min(now, p.to) - p.from) / 864e5) + 1);
    const hoy = D.movs.filter((x) => x.fecha === todayIso && x.tipo === 'gasto').reduce((a, x) => a + x.monto, 0);
    // tarjetas
    const cards = D.tarjetas.map((t, i) => {
      const used = Math.max(0, (t.usadoInicial || 0) + D.movs.filter((x) => x.tarjetaId === t.id).reduce((a, x) => a + (x.tipo === 'pagoTarjeta' ? -x.monto : (x.tipo === 'gasto' ? x.monto : 0)), 0));
      const pagoD = nextDayOfMonth(t.pago, now), corteD = nextDayOfMonth(t.corte, now);
      return { name: t.nombre, last: t.ult4 ? '•• ' + t.ult4 : '', cupo: t.cupo, used, pagoD, corte: corteD ? corteD.getDate() + ' ' + MES[corteD.getMonth()] : '—', pago: pagoD ? pagoD.getDate() + ' ' + MES[pagoD.getMonth()] : '—',
        usedTxt: f(used), cupoTxt: f(t.cupo), dispTxt: f(Math.max(0, t.cupo - used)), w: t.cupo > 0 ? Math.min(100, Math.round(used / t.cupo * 100)) : 0,
        bg: c.tjBg[i % c.tjBg.length], solid: c.tjSolid[i % c.tjSolid.length], delay: 60 + i * 110 };
    });
    const nextPago = cards.filter((t) => t.pagoD).sort((a, b) => a.pagoD - b.pagoD)[0];
    const tarjPagoTxt = nextPago ? nextPago.pago : (cards.length ? 'sin fecha' : 'sin tarjetas');
    // vehículos
    const vs = D.vehiculos, vi = vs.length ? s.vehSel % vs.length : 0, V = vs[vi];
    let veh;
    if (V) {
      const cada = V.aceiteCada || (V.tipo === 'carro' ? 5000 : 3000), faltaKm = V.aceiteKm ? V.aceiteKm - V.km : null;
      const soatDays = V.soat ? Math.ceil((pDate(V.soat) - new Date(y, mI, now.getDate())) / 864e5) : null;
      const mCount = D.movs.filter((x) => x.cat === 'vehiculo' && x.tipo === 'gasto' && (x.vehiculoId === V.id || (!x.vehiculoId && vs.length === 1)) && x.fecha.slice(0, 7) === todayIso.slice(0, 7)).length;
      veh = { real: true, nombre: V.nombre, upper: V.nombre.toUpperCase(), kmTxt: miles(V.km || 0) + ' km', kmNum: miles(V.km || 0), movsTxt: mCount + ' este mes',
        aceiteKm: V.aceiteKm, faltaKm, aceiteAtTxt: V.aceiteKm ? miles(V.aceiteKm) + ' km' : '—', aceitePrevTxt: V.aceiteKm ? miles(Math.max(0, V.aceiteKm - cada)) + ' km' : '—',
        aceiteFaltaTxt: faltaKm === null ? 'sin dato' : (faltaKm < 0 ? 'vencido' : 'en ' + miles(faltaKm) + ' km'), faltanTxt: faltaKm === null ? 'sin dato' : (faltaKm < 0 ? 'vencido' : 'faltan ' + miles(faltaKm) + ' km'),
        faltaKmTxt: faltaKm === null ? '—' : (faltaKm < 0 ? 'vencido' : miles(faltaKm) + ' km'), aceitePct: V.aceiteKm ? Math.max(0, Math.min(100, Math.round((V.km - (V.aceiteKm - cada)) / cada * 100))) : 0,
        soatDays, soatTxt: V.soat ? dayTxt(V.soat) + ' ' + V.soat.slice(0, 4) : 'sin dato', tipo: V.tipo };
    } else veh = { real: false, nombre: 'Tu vehículo', upper: 'VEHÍCULO', kmTxt: '— km', kmNum: '—', movsTxt: '0 este mes', aceiteAtTxt: '—', aceitePrevTxt: '—', aceiteFaltaTxt: 'sin dato', faltanTxt: 'sin dato', faltaKmTxt: '—', aceitePct: 0, soatTxt: 'sin dato', faltaKm: null, soatDays: null };
    const vehLbl = V ? (V.tipo === 'carro' ? 'Carro' : 'Moto') : 'Vehículo';
    const vehMovs = this.sortMovs(D.movs.filter((x) => x.cat === 'vehiculo' && x.tipo === 'gasto' && (!V || vs.length === 1 || x.vehiculoId === V.id))).slice(0, 30);
    // cerditos
    const since90 = iso(new Date(Date.now() - 90 * 864e5));
    const pigs = D.cerditos.map((g, i) => {
      const ap = D.movs.filter((x) => x.tipo === 'aporte' && x.cerditoId === g.id);
      const amt = (g.inicial || 0) + ap.reduce((a, x) => a + x.monto, 0), pct = g.meta > 0 ? Math.min(100, Math.round(amt / g.meta * 100)) : 0;
      const rate = ap.filter((x) => x.fecha >= since90).reduce((a, x) => a + x.monto, 0) / 6;
      return { name: g.nombre, when: g.fecha ? MES[+g.fecha.slice(5, 7) - 1] + ' ' + g.fecha.slice(0, 4) : 'sin fecha', amt: f(amt), goal: f(g.meta), pct, pctTxt: pct + '%', faltaN: Math.max(0, g.meta - amt), faltan: f(Math.max(0, g.meta - amt)), level: 100 - pct, rate, amtN: amt,
        color: c.pig[i % c.pig.length], delay: 100 + i * 90,
        add: () => { this.mut((d) => d.movs.push({ id: uid(), fecha: iso(new Date()), ts: Date.now(), tipo: 'aporte', cat: 'cerdito', monto: 50000, nota: 'Aporte rápido', cerditoId: g.id })); } };
    });
    const pigTotal = pigs.reduce((a, g) => a + g.amtN, 0);
    // plan
    const pl = PLANS[D.plan] || PLANS.bal, ingresoMes = D.perfil.ingresoQuincena * 2, meta = Math.round(ingresoMes * pl.p);
    const saved = Array.from({ length: 12 }, (_, i) => D.movs.filter((x) => x.tipo === 'aporte' && x.fecha.slice(0, 7) === y + '-' + pad(i + 1)).reduce((a, x) => a + x.monto, 0));
    const max = Math.max.apply(null, saved.concat([meta, 1]));
    const bars = MES.map((m, i) => { const real = i <= mI, v = real ? saved[i] : meta; return { m: m.charAt(0).toUpperCase(), h: Math.max(c.bar[1], Math.round(v / max * c.bar[0])), cls: real ? (i === mI ? 'bar real cur' : 'bar real') : 'bar proj', delay: 80 + i * 45 }; });
    const plans = Object.keys(PLANS).map((id) => ({ n: PLANS[id].n, d: c.planD[id], cls: D.plan === id ? 'on' : '', pick: () => this.mut((d) => { d.plan = id; }) }));
    const savedCur = saved[mI];
    // créditos
    const credx = D.creditos.map((cr) => ({ c: cr, x: credCalc(cr, now) }));
    const credits = credx.map((o, i) => ({ name: o.c.name, cuotaTxt: f(o.x.cuota), saldoTxt: f(o.x.saldo), prog: Math.round(o.x.k / o.x.n * 100), kTxt: o.x.k + ' de ' + o.x.n + ' cuotas',
      tasaTxt: pctTxt(o.c.tasa) + (o.c.tipo === 'mv' ? ' M.V.' : ' E.A.'), plazoTxt: o.x.n + ' meses', iniTxt: o.x.iniTxt, endTxt: o.x.endTxt, intTxt: f(o.x.totalInt), montoTxt: f(o.c.monto), color: c.cred[i % c.cred.length], delay: 120 + i * 90 }));
    const act = credx.filter((o) => o.x.saldo > 0), cuotaTot = act.reduce((a, o) => a + o.x.cuota, 0), saldoTot = act.reduce((a, o) => a + o.x.saldo, 0);
    const cp = this.cfParsed(), cfOk = cp.monto > 0 && cp.tasa > 0 && cp.plazo > 0 && /^\d{4}-\d{2}$/.test(cp.inicio), cpx = cfOk ? credCalc(cp, now) : null;
    // asistente
    const q = this.per('q');
    const recs = this.buildRecs({ credx, cards, pigs, meta, savedCur, q, veh });
    // racha y reto
    const days = new Set(D.movs.map((x) => x.fecha));
    let racha = 0, dd = new Date(y, mI, now.getDate()); if (!days.has(iso(dd))) dd = new Date(dd - 864e5);
    while (days.has(iso(dd))) { racha++; dd = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate() - 1); }
    const mon = new Date(y, mI, now.getDate() - ((now.getDay() + 6) % 7));
    const reto = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((l, i) => { const di = iso(new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i)); return { l, bg: days.has(di) ? '#3cc59a' : (di === todayIso ? '#ffc94d' : 'rgba(255,255,255,.55)'), ok: days.has(di) }; });
    // mov seleccionado
    const ms = s.movSel && D.movs.find((x) => x.id === s.movSel);
    let movD = null;
    if (ms) {
      const itx = this.itemOf(ms, c);
      movD = { tipo: TIPO_NAME[ms.tipo], cat: itx.cat, monto: fmt(ms.monto), nota: ms.nota || '—', fecha: dayTxt(ms.fecha) + ' ' + ms.fecha.slice(0, 4), dest: itx.dest || 'Sin asociar',
        delTxt: s.movConfirm ? 'Toca de nuevo para eliminar' : 'Eliminar movimiento', delCls: s.movConfirm ? 'ap-go danger' : 'ap-go',
        del: () => (s.movConfirm ? this.delMov(ms.id) : this.setState({ movConfirm: true })) };
    }
    // formulario rápido
    const map = ADD_MAP[s.addCat], tOpts = map.need ? D[map.need] : [];
    const tSel = s.mvTarget && tOpts.some((o) => o.id === s.mvTarget) ? s.mvTarget : (tOpts[0] && tOpts[0].id);
    const mvTargets = tOpts.map((o) => ({ label: o.nombre, cls: o.id === tSel ? 'on' : '', pick: () => this.setState({ mvTarget: o.id }) }));
    const looks = LOOKS.map((L) => { const t = L[mode]; return { name: L.name, desc: L.desc, font: L.font, weight: L.weight, fstyle: L.fstyle, rad: L.rad, bg: t.bg, fg: t.fg, edge: t.edge, a0: t.a[0], a1: t.a[1], a2: t.a[2], on: lk === L.id, cls: lk === L.id ? 'on' : '', pick: () => this.pickLook(L.id) }; });
    const thIdx = { light: 0, dark: 1, auto: 2 }[D.prefs.theme] || 0;
    const nombre = D.perfil.nombre || 'hola';
    const cfM = num(s.mv.monto);
    return {
      appCls: 'app ' + mode, themeCls: mode,
      isNb: lk === 'nb', isVt: lk === 'vt', isLb: lk === 'lb', isAl: lk === 'al',
      splashOn: !!s.splash, splashCls: s.splash === 'out' ? 'splash out' : 'splash',
      isInicio: s.tab === 'inicio', isGastos: s.tab === 'gastos', isCerditos: s.tab === 'cerditos', isPlan: s.tab === 'plan',
      tb, pillX: 'translateX(calc(' + tabIdx + ' * (100% + 8px)))',
      goInicio: () => this.go('inicio'), goGastos: () => this.go('gastos'), goCerditos: () => this.go('cerditos'), goPlan: () => this.go('plan'),
      goTarjetas: () => this.setState({ tab: 'gastos', sub: 'tarjetas' }), goVehiculo: () => this.setState({ tab: 'gastos', sub: 'vehiculo' }),
      replay: () => this.replay(), openLook: () => this.setState({ panel: true, welcome: false, sheet: false }),
      per: p, periods, segX: 'translateX(' + (pIdx * 100) + '%)', subX: 'translateX(' + (subIdx * 100) + '%)', uX: pT[pIdx][0], uW: pT[pIdx][1], sX: sT[subIdx][0], sW: sT[subIdx][1],
      shownTxt: f(s.shown), ingresoTxt: f(p.ingreso), libreTxt: f(p.ingreso - p.total), usedPct,
      deltaTxt: hasPrev ? (delta < 0 ? '↓ ' : '↑ ') + String(Math.abs(delta)).replace('.', ',') + '%' : '• nuevo',
      deltaWord: hasPrev ? String(Math.abs(delta)).replace('.', ',') + '% ' + (delta < 0 ? 'menos' : 'más') : 'primer periodo',
      needle: s.splash ? -90 : Math.round(-90 + usedPct * 1.8),
      cats, donut, vehTxt: f(p.cats[2]), tarjTotalTxt: f(cards.reduce((a, t) => a + t.used, 0)), tarjPagoTxt, tarjPagoUp: tarjPagoTxt.toUpperCase(), reto, retoPts: reto.filter((r) => r.ok).length + '/7',
      subs, isDiario: s.sub === 'diario', isTarjetas: s.sub === 'tarjetas', isVehiculo: s.sub === 'vehiculo',
      diario: it(pm).slice(0, 60), noMovs: pm.length === 0, consumos: it(this.sortMovs(D.movs.filter((x) => x.tarjetaId))).slice(0, 30), vehiculo: it(vehMovs), recientes: it(all.slice(0, 3)), tj: cards,
      tarjAddTxt: cards.length ? '+ Agregar otra tarjeta' : '+ Agrega tu primera tarjeta', openTarjetas: () => this.openEd('tarjetas'), openVehiculos: () => this.openEd('vehiculos'),
      hoyTxt: f(hoy), promTxt: f(p.total / daysIn),
      veh, vehLbl, vehUp: vehLbl.toUpperCase(), noVeh: !V, vehMulti: vs.length > 1, vehNext: vs.length > 1 ? vs[(vi + 1) % vs.length].nombre : '', nextVeh: () => this.setState({ vehSel: s.vehSel + 1 }),
      pigs, pigTotalTxt: f(pigTotal), pigCount: pigs.length, newPig: () => this.openEd('cerditos'),
      lg: { ahorro: short(pigTotal), meses: saved.slice(0, mI + 1).filter((v) => meta > 0 && v >= meta).length, llenos: pigs.filter((g) => g.pct >= 100).length },
      plans, plan: { n: pl.n, d: c.planD[D.plan] }, metaTxt: f(meta), metaQTxt: f(meta / 2), bars, goalH: Math.round(meta / max * c.bar[0]),
      anualTxt: f(saved.reduce((a, b) => a + b, 0) + meta * (11 - mI)), septTxt: f(savedCur), septPct: meta > 0 ? Math.min(100, Math.round(savedCur / meta * 100)) : 0, faltaSeptTxt: f(Math.max(0, meta - savedCur)),
      mesNombre: cap(MESL[mI]), mesLower: MESL[mI], mesCorto: MES[mI], anio: y,
      fechaLarga: cap(DIAS[now.getDay()]) + ', ' + now.getDate() + ' de ' + MESL[mI], fechaCorta: cap(DIAS[now.getDay()]).slice(0, 3) + '. ' + now.getDate() + ' ' + MES[mI] + ' ' + y,
      fechaAl: cap(DIAS[now.getDay()]) + ' ' + now.getDate() + ' · quincena ' + (now.getDate() > 15 ? 2 : 1) + ' de ' + MES[mI], edicion: mI * 2 + (now.getDate() > 15 ? 2 : 1), qRange: q.range,
      nombre, racha,
      sheetOn: s.sheet, openSheet: () => this.setState({ sheet: true, mvErr: '' }), closeSheet: () => this.setState({ sheet: false, mvErr: '' }), save: () => this.saveMov(),
      addCats: ADDS.map((label, i) => ({ label, cls: s.addCat === i ? 'on' : '', pick: () => this.setState({ addCat: i, mvErr: '' }) })),
      mv: { monto: cfM > 0 ? miles(cfM) : '', nota: s.mv.nota }, mvMonto: (e) => this.setState({ mv: Object.assign({}, s.mv, { monto: e.target.value.replace(/\D/g, '') }), mvErr: '' }), mvNota: (e) => this.setState({ mv: Object.assign({}, this.state.mv, { nota: e.target.value }) }),
      mvHasTargets: mvTargets.length > 0, mvTargets, mvTargetLbl: { tarjetas: '¿Con qué tarjeta?', vehiculos: '¿Qué vehículo?', cerditos: '¿A qué cerdito?' }[map.need] || '', mvHasErr: !!s.mvErr, mvErr: s.mvErr,
      toastOn: s.toast,
      panelOn: s.panel, closePanel: () => { this.setState({ panel: false, welcome: false }); }, looks, showAcc: !s.welcome,
      apTitle: s.welcome ? 'Elige tu estilo' : 'Ajustes',
      apSub: s.welcome ? 'Tu app viene con 4 estilos y tema claro u oscuro. Cámbialo cuando quieras con el botón de paleta.' : 'Tus cuentas, la nube y la apariencia de la app.',
      accRows: [
        { label: 'Perfil e ingreso', sub: D.perfil.ingresoQuincena ? f(D.perfil.ingresoQuincena) + ' por quincena' : 'Agrega tu ingreso', color: '#7a5cff', open: () => this.openEd('perfil') },
        { label: 'Tarjetas', sub: D.tarjetas.length ? D.tarjetas.length + ' registradas' : 'Ninguna todavía', color: '#6fa8ff', open: () => this.openEd('tarjetas') },
        { label: 'Vehículos', sub: vs.length ? vs.map((x) => x.nombre).join(', ') : 'Ninguno todavía', color: '#ff6b3d', open: () => this.openEd('vehiculos') },
        { label: 'Cerditos', sub: pigs.length ? pigs.length + ' · ' + f(pigTotal) : 'Ninguno todavía', color: '#ff6f91', open: () => this.openEd('cerditos') },
        { label: 'Créditos', sub: credits.length ? credits.length + ' · cuotas ' + f(cuotaTot) + '/mes' : 'Ninguno todavía', color: '#3cc59a', open: () => this.openEd('creditos') },
        { label: 'Nube y copia de seguridad', sub: this.syncView().title, color: '#ffc94d', open: () => this.openEd('datos') }
      ],
      th: { light: D.prefs.theme === 'light' ? 'on' : '', dark: D.prefs.theme === 'dark' ? 'on' : '', auto: D.prefs.theme === 'auto' ? 'on' : '' }, themeX: 'translateX(' + (thIdx * 100) + '%)',
      setLight: () => this.mut((d) => { d.prefs.theme = 'light'; }), setDark: () => this.mut((d) => { d.prefs.theme = 'dark'; }), setAuto: () => this.mut((d) => { d.prefs.theme = 'auto'; }),
      replayFromPanel: () => this.replay(),
      morphOn: !!s.morph, morphCls: s.morph && s.morph.out ? 'morph out' : 'morph', morphBg: s.morph ? s.morph.bg : 'transparent',
      credits, credCount: credits.length, credCuotaTxt: f(cuotaTot), credSaldoTxt: f(saldoTot), credPctTxt: ingresoMes > 0 ? pctTxt(cuotaTot / ingresoMes * 100) : '—',
      openCred: () => this.setState({ cred: true, panel: false, sheet: false, ed: null }), closeCred: () => this.setState({ cred: false }), saveCred: () => this.saveCred(), credOn: s.cred, cf: s.cf,
      cfName: (e) => this.setCf('name', e.target.value), cfMonto: (e) => this.setCf('monto', e.target.value.replace(/[^0-9]/g, '')),
      cfTasa: (e) => this.setCf('tasa', e.target.value.replace(/[^0-9.,]/g, '')), cfPlazo: (e) => this.setCf('plazo', e.target.value.replace(/[^0-9]/g, '')), cfInicio: (e) => this.setCf('inicio', e.target.value),
      cfEa: () => this.setCf('tipo', 'ea'), cfMv: () => this.setCf('tipo', 'mv'), cfTipo: { ea: s.cf.tipo === 'ea' ? 'on' : '', mv: s.cf.tipo === 'mv' ? 'on' : '' }, cfTipoX: s.cf.tipo === 'mv' ? 'translateX(100%)' : 'translateX(0%)',
      cfMontoTxt: cp.monto > 0 ? f(cp.monto) : 'Escribe el monto sin puntos', cfOk, cfCls: cfOk ? 'ap-go' : 'ap-go off',
      cfCuotaTxt: cpx ? f(cpx.cuota) : '—', cfIntTxt: cpx ? f(cpx.totalInt) : '—', cfEndTxt: cpx ? cpx.endTxt : '—', cfKTxt: cpx ? cpx.k + ' de ' + cpx.n : '—', cfSaldoTxt: cpx ? f(cpx.saldo) : '—',
      recs, tip: recs[0], recCount: recs.length, openAsist: () => this.openAsist(), closeAsist: () => this.setState({ asist: false }),
      asistOn: s.asist, asistLoading: s.asist && s.asistStep < 3, asistDone: s.asist && s.asistStep >= 3, asistMsg: ['Revisando tus gastos…', 'Calculando tus créditos…', 'Buscando oportunidades de ahorro…'][Math.min(2, s.asistStep)],
      edOn: !!s.ed, ed: s.ed ? this.edView(credx, cards, pigs) : {}, closeEd: () => this.closeEd(),
      sync: this.syncView(), syncNow: () => this.pull(), logout: () => this.logout(), exportData: () => this.exportData(), importData: (e) => this.importData(e), skipCloud: () => { this.setState({ ed: null }); this.finishWelcome(); },
      movOn: !!movD, movD: movD || {}, closeMov: () => this.setState({ movSel: null, movConfirm: false })
    };
  }
  syncView() {
    const s = this.state.sync, ago = s.last ? Math.max(0, Math.round((Date.now() - s.last) / 60000)) : null;
    const agoTxt = ago === null ? '' : (ago < 1 ? 'hace un momento' : 'hace ' + ago + ' min');
    if (!this.sb) return { cls: '', title: 'Solo en este teléfono', txt: 'Tus datos se guardan aquí. Conecta Supabase para sincronizarlos entre tus dispositivos.', logged: false };
    if (!this.session) return { cls: s.status === 'err' ? 'err' : '', title: 'Proyecto conectado · inicia sesión', txt: s.msg || 'Entra con tu correo para sincronizar.', logged: false };
    const t = { ok: ['ok', 'Sincronizado', 'Última sincronización ' + agoTxt + ' · ' + s.email], busy: ['busy', 'Sincronizando…', s.email], offline: ['', 'Sin conexión', 'Se guarda en el teléfono y se sube cuando vuelva el internet.'], err: ['err', 'Error de sincronización', s.msg], idle: ['busy', 'Conectando…', s.email] }[s.status] || ['', 'Conectado', s.email];
    return { cls: t[0], title: t[1], txt: t[2], logged: true };
  }
  edView(credx, cards, pigs) {
    const ed = this.state.ed, D = this.state.data, k = ed.kind, f = fmt, F = ed.form || {};
    const fld = (id, label, o) => Object.assign({ id: 'ed-' + id, label, isInput: true, isChoice: false, type: 'text', mode: 'text', ph: '', value: F[id] == null ? '' : F[id], ac: 'off', hasHint: false, hint: '',
      set: (e) => this.setEdF(id, o && o.numeric ? e.target.value.replace(/[^0-9]/g, '') : e.target.value) }, o || {}, o && o.hint ? { hasHint: true } : {});
    const money = (id, label, o) => { const n = num(F[id]); return fld(id, label, Object.assign({ numeric: true, mode: 'numeric', ph: '$ 0', value: n > 0 ? miles(n) : '' }, o || {})); };
    const choice = (id, label, opts) => ({ id: 'ed-' + id, label, isInput: false, isChoice: true, hasHint: false, opts: opts.map(([v, l]) => ({ label: l, cls: F[id] === v ? 'on' : '', pick: () => this.setEdF(id, v) })) });
    const del = (id) => ({ delTxt: ed.confirm === id ? '¿Seguro?' : 'Eliminar', delCls: ed.confirm === id ? 'danger' : '', del: () => this.edDel(id) });
    const base = { title: '', sub: '', canClose: !ed.welcome, hasList: false, listTitle: '', items: [], empty: false, emptyTxt: '', hasForm: true, formTitle: '', fields: [], hasErr: !!ed.err, err: ed.err, saveTxt: 'Guardar', saveCls: ed.busy ? 'ap-go off' : 'ap-go', save: () => this.edSave(), hasAlt: false, altTxt: '', alt: null, hasCancelEdit: !!ed.editId, cancelEdit: () => this.setState({ ed: Object.assign({}, ed, { editId: null, form: this.edDefaults(k), err: '' }) }), isDatos: false, welcome: !!ed.welcome };
    const editing = !!ed.editId;
    if (k === 'perfil') return Object.assign(base, { title: ed.welcome ? '¡Bienvenido!' : 'Perfil e ingreso', sub: ed.welcome ? 'Dos datos y empezamos. Luego conectas la nube y eliges el estilo.' : 'Con tu ingreso calculo lo disponible y tu meta de ahorro.', formTitle: 'Tus datos',
      fields: [fld('nombre', '¿Cómo te llamas?', { ph: 'Tu nombre', ac: 'given-name' }), money('ingresoQuincena', 'Ingreso por quincena', { hint: 'Lo que recibes cada 15 días. Si te pagan mensual, divide entre 2.' })], saveTxt: ed.welcome ? 'Continuar' : 'Guardar' });
    if (k === 'tarjetas') return Object.assign(base, { title: 'Tarjetas de crédito', sub: 'Lo que compres con ellas se suma a lo usado; los pagos lo restan.', hasList: true, listTitle: 'Tus tarjetas',
      items: D.tarjetas.map((t, i) => Object.assign({ name: t.nombre + (t.ult4 ? ' •• ' + t.ult4 : ''), sub: 'Usado ' + cards[i].usedTxt + ' de ' + f(t.cupo) + (t.pago ? ' · paga el ' + t.pago : ''), color: '#6fa8ff', canEdit: true, edit: () => this.edEdit(t) }, del(t.id))),
      empty: !D.tarjetas.length, emptyTxt: 'Aún no tienes tarjetas.', formTitle: editing ? 'Editar tarjeta' : 'Agregar tarjeta', saveTxt: editing ? 'Guardar cambios' : 'Agregar tarjeta',
      fields: [fld('nombre', 'Nombre', { ph: 'Ej. Visa Oro' }), fld('ult4', 'Últimos 4 dígitos (opcional)', { numeric: true, mode: 'numeric', ph: '4821' }), money('cupo', 'Cupo total'), money('usadoInicial', 'Deuda actual en la tarjeta', { hint: 'Lo que debes hoy. Los consumos que registres se suman a esto.' }),
        fld('corte', 'Día de corte', { numeric: true, mode: 'numeric', ph: 'Ej. 28' }), fld('pago', 'Día de pago', { numeric: true, mode: 'numeric', ph: 'Ej. 12' })] });
    if (k === 'vehiculos') return Object.assign(base, { title: 'Vehículos', sub: 'Tu moto o carro: kilometraje, aceite y SOAT.', hasList: true, listTitle: 'Tus vehículos',
      items: D.vehiculos.map((v) => Object.assign({ name: v.nombre, sub: (v.tipo === 'carro' ? 'Carro' : 'Moto') + ' · ' + miles(v.km || 0) + ' km' + (v.soat ? ' · SOAT ' + dayTxt(v.soat) : ''), color: '#ff6b3d', canEdit: true, edit: () => this.edEdit(v) }, del(v.id))),
      empty: !D.vehiculos.length, emptyTxt: 'Aún no tienes vehículos.', formTitle: editing ? 'Editar vehículo' : 'Agregar vehículo', saveTxt: editing ? 'Guardar cambios' : 'Agregar vehículo',
      fields: [fld('nombre', 'Nombre', { ph: 'Ej. Mi moto' }), choice('tipo', 'Tipo', [['moto', 'Moto'], ['carro', 'Carro']]), fld('km', 'Kilometraje actual', { numeric: true, mode: 'numeric', ph: 'Ej. 11520', value: num(F.km) > 0 ? String(num(F.km)) : '' }),
        fld('aceiteKm', 'Próximo cambio de aceite (km)', { numeric: true, mode: 'numeric', ph: 'Ej. 12000', value: num(F.aceiteKm) > 0 ? String(num(F.aceiteKm)) : '' }), fld('aceiteCada', 'Cambias el aceite cada (km)', { numeric: true, mode: 'numeric', ph: F.tipo === 'carro' ? '5000' : '3000' }),
        fld('soat', 'SOAT vence', { type: 'date' })] });
    if (k === 'cerditos') return Object.assign(base, { title: 'Cerditos', sub: 'Metas de ahorro. Abónales con + en la pantalla Cerditos o desde el botón +.', hasList: true, listTitle: 'Tus cerditos',
      items: D.cerditos.map((g, i) => Object.assign({ name: g.nombre, sub: pigs[i].amt + ' de ' + f(g.meta) + ' · ' + pigs[i].pctTxt, color: '#ff6f91', canEdit: true, edit: () => this.edEdit(g) }, del(g.id))),
      empty: !D.cerditos.length, emptyTxt: 'Aún no tienes cerditos.', formTitle: editing ? 'Editar cerdito' : 'Nuevo cerdito', saveTxt: editing ? 'Guardar cambios' : 'Crear cerdito',
      fields: [fld('nombre', 'Nombre', { ph: 'Ej. Viaje a Cartagena' }), money('meta', '¿Cuánto quieres ahorrar?'), money('inicial', 'Ya tengo ahorrado (opcional)'), fld('fecha', 'Meta para (opcional)', { type: 'month' })] });
    if (k === 'creditos') return Object.assign(base, { title: 'Créditos', sub: 'Calculo cuota, saldo e intereses con la tasa y el plazo.', hasList: true, listTitle: 'Tus créditos',
      items: D.creditos.map((cr, i) => Object.assign({ name: cr.name, sub: f(credx[i].x.cuota) + '/mes · ' + credx[i].x.k + ' de ' + credx[i].x.n + ' cuotas', color: '#3cc59a', canEdit: false }, del(cr.id))),
      empty: !D.creditos.length, emptyTxt: 'Aún no tienes créditos.', formTitle: '', saveTxt: '+ Agregar crédito' });
    // datos / nube
    const cf = this.state.cloudForm, setC = (key) => (e) => this.setState({ cloudForm: Object.assign({}, this.state.cloudForm, { [key]: e.target.value }), ed: Object.assign({}, this.state.ed, { err: '' }) });
    const cfld = (id, label, o) => Object.assign({ id: 'cl-' + id, label, isInput: true, isChoice: false, type: 'text', mode: 'text', ph: '', value: cf[id], ac: 'off', hasHint: false, hint: '', set: setC(id) }, o || {}, o && o.hint ? { hasHint: true } : {});
    const modo = { id: 'cl-modo', label: '¿Tienes cuenta?', isInput: false, isChoice: true, hasHint: false, opts: [['entrar', 'Entrar'], ['crear', 'Crear cuenta']].map(([v, l]) => ({ label: l, cls: cf.modo === v ? 'on' : '', pick: () => this.setState({ cloudForm: Object.assign({}, this.state.cloudForm, { modo: v }) }) })) };
    const acct = [modo, cfld('email', 'Correo', { type: 'email', mode: 'email', ph: 'tu@correo.com', ac: 'email' }), cfld('password', 'Contraseña', { type: 'password', ph: 'Mínimo 6 caracteres', ac: cf.modo === 'crear' ? 'new-password' : 'current-password' })];
    const o = Object.assign(base, { title: ed.welcome ? 'Sincroniza en la nube' : 'Nube y copia de seguridad', sub: ed.welcome ? 'Conecta tu proyecto de Supabase para ver tus datos en todos tus dispositivos. Puedes hacerlo después.' : 'Tus datos siempre se guardan en el teléfono; la nube es la copia sincronizada.', isDatos: true });
    if (!this.sb) return Object.assign(o, { formTitle: 'Conectar Supabase', fields: [cfld('url', 'Project URL', { type: 'url', mode: 'url', ph: 'https://xxxx.supabase.co', hint: 'Supabase → Project Settings → API (o Data API).' }), cfld('key', 'Clave anon / publishable', { ph: 'eyJhbGciOi… o sb_publishable_…' })].concat(acct), saveTxt: ed.busy ? 'Conectando…' : (cf.modo === 'crear' ? 'Conectar y crear cuenta' : 'Conectar y entrar') });
    if (!this.session) return Object.assign(o, { formTitle: 'Inicia sesión', fields: acct, saveTxt: ed.busy ? 'Un momento…' : (cf.modo === 'crear' ? 'Crear cuenta' : 'Entrar'), hasAlt: true, altTxt: 'Usar otro proyecto de Supabase', alt: () => this.resetCloud() });
    return Object.assign(o, { hasForm: false });
  }
  render() {
    const v = this.vals();
    const tc = document.querySelector('meta[name=theme-color]');
    const L = LOOKS.find((x) => x.id === this.look());
    if (tc && L) tc.setAttribute('content', L[this.isDark() ? 'dark' : 'light'].bg);
    return view(v, html);
  }
}

render(h(App), document.getElementById('app'));
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
