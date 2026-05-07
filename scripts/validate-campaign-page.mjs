import { readFileSync } from 'node:fs'

const app = readFileSync('src/App.jsx', 'utf8')
const styles = readFileSync('src/App.css', 'utf8')

const requiredSnippets = [
  "const campaignPath = '/campanha-esquadrias'",
  'function CampaignLandingPage()',
  '<header className="campaign-header"',
  'className="campaign-screen"',
  'Falar no WhatsApp',
  'Visitar site principal',
  'Vim através da página de campanha da Studio 7',
  '<SiteFooter',
  'campanha-esquadrias',
]

const missing = requiredSnippets.filter((snippet) => !app.includes(snippet))

if (!styles.includes('.campaign-page')) {
  missing.push('.campaign-page styles')
}

const requiredStyleSnippets = [
  '.campaign-screen',
  'min-height: 100vh',
  '.campaign-header',
  '.campaign-footer',
  'text-align: left',
  'justify-content: flex-start',
  'rgba(4, 11, 22, 0.18)',
]

for (const snippet of requiredStyleSnippets) {
  if (!styles.includes(snippet)) {
    missing.push(snippet)
  }
}

if (!styles.includes('@media (max-width: 820px)')) {
  missing.push('mobile media query')
}

if (missing.length > 0) {
  console.error(`Missing campaign page requirements: ${missing.join(', ')}`)
  process.exit(1)
}

console.log('Campaign page requirements found.')
