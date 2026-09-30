"""Genera la PWA (site/) a partir del prototipo unificado App.dc.html."""
import re, os, shutil, json
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCR = '/tmp/claude-0/-home-claude/d01549d2-9f8a-527e-840b-1b466d08a66f/scratchpad'
SRC = os.path.join(SCR, 'canvas/project/App.dc.html')
SITE = os.path.join(ROOT, 'site')
T = os.path.join(ROOT, 'tools')

src = open(SRC, encoding='utf8').read()
css = re.search(r'<style>(.*?)</style>', src, re.S).group(1)
mk = src.split('</helmet>')[1].split('</x-dc>')[0].strip()

def rep_all(s, a, b, must=True):
    if must: assert a in s, ('missing', a[:80])
    return s.replace(a, b)

# ---------- 1. textos de ejemplo -> datos reales
R = [
    ('Domingo, 27 de septiembre', '{{fechaLarga}}'),
    ('¡Hola, Patrick!', '¡Hola, {{nombre}}!'),
    ('Hola, Patrick', 'Hola, {{nombre}}'),
    ('Tarjetas · pago 12 oct', 'Tarjetas · pago {{tarjPagoTxt}}'),
    ('Mi moto · {{per.label}}', '{{veh.nombre}} · {{per.label}}'),
    ('MI MOTO · {{per.label}}', '{{veh.upper}} · {{per.label}}'),
    ('Moto · {{per.label}}', '{{vehLbl}} · {{per.label}}'),
    ('Meta de ahorro sep', 'Meta de ahorro {{mesCorto}}'),
    ('>11.520 km<', '>{{veh.kmTxt}}<'),
    ('>Tanqueos<', '>Movimientos<'),
    ('>4 este mes<', '>{{veh.movsTxt}}<'),
    ('>Costo/km<', '>Aceite a los<'),
    ('>$ 52<', '>{{veh.aceiteAtTxt}}<'),
    ('Cambio de aceite en 480 km →', 'Cambio de aceite {{veh.aceiteFaltaTxt}} →'),
    ('Aceite en 480 km', 'Aceite {{veh.aceiteFaltaTxt}}'),
    ('>en 480 km<', '>{{veh.aceiteFaltaTxt}}<'),
    ('faltan 480 km', '{{veh.faltanTxt}}'),
    ('>480 km<', '>{{veh.faltaKmTxt}}<'),
    ('Vence 14 mar 2027', 'Vence {{veh.soatTxt}}'),
    ('>14 mar 2027<', '>{{veh.soatTxt}}<'),
    ('11.520 km · 4 tanqueos este mes', '{{veh.kmTxt}} · {{veh.movsTxt}}'),
    ('>11.520<', '>{{veh.kmNum}}<'),
    ('>11.000 km<', '>{{veh.aceitePrevTxt}}<'),
    ('>12.000 km<', '>{{veh.aceiteAtTxt}}<'),
    ('width: 52%;', 'width: {{veh.aceitePct}}%;'),
    ('Septiembre: {{septTxt}}', '{{mesNombre}}: {{septTxt}}'),
    ('Septiembre vas en', '{{mesNombre}} vas en'),
    ('Septiembre {{septPct}}%', '{{mesNombre}} {{septPct}}%'),
    ('>Septiembre<', '>{{mesNombre}}<'),
    ('2026 mes a mes', '{{anio}} mes a mes'),
    ('cierras 2026 con', 'cierras {{anio}} con'),
    ('CIERRE 2026 CON', 'CIERRE {{anio}} CON'),
    ('cerrarás 2026 con', 'cerrarás {{anio}} con'),
    ('FINANZAS PERSONALES · 2026', 'FINANZAS PERSONALES · {{anio}}'),
    ('TARJETAS · 12 OCT', 'TARJETAS · {{tarjPagoUp}}'),
    ('>MOTO<', '>{{vehUp}}<'),
    ('>MI MOTO<', '>{{veh.upper}}<'),
    ('Dom. 27 sep 2026', '{{fechaCorta}}'),
    ('Edición n.º 18', 'Edición n.º {{edicion}}'),
    ('>16 – 30 sep<', '>{{qRange}}<'),
    ('en la Visa. Se paga el 12 de octubre →', 'en tus tarjetas. Próximo pago: {{tarjPagoTxt}} →'),
    ('La moto te ha costado', '{{veh.nombre}} te ha costado'),
    ('>La moto<', '>{{vehLbl}}<'),
    ('de tu meta de ahorro de septiembre', 'de tu meta de ahorro de {{mesLower}}'),
    ('Domingo 27 · quincena 2 de sep', '{{fechaAl}}'),
    ('Racha de 12 días', 'Racha de {{racha}} días'),
    ('</svg>12</span>', '</svg>{{racha}}</span>'),
    ('>+150 pts<', '>{{retoPts}}<'),
    ('Cero domicilios por 7 días', 'Registra algo los 7 días'),
    ('>1M<', '>{{lg.ahorro}}<'),
    ('Primer millón', 'Ahorrado'),
    ('>×3<', '>×{{lg.meses}}<'),
    ('>?<', '>{{lg.llenos}}<'),
    ('Cierra un cerdito', 'Cerditos llenos'),
    ('¡Listo! +10 pts por registrar', '¡Listo! Guardado'),
    ('>GASTO GUARDADO<', '>GUARDADO<'),
    ('para ti con los datos de esta quincena.', 'para ti con tus datos de hoy.'),
    ('>Apariencia<', '>{{apTitle}}<'),
    ('<div style="display: flex; gap: 8px; margin-top: 14px"><sc-for list="{{plans}}"', '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px"><sc-for list="{{plans}}"'),
    ('+ $ 50 mil', 'Abonar'),
    ('>+ 50 mil<', '>ABONAR<'),
    ('Agregar 50 mil', 'Abonar al cerdito'),
    ('onClick="{{g.add}}"', 'onClick="{{g.open}}"'),
]
for a, b in R:
    mk = rep_all(mk, a, b, must=('>Apariencia<' not in a))
