# Mis Finanzas

App personal de gastos por **quincena, mes y año**, con cerditos (metas de ahorro), tarjetas, vehículos, créditos, plan de ahorro y un asistente de recomendaciones basado en reglas (sin IA). Tiene 4 estilos (Nimbo, Volt, Libreta, Alcancía) y tema claro, oscuro o automático.

Es una **PWA**: se instala desde el navegador, sin App Store ni Play Store, y funciona sin internet.

## Instalar en el teléfono

- **Android (Chrome):** abre el enlace de la app → menú ⋮ → **Instalar app** (o "Agregar a pantalla principal").
- **iPhone (Safari):** abre el enlace → botón **Compartir** → **Agregar a inicio**. Tiene que ser en Safari.

## Seguridad

- **Bloqueo con PIN** (6 números) y opcionalmente **huella / Face ID**. Con el bloqueo activo, los datos del teléfono se guardan **cifrados (AES-256-GCM)**; la clave se deriva del PIN (PBKDF2, 310.000 iteraciones). La app se bloquea sola tras 1 minuto en segundo plano y aplica esperas crecientes después de 5 intentos fallidos.
- **Nube con usuario y contraseña robusta** (12+ caracteres, mayúscula, número y símbolo) y **verificación en dos pasos obligatoria** con app autenticadora (TOTP).
- La base de datos (RLS) solo entrega los datos del propio usuario y **solo si pasó la verificación en dos pasos** (`aal2`).

## Ingresos por quincena

En **Ajustes → Ingresos por quincena** registras lo que realmente recibiste en cada quincena (salario, extras y recargos, otros). Donde no registres salario, la app usa el salario estimado del perfil y lo marca como "estimado". Desde **+ → Ingreso** también puedes sumar un ingreso suelto.

## Sincronización con Supabase (opcional)

1. Crea un proyecto gratis en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor → New query**, pega el contenido de [`supabase.sql`](supabase.sql) y dale **Run**.
3. Ve a **Project Settings → API** (o *Data API*) y copia la **Project URL** y la clave **anon / publishable**.
4. En la app: **Ajustes (botón de paleta) → Nube y copia de seguridad**. Pega la URL y la clave, elige *Crear cuenta*, escribe tu correo y una contraseña.
   - Si Supabase tiene activada la confirmación por correo, confirma desde tu correo y luego entra con *Entrar*.
5. En tus otros dispositivos entra con el mismo correo y contraseña.

Los datos siempre se guardan primero en el teléfono. Cuando hay internet se suben a tu cuenta. Si usas dos dispositivos a la vez, gana el último cambio guardado. La tabla tiene seguridad a nivel de fila (RLS): cada usuario solo puede leer y escribir sus propios datos.

## Copia de seguridad

**Ajustes → Nube y copia de seguridad → Exportar (.json)** descarga todos tus datos. **Importar** los recupera.

## Estructura

```
(raíz)           ← lo que se publica (GitHub Pages)
  index.html     página de entrada
  app.js         lógica: datos, periodos, créditos, asistente, sincronización
  view.js        vista de los 4 estilos (generada)
  app.css        estilos (generado) + fuentes locales en fonts/
  sw.js          service worker (funciona sin internet)
  manifest.webmanifest, icons/
supabase.sql     tabla y reglas de seguridad para la nube
tools/           scripts que generan view.js, app.css y sw.js
```

No hay paso de compilación: `site/` se sirve tal cual. Después de cambiar archivos en `site/`, ejecuta `python3 tools/make_sw.py` para que los teléfonos reciban la actualización.
