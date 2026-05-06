import { useEffect } from 'react'

const RESPONSIVE_EXT = ['.jpg', '.jpeg', '.png']
const PRELOAD_VARIANT_WIDTH = 1024
const preloaded = new Set()

function preloadVariant(url) {
  if (!url || typeof window === 'undefined') return
  const queryIndex = url.search(/[?#]/)
  const main = queryIndex >= 0 ? url.slice(0, queryIndex) : url
  const tail = queryIndex >= 0 ? url.slice(queryIndex) : ''
  const lastDot = main.lastIndexOf('.')
  if (lastDot === -1) return enqueue(url)

  const ext = main.slice(lastDot).toLowerCase()
  if (RESPONSIVE_EXT.includes(ext)) {
    const base = main.slice(0, lastDot)
    enqueue(`${base}-${PRELOAD_VARIANT_WIDTH}w.avif${tail}`)
    enqueue(`${base}-${PRELOAD_VARIANT_WIDTH}w.webp${tail}`)
    return
  }
  enqueue(url)
}

function enqueue(href) {
  if (preloaded.has(href)) return
  preloaded.add(href)
  const img = new Image()
  img.decoding = 'async'
  img.src = href
}

export function usePreloadImages(urls) {
  useEffect(() => {
    if (!urls || urls.length === 0) return
    urls.forEach(preloadVariant)
  }, [urls])
}
