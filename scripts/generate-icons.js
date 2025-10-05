/*
  Usage:
    1) npm i sharp --save-dev
    2) node scripts/generate-icons.js

  This script reads public/DevOra.png and outputs:
    - public/logo192.png (192x192)
    - public/logo512.png (512x512)
    - public/favicon.ico  (contains 16,32,48)
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const src = path.resolve(__dirname, '..', 'public', 'DevOra.png');
const outDir = path.resolve(__dirname, '..', 'public');

async function ensureExists(filePath) {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
}

async function makePng(size, filename) {
  const out = path.join(outDir, filename);
  await ensureExists(out);
  await sharp(src)
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(out);
  console.log(`✓ ${filename} (${size}x${size})`);
}

async function makeIco() {
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((s) => sharp(src).resize(s, s, { fit: 'cover' }).png().toBuffer())
  );
  // sharp can't write .ico directly; use "toFormat('ico')" via sharp-ico shim if available.
  // To keep dependencies minimal, we build multi-size ICO manually with "sharp-ico" if installed,
  // otherwise fall back to 32x32 PNG to ICO using a simple container writer.
  try {
    const toIco = require('to-ico'); // lightweight, no native deps
    const icoBuffer = await toIco(pngBuffers);
    const out = path.join(outDir, 'favicon.ico');
    await fs.promises.writeFile(out, icoBuffer);
    console.log('✓ favicon.ico (16,32,48)');
  } catch (e) {
    console.warn('to-ico not installed, installing is recommended for multi-size favicon. Falling back to single 32x32.');
    const buf32 = await sharp(src).resize(32, 32, { fit: 'cover' }).png().toBuffer();
    // Minimal PNG->ICO fallback: require to-ico if available, otherwise skip.
    try {
      const toIco = require('to-ico');
      const icoBuffer = await toIco([buf32]);
      await fs.promises.writeFile(path.join(outDir, 'favicon.ico'), icoBuffer);
      console.log('✓ favicon.ico (32x32)');
    } catch {
      console.error('✗ Could not create favicon.ico (to-ico not installed). Run: npm i to-ico -D');
      throw e;
    }
  }
}

async function main() {
  try {
    await fs.promises.access(src, fs.constants.R_OK);
  } catch {
    console.error('Source image not found:', src);
    process.exit(1);
  }

  await makePng(192, 'logo192.png');
  await makePng(512, 'logo512.png');
  await makeIco();

  console.log('All icons generated in /public');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
