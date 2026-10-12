// Builds optimized Full HD portrait assets from rutvek.png
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'public/assets';
mkdirSync(OUT, { recursive: true });

async function build() {
  console.log('Processing new high-res Rutvek portrait...');
  const img = sharp('rutvek.png');
  const trimmedBuf = await img.trim().toBuffer();
  const meta = await sharp(trimmedBuf).metadata();
  console.log('Trimmed person dimensions:', meta.width, 'x', meta.height);

  // Balanced portrait framing:
  // Top: 25px headroom
  // Bottom: 0px grounded
  // Left/Right: 105px each for natural 4:5 portrait ratio
  const framed = await sharp(trimmedBuf)
    .extend({
      top: 25,
      bottom: 0,
      left: 105,
      right: 105,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const framedMeta = await sharp(framed).metadata();
  console.log('Framed canvas dimensions:', framedMeta.width, 'x', framedMeta.height);

  // Generate webp assets with high quality and subtle sharpening for crispness
  for (const w of [1100, 720, 420]) {
    await sharp(framed)
      .resize({ width: w, kernel: 'lanczos3' })
      .sharpen({ sigma: 0.8, m1: 0.8, m2: 2.0 })
      .webp({ quality: 95, alphaQuality: 98, effort: 6 })
      .toFile(`${OUT}/portrait-${w}.webp`);
    console.log(`Generated ${OUT}/portrait-${w}.webp`);
  }

  // Social share image (1200x630)
  const portraitForOg = await sharp(framed)
    .resize({ height: 580, kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8 })
    .png()
    .toBuffer();

  const ogSvgBackdrop = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="78%" cy="45%" r="45%">
          <stop offset="0%" stop-color="#e5132b" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#e5132b" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#g)"/>
    </svg>
  `;

  const ogSvgText = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <text x="72" y="300" font-family="Impact, 'Arial Narrow', sans-serif" font-size="128" fill="#f4f1ec" letter-spacing="4">RUTVEK</text>
      <text x="78" y="352" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="26" fill="#ff3d5a" letter-spacing="16">THE SERIES</text>
      <text x="78" y="420" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="18" fill="#a7a6ad" letter-spacing="5">FULL-STACK DEVELOPER &#8226; AI &amp; APP DEVELOPER &#8226; ENTREPRENEUR</text>
    </svg>
  `;

  await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#07070a' } })
    .composite([
      { input: Buffer.from(ogSvgBackdrop) },
      { input: portraitForOg, gravity: 'southeast' },
      { input: Buffer.from(ogSvgText) },
    ])
    .jpeg({ quality: 92 })
    .toFile(`${OUT}/og-image.jpg`);

  console.log(`Generated ${OUT}/og-image.jpg`);
  console.log('All portrait assets built successfully!');
}

build().catch((err) => {
  console.error('Error building images:', err);
  process.exit(1);
});
