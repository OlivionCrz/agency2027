# Desarrollo, ramas y Vercel

## Flujo Git

`main` contiene la versión estable. Las ramas de esta implementación son:

1. `feat/agency-foundation`: base y experiencia comercial.
2. `feat/sector-showcases`: catálogo reutilizable, pruebas y mejoras de accesibilidad.
3. `feat/launch-readiness`: documentación y preparación del despliegue.

Crear ramas cortas desde `main`, hacer commits descriptivos, validar y luego integrar. No guardar secretos ni `.env.local` en Git. Se conserva `.env.example` como referencia.

```powershell
git switch main
git switch -c feat/nuevo-sector
# Implementar el cambio.
npm run typecheck
npm run build
npm run test:e2e
git add .
git commit -m "feat: add new sector"
git switch main
git merge --no-ff feat/nuevo-sector
```

Cuando haya un remoto, publicar la rama y abrir un PR para revisión antes de integrar. No se creó un remoto ni una cuenta a nombre del usuario.

## Publicar en Vercel

1. Subir el repositorio a una cuenta Git propia y elegir «Add New Project» en Vercel, o ejecutar `npx vercel` desde esta carpeta con una sesión autenticada.
2. Seleccionar Next.js, raíz del repositorio, `npm run build` y la salida automática de Next.js. No utilizar exportación estática ni configuración de Cloudflare.
3. Configurar `NEXT_PUBLIC_SITE_URL` con el origen HTTPS definitivo, sin barra final. Configurar `NEXT_PUBLIC_WHATSAPP_NUMBER` con el número real o dejarlo vacío.
4. Crear un preview, revisar portada y rutas de sectores. Cuando se conozca el dominio final, actualizar la variable y reconstruir.
5. Publicar producción con el flujo Git o `npx vercel --prod`. Conectar el dominio en Vercel y seguir los registros DNS que indique esa cuenta.
6. Comprobar `/sitemap.xml`, `/robots.txt`, contacto, flechas y el sitio externo desde la URL publicada.

Nunca publicar con `NEXT_PUBLIC_SITE_URL=http://localhost:3000`; ese valor existe solo para desarrollo. Las variables públicas no deben contener credenciales. No se necesita Supabase ni una clave privada en esta versión.

## Validación

Las pruebas Playwright cubren carrusel circular, cambio de negocio con demo abierta, navegación interna de floristería, foco al abrir y cerrar, rutas directas, sitio médico real incrustado, enlace externo, 404, ausencia de WhatsApp sin número, menú móvil, movimiento reducido, ausencia de desbordamiento horizontal, sitemap y robots. La prueba médica depende de la disponibilidad del sitio externo: si falla, revisar red y cabeceras antes de cambiar el código.

Las capturas y trazas quedan en directorios ignorados `artifacts/` y `test-results/`. Revisar visualmente a 390 y 1440 píxeles. No probar formularios reales de pacientes ni enviar mensajes de prueba a clientes.

Antes de activar un número, comprobar manualmente que el enlace `wa.me` tiene el prefijo de país y el mensaje correcto para cada sector o plan, sin enviar mensajes. Después de cambiar el dominio médico, repetir la prueba de incrustación.

## Límites deliberados

No hay panel privado, portal, cobros, analítica, CRM ni almacenamiento. Supabase podrá añadirse si una futura funcionalidad requiere datos persistentes. Las fotos y fuentes externas requieren conexión; Next.js mantiene textos y estructura renderizados desde servidor. El visor depende de políticas del sitio de terceros y dispone de alternativa externa.

## Entrega inicial

- Verificación local: build de producción, TypeScript y formato.
- Diez escenarios Playwright pasan entre escritorio y móvil, incluido el sitio médico real y la construcción de mensajes WhatsApp sin envío.
- Vercel CLI comprobado: sesión cerrada. No se publicó un deployment ni se creó un remoto Git; iniciar sesión y seguir la guía anterior.
