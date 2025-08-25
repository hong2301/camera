// 修复 'passive' event 警告
;(function () {
  if (typeof window === 'undefined') return

  const originalAddEventListener = EventTarget.prototype.addEventListener

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  EventTarget.prototype.addEventListener = function (type: string, listener: any, options?: any) {
    const passiveOptions = {
      // 将这些可能阻止滚动的事件都标记为 passive
      passive: ['touchstart', 'touchmove', 'wheel', 'mousewheel'].includes(type)
        ? true
        : typeof options === 'object'
          ? options.passive
          : undefined,
      ...(typeof options === 'object' ? options : {})
    }

    // 调用原始的方法，但使用我们修改后的 options
    return originalAddEventListener.call(this, type, listener, passiveOptions)
  }
})()

// 挂载csp
const meta = document.createElement('meta')
meta.httpEquiv = 'Content-Security-Policy'
meta.content = `
  default-src 'self';
  connect-src 'self' ${import.meta.env.VITE_SERVER_BASE_URL}:${import.meta.env.VITE_SERVER_PROD};
  script-src 'self' 'wasm-unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  form-action 'none';
`.replace(/\n/g, '')
document.head.appendChild(meta)

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'element-plus/dist/index.css'
import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
