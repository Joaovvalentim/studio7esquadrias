import { build } from 'vite'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const routes = [
  {
    path: '/',
    outFile: 'dist/index.html',
    headAdditions: '',
  },
  {
    path: '/campanha-esquadrias',
    outFile: 'dist/campanha-esquadrias/index.html',
    // Campaign page: noindex (paid traffic landing page, not for organic search)
    headAdditions: '    <meta name="robots" content="noindex, nofollow" />\n',
  },
]

console.log('\n🔨 Building SSR bundle...')
await build({
  build: {
    ssr: './src/entry-server.jsx',
    outDir: 'dist-server',
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
      },
    },
  },
  // Suppress Vite output noise during SSR build
  logLevel: 'warn',
})

console.log('⚙️  Importing render function...')
const serverEntryUrl = pathToFileURL(resolve(__dirname, 'dist-server/entry-server.js')).href
const { render } = await import(serverEntryUrl)

const template = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf-8')

console.log('📄 Prerendering routes...')
for (const { path, outFile, headAdditions } of routes) {
  const appHtml = render(path)

  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )

  if (headAdditions) {
    html = html.replace('</head>', `${headAdditions}  </head>`)
  }

  const outPath = resolve(__dirname, outFile)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html, 'utf-8')
  console.log(`  ✓ ${outFile}`)
}

rmSync(resolve(__dirname, 'dist-server'), { recursive: true, force: true })
console.log('✅ Prerender complete!\n')