for a in ['Patrick', '11.520', '480 km', '2027', 'Visa. ']:
    assert a not in mk, ('quedó texto de ejemplo', a)

# ---------- 2. formulario de movimiento: montos y nota enlazados + fila de destino
for ns, chip in [('nb', 'chip'), ('vt', 'chip'), ('lb', 'pill'), ('al', 'chip')]:
    mk = rep_all(mk, 'id="%s-monto"' % ns, 'id="%s-monto" value="{{mv.monto}}" onChange="{{mvMonto}}"' % ns)
    mk = rep_all(mk, 'id="%s-nota"' % ns, 'id="%s-nota" value="{{mv.nota}}" onChange="{{mvNota}}"' % ns)
parts = mk.split('<sc-for list="{{addCats}}"')
assert len(parts) == 5
out = parts[0]
chips = ['chip', 'chip', 'pill', 'chip']
for i, p in enumerate(parts[1:]):
    j = p.index('</sc-for></div>') + len('</sc-for></div>')
    row = ('<sc-if value="{{mvHasTargets}}" hint-placeholder-val="{{false}}"><div style="font-size: 12.5px; opacity: .7; margin-top: 12px">{{mvTargetLbl}}</div>'
           '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px"><sc-for list="{{mvTargets}}" as="a" hint-placeholder-count="2">'
           '<button class="%s {{a.cls}}" onClick="{{a.pick}}">{{a.label}}</button></sc-for></div></sc-if>'
           '<sc-if value="{{mvCuotasOn}}" hint-placeholder-val="{{false}}"><div style="font-size: 12.5px; opacity: .7; margin-top: 12px">¿A cuántas cuotas?</div>'
           '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px"><sc-for list="{{mvCuotas}}" as="cq" hint-placeholder-count="3">'
           '<button class="%s {{cq.cls}}" onClick="{{cq.pick}}">{{cq.label}}</button></sc-for></div><div style="font-size: 12.5px; opacity: .7; margin-top: 8px">{{mvCuotaTxt}}</div></sc-if>'
           '<sc-if value="{{mvHasErr}}" hint-placeholder-val="{{false}}"><div style="margin-top: 10px; font-size: 13px; font-weight: 700; color: #e5484d">{{mvErr}}</div></sc-if>') % (chips[i], chips[i])
    out += '<sc-for list="{{addCats}}"' + p[:j] + row + p[j:]
