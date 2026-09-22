import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

function escapeAttr(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function routeFile(route) {
  if (route === '/') return path.join(dist, 'index.html')
  return path.join(dist, route.slice(1), 'index.html')
}

function tagAttr(html, pattern) {
  const tag = html.match(pattern)?.[0] || ''
  return tag.match(/content="([^"]*)"/)?.[1] || tag.match(/href="([^"]*)"/)?.[1] || ''
}

function assertPage(route, html) {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || ''
  const descriptionTags = html.match(/<meta[^>]*name="description"[^>]*>/g) || []
  const description = tagAttr(descriptionTags[0] || '', /[\s\S]*/)
  const canonical = tagAttr(html, /<link[^>]*rel="canonical"[^>]*>/i)
  const h1s = html.match(/<h1[\s>]/g) || []
  const errors = []

  if (!title.includes('Riyadh 500')) errors.push('title missing Riyadh 500')
  if (descriptionTags.length !== 1) errors.push(`description count ${descriptionTags.length}`)
  if (!description || description.length < 80) errors.push('description too short')
  if (!canonical.startsWith('https://riyadh500.com')) errors.push(`canonical ${canonical}`)
  if (h1s.length !== 1) errors.push(`h1 count ${h1s.length}`)
  if (!html.includes('application/ld+json')) errors.push('missing json-ld')
  if (/AggregateRating|"@type":"Review"/.test(html)) errors.push('fake review schema')
  if (!html.includes('"@type":"Organization"')) errors.push('missing Organization')
  if (!html.includes('"@type":"WebSite"')) errors.push('missing WebSite')
  if (route === '/' && !html.includes('Browse sectors')) errors.push('home missing sectors CTA')
  if (route === '/' && !html.includes('Open the leaderboard')) errors.push('home missing leaderboard CTA')
  if (route.startsWith('/sectors/') && !html.includes('Leaders coming soon')) {
    errors.push('sector page missing empty state')
  }
  if (route === '/leaderboard' && !html.includes('Leaders coming soon')) {
    errors.push('leaderboard missing empty state')
  }
  if (route === '/sectors' && !html.includes('energy-utilities')) errors.push('sectors index missing slug')

  if (errors.length) throw new Error(`${route}: ${errors.join('; ')}`)
  return { title, description }
}

function assertDistClean(distDir) {
  const banned = [/calendar\.app\.google/i, /nammco/i, /board arabia/i, /jeddah/i]
  const files = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.(html|js|css|txt|xml|webmanifest|svg)$/.test(entry.name)) files.push(full)
    }
  }
  walk(distDir)
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8')
    for (const pattern of banned) {
      if (pattern.test(text)) {
        throw new Error(`${path.relative(distDir, file)} contains ${pattern}`)
      }
    }
    if (file.endsWith('.html') && /[\u2014\u2013]/.test(text)) {
      throw new Error(`${path.relative(distDir, file)} contains a dash in UI copy`)
    }
  }
}

function writeSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = routes
    .map((route) => {
      const loc = route === '/' ? 'https://riyadh500.com/' : `https://riyadh500.com${route}`
      return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod></url>`
    })
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml)
}

function documentFor(shell, rendered) {
  const title = escapeAttr(rendered.title)
  const description = escapeAttr(rendered.description)
  const canonical = escapeAttr(rendered.canonical)
  const seo = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Riyadh 500" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<script id="riyadh-500-ld" type="application/ld+json">${rendered.jsonLd}</script>`,
  ].join('\n    ')

  const html = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<meta name="robots" content="[^"]*"\s*\/?>/,
      '<meta name="robots" content="index, follow" />',
    )
    .replace('</head>', `    ${seo}\n  </head>`)
    .replace(/<div id="root">\s*<\/div>/, `<div id="root">${rendered.body}</div>`)

  if (!html.includes(rendered.body.slice(0, 40))) {
    throw new Error('Could not inject prerendered body into the built shell')
  }
  return html
}

const shellPath = path.join(dist, 'index.html')
const shell = fs.readFileSync(shellPath, 'utf8')
fs.writeFileSync(
  path.join(dist, 'shell.html'),
  shell.replace(
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, nofollow" />',
  ),
)

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

const seen = new Set()

try {
  const { render, routes: listRoutes } = await vite.ssrLoadModule('/src/entry-ssr.tsx')
  const routes = listRoutes()
  for (const route of routes) {
    const rendered = render(route)
    const html = documentFor(shell, rendered)
    const meta = assertPage(route, html)
    if (seen.has(meta.description)) throw new Error(`${route}: duplicate meta description`)
    seen.add(meta.description)
    const file = routeFile(route)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, html)
    console.log(`prerendered ${route}: ${meta.title}`)
  }
  writeSitemap(routes)
} finally {
  await vite.close()
}

const shellHtml = fs.readFileSync(path.join(dist, 'shell.html'))
fs.writeFileSync(path.join(dist, '404.html'), shellHtml)
fs.writeFileSync(path.join(dist, '.nojekyll'), '')

const cname = fs.readFileSync(path.join(dist, 'CNAME'), 'utf8').trim()
if (cname !== 'riyadh500.com') {
  throw new Error(`CNAME must be riyadh500.com, got ${cname}`)
}

assertDistClean(dist)
console.log('wrote routes + sitemap.xml + 404.html')
