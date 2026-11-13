// Comprime las fotos del estudio para que el repo y la página carguen rápido.
//
// Uso: node scripts/compress-images.mjs
//  - Redimensiona a máximo 1600 px de ancho, calidad 80.
//  - Respeta la orientación EXIF de las fotos del celular.
//  - Solo toca JPG/JPEG/WEBP dentro de src/assets/img, public/mee.jpg y public/1.jpg.
//  - No toca PNG (logo) ni los certificados viejos de public/.
//  - Salta las fotos que ya pesan menos de 300 KB.
//
// Requiere: sharp (ya viene con Astro, está en node_modules).
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAX_WIDTH = 1600;
const QUALITY = 80;
const MIN_SIZE = 300 * 1024;

const TARGETS = [
  path.join(ROOT, "src/assets/img"),
  path.join(ROOT, "public/mee.jpg"),
  path.join(ROOT, "public/1.jpg"),
];

const EXTENSIONS = new Set([".jpg", ".jpeg", ".webp"]);

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (
      entry.isFile() &&
      EXTENSIONS.has(path.extname(entry.name).toLowerCase())
    )
      yield full;
  }
}

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

for (const target of TARGETS) {
  const stat = await fs.stat(target).catch(() => null);
  if (!stat) continue;
  const files = stat.isDirectory()
    ? walk(target)
    : (async function* () {
        yield target;
      })();

  for await (const file of files) {
    try {
      const before = (await fs.stat(file)).size;
      if (before < MIN_SIZE) continue;

      const tmp = `${file}.tmp`;
      const image = sharp(file).rotate(); // respeta la orientación EXIF
      const meta = await image.metadata();
      const ext = path.extname(file).toLowerCase();

      let pipeline = image;
      if (meta.width && meta.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }
      pipeline =
        ext === ".webp"
          ? pipeline.webp({ quality: QUALITY })
          : pipeline.jpeg({ quality: QUALITY, mozjpeg: true });

      await pipeline.toFile(tmp);
      const after = (await fs.stat(tmp)).size;

      if (after < before) {
        await fs.rename(tmp, file);
        console.log(
          `${path.relative(ROOT, file)}: ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB`
        );
        totalBefore += before;
        totalAfter += after;
        count++;
      } else {
        await fs.unlink(tmp);
      }
    } catch (err) {
      console.error(`No se pudo comprimir ${file}: ${err.message}`);
    }
  }
}

console.log(
  `\n${count} fotos comprimidas: ${(totalBefore / 1024 / 1024).toFixed(1)} MB -> ${(totalAfter / 1024 / 1024).toFixed(1)} MB`
);