mk = out

# ---------- 3. filas de movimientos abren el detalle
def rows_click(s):
    res, pos = [], 0
    for m in re.finditer(r'<sc-for list="\{\{(diario|consumos|vehiculo|recientes)\}\}" as="r"[^>]*>\s*<([a-z]+)', s):
        res.append(s[pos:m.end()])
        res.append(' onClick="{{r.open}}" tabindex="0" role="button"')
        pos = m.end()
    res.append(s[pos:])
    return ''.join(res)
mk = rows_click(mk)
mk = re.sub(r'(<sc-for list="\{\{credits\}\}" as="k"[^>]*>\s*<div)', r'\1 onClick="{{k.open}}" tabindex="0" role="button"', mk)
mk = re.sub(r'(<sc-for list="\{\{tj\}\}" as="t"[^>]*>\s*<div)', r'\1 onClick="{{t.open}}" tabindex="0" role="button"', mk)
_cp = '      <div class="cr-prev">'
assert mk.count(_cp) == 1
mk = mk.replace(_cp, '      <label class="ap-fl" for="cr-cargos">Seguros y otros cargos al mes (opcional)</label>\n      <input id="cr-cargos" class="ap-in" inputmode="numeric" placeholder="$ 0" value="{{cfCargos}}" onChange="{{cfSetCargos}}">\n      <div style="font-size: 12px; color: var(--apmut); margin-top: 6px; line-height: 1.4">{{cfBaseTxt}}</div>\n' + _cp)
assert 'cuota mensual</span>' in mk
mk = mk.replace('cuota mensual</span>', '{{cfCuotaLbl}}</span>', 1)

# ---------- 4. botones de "nuevo cerdito" -> formulario
def in_blocks(s, opener, fn):
    out, pos = '', 0
    while True:
        i = s.find(opener, pos)
        if i < 0: break
        j = s.find('\n</sc-if>', i)
        out += s[pos:i] + fn(s[i:j]); pos = j
    return out + s[pos:]
mk = in_blocks(mk, '<sc-if value="{{isCerditos}}"', lambda b: b.replace('onClick="{{openSheet}}"', 'onClick="{{newPig}}"'))

# ---------- 5. vacíos y accesos: tarjetas y vehículos
ADD_BTN = '<button onClick="{{%s}}" class="gen-add" style="grid-column: 1 / -1">%s</button>'
def inject_end(s, opener, html):
    out, pos = '', 0
    while True:
        i = s.find(opener, pos)
        if i < 0: break
        j = s.find('</sc-if>', i)
        k = s.rfind('</div>', i, j)
        out += s[pos:k] + html; pos = k
    return out + s[pos:]
def inject_start(s, opener, html):
    out, pos = '', 0
    while True:
        i = s.find(opener, pos)
        if i < 0: break
        k = s.find('>', s.find('<div class="screen"', i)) + 1
        out += s[pos:k] + html; pos = k
    return out + s[pos:]
mk = inject_end(mk, '<sc-if value="{{isTarjetas}}"', ADD_BTN % ('openTarjetas', '{{tarjAddTxt}}'))
mk = inject_start(mk, '<sc-if value="{{isVehiculo}}"',
    '<sc-if value="{{noVeh}}" hint-placeholder-val="{{false}}"><button onClick="{{openVehiculos}}" class="gen-add" style="grid-column: 1 / -1">+ Agrega tu moto o carro</button></sc-if>'
    '<sc-if value="{{vehMulti}}" hint-placeholder-val="{{false}}"><button onClick="{{nextVeh}}" class="gen-add" style="grid-column: 1 / -1">Ver {{vehNext}} ›</button></sc-if>')
mk = inject_end(mk, '<sc-if value="{{isDiario}}"', '<sc-if value="{{noMovs}}" hint-placeholder-val="{{false}}"><div class="gen-empty">Aún no hay movimientos en este periodo. Toca + para registrar el primero.</div></sc-if>')

