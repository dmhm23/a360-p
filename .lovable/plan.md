

# Modal de configuración del medio del hero

Hoy `src/config/heroMedia.ts` es **código fuente estático**: solo se puede cambiar editando el archivo. Para que un modal cargue un archivo y "actualice el `heroMediaSrc` automáticamente", el medio tiene que vivir en almacenamiento, no en código. Propongo subirlo a **Lovable Cloud Storage** y leerlo en runtime, manteniendo `heroMedia.ts` solo como *fallback* por defecto.

## Flujo de usuario

1. En la landing aparece un botón flotante discreto (esquina inferior derecha, ícono engranaje) **solo visible para administradores autenticados**.
2. Al hacer clic abre un modal "Configurar medio del hero" con:
   - **Vista previa** del medio actual (imagen o video).
   - **Zona de carga** con drag & drop + selector de archivo (acepta `.png .jpg .jpeg .webp .gif .mp4 .webm .mov`, máx. 20 MB).
   - **Selector de tipo**: Auto (por extensión) / Imagen / Video.
   - **Campo opcional de poster** (URL) para videos.
   - Botones: **Guardar**, **Restaurar al medio por defecto**, **Cancelar**.
3. Al guardar: se sube el archivo al bucket, se registra la URL en la tabla `site_settings`, y la landing actualiza el hero en vivo (sin refresh) gracias a Realtime.

## Arquitectura técnica

### Backend (Lovable Cloud)

**Bucket público de Storage** `site-media`:
- Subida: solo admins (RLS verifica `has_role(auth.uid(), 'admin')`).
- Lectura: pública (cualquiera puede ver la landing).

**Tabla `site_settings`** (single-row, key/value para futuras configuraciones):
```
id          uuid PK
key         text UNIQUE         -- p.ej. 'hero_media'
value       jsonb               -- { src, type, poster }
updated_by  uuid
updated_at  timestamptz
```
- RLS: `SELECT` público (anon), `INSERT/UPDATE` solo admins.
- Realtime habilitado para que los cambios se reflejen sin recargar.

### Frontend

**Nuevo hook `src/hooks/useHeroMedia.ts`**:
- Lee `site_settings` con clave `hero_media`.
- Si no existe registro → devuelve los valores por defecto de `src/config/heroMedia.ts`.
- Suscripción Realtime: actualiza estado cuando cambia el row.

**Nuevo componente `src/components/HeroMediaSettingsModal.tsx`**:
- Usa `Dialog` de shadcn.
- Maneja upload con `supabase.storage.from('site-media').upload(...)` (nombre con timestamp para evitar caché).
- Llama `supabase.from('site_settings').upsert(...)` con la URL pública.
- Toasts de éxito/error.

**Modificar `src/pages/Landing.tsx`**:
- Reemplazar el import directo de `heroMediaSrc` por `useHeroMedia()`.
- El componente `<HeroMedia />` recibe los valores del hook.
- Renderizar un botón flotante (`fixed bottom-6 right-6`) con el ícono `Settings` que abre el modal — **condicionado a `user && role === 'admin'`** desde `useAuth()`.

### Comportamiento del config file

`src/config/heroMedia.ts` se mantiene como fallback inicial (lo que se ve antes de que un admin suba algo). No se modifica en runtime — eso ya no es necesario porque la fuente de verdad pasa a ser la base de datos.

## Archivos afectados

| Archivo | Acción |
|---|---|
| Migración SQL | Crear bucket `site-media` + tabla `site_settings` + políticas RLS + habilitar Realtime |
| `src/hooks/useHeroMedia.ts` | Nuevo |
| `src/components/HeroMediaSettingsModal.tsx` | Nuevo |
| `src/pages/Landing.tsx` | Reemplazar uso directo del config por el hook + botón flotante para admins |

## Detalles importantes

- **Límite de tamaño**: 20 MB en frontend (validación), reforzado por el bucket. Si necesitas videos más pesados, conviene subir a un CDN externo y pegar URL — puedo agregar esa pestaña al modal si lo deseas.
- **Caché**: añado `?v=timestamp` a la URL guardada para que el navegador no muestre el medio anterior.
- **Visibilidad del botón**: solo admins logueados. Visitantes anónimos jamás ven el engranaje. Si prefieres una ruta dedicada (p.ej. `/settings/landing`) en lugar de un botón flotante en la landing pública, dímelo.
- **Sin precios numéricos ni cambios de copy** — esta tarea es puramente de infraestructura para el medio del hero.

