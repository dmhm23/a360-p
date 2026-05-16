# Plan — Modal "Solicitar 1 año gratis"

## 1. Diagnóstico del estado actual

- **CTAs existentes en `src/pages/Landing.tsx`** que hoy llaman a `goSignup` (navegan a `/signup`) y deberían abrir el modal:
  - Nav (línea 217) — botón "Solicitar 1 año gratis" / "1 año gratis"
  - Hero (línea 249) — "Quiero mi cupo gratis"
  - Sección problema/solución (336)
  - CTA tras planes (417)
  - Franja CTA intermedia (518)
  - Card de plan destacado (574)
  - Oferta 1 año gratis (629) — "Postular mi centro al año gratis"
  - CTA final (703)
- **Modal reutilizable**: existe `Dialog` de shadcn (`src/components/ui/dialog.tsx`) usado en `HeroMediaSettingsModal`. Sirve perfecto como base.
- **Formulario / captura de leads**: no existe. Tampoco hay servicio ni hook.
- **Supabase**: configurado vía Lovable Cloud. Tablas actuales: `clients`, `proposals`, `templates`, etc. **No hay tabla de leads/solicitudes/postulaciones**.
- **Política de privacidad**: no existe ruta ni sección. Recomendación: crear ruta placeholder `/privacidad` (página simple) y enlazar desde el checkbox; texto puede iterarse luego.
- **Riesgos de regresión**: bajo — solo se reemplazan handlers de CTAs en Landing y se agrega una página/ruta nueva. No se tocan auth, dashboard ni RLS de tablas existentes.

## 2. Arquitectura recomendada

- Nuevo componente reutilizable: `src/components/RequestAccessModal.tsx`
  - Controlado por `open` / `onOpenChange` (patrón ya usado en `HeroMediaSettingsModal`).
- Provider ligero `src/contexts/RequestAccessContext.tsx` con `openRequestModal()` para que cualquier CTA lo abra sin prop drilling. Se monta una sola instancia del modal en `Landing.tsx` (ámbito acotado, sin tocar `App.tsx`).
- Servicio: `src/services/leads.ts` con `submitLead(payload)` que inserta en Supabase y captura UTMs/`page_path`/`user_agent`.
- Validación: `zod` + `react-hook-form` (ya disponibles en el proyecto vía shadcn `form.tsx`).
- Página nueva: `src/pages/Privacidad.tsx` + ruta `/privacidad` en `App.tsx` (solo añadir la ruta, sin tocar las demás).

## 3. Campos finales del formulario

Columnas en desktop, una columna en móvil:

| Campo | Tipo | Obligatorio | Validación |
|---|---|---|---|
| Nombre del centro / empresa | text | sí | min 2 |
| Ciudad | text | sí | min 2 |
| Nombre completo | text | sí | min 3 |
| Cargo | text | sí | min 2 |
| Correo electrónico | email | sí | regex email |
| Teléfono | tel | sí | 7–15 dígitos, permite `+` y espacios |
| Checkbox autorización | bool | sí | debe ser `true` |

Capturados automáticamente (no visibles): `source = "workshop_modal_form"`, `status = "new"`, `page_path`, `user_agent`, `utm_source`, `utm_medium`, `utm_campaign` (leídos de `window.location`).

## 4. Diseño responsive

