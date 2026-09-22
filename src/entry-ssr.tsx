import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import App from './App'
import { marketingRoutes, pageGraph, pageMetaForPath } from './content/seo'

export function routes() {
  return marketingRoutes()
}

export function render(url: string) {
  const page = pageMetaForPath(url)
  const base = import.meta.env.BASE_URL || '/'
  const basename = base === '/' ? undefined : base.replace(/\/$/, '')
  const entry = basename ? `${basename}${url === '/' ? '/' : url}` : url

  const body = renderToStaticMarkup(
    <MemoryRouter basename={basename} initialEntries={[entry]}>
      <App />
    </MemoryRouter>,
  )

  return {
    body,
    title: page.title,
    description: page.description,
    canonical: page.canonical,
    jsonLd: JSON.stringify(pageGraph(page)),
  }
}
