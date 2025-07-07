//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'
//import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
//export default defineConfig({
//
 // plugins: [react(), tailwindcss()],
//})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace with your repo name
const repoName = 'myezz_FoodeDelivery';

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`, // 👈 important for GitHub Pages
})

