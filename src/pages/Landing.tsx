import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Workflow,
  ShieldCheck,
  LineChart,
  Zap,
  Activity,
  GraduationCap,
  CalendarDays,
  FileSignature,
  Wallet,
  Award,
  UserCircle2,
  LayoutDashboard,
  FolderLock,
  AlertTriangle,
  FileX2,
  EyeOff,
  Users,
  Layers,
  Database,
  History,
  MessageSquare,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroMedia } from "@/components/HeroMedia";
import { Logo } from "@/components/Logo";
import {
  heroMediaSrc,
  heroMediaType,
  heroMediaPoster,
} from "@/config/heroMedia";
import { SHOW_LOGIN } from "@/config/featureFlags";

const benefits = [
  {
    icon: Gauge,
    title: "Más control sobre el negocio",
    description:
      "Visibilidad real del estado operativo y financiero de tu centro, sin depender de reportes manuales.",
  },
  {
    icon: Workflow,
    title: "Menos carga administrativa",
    description:
      "Automatiza procesos repetitivos y libera al equipo para tareas que realmente generan valor.",
  },
  {
    icon: ShieldCheck,
    title: "Continuidad operativa",
    description:
      "Procesos estandarizados que no dependen de una persona específica del equipo administrativo.",
  },
  {
    icon: LineChart,
    title: "Mejor seguimiento financiero",
    description:
      "Cartera, recaudo y rentabilidad por curso o programa, en un solo lugar y siempre actualizado.",
  },
  {
    icon: Zap,
    title: "Velocidad para ejecutar",
    description:
      "Cierra matrículas, emite certificados y resuelve trámites en menos pasos y con menos fricción.",
  },
  {
    icon: Activity,
    title: "Trazabilidad para decidir mejor",
    description:
      "Cada acción queda registrada, auditable y disponible para tomar decisiones con datos, no con suposiciones.",
  },
];

const modules = [
  {
    icon: GraduationCap,
    title: "Matrículas",
    description: "Inscribe estudiantes en minutos, con validación documental y pagos en un solo flujo.",
  },
  {
    icon: CalendarDays,
    title: "Cursos y programación",
    description: "Planifica grupos, instructores y horarios con visibilidad total de la ocupación real.",
  },
  {
    icon: FolderLock,
    title: "Gestión documental",
    description: "Centraliza historiales, soportes y requisitos legales sin perder tiempo buscando archivos.",
  },
  {
    icon: FileSignature,
    title: "Firma digital",
    description: "Formaliza acuerdos y consentimientos sin papel, con respaldo legal y trazabilidad.",
  },
  {
    icon: Wallet,
    title: "Cartera",
    description: "Controla saldos, recaudo y vencimientos por estudiante para mejorar el flujo de caja.",
  },
  {
    icon: Award,
    title: "Certificación",
    description: "Emite certificados verificables, con control de versiones y registro de cumplimiento.",
  },
  {
    icon: UserCircle2,
    title: "Portal del estudiante",
    description: "Tus alumnos consultan sus cursos, documentos y certificados sin saturar a tu equipo.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard gerencial",
    description: "Una vista clara del negocio: ingresos, ocupación, cartera y desempeño operativo en tiempo real.",
  },
];

const differentiators = [
  "Especializado en centros de formación en trabajo seguro en alturas en Colombia",
  "Visión integral de la operación: académica, documental, financiera y de certificación",
  "Más orden para un negocio exigente y altamente regulado",
  "Mayor resiliencia operativa frente a la rotación administrativa",
  "Adopción más fácil gracias a la oferta de 1 año gratis",
  "Acompañamiento real durante implementación y formación inicial",
];

const trustPillars = [
  {
    icon: History,
    title: "Trazabilidad",
    description: "Cada acción queda registrada, con quién la hizo y cuándo.",
  },
  {
    icon: Database,
    title: "Centralización",
    description: "Una sola fuente de verdad para toda la operación.",
  },
  {
    icon: FolderLock,
    title: "Respaldo documental",
    description: "Documentos críticos siempre disponibles y organizados.",
  },
  {
    icon: ShieldCheck,
    title: "Capacidad de respuesta",
    description: "Responde con claridad ante auditorías, clientes y entes reguladores.",
  },
];

