// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// GitHub Pages publica el sitio en https://xkoderx.github.io/inkontruoo/
// Sin `base`, Astro genera rutas desde la raíz (/_astro/...) y los estilos
// e imágenes dan 404, igual que le pasó a Ilumexa. Con `base`, todo sale
// con /inkontruoo/ delante. Las fotos van por astro:assets y las de
// public/ por rutas relativas, así que no hizo falta reescribir rutas.
export default defineConfig({
  site: 'https://xkoderx.github.io',
  base: '/inkontruoo',
  vite: {
    plugins: [tailwindcss()]
  }
});