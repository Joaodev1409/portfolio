import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No GitHub Pages o site fica em joaodev1409.github.io/portfolio/, então o build usa esse subcaminho.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/portfolio/' : '/',
  plugins: [react()],
}))
