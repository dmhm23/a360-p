## Diagnóstico

- Archivo encontrado: `https://nazkolmoghbnhmahwijn.supabase.co/storage/v1/object/public/site-media/hero.mp4` → HTTP 200, `content-type: video/mp4`, **17.4 MB**.
- Bucket `site-media` es público, no requiere firma.
- `src/config/heroMedia.ts` actualmente apunta a la imagen `hero-dashboard`. Es el único punto que hay que tocar.
- `<HeroMedia>` ya detecta `.mp4` como video automáticamente y ya tiene fallback `onError` a la imagen por defecto si la red falla.

## Nota sobre el tamaño

17 MB es alto para un hero (recomendado < 5 MB). Funcionará, pero impactará el LCP móvil. Opciones futuras (no parte de esta tarea): re-comprimir a H.264 ~3 Mbps o subir una versión `hero-720.mp4`. Para esta tarea seguimos adelante con el archivo tal cual.

## Plan (un solo paso)

### Paso único — Conectar la URL pública en `heroMedia.ts`

Editar **solo** `src/config/heroMedia.ts`:

```ts
export const heroMediaSrc: string =
  "https://nazkolmoghbnhmahwijn.supabase.co/storage/v1/object/public/site-media/hero.mp4";
export const heroMediaType: "auto" | "image" | "video" = "video";
export const heroMediaPoster: string | undefined = undefined;
```

- `type: "video"` explícito (defensivo, aunque `.mp4` ya se autodetecta).
- Sin poster por ahora; mientras carga se ve el fondo. Si quieres un poster (primer frame como imagen), avísame y subo uno.
- No se toca ningún otro archivo. `<HeroMedia>` ya reproduce con `autoPlay muted loop playsInline preload="metadata"` y cae a la imagen fallback si el video falla.

## Archivos modificados

- `src/config/heroMedia.ts` (1 archivo, ~3 líneas)

## Archivos que NO se tocan

- `src/components/HeroMedia.tsx`, `Landing.tsx`, paleta, auth, Supabase client, edge functions, migrations.

## Checklist de validación

- [ ] Al recargar `/`, el hero reproduce el video en autoplay, muted, loop.
- [ ] En móvil reproduce inline (no pantalla completa).
- [ ] Consola limpia, sin 404 ni CORS.
- [ ] Si bloqueas la URL en DevTools, aparece la imagen `hero-dashboard` como fallback.

## Prompt para ejecutar

> "Aprobado, ejecuta el plan: actualiza `src/config/heroMedia.ts` con la URL pública de `hero.mp4` y `type: 'video'`."