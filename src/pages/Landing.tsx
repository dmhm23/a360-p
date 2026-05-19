import { useEffect, useState } from "react";
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
  Star,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroMedia } from "@/components/HeroMedia";
import { Logo } from "@/components/Logo";
import { RequestAccessModal } from "@/components/RequestAccessModal";
import {
  heroMediaSrc,
  heroMediaType,
  heroMediaPoster,
} from "@/config/heroMedia";
import { SHOW_LOGIN } from "@/config/featureFlags";

const benefits = [
  {
    icon: Zap,
    title: "Matricula 3× más rápido",
    description:
      "Del Excel al sistema en menos de 5 minutos por estudiante, con validación documental y pago en un solo flujo.",
  },
  {
    icon: Award,
    title: "Cero certificados perdidos",
    description:
      "Emitidos, firmados y verificables online, sin depender de carpetas, correos ni mensajes sueltos.",
  },
  {
    icon: Wallet,
    title: "Cartera al día",
    description:
      "Alertas automáticas de vencimiento y recaudo para que el dinero deje de quedarse en el camino.",
  },
  {
    icon: Users,
    title: "Tu equipo deja de ser cuello de botella",
    description:
      "Procesos que no dependen de una persona: si alguien falta, la operación no se frena.",
  },
  {
    icon: ShieldCheck,
    title: "Listo para auditorías",
    description:
      "Historial completo y exportable en segundos. Responde a ARL, clientes y entes reguladores con evidencia.",
  },
  {
    icon: LineChart,
    title: "Decide con datos reales",
    description:
      "Rentabilidad por curso, ocupación y proyección en vivo. Deja de gestionar el centro a ciegas.",
  },
];

const modules = [
  {
    icon: GraduationCap,
    title: "Matrículas",
    description: "Inscribe estudiantes en minutos, con documentos y pago en un solo flujo.",
  },
  {
    icon: CalendarDays,
    title: "Cursos y programación",
    description: "Planifica grupos, instructores y horarios con visibilidad real de ocupación.",
  },
  {
    icon: FolderLock,
    title: "Gestión documental",
    description: "Historiales, soportes y requisitos legales centralizados.",
  },
  {
    icon: FileSignature,
    title: "Firma digital",
    description: "Formaliza acuerdos sin papel, con respaldo legal y trazabilidad.",
  },
  {
    icon: Wallet,
    title: "Cartera",
    description: "Saldos, recaudo y vencimientos por estudiante en tiempo real.",
  },
  {
    icon: Award,
    title: "Certificación",
    description: "Certificados verificables, con control de versiones y cumplimiento.",
  },
  {
    icon: UserCircle2,
    title: "Portal del estudiante",
    description: "Tus alumnos consultan cursos, documentos y certificados sin saturar al equipo.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard gerencial",
    description: "Ingresos, ocupación, cartera y desempeño operativo en una sola vista.",
  },
];

