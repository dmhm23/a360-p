# Plan — Notificación por correo al recibir un nuevo lead

## 1. Diagnóstico del flujo actual

- **Formulario**: `src/components/RequestAccessModal.tsx` valida con zod + react-hook-form e **inserta directamente desde el frontend** en `lead_requests` vía `supabase.from('lead_requests').insert(...)`.
- **Almacenamiento**: tabla `public.lead_requests` (Lovable Cloud). RLS: INSERT público con check `accepted_privacy_policy = true`, SELECT/UPDATE solo admins, sin DELETE.
- **Edge Functions existentes**: `ai-content` y `verify-share-password`. No hay infraestructura de email (no existe `send-transactional-email`, no hay queue, no hay templates).
- **Proveedores de email**: ninguno integrado (sin Resend/SendGrid/Mailgun/Brevo/SMTP).
- **Dominio de correo**: el workspace **no tiene dominio de email configurado**, pero el proyecto sí tiene el dominio personalizado **`alturas360.com`** disponible para usarse como remitente (vía subdominio delegado, p. ej. `notify.alturas360.com`).
- **Variables de entorno relevantes**: solo `LOVABLE_API_KEY`, `SUPABASE_*`. Ninguna específica de email.
- **Riesgos del envío desde frontend**: cualquier API key de un proveedor externo quedaría expuesta en el bundle; además permitiría spam desde fuera. Por eso el envío DEBE ocurrir en backend (Edge Function).

## 2. Alternativas y comparación

| Opción | Ventajas | Desventajas | Complejidad | Seguridad | Costo | Mantenimiento desde Lovable |
|---|---|---|---|---|---|---|
| **A. Lovable Emails (built-in)** vía Edge Function | Sin API keys de terceros, dominio propio (`notify.alturas360.com`), cola con reintentos, supresiones, logs, plantillas React Email | Requiere configurar dominio (delegación NS) y esperar verificación DNS | Baja | Alta (sin credenciales expuestas) | Incluido en Lovable Cloud | Excelente — todo desde el agente |
| B. Resend / SendGrid / Mailgun / Brevo vía Edge Function | Proveedor maduro, dashboards propios | Otra cuenta, API key, posible conflicto DNS si comparte subdominio | Media | Alta si la key vive solo en backend | Free tier + cargos al escalar | Bueno pero con dependencia externa |
| C. Webhook a Make/n8n/Zapier | Sin código, fácil de cambiar destinatarios | Plataforma extra a pagar, latencia, depende de terceros, requiere URL secreta o Edge Function intermedia para no exponer | Baja | Media (URL del webhook debe protegerse) | Tiers gratuitos limitados | Aceptable; cambios fuera de Lovable |
| D. Solo registro en Supabase, sin email | Cero complejidad nueva | Pierdes inmediatez para el equipo comercial; el objetivo del usuario no se cumple | Nula | Alta | $0 | N/A |

## 3. Recomendación

**Opción A — Lovable Emails con una Edge Function `notify-new-lead`**. Es la más simple, segura y nativa: no expone credenciales, usa el dominio del cliente y queda 100% mantenible desde Lovable. Para cambiar el destinatario en el futuro basta editar una constante o, mejor, una fila en `site_settings`.

## 4. Arquitectura propuesta

```
Modal (frontend)
  └─ insert en lead_requests (RLS pública con check)
  └─ supabase.functions.invoke('notify-new-lead', { body: { leadId } })
                                   │
                                   ▼
              Edge Function notify-new-lead (verify_jwt = false)
                 1. Lee el lead por id (service role)
                 2. Lee destinatario desde site_settings.key='lead_notification'
                    (fallback hardcoded: mhoyos456@gmail.com)
                 3. Invoca send-transactional-email con plantilla 'new-lead-internal'
                                   │
                                   ▼
              Lovable Email Queue → Entrega vía notify.alturas360.com
```

Notas:
- El frontend solo pasa el `leadId`; nada de datos confidenciales en la llamada (la Edge Function los relee con service role).
- El envío al cliente final del lead (confirmación) es opcional — ver §10.

## 5. Proveedor recomendado

**Lovable Emails** (infraestructura nativa) usando `alturas360.com` como dominio raíz y `notify.alturas360.com` como subdominio remitente.

## 6. Variables de entorno necesarias

Ninguna nueva específica de email (`LOVABLE_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` ya existen). El destinatario interno NO se guarda como secreto: se guarda en la tabla `site_settings` (clave `lead_notification`) para que pueda editarse sin redeploy.

## 7. Cambios requeridos en Supabase

1. Insertar fila inicial en `site_settings`:
   ```json
   { "key": "lead_notification", "value": { "to": "mhoyos456@gmail.com" } }
   ```
   (RLS ya existente: anyone SELECT, solo admins UPDATE → cambiar destinatario desde un panel admin o desde una UI mínima en `/settings` más adelante.)
