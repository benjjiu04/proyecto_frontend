import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({

  base: 'https://benjjiu04.github.io/proyecto_frontend/', //

  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],

  // Necesario para que WSL (Arch Linux) detecte los cambios en caliente localmente
  server: {
    watch: {
      usePolling: true,
      interval: 100
    }
  } 
})