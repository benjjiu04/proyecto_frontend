import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({

  base: '/proyecto-frontend/', 
  
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],

  
  
//necesario para Linux o el subsistema WSL para que se actualice constantemente la pagina.
 server: {
  watch: {
    usePolling: true,
    interval: 100
  }
 } 
})

