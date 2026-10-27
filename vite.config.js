import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      include: [/\.jsx?$/, /\.tsx?$/],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    jsx: 'automatic',
    // Treat .js files in src as JSX
    include: /src\/.*\.[jt]sx?$/,
    loader: 'jsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Security-Policy': "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' data: blob: http: https:; script-src-elem * 'unsafe-inline' 'unsafe-eval' data: blob: http: https:; style-src * 'unsafe-inline'; font-src * data:; img-src * data: blob: http: https:; frame-ancestors *;",
      'Permissions-Policy': 'unload=*',
    },
  },
})
