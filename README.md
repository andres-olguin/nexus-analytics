# Nexus Orders Dashboard — Next.js

Interfaz experimental de pedidos y operaciones comerciales basada en Next.js, React, TypeScript, TanStack Query y Axios.

## Funciones presentes en el código

- Consulta periódica de pedidos desde `GET /orders`.
- Creación de pedidos mediante `POST /orders`.
- Acción de completar mediante `PATCH /orders/:id/complete`.
- Formularios y estados reactivos con TanStack Query.

**No es una aplicación multiempresa validada ni un sistema listo para clientes.** El backend se encuentra en el repositorio `nexus-orders-api`.

## Desarrollo local

```bash
npm ci
cp .env.example .env.local
npm run dev -- -p 3001
```

En Windows PowerShell: `Copy-Item .env.example .env.local`.

El frontend se abre en `http://localhost:3001`; la API debe iniciar por separado en `http://localhost:3000` por defecto. `NEXT_PUBLIC_ORDERS_API_URL` permite configurar el origen. No incluir secretos en variables `NEXT_PUBLIC_*`.

## Validación

```bash
npm run lint
npm run build
```

## Riesgos antes de cualquier despliegue

El código existente trata fallos en consultas GET como listas vacías, por lo que puede ocultar errores de red. Además no hay un modelo de autenticación/autorización empresarial validado ni compatibilidad de CORS confirmada. Revisar `docs/INTEGRATION_AND_RELEASE_PLAN.md` antes de producción.

Este README describe el código observado, no certifica funcionalidad o despliegue.
