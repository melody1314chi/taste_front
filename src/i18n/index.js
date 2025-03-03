import { createI18n } from 'vue-i18n'
import en from './en'
// import zhHant from './zhHant'

const i18n = createI18n({
  locale: 'en',     // 預設語言
  fallback: 'en',   // 如果找不到翻譯，使用英文
  legacy:false,     // 使用 Composition API 時需設為 false
  messages: {
    en
    // zhHant
  },
})

export default i18n
