// Notifica os buscadores (via IndexNow) de que as páginas mudaram.
// O Bing — motor da busca do ChatGPT — recrawleia em seguida.
//
// Uso:  node scripts/indexnow.mjs        (rodar APÓS o deploy)
//       npm run notify:search
//
// IndexNow não exige conta: basta a chave hospedada em
// https://<HOST>/<KEY>.txt  com o conteúdo igual a KEY.

const KEY = 'fe85a89aee3ddcd917789eb90eb20237' // deve casar com public/<KEY>.txt
const HOST = 'studio7esquadrias.com.br'

// URLs indexáveis. Adicione novas rotas aqui conforme o site crescer.
// (/campanha-esquadrias é noindex de propósito — não incluir.)
const urlList = [`https://${HOST}/`]

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
}

console.log(`\n📡 Enviando ${urlList.length} URL(s) ao IndexNow...`)
for (const u of urlList) console.log(`   • ${u}`)

let res
try {
  res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
} catch (err) {
  console.error('\n❌ Falha de rede ao chamar o IndexNow:', err.message)
  process.exit(1)
}

const text = await res.text()

// 200 = OK, 202 = aceito (validação assíncrona). Ambos são sucesso.
if (res.status === 200 || res.status === 202) {
  console.log(`\n✅ IndexNow aceitou (HTTP ${res.status}). ${text || ''}`.trim())
  console.log('   Os buscadores vão recrawlear em breve.\n')
} else {
  console.error(`\n⚠️  IndexNow retornou HTTP ${res.status}: ${text}`)
  console.error('   403 = chave não encontrada/incorreta em ' + body.keyLocation)
  console.error('   422 = URL fora do host informado.\n')
  process.exit(1)
}
