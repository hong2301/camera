import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

// 环境配置
dotenv.config()
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
  path: envFile
})

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  renderer: {
    assetsInclude: ['**/*.wasm', '**/*.task'],
    build: {
      assetsDir: 'assets'
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue()],
    server: {
      host: process.env.VITE_APP_HOST,
      port: Number(process.env.VITE_APP_PORT),
      proxy: {
        '/api': {
          target: `${process.env.VITE_SERVER_BASE_URL}:${process.env.VITE_SERVER_PROD}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
