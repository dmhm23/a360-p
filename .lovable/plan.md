# Diagnóstico del estado actual

## 1. Logo
- **Landing nav** (`src/pages/Landing.tsx` línea 212-218): cuadrado azul con icono `Mountain` + texto "Alturas360".
- **Landing footer** (líneas 741-748): mismo patrón en versión chica.
- **DashboardLayout** (`src/components/DashboardLayout.tsx` líneas 41 y 100): icono `FileText` + texto en sidebar y header móvil.
- **Login / Signup / Forgot / Reset**: icono `FileText` dentro de un cuadrado.
- No hay logo cargado desde asset ni Storage; todo son iconos Lucide hardcodeados.
- El SVG adjunto (`Diseño_sin_título.svg`) está en `user-uploads://` — necesita copiarse a `src/assets/`.

## 2. Login (puntos de entrada visibles)
- **Nav landing** (línea 231-233): botón "Iniciar sesión" / "Mi cuenta".
- **Floating "Admin"** (líneas 773-783): botón flotante para visitantes anónimos que lleva a `/login`.
- **Rutas** en `src/App.tsx`: `/login`, `/signup`, `/forgot-password`, `/reset-password` siguen existiendo.
- **Lógica auth**: `AuthContext`, `ProtectedRoute`, redirect en línea 201 (admins se quedan, otros van a `/dashboard`). Toda esa lógica debe permanecer intacta.

## 3. Imagen "dañada" del hero
- Renderizada por `<HeroMedia>` (`src/components/HeroMedia.tsx`) con datos de `useHeroMedia()` (`src/hooks/useHeroMedia.ts`).
- El hook lee de la tabla `site_settings` (clave `hero_media`) y, si está vacía, cae a `src/config/heroMedia.ts` que importa `src/assets/hero-dashboard.png.asset.json`.
- **Causa probable de la imagen rota**: o (a) `site_settings` tiene una URL inválida persistida, o (b) el `.asset.json` apunta a un recurso que ya no existe.
- El botón "Admin" + modal `HeroMediaSettingsModal` + bucket `site-media` + tabla `site_settings` fueron añadidos para gestionar este medio. El usuario quiere eliminar esa dependencia.
- `<HeroMedia>` **no tiene fallback** si el `<video>` o `<img>` falla.

## 4. Paleta
- Definida centralizadamente en `src/index.css` vía variables HSL (`--primary`, `--foreground`, `--accent`, `--ring`, etc.) con modo claro y `dark`.
- `tailwind.config.ts` solo consume las variables (`hsl(var(--primary))`) — no hay que tocarlo.
- Casi todos los componentes usan tokens semánticos (`bg-primary`, `text-foreground`). Cambiar las variables propaga el cambio a todo el sitio.
- Hay algunos gradientes `from-primary to-primary/70` que se beneficiarán automáticamente del nuevo azul.

# Riesgos y zonas a no tocar
- **No tocar**: `src/integrations/supabase/*`, `AuthContext`, `ProtectedRoute`, rutas en `App.tsx`, edge functions, RLS, ni la tabla `site_settings` / bucket `site-media` (se quedan inertes, sin uso desde la landing).
- **No eliminar** archivos `useHeroMedia.ts` ni `HeroMediaSettingsModal.tsx`: simplemente dejan de importarse desde la landing. Quedan disponibles si en el futuro se quiere reactivar.
- Riesgo color: si el nuevo azul tiene contraste bajo contra fondos `accent` claros, hay que ajustar `--accent` y `--accent-foreground` también.
- Riesgo logo: si el SVG es muy ancho, romperá el alto de la nav (h-16). Hay que envolverlo con altura controlada.
- Riesgo hero video: archivos pesados degradan LCP móvil; mitigar con `preload="metadata"`, `playsInline`, `muted`, `poster`, y peso recomendado < 3-5 MB.

# Recomendaciones técnicas

