import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
      "@app": "/src/app/",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@core": "/src/core",
      "@config": "/src/config",
      "@screens": "/src/screens",
    },
  },
})
