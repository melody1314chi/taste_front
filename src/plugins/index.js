/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import i18n from '@/i18n'
import VuetifyUseDialog from 'vuetify-use-dialog'
// 引用 vue-file-agent
import VueFileAgentNext from '@boindil/vue-file-agent-next'
import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'

export function registerPlugins (app) {
  app
    // https://vue-i18n.intlify.dev/guide/essentials/started.html#registering-the-i18n-plugin
    // 🔻文件有寫要先 .use(i18n) 再 .use(vuetify)
    .use(i18n)
    .use(vuetify)
    // https://github.com/wobsoriano/vuetify-use-dialog
    // 🔻 文件寫明 VuetifyUseDialog 需在 vuetify 之後
    .use(VuetifyUseDialog, {
      snackbar: {
        showCloseButton: false,
        // 兩秒後關閉
        snackbarPoprs: {
          timeout: 2000
        }
      }
    })
    .use(router)
    .use(pinia)
    // vue-file-agent 上傳商品用
    .use(VueFileAgentNext)
}