# ---------- 5b. Plan: bloque para registrar ahorro
SAVE = ('<div class="gen-save" style="grid-column: 1 / -1"><div class="gs-row"><div style="min-width: 0"><div class="gs-lbl">Ahorrado en {{mesLower}}</div>'
        '<div class="gs-big">{{sv.mesTxt}} <span class="gs-of">de {{metaTxt}}</span></div></div>'
        '<button class="gs-btn" onClick="{{openAhorro}}">+ Registrar ahorro</button></div>'
        '<div class="gs-bar"><span style="width: {{septPct}}%"></span></div>'
        '<div class="gs-sub">Año {{anio}}: {{sv.anioTxt}} de {{sv.metaAnualTxt}} ({{sv.anioPct}}%)</div></div>')
out, pos = '', 0
while True:
    i = mk.find('list="{{plans}}"', pos)
    if i < 0: break
    j = mk.find('</sc-for>', i); k = mk.find('</div>', j) + len('</div>')
    out += mk[pos:k] + SAVE; pos = k
mk = out + mk[pos:]
assert mk.count('gen-save') == 4

# ---------- 6. panel: filas de "Mis cuentas"
ROWS = '''<sc-if value="{{showAcc}}" hint-placeholder-val="{{true}}"><div class="ap-lbl">Mis cuentas</div><div class="ap-rows">
<sc-for list="{{accRows}}" as="ar" hint-placeholder-count="6"><button class="ap-row" onClick="{{ar.open}}"><span class="ap-ico" style="background: {{ar.color}}"></span><span style="flex: 1; min-width: 0"><b style="display: block; font-size: 14px">{{ar.label}}</b><span style="display: block; font-size: 12px; color: var(--apmut); margin-top: 1px">{{ar.sub}}</span></span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg></button></sc-for>
</div></sc-if>'''
mk = rep_all(mk, '<div class="ap-lbl">Estilo</div>', ROWS + '<div class="ap-lbl">Estilo</div>')
mk = rep_all(mk, '<div class="ap" role="dialog" aria-label="Apariencia">', '<div class="ap tall" role="dialog" aria-label="Ajustes">')
mk = rep_all(mk, '<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px">\n      <div>\n        <div style="font-family: \'Sora\', sans-serif; font-size: 21px',
                 '<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-shrink: 0">\n      <div>\n        <div style="font-family: \'Sora\', sans-serif; font-size: 21px')
# el contenido del panel debe desplazarse
i = mk.index('aria-label="Ajustes">'); a = mk.index('</button>\n    </div>\n', i) + len('</button>\n    </div>\n')
mk = mk[:a] + '<div class="as-scroll">' + mk[a:]
b = mk.index('Ver animación de inicio</button>', a) + len('Ver animación de inicio</button>')
mk = mk[:b] + '</div>' + mk[b:]

# ---------- 7. hojas extra (editor, detalle)
last = mk.rindex('</div>')
mk = mk[:last] + open(os.path.join(T, 'extra.html'), encoding='utf8').read() + mk[last:]

# ---------- 8. convertir a plantilla htm
VOID = {'input', 'br', 'img', 'hr', 'meta', 'link'}
def conv_hole(expr, scope):
    expr = expr.strip()
    if expr in ('true', 'false'): return expr
    root = expr.split('.')[0]
    return expr if root in scope else 'v.' + expr

def conv_attrs(attrs, scope, tag):
    def one(m):
        name, val = m.group(1), m.group(2)
        if name.startswith('hint-'): return ''
        if name == 'onChange' and tag == 'input' and 'type="file"' not in attrs: name = 'onInput'
        holes = list(re.finditer(r'\{\{\s*([\w.$]+)\s*\}\}', val))
        if not holes: return ' %s="%s"' % (name, val.replace('`', '\\`').replace('${', '\\${'))
        if len(holes) == 1 and holes[0].group(0) == val.strip():
            return ' %s=${%s}' % (name, conv_hole(holes[0].group(1), scope))
        parts, pos = [], 0
        for h in holes:
            parts.append(json.dumps(val[pos:h.start()], ensure_ascii=False)); parts.append('(%s)' % conv_hole(h.group(1), scope)); pos = h.end()
        parts.append(json.dumps(val[pos:], ensure_ascii=False))
        return ' %s=${%s}' % (name, ' + '.join(p for p in parts if p != '""'))
    return re.sub(r'\s([\w:-]+)="([^"]*)"', one, attrs)

