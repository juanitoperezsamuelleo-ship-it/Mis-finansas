/* Bloqueo local: PIN + huella/Face ID (WebAuthn PRF) y cifrado AES-GCM de los datos en el teléfono.
   Esquema: una clave de datos aleatoria (DEK) cifra los datos. La DEK se guarda envuelta:
   - con una clave derivada del PIN (PBKDF2-SHA256, 310.000 iteraciones)
   - opcionalmente con un secreto del autenticador del teléfono (extensión PRF de WebAuthn). */
const LOCK = 'mf-lock-v1', FAILS = 'mf-lock-fails';
const te = new TextEncoder(), td = new TextDecoder();
const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const rnd = (n) => crypto.getRandomValues(new Uint8Array(n));

async function kekFromPin(pin, salt) {
  const base = await crypto.subtle.importKey('raw', te.encode(pin), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
async function kekFromSecret(secret) {
  const base = await crypto.subtle.importKey('raw', secret, 'HKDF', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt: te.encode('mis-finanzas'), info: te.encode('dek-wrap') }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
async function seal(key, bytes) { const iv = rnd(12); const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes); return { iv: b64(iv), ct: b64(ct) }; }
async function open(key, box) { return new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(box.iv) }, key, unb64(box.ct))); }
const importDek = (raw) => crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt', 'decrypt']);

function read() { try { return JSON.parse(localStorage.getItem(LOCK)); } catch (e) { return null; } }
function write(o) { localStorage.setItem(LOCK, JSON.stringify(o)); }

export const lock = {
  enabled() { return !!read(); },
  hasBio() { const l = read(); return !!(l && l.bio); },
  /* intentos fallidos: espera creciente a partir del 5.º */
  waitMs() { try { const f = JSON.parse(localStorage.getItem(FAILS)) || { n: 0, until: 0 }; return Math.max(0, f.until - Date.now()); } catch (e) { return 0; } },
  fails() { try { return (JSON.parse(localStorage.getItem(FAILS)) || { n: 0 }).n; } catch (e) { return 0; } },
  _fail() { let f; try { f = JSON.parse(localStorage.getItem(FAILS)) || { n: 0, until: 0 }; } catch (e) { f = { n: 0, until: 0 }; } f.n++; if (f.n >= 5) f.until = Date.now() + 30000 * Math.pow(2, f.n - 5); localStorage.setItem(FAILS, JSON.stringify(f)); },
  _ok() { localStorage.removeItem(FAILS); },

  async enable(pin, data) {
    const raw = rnd(32), salt = rnd(16), kek = await kekFromPin(pin, salt), dek = await importDek(raw);
    const o = { v: 1, pin: Object.assign({ salt: b64(salt) }, await seal(kek, raw)), data: await seal(dek, te.encode(JSON.stringify(data))) };
    write(o); raw.fill(0);
    return dek;
  },
  async unlockPin(pin) {
    if (this.waitMs() > 0) throw new Error('wait');
    const l = read();
    try {
      const raw = await open(await kekFromPin(pin, unb64(l.pin.salt)), l.pin);
      const dek = await importDek(raw); raw.fill(0);
      const data = JSON.parse(td.decode(await open(dek, l.data)));
      this._ok(); return { dek, data };
    } catch (e) { this._fail(); throw new Error('pin'); }
  },
  async save(dek, data) { const l = read(); if (!l || !dek) return; l.data = await seal(dek, te.encode(JSON.stringify(data))); write(l); },
  async changePin(oldPin, newPin) {
    const l = read(); const raw = await open(await kekFromPin(oldPin, unb64(l.pin.salt)), l.pin);
    const salt = rnd(16); l.pin = Object.assign({ salt: b64(salt) }, await seal(await kekFromPin(newPin, salt), raw)); raw.fill(0); write(l);
  },
  async disable(pin) { const { data } = await this.unlockPin(pin); localStorage.removeItem(LOCK); return data; },

  /* ---- huella / Face ID ---- */
  async bioSupported() {
    try { return !!(window.PublicKeyCredential && await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()); } catch (e) { return false; }
  },
  async enableBio(pin) {
    const l = read(); const raw = await open(await kekFromPin(pin, unb64(l.pin.salt)), l.pin);
    const prfSalt = rnd(32);
    const cred = await navigator.credentials.create({ publicKey: {
      challenge: rnd(32), rp: { name: 'Mis Finanzas', id: location.hostname }, user: { id: rnd(16), name: 'mis-finanzas', displayName: 'Mis Finanzas' },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
      authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'preferred' },
      timeout: 60000, extensions: { prf: { eval: { first: prfSalt } } } } });
    const ext = cred.getClientExtensionResults ? cred.getClientExtensionResults() : {};
    if (!ext.prf || ext.prf.enabled === false) throw new Error('noprf');
    let secret = ext.prf.results && ext.prf.results.first;
    if (!secret) secret = await this._prfGet(cred.rawId, prfSalt);
    l.bio = Object.assign({ id: b64(cred.rawId), salt: b64(prfSalt) }, await seal(await kekFromSecret(secret), raw));
    raw.fill(0); write(l);
  },
  async _prfGet(rawId, prfSalt) {
    const a = await navigator.credentials.get({ publicKey: { challenge: rnd(32), rpId: location.hostname, userVerification: 'required', timeout: 60000,
      allowCredentials: [{ type: 'public-key', id: rawId }], extensions: { prf: { eval: { first: prfSalt } } } } });
    const r = a.getClientExtensionResults().prf; if (!r || !r.results || !r.results.first) throw new Error('noprf');
    return r.results.first;
  },
  async unlockBio() {
    const l = read(); if (!l || !l.bio) throw new Error('nobio');
    const secret = await this._prfGet(unb64(l.bio.id), unb64(l.bio.salt));
    const raw = await open(await kekFromSecret(secret), l.bio);
    const dek = await importDek(raw); raw.fill(0);
    const data = JSON.parse(td.decode(await open(dek, l.data)));
    this._ok(); return { dek, data };
  },
  disableBio() { const l = read(); if (l) { delete l.bio; write(l); } }
};

/* ---- contraseñas ---- */
export function passCheck(p, user) {
  const r = [];
  if (p.length < 12) r.push('al menos 12 caracteres');
  if (!/[a-z]/.test(p)) r.push('una minúscula');
  if (!/[A-Z]/.test(p)) r.push('una mayúscula');
  if (!/\d/.test(p)) r.push('un número');
  if (!/[^A-Za-z0-9]/.test(p)) r.push('un símbolo');
  if (user && user.length >= 3 && p.toLowerCase().includes(user.toLowerCase())) r.push('no contener tu usuario');
  if (/^(.)\1+$/.test(p) || /(1234|abcd|qwer|password|contrase)/i.test(p)) r.push('evitar secuencias obvias');
  const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((x) => x.test(p)).length;
  const score = Math.max(0, Math.min(4, Math.floor(p.length / 5) + classes - 2 - (r.length ? 1 : 0)));
  return { ok: r.length === 0, missing: r, score };
}
