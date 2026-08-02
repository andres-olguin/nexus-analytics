# Documentación Técnica Enterprise - Nexus-Analytics UI

## 1. Especificaciones del Entorno y Hardware
- **Equipo / Hardware:** PC de Escritorio local.
- **Entorno de Desarrollo:** Visual Studio Code.
- **Runtime:** Node.js v24.12.0.
- **Sistema Operativo:** Windows 10 / 11 (PowerShell terminal).
- **Framework:** Next.js 16 (App Router + Turbopack).

---

## 2. Tecnologías y Librerías
- **React 19 + TypeScript:** Construcción de interfaz basada en componentes reutilizables con tipado estricto.
- **Tailwind CSS:** Diseño moderno UI/UX enfocado en paneles enterprise oscuros.
- **TanStack Query (React Query):** Manejo de estado asíncrono, caché y polling automático en tiempo real (`refetchInterval: 3000`).
- **Axios:** Cliente HTTP para la comunicación con la API REST de NestJS.
- **Lucide React:** Iconografía vectorial estilizada.

---

## 3. Comandos Ejecutados y Explicación Técnica

```powershell
# Creación del proyecto Next.js
npx create-next-app@latest nexus-analytics --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# Instalación de librerías de estado y consumo API
npm install lucide-react @tanstack/react-query zustand axios

# Levantamiento en puerto 3001 (evita conflicto con el puerto 3000 del backend)
npx next dev -p 3001