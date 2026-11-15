import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Encaminha as chamadas /api para o back-end Spring Boot (sem URL fixa no código e sem CORS)
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
