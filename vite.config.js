import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/tomi-dashboard/',
  plugins: [react()],
  server: {
    allowedHosts: ['.onjade.app'],
  },
  preview: {
    allowedHosts: ['.onjade.app'],
  },
})
