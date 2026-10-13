import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: './src/jsx-dom', // your custom runtime
  },
  plugins: [
    {
      name: 'jsx-as-entry',
      configureServer(server) {
        // serve a tiny HTML shell that loads main.jsx directly
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '/index.html') {
            res.setHeader('Content-Type', 'text/html')
            res.end(`<!doctype html>
<html><head><meta charset="utf-8"><title>Vite JSX</title></head>
<body><script type="module" src="/src/main.jsx"></script></body></html>`)
            return
          }
          next()
        })
      },
    },
  ],
})