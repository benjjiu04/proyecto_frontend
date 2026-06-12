import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({

  homepage: "https://github.com/benjjiu04/proyecto_frontend", //

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