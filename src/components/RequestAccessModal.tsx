import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  company_name: z.string().trim().min(2, "Ingresa el nombre de tu centro").max(120),
  city: z.string().trim().min(2, "Ingresa tu ciudad").max(80),
  full_name: z.string().trim().min(3, "Ingresa tu nombre completo").max(120),
  role: z.string().trim().min(2, "Ingresa tu cargo").max(80),
  email: z.string().trim().email("Correo no válido").max(160),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{7,20}$/, "Teléfono no válido"),
  accepted_privacy_policy: z.literal(true, {
    errorMap: () => ({ message: "Debes autorizar el tratamiento de datos" }),
  }),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function readUtms() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") ?? undefined,
    utm_medium: p.get("utm_medium") ?? undefined,
    utm_campaign: p.get("utm_campaign") ?? undefined,
    page_path: window.location.pathname,
    user_agent: window.navigator.userAgent,
  };
}

export function RequestAccessModal({ open, onOpenChange }: Props) {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      company_name: "",
      city: "",
      full_name: "",
      role: "",
      email: "",
      phone: "",
      accepted_privacy_policy: false as unknown as true,
    },
  });

  const accepted = watch("accepted_privacy_policy");

  useEffect(() => {
    if (!open) {
      // reset after close transition
      const t = setTimeout(() => {
        reset();
        setSuccess(false);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open, reset]);

  const onSubmit = async (values: FormValues) => {
    const meta = readUtms();
    const { error } = await supabase.from("lead_requests").insert({
      company_name: values.company_name,
      city: values.city,
      full_name: values.full_name,
      role: values.role,
      email: values.email,
      phone: values.phone,
      accepted_privacy_policy: values.accepted_privacy_policy,
      source: "workshop_modal_form",
      status: "new",
      ...meta,
    });
    if (error) {
      toast.error("No pudimos enviar tu solicitud. Inténtalo de nuevo.");
      return;
    }
    setSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="py-2">
            <DialogHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <DialogTitle>Solicitud enviada correctamente</DialogTitle>
              <DialogDescription>
                Gracias por completar el formulario. Hemos recibido tus datos y
                nos pondremos en contacto contigo para compartirte la
                disponibilidad, condiciones y próximos pasos para activar tu
                año gratis en la plataforma.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => onOpenChange(false)}>Entendido</Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Solicitar 1 año gratis</DialogTitle>
              <DialogDescription>
                Completa el formulario y recibe información sobre la
                disponibilidad, condiciones y activación de tu año gratis en la
                plataforma.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
              noValidate
            >
              <div className="space-y-1.5">
                <Label htmlFor="company_name">Nombre del centro / empresa</Label>
                <Input id="company_name" {...register("company_name")} />
                {errors.company_name && (
                  <p className="text-xs text-destructive">{errors.company_name.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" {...register("city")} />
                {errors.city && (
                  <p className="text-xs text-destructive">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="full_name">Nombre completo</Label>
                <Input id="full_name" {...register("full_name")} />
                {errors.full_name && (
                  <p className="text-xs text-destructive">{errors.full_name.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="role">Cargo</Label>
                <Input id="role" {...register("role")} />
                {errors.role && (
                  <p className="text-xs text-destructive">{errors.role.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" inputMode="tel" {...register("phone")} />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="md:col-span-2 flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3">
                <Checkbox
                  id="accepted_privacy_policy"
                  checked={!!accepted}
                  onCheckedChange={(v) =>
                    setValue(
                      "accepted_privacy_policy",
                      (v === true) as true,
                      { shouldValidate: true },
                    )
                  }
                  className="mt-0.5"
                />
                <div className="text-sm text-muted-foreground">
                  <Label
                    htmlFor="accepted_privacy_policy"
                    className="cursor-pointer font-normal"
                  >
                    Autorizo el{" "}
                    <Link
                      to="/privacidad"
                      target="_blank"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      tratamiento de datos personales
                    </Link>{" "}
                    de acuerdo con la política de privacidad.
                  </Label>
                  {errors.accepted_privacy_policy && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.accepted_privacy_policy.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      Enviar solicitud
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
