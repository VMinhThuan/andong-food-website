import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Nén mọi ảnh raster/SVG đi qua bundle lúc build (ảnh lớn đã được
    // convert sang .webp thủ công trong src/assets/optimized/).
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 78 },
      jpg: { quality: 78 },
      webp: { quality: 82 },
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false, cleanupNumericValues: false } },
          },
        ],
      },
    }),
  ],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    // Tách output có hash (bất biến) khỏi /assets/ của thư mục public,
    // để đặt cache-control riêng trên Vercel.
    assetsDir: 'build',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          // CHỈ tách thủ công các lib chắc chắn nằm trên critical path (eager).
          // KHÔNG đụng tới qrcode / html5-qrcode — chúng được nạp động và Rollup
          // tự tách chunk lazy; ép manualChunks sẽ kéo ngược vào bundle chính.
          if (
            id.includes('/react-dom/') ||
            id.includes('/react/') ||
            id.includes('/react-router') ||
            id.includes('/scheduler/')
          ) {
            return 'react-vendor'
          }
          if (id.includes('/framer-motion/')) return 'motion'
          if (id.includes('/lucide-react/')) return 'icons'
          return undefined
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5001'
    }
  }
})
