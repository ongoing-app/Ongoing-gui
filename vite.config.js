import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '/src/jsx-dom.jsx',
  },
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
        edit: 'src/edit.jsx',
      },
    },
  },
  plugins: [
    {
      name: 'jsx-routes',
      configureServer(server) {
        // Serve a JS-only HTML shell per route so the browser can load our JSX modules
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0]
          const routes = {
            '/': '/src/main.jsx',
            '/edit': '/src/edit.jsx',
            '/edit/': '/src/edit.jsx',
          }
          if (routes[url]) {
            res.setHeader('Content-Type', 'text/html')
            res.end(`<!doctype html>
<html><head><meta charset="utf-8"><title>Vite JSX Site</title></head>
<body><script type="module" src="${routes[url]}"></script></body></html>`)
            return
          }
          next()
        })
      },
      generateBundle(_, bundle) {
        // Emit HTML shells at build time too
        this.emitFile({ type: 'asset', fileName: 'index.html',
          source: `<!doctype html><html><head><meta charset="utf-8"><title>Home</title></head><body><script type="module" src="/assets/main.js"></script></body></html>` })
        this.emitFile({ type: 'asset', fileName: 'edit/index.html',
          source: `<!doctype html><html><head><meta charset="utf-8"><title>Edit</title></head><body><script type="module" src="/assets/edit.js"></script></body></html>` })
      },
    },
  ],
})