- `DialogContent` con `max-w-2xl`, `max-h-[90vh] overflow-y-auto`.
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-4`.
- Checkbox y botón ocupan ancho completo (`md:col-span-2`).
- Botón principal con ícono `ArrowRight` de lucide.
- Cierre con X (nativo de `DialogContent`) y clic fuera (comportamiento por defecto de Radix).

## 5. Estructura propuesta de la tabla

```sql
create table public.lead_requests (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  city text not null,
  full_name text not null,
  role text not null,
  email text not null,
  phone text not null,
  accepted_privacy_policy boolean not null default false,
  source text not null default 'workshop_modal_form',
  status text not null default 'new',
  page_path text,
  user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.lead_requests (created_at desc);
create index on public.lead_requests (email);
-- trigger update_updated_at_column (ya existe la función)
```

## 6. Políticas RLS recomendadas

- `enable row level security`.
- **INSERT público anónimo permitido** (con check `accepted_privacy_policy = true`):
  ```sql
  create policy "Public can submit lead requests"
  on public.lead_requests for insert
  to anon, authenticated
  with check (accepted_privacy_policy = true);
  ```
- **SELECT solo admins**:
  ```sql
  create policy "Admins can view leads"
  on public.lead_requests for select
  to authenticated
  using (has_role(auth.uid(), 'admin'));
  ```
- **UPDATE solo admins** (gestión de `status`).
- **Sin DELETE público** (sin policy → bloqueado).

## 7. Componentes que se crearían o modificarían

**Crear**
- `src/components/RequestAccessModal.tsx`
- `src/contexts/RequestAccessContext.tsx` (provider + hook `useRequestAccess`)
- `src/services/leads.ts`
- `src/pages/Privacidad.tsx`

**Modificar**
- `src/pages/Landing.tsx` — envolver con provider, montar modal, reemplazar `onClick={goSignup}` por `onClick={openRequestModal}` en los 8 CTAs listados. **Mantener** el botón "Iniciar sesión" del nav apuntando a `/login` y dejar la ruta `/signup` intacta.
- `src/App.tsx` — agregar ruta `/privacidad`.

## 8. CTAs que abrirán el modal

Los 8 CTAs listados en §1. El botón "Iniciar sesión" del nav **no** cambia.

## 9. Estados del formulario

`idle → validating (zod) → submitting (botón disabled + spinner) → success (vista de confirmación dentro del mismo modal) → error (toast + permanece en el form con datos)`. Reset al cerrar.

## 10. Validaciones

- Todos los campos requeridos no vacíos (trim).
- Email: regex estándar zod.
- Teléfono: `/^[+\d\s()-]{7,20}$/`.
- Checkbox: debe ser `true`.
- Botón submit deshabilitado mientras `isSubmitting` para evitar dobles envíos.

## 11. Mensaje de éxito

Tras `insert` exitoso, el contenido del `DialogContent` cambia a:
- Título: "Solicitud enviada correctamente"
- Mensaje descrito por el usuario
- Botón "Entendido" → cierra el modal y resetea el formulario.

## 12. Riesgos de regresión

- Bajo. Posibles puntos a vigilar:
  - El nav CTA hoy lleva a `/signup`: confirmar que dejar de hacerlo no rompe analítica existente.
  - Provider montado solo en Landing — si después se quiere abrir desde otras páginas, habrá que elevarlo a `App.tsx`.
  - Página `/privacidad` placeholder: indicar al usuario que el texto legal debe revisarse.

## 13. Checklist de pruebas

- [ ] Cada uno de los 8 CTAs abre el modal.
- [ ] Cierre con X, con tecla Esc y con clic fuera.
- [ ] Validaciones: campos vacíos, email inválido, teléfono inválido, checkbox sin marcar.
- [ ] Doble clic en "Enviar" no produce 2 inserts.
- [ ] Registro visible en tabla `lead_requests` con UTMs si la URL los trae.
- [ ] Vista de éxito aparece; "Entendido" cierra y resetea.
- [ ] Error de red muestra toast y conserva los datos.
- [ ] Responsive: 1 columna <768px, 2 columnas ≥768px.
- [ ] Usuario anónimo no puede hacer SELECT desde el cliente.
- [ ] Enlace "tratamiento de datos personales" navega a `/privacidad` en nueva pestaña.

## 14. Prompt sugerido para implementar SOLO el Paso 1

> "Implementa el Paso 1: crea la migración de Supabase para la tabla `public.lead_requests` con los campos y políticas RLS definidos en el plan (INSERT público con check `accepted_privacy_policy = true`, SELECT y UPDATE solo admins, sin DELETE). Incluye trigger `update_updated_at_column` e índices en `created_at` y `email`. No toques código de frontend todavía."

---

### Detalles técnicos clave

- Librerías: `react-hook-form` + `zod` + `@hookform/resolvers` (verificar si están instaladas; si no, agregarlas en el paso de implementación del modal).
- Insert vía `supabase.from('lead_requests').insert({...}).select().single()`.
- UTMs leídos con `new URLSearchParams(window.location.search)`.
- Reset del formulario al cerrar para no filtrar datos entre aperturas.
