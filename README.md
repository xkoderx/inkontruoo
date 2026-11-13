# Inkontruoo — Tattoo Studio

La página web de **Inkontruoo**, el estudio de tatuajes de Erick Michel Deloera: tatuajes fineline, geométricos y realismo, con más de 5 años de experiencia.

Es una sola página que se recorre de arriba a abajo, con diseño oscuro, fotos reales de los trabajos y animaciones al hacer scroll. Se ve bien en computadora, tableta y celular.

## Cómo se ve

Vista en computadora:

![Vista de la página de Inkontruoo en computadora](screenshots/escritorio.png)

Vista en celular:

![Vista de la página de Inkontruoo en celular](screenshots/movil.png)

## Qué tiene la página

Todo está en una sola página:

- **Portada:** carrusel con fotos de trabajos, el nombre del estudio y botones para agendar una cita y ver la galería.
- **Sobre mí:** quién es Erick, con más de 5 años tatuando, 56 diseños en la galería y 3 estilos: fineline, geométrico y realismo.
- **Mi formación:** los certificados del artista. Cada uno se puede abrir en grande para verlo completo:
  - Seminario de tatuaje a color con Víctor Chil, 22 de diciembre de 2024 (tatuaje realizado: "Freddy Krueger").
  - Curso "Retrato realista con lápiz de grafito" en Domestika, con Diego Catalán Amilivia, 17 de julio de 2025.
- **Lo que hago:** los servicios del estudio: Fineline, Geométrico, Realismo y Diseños personalizados.
- **Galería:** 56 fotos reales de tatuajes hechos en el estudio.
- **Instagram:** trabajos recientes del estudio, con enlace al perfil.
- **Contacto:** un formulario que abre tu correo ya redactado para Erick, y botones de Instagram y WhatsApp para escribirle directo.

En el celular el menú se convierte en un botón de hamburguesa que se abre y se cierra sin perderte.

El sitio no lleva lista de precios.

## Cómo verla en tu computadora

Necesitas tener instalado [Node.js](https://nodejs.org) (versión LTS) y luego, desde la carpeta del proyecto:

```sh
npm install   # instala las dependencias (solo la primera vez)
npm run dev   # abre la página en http://localhost:4321/inkontruoo/
```

Ojo: la página abre en `http://localhost:4321/inkontruoo/` y no en la raíz (`/`), porque el sitio está configurado para publicarse bajo esa ruta. Si abres solo `http://localhost:4321/` te dará un 404.

Para hacer la versión final lista para publicar:

```sh
npm run build    # genera la carpeta dist/
npm run preview  # vista previa de esa versión final
```

## Cómo se publica

El sitio vive en https://xkoderx.github.io/inkontruoo/ y se publica solo con GitHub Actions: cada vez que subes cambios a la rama `main`, GitHub construye el sitio y lo publica automáticamente. Ya no hay que copiar nada a `docs/`.

El workflow está en `.github/workflows/deploy.yml` (Node 20, `npm ci`, `npm run build` y publicación con `deploy-pages`).

Para que el sitio cargue bien bajo la ruta `/inkontruoo/`, el proyecto tiene `site` y `base: '/inkontruoo'` en `astro.config.mjs`, y un archivo vacío `public/.nojekyll` para que GitHub Pages no esconda las carpetas que empiezan con guion bajo, como `_astro`.

## De dónde salió la información

Todo el contenido es del propio estudio: las fotos son trabajos reales de Erick, los certificados son suyos y los datos de contacto son los que él usa. No se inventó ningún servicio, precio ni dato.

## Créditos

- Diseño basado en la plantilla gratuita HairCut de [HTML Codex](https://htmlcodex.com/hair-salon-html-template) (licencia CC BY 4.0).
- Galería de Instagram basada en la plantilla gratuita Alime de [Colorlib](https://webtemplateslab.com/templates/alime/) (licencia CC BY 3.0).
- Las fotos de la portada y de la galería son trabajos del estudio.

## Contacto de Inkontruoo

- Instagram: https://instagram.com/inkontruoo
- WhatsApp: https://wa.me/525615151624
- Correo: erickmichele@outlook.com
- Sitio en vivo: https://xkoderx.github.io/inkontruoo/

---

*Hecho con Astro, Tailwind CSS y animaciones AOS.*
