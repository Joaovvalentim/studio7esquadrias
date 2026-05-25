import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import App from './App.jsx'

export function render(pathname) {
  // Provide minimal window mock for routing (App.jsx:1178 reads window.location.pathname)
  // useEffect hooks don't run during renderToString, so browser APIs are never called
  globalThis.window = {
    location: { pathname, origin: 'https://studio7esquadrias.com.br', hash: '' },
    matchMedia: () => ({ matches: false }),
  }
  return renderToString(createElement(App))
}
