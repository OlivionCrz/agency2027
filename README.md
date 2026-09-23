# Agency 2027

Vitrina comercial en español para pequeños emprendimientos de Costa Rica. Next.js App Router, React, TypeScript y Tailwind CSS. Sin backend ni base de datos en esta versión.

## Inicio local

Requisitos: Node.js 22 LTS y npm.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Abrir http://localhost:3000. Editar `.env.local` con el dominio y WhatsApp; reiniciar el servidor tras cambiar variables. En producción, volver a desplegar porque las variables `NEXT_PUBLIC_*` se incorporan al build.

```dotenv
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_WHATSAPP_NUMBER=50685090277
```

El número de Agency es 50685090277 y el mensaje predeterminado es «Hola, quiero cotizar mi sitio web». Si la variable no existe, se usa ese número. Si está vacío o no cumple el formato, los botones llevan a la sección de contacto y no generan enlaces WhatsApp. No se guardan consultas ni datos de visitantes.

## Comandos

- `npm run dev`: desarrollo en puerto 3000.
- `npm run typecheck`: comprobación de TypeScript.
- `npm run build`: compilación de producción.
- `npm start`: servir el build de producción.
- `npm run test:e2e`: pruebas de escritorio y móvil. Usa Chrome instalado; definir `PLAYWRIGHT_CHANNEL=msedge` para Edge. El servidor se inicia automáticamente si no está activo.
- `npm run format` / `npm run format:check`: formato del código.

## Dónde cambiar cada cosa

- `src/lib/content.ts`: marca, dominio, WhatsApp, catálogo tipado de proyectos, servicios y planes.
- `src/components/hero.tsx`: mensaje y composición del header.
- `src/components/hero-background.tsx`: grid y futuro fondo multimedia.
- `src/components/showcase.tsx`: selector de negocios, visor y controles externos.
- `src/components/florist-demo.tsx`: miniweb ficticia navegable.
- `src/components/sections.tsx`: presentación de servicios, SEO, planes y contacto.
- `src/app/globals.css`: tokens de color, tipografía, composición y responsive. Tailwind se importa aquí y está disponible para ampliar los componentes.

Los componentes con estado son cliente; las rutas, los metadatos y las secciones de contenido permanecen en servidor. No hay librería de animaciones pesada: las transiciones usan CSS y se desactivan con movimiento reducido.

## Guías

- [Agregar proyectos, cambiar dominios y activar video](docs/PROJECTS.md)
- [Vercel, ramas y validación](docs/DEVELOPMENT.md)

## Estado de la primera versión

Header cinematográfico sin tarjetas; dos negocios navegables con flechas; miniweb de floristería; visor del sitio de medicina estética; servicios, SEO, tres planes por cotizar y contacto configurable. El nombre Agency y la paleta son provisionales. Las fotos son referencias alojadas en Unsplash; las fuentes cargan desde Google Fonts con alternativas locales. Para independencia total de esos servicios, usar recursos propios con licencia y fuentes autoalojadas.

Las rutas `/sectores/floristeria` y `/sectores/medicina-estetica` comienzan directamente en los ejemplos. Las flechas cambian solo la selección local: el enlace «Enlace del sector» siempre apunta al negocio seleccionado.
