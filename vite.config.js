//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//export default defineConfig({
 // plugins: [react()],
//})


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ✅ Required to access from mobile
    port: 5173,       // Or whatever you prefer
  },
});
