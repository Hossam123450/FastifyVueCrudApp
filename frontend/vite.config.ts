import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // important !
      }
    }
  }
})


// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   root: 'src',
//   base: '/my-app/',
//   server: {
//     port: 3001, // Vite écoute ici
//     open: true,
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:3000', // Fastify
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/api/, '')
//       }
//     }
//   },
//   build: {
//     outDir: 'dist',
//     rollupOptions: {
//       input: {
//         main: 'src/main.ts',
//         nested: 'src/nested/index.html'
//       }
//     }
//   }
// })
