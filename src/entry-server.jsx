import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import App from './App.jsx'

export function render(pathname) {
  // Provide minimal window mock for routing (App.jsx reads window.location.pathname)
  // Mock IntersectionObserver so lazy images stay deferred during prerender (only priority images load).
  const PreviousIntersectionObserver = globalThis.IntersectionObserver
  globalThis.IntersectionObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
  }
  globalThis.window = {
    location: { pathname, origin: 'https://studio7esquadrias.com.br', hash: '' },
    matchMedia: () => ({ matches: false }),
  }

  try {
    return renderToString(createElement(App))
  } finally {
    if (PreviousIntersectionObserver === undefined) {
      delete globalThis.IntersectionObserver
    } else {
      globalThis.IntersectionObserver = PreviousIntersectionObserver
    }
    delete globalThis.window
  }
}
