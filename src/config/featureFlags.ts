/**
 * Feature flags simples controlados desde código.
 * Cambia el valor y la UI se actualiza sin afectar rutas ni lógica de auth.
 */

/**
 * Muestra/oculta los puntos de entrada visuales al login en la landing.
 * Las rutas `/login`, `/signup`, etc. siguen disponibles por URL directa.
 */
export const SHOW_LOGIN = false;
