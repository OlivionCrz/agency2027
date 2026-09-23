# Catálogo de proyectos y fondos

## Agregar un sitio externo

Agregar una entrada a `projects` en `src/lib/content.ts`. No duplicar páginas ni el carrusel. Ejemplo orientativo:

```ts
{
  id: "barberia",
  sector: "Barbería",
  title: "Un estilo propio.",
  description: "Una presentación del negocio y su propuesta.",
  image: "/projects/barberia.webp",
  imageAlt: "Descripción fiel de la imagen",
  brand: "Nombre del negocio",
  brandSubtitle: "BARBERÍA",
  kicker: "CUIDADO EN CADA DETALLE",
  caption: "Presentación del proyecto",
  theme: "medical", // tema sobrio; floral ofrece el tratamiento de flora
  mode: "external",
  url: "https://dominio-del-negocio.com",
  embeddable: true,
}
```

Usar identificadores únicos, en minúsculas y con guiones. `generateStaticParams`, navegación y sitemap consumen el mismo catálogo. Volver a desplegar para generar la nueva ruta. El tema define la presentación de Agency, no modifica el sitio externo. Para una nueva dirección visual, ampliar la unión `theme` y su clase CSS.

Añadir una captura propia autorizada a `public/projects/` y referenciarla como `/projects/nombre.webp`. Capturar el sitio sin datos privados, optimizar a WebP y escribir un texto alternativo fiel. Una imagen de referencia no debe presentarse como captura real; medicina estética usa una fotografía ilustrativa y lo indica.

Para otra demo interna, crear su componente, extender la unión `demo` de `Project` y añadir su selección explícita en el visor. La floristería es ficticia: no tiene checkout ni recibe pedidos.

## Cambiar el dominio de medicina estética

Actualizar únicamente `url` en su entrada. Mantener `id: "medicina-estetica"` para conservar los enlaces compartidos. Comprobar el dominio y HTTPS después del cambio DNS, y repetir la prueba del iframe. Si cambias el dominio de Agency, cambiar `NEXT_PUBLIC_SITE_URL` en Vercel y volver a desplegar.

## Incrustación y sus límites

El iframe se monta solo al pulsar «Explorar sitio» y se desmonta al cerrar o cambiar de negocio. Usa navegación normal del sitio externo. El visor no intercepta sus enlaces, formularios ni solicitudes: medicina estética es el sitio real, no una copia ficticia.

`X-Frame-Options` y `Content-Security-Policy: frame-ancestors` se configuran en el sitio que se incrusta. Comprobarlas con una petición HTTP y verificar también en un navegador. La URL de medicina estética respondió 200 sin restricciones de estas cabeceras durante la implementación y cargó dentro del visor en escritorio y móvil.

Si un sitio bloquea la incrustación, establecer `embeddable: false`: al explorar se presenta el enlace externo. No usar proxies para evadir sus restricciones. Debido a las políticas del navegador no es posible detectar de forma fiable todos los fallos de iframes de terceros; el enlace externo permanece siempre disponible y el visor muestra ayuda. `onError` cubre solo los fallos que el navegador notifique.

## Fondo de video futuro

En `Hero`, reemplazar `<HeroBackground />` por:

```tsx
<HeroBackground
  video="/media/agency-film.mp4"
  poster="/media/agency-poster.webp"
/>
```

Guardar archivos propios autorizados en `public/media/`, comprimir el video y elegir un encuadre que funcione con `object-fit: cover`. Proporcionar siempre un poster. El fondo es decorativo, sin sonido; no colocar texto indispensable dentro del video. Hay control de pausa y no se monta el video cuando el visitante solicita movimiento reducido. La portada permanece detrás del video y actúa como alternativa si no puede reproducirse. No hay un video incluido en esta entrega.

## Colores y contenido

Cambiar variables `--bg`, `--surface`, `--green`, `--text`, `--muted` y `--line` en `globals.css`. Alinear también los tokens de `@theme` si se usan utilidades Tailwind de marca. Mantener contraste y revisar los temas de demos por separado. `site`, `services`, `plans` y `projects` concentran los datos comerciales; el texto editorial de cada sección se encuentra en su componente.
