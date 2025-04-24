import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // дозволяє з'єднання з Docker
    port: 3000,      // той самий порт, що в Docker/Nginx
    strictPort: true // якщо порт зайнятий — не пробує інші
  }
})
