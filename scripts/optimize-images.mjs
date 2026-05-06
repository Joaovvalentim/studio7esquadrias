import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(process.cwd(), 'public')
const TARGETS = ['.jpg', '.jpeg', '.png']
const QUALITY_AVIF = 55
const QUALITY_WEBP = 78
const QUALITY_JPEG = 78
const FALLBACK_WIDTH = 1920
const RESPONSIVE_WIDTHS = [480, 1024, 1920]

let sharp
try {
  ;({ default: sharp } = await import('sharp'))
} catch {
  console.error('sharp is not installed. Run:  npm i -D sharp')
  process.exit(1)
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

async function optimizeOne(file) {
  const ext = path.extname(file).toLowerCase()
  if (!TARGETS.includes(ext)) return

  const base = file.slice(0, -ext.length)
  const sourceBuffer = await fs.readFile(file)
  const originalSize = sourceBuffer.length
  const metadata = await sharp(sourceBuffer, { failOn: 'none' }).rotate().metadata()
  const sourceWidth = metadata.width || FALLBACK_WIDTH

  const widths = RESPONSIVE_WIDTHS.filter((w, index) => index === 0 || w <= sourceWidth)

  const variantSizes = []
  for (const width of widths) {
    const pipeline = sharp(sourceBuffer).rotate().resize({ width, withoutEnlargement: true })
    const [avifBuffer, webpBuffer] = await Promise.all([
      pipeline.clone().avif({ quality: QUALITY_AVIF, effort: 4 }).toBuffer(),
      pipeline.clone().webp({ quality: QUALITY_WEBP }).toBuffer(),
    ])
    await Promise.all([
      fs.writeFile(`${base}-${width}w.avif`, avifBuffer),
      fs.writeFile(`${base}-${width}w.webp`, webpBuffer),
    ])
    variantSizes.push(`${width}w avif ${(avifBuffer.length / 1024).toFixed(0)}KB / webp ${(webpBuffer.length / 1024).toFixed(0)}KB`)
  }

  const fallbackPipeline = sourceWidth > FALLBACK_WIDTH
    ? sharp(sourceBuffer).rotate().resize({ width: FALLBACK_WIDTH, withoutEnlargement: true })
    : sharp(sourceBuffer).rotate()
  const fallbackBuffer = ext === '.png'
    ? await fallbackPipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
    : await fallbackPipeline.jpeg({ quality: QUALITY_JPEG, mozjpeg: true }).toBuffer()
  await fs.writeFile(file, fallbackBuffer)

  console.log(
    `${path.relative(ROOT, file)}  ${(originalSize / 1024).toFixed(0)} KB -> fallback ${(fallbackBuffer.length / 1024).toFixed(0)} KB | ${variantSizes.join(' | ')}`,
  )
}

async function run() {
  for await (const file of walk(ROOT)) {
    try {
      await optimizeOne(file)
    } catch (error) {
      console.warn('skip', file, error.message)
    }
  }
}

run()
