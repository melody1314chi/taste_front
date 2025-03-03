/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// START_LOCATION => 起始位置
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n'

// import LeftSidebar from '@/components/LeftSidebar.vue'
// import CreateRecipe from '../components/CreateRecipe.vue'

console.log('自動生成的路由:', routes)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),

  //   {
  //     path: '/create-recipe',
  //     name: 'create-recipe',
  //     component: CreateRecipe
  //   }
})


// 進入頁面前執行，使用 jwt 取得 token
// 第一次進頁面前拉使用者資料
router.beforeEach(async (to, from, next) => {
  const { apiAuth } = useAxios()
  const user = useUserStore()

  if (from === START_LOCATION && user.isLoggedIn) {
    try {
      const { data } = await apiAuth.get('/user/profile')
      user.login(data.result)
    } catch (error) {
      console.log(error)
      // 錯誤就登出
      user.logout()
    }
  }

  // 路由守衛
  // 已經登入就丟回首頁
  if (user.isLoggedIn && ['/login', '/register'].includes(to.path)) {
    next('/')
    // 檢查目標路由是否需要登入，但用戶尚未登入
  } else if (to.meta.login && !user.isLoggedIn) {
    // 將未登入的用戶導向登入頁
    next('/login')
    // 檢查目標路由是否需要管理員權限，但用戶不是管理員時
  } else if (to.meta.admin && !user.isAdmin) {
    // 將沒有管理員權限的用戶導向首頁
    next('/')
  } else {
    // 繼續導航
    next()
  }
})

// 在每次路由導航完成後，動態設定頁面的標題
// https://github.com/intlify/vue-i18n/discussions/613 (寫法)
router.afterEach((to) => {
  document.title = i18n.global.t(to.meta.title) + ' | Taste of Us'
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

