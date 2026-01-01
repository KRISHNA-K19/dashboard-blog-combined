import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dashboard-blog-combined/',  // MUST match your repo name
  build: {
    outDir: 'docs',        // GitHub Pages will serve from this folder
    emptyOutDir: true      // cleans docs folder before build
  }
})
