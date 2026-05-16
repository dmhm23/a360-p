// =============================================================
// Configuración del medio del hero (imagen o video)
// =============================================================
// Hay 2 formas de cambiar el medio del hero:
//
//   A) ARCHIVO LOCAL EN src/assets
//      1. Sube tu archivo (.mp4, .webm, .png, .jpg, etc.) a src/assets/
//      2. Importa el asset arriba:           import miVideo from "@/assets/mi-video.mp4";
//         o, si Lovable generó un .asset.json:
//         import miAsset from "@/assets/mi-video.mp4.asset.json";
//      3. Usa la importación abajo en `heroMediaSrc`:
//         export const heroMediaSrc = miVideo;
//         // o, si es un .asset.json:
//         export const heroMediaSrc = miAsset.url;
//
//   B) URL EXTERNA (CDN, Supabase Storage, etc.)
//      Pega la URL completa directamente:
//      export const heroMediaSrc = "https://midominio.com/video.mp4";
//
// El componente <HeroMedia /> detecta automáticamente si es video o imagen
// según la extensión (.mp4, .webm, .mov, .m4v, .ogv = video; resto = imagen).
// Si la URL no tiene extensión clara (p.ej. firmada), forza el tipo con
// `heroMediaType` debajo.
// =============================================================

export const heroMediaSrc: string =
  "https://nazkolmoghbnhmahwijn.supabase.co/storage/v1/object/public/site-media/hero.mp4";

export const heroMediaType: "auto" | "image" | "video" = "video";

export const heroMediaPoster: string | undefined = undefined;