const plans = [
  {
    name: "Despegue",
    idealFor: "Centros que quieren digitalizar y ordenar lo esencial",
    focus: [
      "Matrículas y cursos centralizados",
      "Gestión documental básica",
      "Portal del estudiante",
      "Soporte de implementación",
    ],
    cta: "Solicitar 1 año gratis",
    highlighted: false,
  },
  {
    name: "Control+",
    idealFor: "Centros que buscan más visibilidad operativa y mejor seguimiento administrativo",
    focus: [
      "Todo lo de Despegue",
      "Cartera y seguimiento financiero",
      "Firma digital y certificación",
      "Dashboard gerencial",
    ],
    cta: "Solicitar 1 año gratis",
    highlighted: true,
  },
  {
    name: "Dirección Pro",
    idealFor: "Centros que quieren una operación más madura, estandarizada y gerenciable",
    focus: [
      "Todo lo de Control+",
      "Trazabilidad y auditoría avanzada",
      "Reportería ejecutiva personalizada",
      "Acompañamiento estratégico continuo",
    ],
    cta: "Hablar con un asesor",
    highlighted: false,
  },
];

export default function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  const goSignup = () => navigate("/signup");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-auto" />
            <span className="font-display text-lg font-bold text-foreground">
              Alturas360
            </span>
          </div>
          <div className="flex items-center gap-3">
            {SHOW_LOGIN && (
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                {user ? "Mi cuenta" : "Iniciar sesión"}
              </Button>
            )}
            <Button size="sm" onClick={goSignup}>
              Solicitar 1 año gratis
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-20 pt-20 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Oferta de lanzamiento · 1 año gratis para centros seleccionados
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Recupera el control y la{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                rentabilidad
              </span>{" "}
              de tu centro de entrenamiento
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Alturas360 convierte una operación dispersa en un sistema claro,
              trazable y administrable. Centraliza matrícula, cursos,
              documentos, cartera y certificación para que tu centro funcione
              con más eficiencia, control y conciencia real del negocio.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-12 px-8 text-base w-full sm:w-auto"
                onClick={goSignup}
              >
                Solicitar 1 año gratis
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base w-full sm:w-auto"
                onClick={goSignup}
              >
                Agendar una demo
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Implementación sin costo. Formación sin costo. Accede a 1 año gratis para tu centro.
            </p>
          </div>

          {/* Hero media — soporta imagen y video automáticamente */}
          <div className="relative mx-auto mt-16 max-w-5xl animate-fade-in">
            <div className="overflow-hidden rounded-xl border border-border bg-card p-2 shadow-2xl shadow-primary/10">
              <HeroMedia
                src={heroMediaSrc}
                type={heroMediaType}
                poster={heroMediaPoster}
                alt="Dashboard gerencial de Alturas360 mostrando matrículas, cartera y desempeño operativo de un centro de formación en trabajo seguro en alturas"
                className="w-full rounded-lg"
              />
            </div>
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Problema — La caja negra */}
      <section className="border-y border-border bg-muted/50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5 text-primary" />
              El problema real
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Muchos centros operan como una caja negra
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              La utilidad baja, pero no siempre se sabe con claridad por qué.
              Muchas veces el problema no es comercial: está en la operación.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Workflow,
                title: "Procesos manuales y repetitivos",
                description: "Tareas críticas resueltas en hojas de cálculo, correos y mensajes sueltos.",
              },
              {
                icon: FileX2,
                title: "Dispersión documental",
                description: "Soportes, contratos y certificaciones repartidos entre carpetas, equipos y personas.",
              },
              {
                icon: Users,
                title: "Dependencia del equipo administrativo",
                description: "Si una persona se va o se enferma, la operación se frena o pierde calidad.",
              },
              {
                icon: EyeOff,
                title: "Poca visibilidad real del negocio",
                description: "Cuesta saber cuánto se está ganando, qué cursos rinden y dónde se están perdiendo recursos.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center sm:p-8">
            <p className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Cada reproceso, cada retraso y cada validación manual termina afectando margen, tiempo y capacidad de crecimiento.
            </p>
          </div>
        </div>
      </section>

      {/* Solución */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <Layers className="h-3.5 w-3.5 text-primary" />
                La solución
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                De una operación dispersa a un sistema administrable
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Alturas360 está diseñado específicamente para centros de
                formación en trabajo seguro en alturas. No es un software
                genérico: integra lo académico, documental, financiero y de
                certificación en un solo lugar para que dejes de operar por
                partes.
              </p>
              <p className="mt-5 rounded-lg border border-primary/20 bg-accent/60 p-4 text-sm text-foreground">
                <strong className="font-semibold">Empieza sin fricción:</strong>{" "}
                implementación sin costo, formación sin costo y la posibilidad
                de solicitar 1 año gratis.
              </p>
              <div className="mt-8">
                <Button size="lg" onClick={goSignup}>
                  Solicitar 1 año gratis
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: GraduationCap, title: "Académico", text: "Matrículas, cursos y programación bajo control." },
                { icon: FolderLock, title: "Documental", text: "Soportes y certificaciones siempre organizados." },
                { icon: Wallet, title: "Financiero", text: "Cartera y recaudo con visibilidad real." },
                { icon: Award, title: "Certificación", text: "Emisión y verificación con respaldo formal." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="border-t border-border bg-muted/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Beneficios concretos para tu centro
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Más allá del software: una forma más profesional y rentable de administrar tu operación.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bloque promocional */}
          <div className="mt-12 overflow-hidden rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-card to-accent p-8 sm:p-10">
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Star className="h-3.5 w-3.5" />
                  Oferta de lanzamiento
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Empieza con 1 año gratis
                </h3>
                <p className="mt-3 text-base text-muted-foreground">
                  Conoce el sistema, implementa la operación y valida el impacto
                  en tu centro sin asumir el costo de entrada durante el primer
                  año.
                </p>
              </div>
              <Button size="lg" className="h-12 px-8 w-full lg:w-auto" onClick={goSignup}>
                Quiero solicitar 1 año gratis
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Toda tu operación en un solo lugar
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Módulos pensados para resolver lo que realmente impacta el día a día de tu centro.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m) => (
              <div
                key={m.title}
                className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <m.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciadores */}
      <section className="border-y border-border bg-muted/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              No es software genérico. Es estructura para administrar mejor.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Construido para la realidad operativa de los centros de formación en trabajo seguro en alturas.
            </p>
            <ul className="mt-10 grid w-full gap-4 text-left sm:grid-cols-2">
              {differentiators.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Confianza / Cumplimiento */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Control, trazabilidad y respaldo
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Centraliza la información crítica de tu centro y responde con
              claridad ante clientes, auditorías y entes reguladores.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((p) => (
              <div key={p.title} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Franja CTA */}
          <div className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-accent via-primary/10 to-accent p-8 sm:p-10">
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Empieza ahora sin costo de implementación ni formación
                </h3>
                <p className="mt-3 text-base text-muted-foreground">
                  Solicita 1 año gratis para comenzar a transformar la operación de tu centro.
                </p>
              </div>
              <Button size="lg" className="h-12 px-8 w-full lg:w-auto" onClick={goSignup}>
                Solicitar 1 año gratis
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border bg-muted/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Planes diseñados para cómo crecen los centros
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tres niveles de acompañamiento. Mismo enfoque: orden, control y rentabilidad.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border bg-card p-6 sm:p-8 ${
                  plan.highlighted
                    ? "border-primary shadow-xl shadow-primary/10 lg:-mt-4 lg:mb-0"
                    : "border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Más elegido
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ideal para {plan.idealFor.toLowerCase()}.
                </p>
                <div className="my-6 h-px bg-border" />
                <ul className="space-y-3">
                  {plan.focus.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex-1" />
                <Button
                  size="lg"
                  variant={plan.highlighted ? "default" : "outline"}
                  className="mt-2 w-full"
                  onClick={goSignup}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
            <p className="text-sm font-medium text-foreground sm:text-base">
              <span className="font-semibold text-primary">Promoción de lanzamiento:</span>{" "}
              implementación sin costo, formación sin costo y 1 año gratis para centros seleccionados.
            </p>
          </div>
        </div>
      </section>

      {/* Oferta 1 año gratis */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent to-primary/5" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-primary/30 bg-card/80 p-8 backdrop-blur sm:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Beneficio para centros seleccionados
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                1 año gratis para validar el impacto en tu operación real
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Muchos centros postergan la decisión por miedo al costo o a la
                implementación. Alturas360 baja esa barrera de entrada para que
                puedas probar el sistema en tu operación real, con
                acompañamiento desde el primer día.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Star, title: "1 año gratis", text: "Para centros seleccionados, sujeto a validación." },
                { icon: Zap, title: "Implementación sin costo", text: "Te ayudamos a poner el sistema en marcha." },
                { icon: GraduationCap, title: "Formación inicial sin costo", text: "Tu equipo aprende a operar con confianza." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-background p-5 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
              <Button size="lg" className="h-12 px-8 w-full sm:w-auto" onClick={goSignup}>
                Postular mi centro al año gratis
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground">
                Sujeto a disponibilidad y validación comercial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden border-t border-border py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent to-primary/5" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-5xl">
            Deja de administrar a ciegas
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Alturas360 ayuda a reducir carga administrativa, fortalecer
            trazabilidad y profesionalizar la gestión de tu centro de
            entrenamiento.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base w-full sm:w-auto"
              onClick={goSignup}
            >
              Solicitar 1 año gratis
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base w-full sm:w-auto"
              onClick={goSignup}
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              Agendar una demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Implementación sin costo. Formación sin costo. Cupos limitados para el beneficio de 1 año gratis.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-auto" />
            <span className="font-display text-sm font-semibold text-foreground">
              Alturas360
            </span>
          </div>
    </div>
  );
}
