import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Novo-Site-MasterPflage/', // EXATAMENTE como está no seu repositório
});
