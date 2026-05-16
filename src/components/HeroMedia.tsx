import { useEffect, useMemo, useState } from "react";
import fallbackAsset from "@/assets/hero-dashboard.png.asset.json";

type HeroMediaProps = {
  /** URL del recurso (imagen o video) */
  src: string;
  /** Texto alternativo (usado en imágenes y como aria-label en videos) */
  alt: string;
  /** Forzar el tipo de medio. Si se omite, se detecta por extensión. */
  type?: "image" | "video" | "auto";
  /** Poster para videos (opcional) */
  poster?: string;
  className?: string;
};

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v", ".ogv"];
const FALLBACK_SRC = fallbackAsset.url;

const detectType = (src: string): "image" | "video" => {
  const lower = src.split("?")[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => lower.endsWith(ext)) ? "video" : "image";
};

/**
 * Renderiza imagen o video del hero de forma transparente.
 * - Detecta el tipo por extensión, o se puede forzar con la prop `type`.
 * - Si la carga falla, muestra una imagen fallback (`hero-dashboard.png`).
 */
export const HeroMedia = ({
  src,
  alt,
  type = "auto",
  poster,
  className,
}: HeroMediaProps) => {
  const resolved = useMemo(
    () => (type === "auto" ? detectType(src) : type),
    [src, type],
  );
  const [failed, setFailed] = useState(false);

  // Reinicia el estado de error cuando cambia la fuente.
  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <img
        src={FALLBACK_SRC}
        alt={alt}
        className={className}
        loading="eager"
      />
    );
  }

  if (resolved === "video") {
    return (
      <video
        src={src}
        poster={poster ?? FALLBACK_SRC}
        className={className}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="eager"
      onError={() => setFailed(true)}
    />
  );
};

export default HeroMedia;
