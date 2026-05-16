import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-4 sm:px-6">
          <Link to="/">
            <Logo className="h-8 w-auto sm:h-9" />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Política de tratamiento de datos personales
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString("es-CO")}
        </p>

        <div className="prose prose-sm mt-8 max-w-none text-foreground">
          <p className="text-base text-muted-foreground">
            En Alturas360 tratamos tus datos personales conforme a la Ley 1581
            de 2012 y demás normas aplicables en Colombia. Al diligenciar
            nuestros formularios autorizas expresamente su recolección y uso
            según lo descrito a continuación.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            1. Datos que recolectamos
          </h2>
          <p className="text-base text-muted-foreground">
            Nombre del centro o empresa, ciudad, nombre completo, cargo, correo
            electrónico, teléfono y datos de navegación (página de origen,
            campañas de marketing).
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            2. Finalidad
          </h2>
          <p className="text-base text-muted-foreground">
            Contactarte para evaluar la viabilidad de tu postulación, compartir
            información comercial y, si aplica, activar tu cuenta en la
            plataforma.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            3. Tus derechos
          </h2>
          <p className="text-base text-muted-foreground">
            Puedes conocer, actualizar, rectificar o solicitar la supresión de
            tus datos personales escribiéndonos al correo de contacto que
            aparece en nuestro sitio.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            4. Seguridad
          </h2>
          <p className="text-base text-muted-foreground">
            Aplicamos controles técnicos y organizativos razonables para
            proteger tus datos. No los compartimos con terceros sin tu
            autorización, salvo obligación legal.
          </p>

          <p className="mt-10 text-sm text-muted-foreground">
            Este documento es una versión inicial y puede actualizarse. Para
            cualquier inquietud sobre el tratamiento de tus datos contáctanos.
          </p>
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
