// Utilities
import { createPinia } from 'pinia'
// pinia 會將資料保存在 localStorage
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
