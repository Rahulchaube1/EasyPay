import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Force listen on all IPs
    port: 5178, // Force specific port requested by user
    strictPort: true, // Fail if port is busy instead of switching
  }
})
