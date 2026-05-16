import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  alt?: string;
};

/**
 * Logo de la marca. Sirve como reemplazo centralizado de los iconos
 * Lucide (Mountain/FileText) usados previamente en la nav, footer,
 * sidebar y páginas de auth.
 */
export function Logo({ className, alt = "Alturas360" }: LogoProps) {
  return (
    <img
      src={logo}
      alt={alt}
      className={cn("h-8 w-auto select-none", className)}
      draggable={false}
    />
  );
}

export default Logo;
