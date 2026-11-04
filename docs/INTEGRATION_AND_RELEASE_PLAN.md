# Integración Nexus API / Dashboard — 2026-11-04

## Contrato observado

El dashboard utiliza `GET /orders`, `POST /orders` y `PATCH /orders/:id/complete`; el backend define esos métodos en `OrderController`. Ambos deben ejecutarse por separado y configurar CORS, permisos y orígenes explícitos.

## P0: errores y permisos

1. Dejar de devolver `[]` silenciosamente cuando falla `GET /orders`; mostrar estado de error y botón de reintento sin confundir caída con cero pedidos.
2. Añadir validación de formulario, rangos, cantidad y límites de dinero.
3. Diseñar autenticación y roles antes de exponer pedidos reales.
4. Validar flujo de estados en backend antes de permitir acción de completar.

## P1: calidad

- Probar conexión con backend local en entorno controlado.
- Simular fallos HTTP 400, 401, 403, 409 y 500.
- Pruebas de accesibilidad y navegación por teclado.
- Capturas reales y resultados de `npm run build` y `npm run lint`.
- Evitar secretos en variables públicas `NEXT_PUBLIC_*`.

**Estado:** plan de trabajo; no hay pruebas de despliegue ni seguridad certificadas.
