import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    // 别名
    alias: {
      '@': path.resolve(__dirname, '.', 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // 这里写你想导入全局scss变量的路径，注意只能写相对路径，alias貌似在css中不会生效
        additionalData: "@import './src/assets/less/variable.less';"
      }
    }
  },
  server: {
    port: 7777,
    cors: true,
    open: true,
    // 反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/api': {
        // 代理接口
        target: 'http://47.106.210.214:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
