import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Lắng nghe tất cả các địa chỉ IP
    port: 5173,       // Cổng mà Vite sẽ chạy
  },
  plugins: [react()],
})
