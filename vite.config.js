import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import html from 'vite-plugin-html'
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [ElementPlusResolver()]
    }),
    viteCompression({
      // 生成压缩包gz
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    html({
      minify: true
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
    open: true,
    // 反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/api': {
        target: 'xxxx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'zbc-vote',
    rollupOptions: {
      assetsDir: 'static/images/',
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      },
      external: ['echarts', 'vue', 'element-plus'],
      plugins: [
        externalGlobals({
          echarts: 'echarts',
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        })
      ]
    },
    terserOptions: {
      compress: {
        // 生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    },
    // 取消计算文件大小，加快打包速度
    brotliSize: false
  },
  base: '/zbc-vote/'
})
