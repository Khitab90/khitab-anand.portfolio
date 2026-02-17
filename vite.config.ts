import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/khitab-anand.portfolio/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'gsap': ['gsap'],
          'particles': ['@tsparticles/react', '@tsparticles/slim'],
        },
      },
    },
  },
})
