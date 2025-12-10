import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Novo-Site-MasterPflage/', // IMPORTANTE para GitHub Pages
})