| Cambio | Recomendación |
|---|---|
| Logo | Copiar SVG a `src/assets/logo.svg`, crear `src/components/Logo.tsx` reutilizable y reemplazar los 6 sitios (landing nav, landing footer, DashboardLayout x2, Login, Signup/Forgot/Reset). |
| Ocultar login | Feature flag en `src/config/featureFlags.ts` (`SHOW_LOGIN = false`). Envolver botones "Iniciar sesión" y "Admin" con el flag. Rutas y `AuthContext` quedan intactos. |
| Hero video | Volver al modelo **estático** controlado por `src/config/heroMedia.ts` (ya existe). Dejar de usar `useHeroMedia()` en la landing. Recomendación principal: **video local en `src/assets/hero.mp4`** importado en `heroMedia.ts`. Alternativa secundaria: URL pública (CDN). Añadir fallback `onError` en `<HeroMedia>` que muestre la imagen por defecto. |
| Paleta | Modificar únicamente las variables HSL en `src/index.css`. `--primary: 218 55% 47%` (#3666BA), `--foreground: 0 0% 22%` (#383838), recalcular `--accent`, `--accent-foreground`, `--ring`, `--sidebar-*` por coherencia. |

Edición vs Visual Edit: todos los cambios requieren modificación de código (no son edits de copy puntuales).

# Plan de implementación paso a paso

### Paso 1 — Preparación de assets y revisión de dependencias
- **Acciones**: copiar `user-uploads://Diseño_sin_título.svg` → `src/assets/logo.svg`. Confirmar que el usuario subirá un archivo `hero.mp4` (o proporcionará URL). Verificar que ningún otro componente fuera de la landing importa `useHeroMedia` o `HeroMediaSettingsModal`.
- **Archivos**: `src/assets/logo.svg` (nuevo).
- **Riesgo**: nulo (solo copia).
- **Validación**: `ls src/assets/logo.svg` y vista previa abre sin error.

### Paso 2 — Reemplazo del logo
- **Acciones**: crear `src/components/Logo.tsx` que renderice `<img src={logo} />` con prop `className` para tamaño. Reemplazar bloques de icono+texto en `Landing.tsx` (nav línea 211-218 y footer línea 741-748), `DashboardLayout.tsx` (líneas 41 y 100), `Login.tsx`, `Signup.tsx`, `ForgotPassword.tsx`, `ResetPassword.tsx`.
- **Riesgo**: layout (alto de nav). Mitigación: `h-8` / `h-10` fijos.
- **Validación**: nav y footer mantienen alto; logo nítido en retina.
- **Regresiones posibles**: alineación vertical en sidebar móvil del dashboard.

### Paso 3 — Ocultar login sin eliminar lógica
- **Acciones**: crear `src/config/featureFlags.ts` con `export const SHOW_LOGIN = false`. En `Landing.tsx` envolver botón "Iniciar sesión" (línea 231) y botón flotante "Admin" (líneas 773-783) con `{SHOW_LOGIN && ...}`. **No tocar** `App.tsx`, `AuthContext`, `ProtectedRoute`, ni páginas `/login`, `/signup`.
- **Riesgo**: bajo. Las rutas siguen accesibles por URL directa (por diseño).
- **Validación**: en la landing no aparecen "Iniciar sesión" ni "Admin"; navegar manualmente a `/login` sigue funcionando.

### Paso 4 — Reemplazar imagen rota del hero por video estático
- **Acciones**:
  1. Quitar de `Landing.tsx` los imports y uso de `useHeroMedia`, `HeroMediaSettingsModal`, `Settings`, el state `settingsOpen`, el efecto admin y el bloque flotante final (líneas 757-784). Importar directamente `heroMediaSrc`, `heroMediaType`, `heroMediaPoster` desde `@/config/heroMedia`.
  2. Editar `src/config/heroMedia.ts` para que apunte a `import heroVideo from "@/assets/hero.mp4"` (cuando el usuario suba el archivo en el Paso 1) o a una URL pública.
  3. Añadir manejador `onError` en `src/components/HeroMedia.tsx` que muestre la imagen `hero-dashboard` por defecto si el video/imagen falla.
- **Archivos**: `src/pages/Landing.tsx`, `src/config/heroMedia.ts`, `src/components/HeroMedia.tsx`.
- **Riesgo**: medio. Si el usuario no provee video, dejamos la imagen actual como fallback hasta que lo suba.
- **Validación**: hero carga sin errores en consola; en móvil reproduce muted/autoplay/loop; al simular 404 del video se muestra la imagen fallback.
- **Regresiones**: ninguna fuera del hero. Tabla `site_settings` y bucket `site-media` quedan huérfanos pero intactos.

### Paso 5 — Actualización centralizada de paleta
- **Acciones**: editar solo `src/index.css`. Modo claro:
  - `--primary: 218 55% 47%;` (#3666BA)
  - `--primary-foreground: 0 0% 100%;`
  - `--foreground: 0 0% 22%;` (#383838)
  - `--ring: 218 55% 47%;`
  - `--accent: 218 60% 95%;` `--accent-foreground: 218 55% 35%;`
  - `--sidebar-primary`, `--sidebar-ring`, `--sidebar-accent*` igualados.
  - Modo `dark`: `--primary: 218 60% 60%`, `--accent: 218 40% 20%`, `--accent-foreground: 218 60% 75%`.
- **Archivos**: `src/index.css` únicamente.
- **Riesgo**: contraste de texto sobre `accent`. Mitigación: revisar visualmente badges y chips.
- **Validación**: chequeo visual de nav, botones, badges, dashboards, gradientes hero.

### Paso 6 — Revisión responsive
- Probar en desktop (≥1024px), tablet (768px) y móvil (375px): nav con logo nuevo, hero video autoplay, footer, ausencia de botones de login.

### Paso 7 — Pruebas visuales y funcionales
- Smoke test: cargar `/` sin sesión, click en CTAs, scroll completo. Verificar consola limpia, sin requests fallidos a Storage ni a `site_settings`.

### Paso 8 — Validación final
- Confirmar que `/login`, `/signup` siguen funcionando por URL directa.
- Confirmar que `ProtectedRoute` sigue redirigiendo.
- Confirmar que el video del hero es < 5 MB y tiene poster.
- Marcar versión como estable.

# Archivos que probablemente se modificarían
- `src/assets/logo.svg` (nuevo)
- `src/assets/hero.mp4` (nuevo, lo aporta el usuario)
- `src/components/Logo.tsx` (nuevo)
- `src/config/featureFlags.ts` (nuevo)
- `src/config/heroMedia.ts`
- `src/components/HeroMedia.tsx`
- `src/pages/Landing.tsx`
- `src/components/DashboardLayout.tsx`
- `src/pages/Login.tsx`, `Signup.tsx`, `ForgotPassword.tsx`, `ResetPassword.tsx` (solo el bloque del logo)
- `src/index.css`

# Archivos / módulos que NO deben tocarse
- `src/App.tsx` (rutas)
- `src/contexts/AuthContext.tsx`
- `src/components/ProtectedRoute.tsx`
- `src/integrations/supabase/*`
- `supabase/migrations/*`, `supabase/functions/*`
- `src/hooks/useHeroMedia.ts` y `src/components/HeroMediaSettingsModal.tsx` (quedan sin uso pero no se eliminan)
- `tailwind.config.ts` (ya consume variables CSS)
- Cualquier página del dashboard, proposals, clients, templates, settings.

# Checklist de validación posterior
- [ ] Logo nuevo visible en nav y footer de la landing y en sidebar del dashboard.
- [ ] No aparece "Iniciar sesión" ni "Admin" en la landing.
- [ ] `/login` accesible por URL directa y funcional.
- [ ] Hero reproduce video autoplay muted loop en desktop y móvil.
- [ ] Si el video falla, se muestra la imagen fallback.
- [ ] Color principal `#3666BA` aplicado en botones, links, anillos y gradientes.
- [ ] Texto principal en `#383838` con contraste WCAG AA.
- [ ] Consola sin errores; sin requests a `site_settings` desde la landing.
- [ ] Dashboard, login y resto del app no presentan regresiones visuales graves.

# Prompt sugerido para ejecutar SOLO el Paso 1
> "Ejecuta únicamente el Paso 1 del plan aprobado: copia `user-uploads://Diseño_sin_título.svg` a `src/assets/logo.svg`, confirma que el archivo quedó en su sitio, y dime si necesitas que yo suba el `hero.mp4` o si lo vamos a referenciar por URL pública. No modifiques ningún otro archivo todavía."
