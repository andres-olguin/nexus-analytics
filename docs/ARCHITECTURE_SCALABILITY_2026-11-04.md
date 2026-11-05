# nexus-orders-dashboard — Escalabilidad y evolución técnica

**Documento:** MTS-ENG-NEXUS-ORDERS-DASHBOARD-20261104 · **Estado:** investigación y planificación, no producción certificada · **Fecha:** 2026-11-04.

## Base del repositorio

Panel Next.js/React/TypeScript para consultar, crear y completar pedidos; usa TanStack Query y URL de API configurable. CI incorporada detectó package-lock.json fuera de sincronía.

## Arquitectura objetivo

Estabilizar contrato con API y matriz de estados loading/empty/error/offline; separar presentación y clientes tipados. Un BFF opcional solo si autorización, latencia o requisitos de sesión medidos lo justifican; mantener secretos fuera de NEXT_PUBLIC.

## Calidad y observabilidad

Tiempo hasta tabla de pedidos, errores de conexión, p95 de creación, tamaño de bundle, Core Web Vitals en entornos representativos; pruebas a 360/768/1366px.

En pruebas documentar versión, fecha, dataset, comandos, hardware, fallos, tiempo y variación. Las cifras de capacidad solo se presentan cuando están respaldadas por ejecuciones reales, distinguiendo ejemplos sintéticos.

## Puertas de seguridad y negocio

Corregir npm ci y validar lint/build, estados HTTP, accesibilidad, autenticación y autorización por cuenta; no mostrar lista vacía al fallar API.

## Hoja de ruta condicional

P0 lockfile y CI; P1 contrato OpenAPI/e2e; P2 UI de error y accesibilidad; P3 evaluación con usuarios reales.

Las etapas no son promesas de fecha. Pasar de una etapa a otra exige prueba verificable, control de costos, responsable y análisis de riesgo. No introducir infraestructura de alta complejidad sin métricas de saturación que la justifiquen.

## Fuentes metodológicas consultadas el 04-11-2026

- [AWS Well-Architected](https://docs.aws.amazon.com/wellarchitected/): rendimiento, seguridad, operación, fiabilidad y costos.
- [OWASP ASVS 5.0.0](https://asvs.owasp.org/): verificación de controles web/API cuando aplica.
- [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final): disciplina de desarrollo seguro.
- [Google SRE](https://sre.google/workbook/implementing-slos/): objetivos medidos de fiabilidad.

**Nota de integridad:** no se ha ejecutado una auditoría integral por el mero hecho de publicar este documento y las fuentes externas no prueban eficacia del proyecto.
