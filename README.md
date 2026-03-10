# FacturaPro - Frontend

Cliente web para el sistema de facturación y cotizaciones FacturaPro.

## Tecnologías

- React 19
- Vite 7
- Tailwind CSS 3.4
- React Router DOM
- Axios
- React Toastify
- html2canvas / jsPDF (exportación)

## Requisitos

- Node.js 18+
- npm o yarn

## Instalación

```bash
npm install
```

## Variables de Entorno

Crea un archivo `.env` en la raíz:

```
VITE_API_URL=http://localhost:3001
```

## Ejecutar en Desarrollo

```bash
npm run dev
```

El cliente estará disponible en http://localhost:5173

## Compilar para Producción

```bash
npm run build
```

Los archivos se generan en la carpeta `dist/`

## Estructura del Proyecto

```
src/
  context/          # Contextos de React (AuthContext)
  domain/           # Modelos de datos
  infrastructure/   # APIs y servicios externos
  presentation/
    components/     # Componentes reutilizables
      templates/    # Plantillas de facturas/cotizaciones
    pages/          # Páginas de la aplicación
  routes/           # Configuración de rutas
```

## Funcionalidades

- Crear facturas y cotizaciones
- 4 plantillas profesionales (Profesional, Cotización, Moderno, Minimalista)
- Exportar a PDF e imagen
- Compartir por WhatsApp
- Sistema de autenticación
- Panel de administración
- Perfil de usuario
- Historial de documentos
- Modo invitado (prueba gratuita)

## Licencia

MIT
