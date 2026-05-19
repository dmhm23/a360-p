## Ajustes a datos de contacto en el footer

**Archivo:** `src/pages/Landing.tsx` (sección footer, líneas ~719-730)

### Cambios

1. **Aumentar tamaño y peso de los datos de contacto**
   - Subir de `text-sm` (o tamaño actual) a `text-base sm:text-lg`.
   - Aplicar `font-medium` para mejor legibilidad.
   - Mejorar contraste si está en `text-muted-foreground` muy tenue → usar `text-foreground` o tono más visible.
   - Aumentar `gap` entre ícono y texto, y entre los dos enlaces, para que sean más fáciles de tocar en mobile (target ≥44px).

2. **Cambiar enlace del teléfono a WhatsApp**
   - Reemplazar `href="tel:+573189839896"` por `href="https://wa.me/573189839896"`.
   - Agregar `target="_blank"` y `rel="noopener noreferrer"`.
   - Mantener el texto visible como `+57 318 983 9896`.
   - (Opcional) usar ícono de WhatsApp en lugar del de teléfono para que el usuario entienda a dónde lo lleva el clic.

3. **Sin cambios** en el correo `hola@alturas360.com` (sigue con `mailto:`), ni en el resto del footer.

### Fuera de alcance
- No se tocan otras secciones, rutas, estilos globales, ni el modal de solicitud.
