import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // Alias per semplificare i percorsi degli import
    }
  },
  build: {
    base: '/', // Imposta la base URL per le risorse costruite
    sourcemap: true, // Genera file di mappa per il debug
    rollupOptions: {
      // Qui puoi configurare ulteriori opzioni di Rollup se necessario
    }
  },
  server: {
    // Puoi aggiungere configurazioni del server qui se necessario
  }
})
