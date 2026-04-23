

# Landing oficial de Alturas360

Voy a transformar la landing actual (QuoteKit) en la **landing comercial de Alturas360**, reutilizando la estructura de `src/pages/Landing.tsx` y reemplazando textos, jerarquía, módulos y CTAs. También actualizo el branding global (nombre, título, meta tags).

## Cambios de branding global

- **`index.html`**: `<title>` y meta tags (description, og:title, og:description, twitter) → "Alturas360 — Plataforma de gestión para centros de formación en trabajo seguro en alturas".
- **Logo / nombre en nav y footer** dentro de `Landing.tsx`: "QuoteKit" → "Alturas360", icono `FileText` → `Mountain` (lucide), conservando el cuadro con color `bg-primary`.
- Paleta y tipografías se conservan (Plus Jakarta Sans + DM Sans + primary azul) — encajan con tono SaaS ejecutivo.
- La imagen `hero-dashboard.png` se mantiene como mockup de dashboard (representa el "Dashboard gerencial").

## Estructura final de `src/pages/Landing.tsx`

Reutilizo el esqueleto existente y reorganizo en 10 secciones según el brief:

```text
Nav  →  Hero  →  Problema  →  Solución  →  Beneficios (con bloque promo)
     →  Módulos  →  Diferenciadores  →  Confianza/Cumplimiento (franja CTA)
     →  Pricing (3 planes)  →  Oferta 1 año gratis  →  CTA final  →  Footer
```

### 1. Nav
- Marca "Alturas360" + botones "Iniciar sesión" / "Solicitar 1 año gratis".

### 2. Hero
- Pill superior: **"Oferta de lanzamiento · 1 año gratis para centros seleccionados"**.
- H1: **Recupera el control y la rentabilidad de tu centro de entrenamiento**.
- Sub: copy completo del brief sobre centralizar matrícula, cursos, documentos, cartera y certificación.
- CTA primario: **Solicitar 1 año gratis** · Secundario: **Agendar una demo**.
- Microcopy: *Implementación sin costo. Formación sin costo. Accede a 1 año gratis para tu centro.*
- Mockup `hero-dashboard.png` con glow, igual que hoy.

### 3. Problema — "La caja negra"
- Reemplazo de "Social proof / logos" por un bloque oscuro/acento con headline **"Muchos centros operan como una caja negra"**, 3–4 viñetas (procesos manuales, dispersión documental, dependencia del equipo administrativo, poca visibilidad real) y cierre destacado: *"Cada reproceso, cada retraso y cada validación manual termina afectando margen, tiempo y capacidad de crecimiento."*

### 4. Solución
- Sustituye la sección "Features" actual por un bloque de 2 columnas: a la izquierda título **"De una operación dispersa a un sistema administrable"** + copy (especializado en el sector, integra académico/documental/financiero/certificación), a la derecha 4 mini-cards con íconos. Cierre promocional: *"Empieza sin fricción: implementación sin costo, formación sin costo y la posibilidad de solicitar 1 año gratis."*

### 5. Beneficios (reutiliza grid de 6 features)
- Grid 3×2 con iconos lucide actualizados:
  - Más control sobre el estado real del centro (`Gauge`)
  - Menos carga administrativa (`Workflow`)
  - Continuidad operativa (`ShieldCheck`)
  - Mejor seguimiento financiero (`LineChart`)
  - Velocidad para ejecutar y cerrar procesos (`Zap`)
  - Trazabilidad para decidir mejor (`Activity`)
- Debajo, **bloque promocional destacado** (card con borde primary): "Empieza con 1 año gratis" + copy + CTA **"Quiero solicitar 1 año gratis"**.

### 6. Módulos (reemplaza "How it works")
- Grid de 8 tarjetas (Matrículas, Cursos y programación, Gestión documental, Firma digital, Cartera, Certificación, Portal del estudiante, Dashboard gerencial), cada una con ícono + título + 1 línea orientada a valor (no técnica).

### 7. Diferenciadores (reutiliza checklist)
- Headline **"No es software genérico. Es estructura para administrar mejor."**
- Lista con `CheckCircle2`: especialización sector alturas Colombia, visión integral, orden para un negocio exigente, resiliencia frente a rotación administrativa, adopción más fácil con 1 año gratis.

### 8. Confianza / Cumplimiento + franja CTA
- Sección con 4 pilares (Trazabilidad, Respaldo documental, Centralización, Capacidad de respuesta) en cards.
- Franja CTA full-width con fondo `accent`: *"Empieza ahora sin costo de implementación ni formación. Solicita 1 año gratis para comenzar a transformar la operación de tu centro."* + botón **Solicitar 1 año gratis**.

### 9. Pricing — 3 planes
- Tabla/cards comparativa con 3 columnas: **Despegue · Control+ · Dirección Pro**.
- Plan central (Control+) destacado con badge "Más elegido" y borde primary.
- Cada card muestra: nombre · "Ideal para…" · "Enfoque" (3–4 bullets cortos) · CTA.
- Sin precios numéricos. CTAs según brief (los dos primeros: "Solicitar 1 año gratis"; Dirección Pro: "Hablar con un asesor").
- Franja debajo: *"Promoción de lanzamiento: implementación sin costo, formación sin costo y 1 año gratis para centros seleccionados."*

### 10. Sección oferta "1 año gratis"
- Bloque dedicado con fondo gradiente: explica por qué se postergan decisiones (costo / implementación) y cómo Alturas360 baja la barrera.
- Tres bullets con íconos: 1 año gratis · Implementación sin costo · Formación inicial sin costo.
- CTA: **Postular mi centro al año gratis**.
- Microcopy: *Sujeto a disponibilidad y validación comercial.*

### 11. CTA final
- Headline grande **"Deja de administrar a ciegas"** + copy de apoyo del brief.
- Botones: **Solicitar 1 año gratis** / **Agendar una demo**.
- Microcopy: *Implementación sin costo. Formación sin costo. Cupos limitados para el beneficio de 1 año gratis.*

### 12. Footer
- Logo Alturas360 + © año + línea fina con "Plataforma para centros de formación en trabajo seguro en alturas · Colombia".

## Comportamiento de los CTAs

Como aún no existen rutas de "demo" ni "postulación", todos los CTAs comerciales (`Solicitar 1 año gratis`, `Agendar una demo`, `Postular mi centro`, `Hablar con un asesor`) apuntarán a `/signup` (mismo destino que tiene hoy "Get started"). Así el flujo queda funcional sin romper rutas. Más adelante puedes pedirme reemplazar esos CTAs por un formulario de postulación o un enlace a Calendly.

## Detalles técnicos

- Solo se modifican: `src/pages/Landing.tsx` (reescritura del contenido, conservando layout/tokens/animaciones existentes) e `index.html` (title + meta).
- No se tocan rutas (`App.tsx`), auth, ni el resto del producto.
- Se mantienen tokens semánticos (`bg-primary`, `text-muted-foreground`, `border-border`, `bg-accent`, gradients) — sin colores hardcoded.
- Todo el copy queda en español, listo para producción (sin placeholders).
- Iconos nuevos importados desde `lucide-react` (`Mountain`, `Gauge`, `Workflow`, `ShieldCheck`, `LineChart`, `Zap`, `Activity`, `GraduationCap`, `CalendarDays`, `FileSignature`, `Wallet`, `Award`, `UserCircle2`, `LayoutDashboard`, `FolderLock`).
- Responsive: se conservan los breakpoints actuales (grids `sm:grid-cols-2 lg:grid-cols-3/4`) y CTAs full-width en mobile.