2. **Cambio de RLS recomendado**: política SELECT actual de `lead_requests` permite solo admins. La Edge Function usará service role, por lo que **no requiere modificar RLS**.
3. Configurar dominio de email (delegación NS de `notify.alturas360.com`) e infra de cola (`setup_email_infra`) y scaffold de transactional emails.

## 8. Cambios requeridos en el formulario

- Al éxito del insert, invocar `supabase.functions.invoke('notify-new-lead', { body: { leadId } })` **sin bloquear** la vista de éxito (fire-and-forget con catch silencioso a `console.error`). Si la notificación falla, el lead ya está guardado y se procesará por reintentos del lado del Edge Function/cola.
- No se cambian validaciones, campos ni UX.

## 9. Estructura del correo interno

**Asunto**: `Nuevo lead — {empresa} ({ciudad})`

**Cuerpo** (HTML React Email, branded):
- Encabezado: "Nuevo lead recibido en Alturas360"
- Tabla con: Empresa, Ciudad, Nombre completo, Cargo, Email, Teléfono, Fecha (zona Bogotá), Fuente (`workshop_modal_form`), Estado inicial (`new`), Página (`page_path`), UTM source/medium/campaign (si existen)
- Botón opcional: "Ver en panel" → `https://alturas360.com/...` (cuando exista panel de leads)
- Footer mínimo (el sistema añade el unsubscribe automáticamente — aceptable para un correo interno, o se puede deshabilitar marcando el correo como "alerts" si la plataforma lo permite; si no, queda visible y no estorba al equipo interno).

## 10. Correo de confirmación al usuario (análisis, no implementar)

**Recomendado**: sí, aporta valor (refuerza la marca, da expectativas claras, reduce ansiedad post-formulario, mejora reputación de remitente con un primer correo esperado).

**Implicaciones**:
- Plantilla adicional `lead-received-user` con tono cálido.
- Cumplimiento: ya hay autorización de tratamiento de datos en el formulario; este es **transaccional** (responde a una acción del propio usuario), no marketing.
- Mismo costo cero (Lovable Emails).
- Riesgo: si rebotan o se quejan, el dominio acumula suppressions — mitigado porque el envío es 1:1 disparado por su propia acción.

**Sugerencia para una iteración futura** (no parte del paso 1): añadir esta segunda llamada a `send-transactional-email` dentro de la misma Edge Function `notify-new-lead`.

## 11. Riesgos de seguridad

- **Credenciales**: ninguna expuesta (Lovable Emails no requiere API key cliente).
- **Spam/abuso**: el formulario público podría ser abusado por bots → mitigaciones futuras: rate limit en la Edge Function por IP (Map en memoria + ventana) o honeypot field. No es bloqueante para el paso 1.
- **Privacidad**: el correo interno contiene PII; debe ir a una bandeja controlada. Documentado en `site_settings`.
- **Inyección**: React Email auto-escapa props; no usar `dangerouslySetInnerHTML`.

## 12. Riesgos de regresión

- Bajo. El insert del lead sigue intacto; el envío es post-insert no bloqueante.
- Si la Edge Function falla, el modal sigue mostrando "Solicitud enviada correctamente" (el lead se persistió).
- La configuración DNS puede tardar hasta 72h; durante ese tiempo los correos quedan en cola (no se pierden).

## 13. Checklist de pruebas

- [ ] Enviar formulario → fila aparece en `lead_requests`.
- [ ] Edge Function `notify-new-lead` se invoca con `leadId` correcto.
- [ ] Correo llega a `mhoyos456@gmail.com` con todos los campos y UTMs si vienen en la URL.
- [ ] Cambiar `site_settings.lead_notification.to` cambia el destinatario sin redeploy.
- [ ] Si el lead no acepta privacidad, el insert falla y NO se envía correo (validación previa).
- [ ] Doble submit no produce 2 correos (idempotencyKey = `lead-notify-${leadId}`).
- [ ] Vista de éxito aparece incluso si la Edge Function de correo tarda o falla.
- [ ] Frontend no contiene ninguna API key de email.
- [ ] Cola de Lovable Emails muestra el envío en `email_send_log`.

---

## Cómo cambiar el destinatario en el futuro

Tres opciones, en orden de simplicidad:
1. **Cambiar el valor en `site_settings.value->>'to'`** (un solo UPDATE en BD — el usuario o tú lo puede hacer en cualquier momento; surte efecto inmediato).
2. **Añadir una mini-UI en `/settings`** para editarlo (futuro, opcional).
3. Soportar **múltiples destinatarios** guardando un array (`{ "to": ["a@x.com","b@x.com"] }`) y enviando uno por correo o en CC.

## Prompt sugerido para implementar SOLO el Paso 1

> "Paso 1: configura el dominio de email para `alturas360.com` (subdominio `notify`), ejecuta `setup_email_infra` y `scaffold_transactional_email`. Crea la fila `lead_notification` en `site_settings` con `{ to: 'mhoyos456@gmail.com' }`. No toques aún el formulario ni la Edge Function de notificación."
