import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <text x="32" y="42" text-anchor="middle" font-family="'Courier New',monospace" font-weight="bold" font-size="22" letter-spacing="-2">
    <tspan fill="#00d4ff">&lt;</tspan><tspan fill="#6DB33F">DD</tspan><tspan fill="#00d4ff">/&gt;</tspan>
  </text>
</svg>`;

const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
  sizes.map(size =>
    sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toBuffer()
  )
);

const icoBuffer = await pngToIco(pngBuffers);
writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
console.log('favicon.ico created');

await sharp(Buffer.from(svgContent))
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, 'apple-touch-icon.png'));
console.log('apple-touch-icon.png created');
