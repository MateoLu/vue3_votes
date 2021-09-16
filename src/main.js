import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import '@/assets/less/index.less'
import 'element-plus/dist/index.css'

const app = createApp(App)

// 设置全局统一属性
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }

// elementPlus(App);
app.use(store).use(router)
app.mount('#app')