const differentiators = [
  "Único software vertical para centros de trabajo seguro en alturas en Colombia",
  "Alineado con la Resolución 4272 de 2021 del Ministerio del Trabajo",
  "Implementación y formación incluidas, sin costo durante el lanzamiento",
  "Empieza esta semana, sin pagos",
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
    cta: "Quiero mi cupo gratis",
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
    cta: "Quiero mi cupo gratis",
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

  const [requestOpen, setRequestOpen] = useState(false);
  const openRequest = () => setRequestOpen(true);
  const goSignup = openRequest;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2 min-w-0">
            <Logo className="h-8 w-auto sm:h-9" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {SHOW_LOGIN && (
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                {user ? "Mi cuenta" : "Iniciar sesión"}
              </Button>
            )}
            <Button size="sm" onClick={goSignup} className="whitespace-nowrap">
              <span className="sm:hidden">1 año gratis</span>
              <span className="hidden sm:inline">Solicitar 1 año gratis</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Oferta de lanzamiento · Solo 10 cupos para 2026
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              El software para centros de trabajo seguro en alturas que ordena tu operación y multiplica tu{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                rentabilidad
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:mt-6 sm:text-xl">
              Matrícula, cursos, cartera y certificación —cumpliendo la
              Resolución 4272— en una sola plataforma. Empieza con 1 año gratis,
              sin costo de implementación ni formación.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
              <Button
                size="lg"
                className="h-12 px-8 text-base w-full sm:w-auto"
                onClick={goSignup}
              >
                Quiero mi cupo gratis
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Sin tarjeta · Implementación incluida · Respuesta en 24 horas
            </p>
          </div>

          {/* Hero media — soporta imagen y video automáticamente */}
          <div className="relative mx-auto mt-10 max-w-5xl animate-fade-in sm:mt-16">
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

      {/* Problema — checklist */}
      <section className="border-y border-border bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5 text-primary" />
              El problema real
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              ¿Tu centro funciona así hoy?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              La utilidad baja, pero no siempre se sabe por qué. Casi siempre el
              problema no es comercial: está en la operación.
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              "Matrículas en Excel y WhatsApp",
              "Certificados que tardan días en emitirse",
              "Cartera vencida que nadie persigue",
              "Si falta una persona del equipo, todo se frena",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-base text-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center sm:p-8">
            <p className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Eso no es un problema comercial. Es un problema operativo —y tiene solución.
            </p>
          </div>
        </div>
      </section>

      {/* Solución */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <Layers className="h-3.5 w-3.5 text-primary" />
                La solución
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Una plataforma. Cuatro áreas integradas. Cero archivos perdidos.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Académico + Documental + Financiero + Certificación.
                Diseñado para la realidad regulatoria colombiana y la operación
                de un centro de trabajo seguro en alturas.
              </p>
              <div className="mt-8">
                <Button size="lg" onClick={goSignup}>
                  Quiero mi cupo gratis
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
      <section className="border-t border-border bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Resultados que vas a sentir en los primeros 90 días
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No más software. Una operación más rápida, más limpia y más rentable.
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
                Quiero mi cupo gratis
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
      <section className="border-y border-border bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Por qué Alturas360 y no otro software
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hecho para la realidad regulatoria colombiana y la operación específica de un centro de trabajo seguro en alturas.
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
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
                  Empieza esta semana, sin pagos
                </h3>
                <p className="mt-3 text-base text-muted-foreground">
                  Implementación y formación incluidas. Postula tu centro para 1 año gratis.
                </p>
              </div>
              <Button size="lg" className="h-12 px-8 w-full lg:w-auto" onClick={goSignup}>
                Quiero mi cupo gratis
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
              <span className="font-semibold text-primary">Precio personalizado</span>{" "}
              según el número de estudiantes de tu centro. Todos los planes incluyen 1 año gratis durante la oferta de lanzamiento.
            </p>
          </div>
        </div>
      </section>

      {/* Oferta 1 año gratis */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent to-primary/5" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-primary/30 bg-card/80 p-8 backdrop-blur sm:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Cupos limitados
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Solo 10 centros entran a la oferta 2026
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Implementación sin costo. Formación sin costo. 1 año completo
                sin pagar licencia. Postulación abierta hasta agotar cupos.
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

      {/* FAQ */}
      <section className="border-t border-border bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <HelpCircle className="h-3.5 w-3.5 text-primary" />
              Preguntas frecuentes
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Antes de postular, resolvamos lo importante
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                q: "¿Qué pasa cuando termina el año gratis?",
                a: "Decides si sigues. Sin permanencia, sin recargos y sin sorpresas. Si no continúas, exportas tus datos y te ayudamos a migrar.",
              },
              {
                q: "¿Migran los datos que tengo hoy en Excel u otro sistema?",
                a: "Sí, sin costo adicional. Tu equipo no copia nada a mano: nosotros llevamos estudiantes, cursos, cartera y documentos al sistema.",
              },
              {
                q: "¿Cuánto tarda la implementación?",
                a: "Entre 2 y 4 semanas según el tamaño del centro. Incluye configuración, migración y formación del equipo administrativo.",
              },
              {
                q: "¿Mis datos están seguros?",
                a: "Información cifrada, respaldo diario y exportable cuando quieras. Cumplimos con buenas prácticas para auditorías y entes reguladores.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border bg-card p-5 sm:p-6"
              >
                <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
                  {item.q}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden border-t border-border py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent to-primary/5" />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-5xl">
            Empieza el 2026 con tu centro funcionando mejor
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            1 año gratis. Cupos limitados. Sin tarjeta. Respuesta en 24 horas.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base w-full sm:w-auto"
              onClick={goSignup}
            >
              Postular mi centro
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Implementación incluida · Formación incluida · Solo 10 cupos para 2026
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Logo className="h-7 w-auto" />
            <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground sm:items-start">
              <a href="tel:+573189839896" className="hover:text-foreground transition-colors">
                +57 318 983 9896
              </a>
              <a href="mailto:hola@alturas360.com" className="hover:text-foreground transition-colors">
                hola@alturas360.com
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground sm:text-right">
            Plataforma para centros de formación en trabajo seguro en alturas · Colombia
            <br />
            © {new Date().getFullYear()} Alturas360. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <RequestAccessModal open={requestOpen} onOpenChange={setRequestOpen} />
    </div>
  );
}
