import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    manifest: true,
    outDir: '../backend/tasks/dist',
  },
  base: command === 'serve' ? '' : '/dist/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
  host: true,
  port: 5173,
  allowedHosts: true
}
}))