def convert(s):
    out, scope, pos = [], [], 0
    tok = re.compile(r'<(/?)(sc-if|sc-for)\b([^>]*)>|<([a-zA-Z][\w-]*)(\s[^<>]*?)?(/?)>|\{\{\s*([\w.$]+)\s*\}\}')
    for m in tok.finditer(s):
        text = s[pos:m.start()]
        out.append(text.replace('`', '\\`').replace('${', '\\${'))
        pos = m.end()
        if m.group(2):
            close, kind, attrs = m.group(1), m.group(2), m.group(3)
            if kind == 'sc-if':
                if close: out.append('` : null}')
                else:
                    val = re.search(r'value="\{\{\s*([\w.$]+)\s*\}\}"', attrs).group(1)
                    out.append('${(%s) ? html`' % conv_hole(val, scope))
            else:
                if close:
                    scope.pop(); out.append('`)}')
                else:
                    lst = re.search(r'list="\{\{\s*([\w.$]+)\s*\}\}"', attrs).group(1)
                    var = re.search(r'as="(\w+)"', attrs).group(1)
                    out.append('${((%s) || []).map((%s, $index) => html`' % (conv_hole(lst, scope), var))
                    scope.append(var)
        elif m.group(4):
            tag, attrs, selfc = m.group(4), m.group(5) or '', m.group(6)
            a = conv_attrs(attrs, scope, tag.lower())
            if tag.lower() in VOID or selfc: out.append('<%s%s />' % (tag, a))
            else: out.append('<%s%s>' % (tag, a))
        elif m.group(7):
            out.append('${%s}' % conv_hole(m.group(7), scope))
    out.append(s[pos:].replace('`', '\\`'))
    # cierres de etiquetas: se copiaron como texto (</div>) — válido en htm
    return ''.join(out)

body = convert(mk)
view = 'export default function view(v, html) {\n  return html`' + body + '`;\n}\n'
os.makedirs(SITE, exist_ok=True)
open(os.path.join(SITE, 'view.js'), 'w', encoding='utf8').write(view)

# ---------- 9. CSS: fuentes locales + ajustes para teléfono real
fonts = [('Sora', 'sora', 'wght'), ('Manrope', 'manrope', 'wght'), ('Unbounded', 'unbounded', 'wght'), ('Archivo', 'archivo', 'wght'),
         ('Fraunces', 'fraunces', 'full'), ('Instrument Sans', 'instrument-sans', 'wght'), ('Bricolage Grotesque', 'bricolage-grotesque', 'full'), ('Nunito', 'nunito', 'wght')]
os.makedirs(os.path.join(SITE, 'fonts'), exist_ok=True)
ff = []
for fam, slug, axis in fonts:
    base = os.path.join(ROOT, 'node_modules/@fontsource-variable', slug, 'files')
    for style in ['normal', 'italic']:
        fn = '%s-latin-%s-%s.woff2' % (slug, axis, style)
        if not os.path.exists(os.path.join(base, fn)):
            fn = '%s-latin-wght-%s.woff2' % (slug, style)
            if not os.path.exists(os.path.join(base, fn)): continue
        shutil.copy(os.path.join(base, fn), os.path.join(SITE, 'fonts', fn))
        ff.append("@font-face{font-family:'%s';font-style:%s;font-display:swap;font-weight:100 900;src:url(fonts/%s) format('woff2')}" % (fam, style, fn))
MOBILE = open(os.path.join(T, 'mobile.css'), encoding='utf8').read()
open(os.path.join(SITE, 'app.css'), 'w', encoding='utf8').write('\n'.join(ff) + '\n' + css + '\n' + MOBILE)
print('view.js', len(view), 'app.css ok')
