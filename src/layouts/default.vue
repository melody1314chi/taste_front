<template>
    <v-navigation-drawer permanent >
      <v-spacer/>
    <v-btn to="/" :active="false" style="text-transform: none; font-size: 24px" class="bg-transparent">Taste of Us</v-btn>
    <v-divider></v-divider>
    <v-spacer/>
    <!-- <v-list-item link title="Joined Groups"></v-list-item>
    <v-list-item link title="Import Recipe"></v-list-item> -->
    <v-list>
    <v-list-item v-for="nav in navs" :key="nav.to" :prepend-icon="nav.icon" :title="nav.text" :to="nav.to"></v-list-item>
    </v-list>
    <v-spacer/>
    <v-divider></v-divider>
    <!-- 網頁 footer -->
    <v-footer absolute bottom="0" style="position: fixed; bottom: 0;">
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        &copy; {{ new Date().getFullYear() }} Taste of Us
      </v-col>
    </v-row>
  </v-footer>
  </v-navigation-drawer>

  <!-- 補 v-main、router-view 才看的到頁面內容 -->
  <v-main>
    <v-app-bar color="rgba(0, 0, 0, 0)" app elevation="0">
    <v-container fluid class="d-flex align-center">
      <!-- :active="false" 關閉連結 -->
      <v-spacer/>
      <!-- 左側內容 -->
      <template v-for="nav of navs">
        <v-btn v-if="nav.show" :key="nav.to" :to="nav.to" :prepend-icon="nav.icon">
          {{ nav.text }}
        </v-btn>
      </template>
<!-- 側邊攔: 顯示 收藏食譜、我的群組、網站 footer -->
      <!-- 使用 v-spacer 將後面的內容推到右側 -->
      <v-spacer></v-spacer>

    <!-- 登入、註冊按鈕 -->
    <v-btn v-show="!user.isLoggedIn" to="/login">Login</v-btn>
    <v-btn v-show="!user.isLoggedIn" to="/register">Register</v-btn>

    <!-- 語系切換 -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props">
            <!-- 包 v-icon 才會是方形圖案，不包直接寫在 v-btn 則是圓形 -->
            <v-icon icon="mdi-translate"></v-icon>
          </v-btn>
          </template>
        <v-list>
          <v-list-item
            v-for="lang in langs" :key="lang.value"
            @click="$i18n.locale = lang.value"
          >
            {{ lang.text }}
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- 暗黑模式切換 -->
      <v-btn>
        <!-- 包 v-icon 才會是方形圖案，不包直接寫在 v-btn 則是圓形 -->
        <v-icon icon="mdi-theme-light-dark" @click="toggleTheme"></v-icon>
      </v-btn>

      <!-- 會員資訊選單 -->
      <v-menu v-if="user.isLoggedIn" to="/">

        <template #activator="{ props }">
          <!-- text elevation="0" :ripple="false" -->
          <v-btn variant="text" v-bind="props" @click="handleClick">
            <Avatar
              :size="40"
              variant="beam"
              :name="user.username"
              :title="true"
              :colors="colors"
            />
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/userProfile" prepend-icon="mdi-account">
          {{ $t('nav.myProfile') }}
          </v-list-item>
          <v-list-item to="/orders" prepend-icon="mdi-format-list-bulleted">
          {{ $t('nav.myOrders') }}
          </v-list-item>
          <!-- <v-list-item to="/settings" prepend-icon="mdi-cog">
          {{ $t('nav.settings') }}
          </v-list-item> -->
          <v-list-item prepend-icon="mdi-logout" @click="logout">
          {{ $t('nav.logout') }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>

    <router-view></router-view>

          <!-- 新增食譜按鈕，固定於右下角 -->
      <v-btn
        v-if="user.isLoggedIn"
        to="/createRecipe"  fab
        color="success"
        size="large"
        class="fixed-button"
        rounded="circle"
        min-width="60px"
        min-height="60px"
        border="2px"
        @click="createRecipe"
      >
        <v-icon class="icon-shadow">mdi-plus</v-icon>
      </v-btn>
  </v-main>
</template>

<script setup>
// 導覽列文字是動態的，因此需使用 computed
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import Avatar from "vue-boring-avatars"
import { useTheme } from 'vuetify'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const theme = useTheme()

const navs = computed(() => {
  return [
    // 商品、訂單、回首頁
    { to: '/favoriteRecipe', text: t('nav.favoriteRecipe'), icon: 'mdi-shopping' },
    { to: '/userGroup', text: t('nav.userGroup'), icon: 'mdi-account-group' },
    { to: '/importRecipe', text: t('nav.importRecipe'), icon: 'mdi-import' },
    // <v-list-item link title="Import Recipe"></v-list-item>

    // { to: '/', text: t('nav.adminOrders'), icon: 'mdi-format-list-bulleted' },
    // { to: '/', text: t('nav.home'), icon: 'mdi-home' },
  ]
})
// 導覽列項目
// const navs = computed(() => {
//   return [
//     使用 text: t() 去接 zhHant.js 的 export default 內容
//     { to: '/register', text: t('nav.register'), icon: 'mdi-account-plus', show: !user.isLoggedIn },
//     { to: '/login', text: t('nav.login'), icon: 'mdi-account-arrow-left', show: !user.isLoggedIn },
//     ]
// })
// ↑原本寫在導覽列，改到會員資訊選單
    // { to: '/cart', text: t('nav.cart'), icon: 'mdi-cart', show: user.isLoggedIn },
    // { to: '/orders', text: t('nav.orders'), icon: 'mdi-format-list-bulleted', show: user.isLoggedIn },
    // { to: '/admin', text: t('nav.admin'), icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin },
// 多語言
const langs = [
  { text: 'English', value: 'en' },
  { text: '繁體中文', value: 'zhHant' },
]

/*************  ✨ Codeium Command ⭐  *************/
/**
 *  user/logout API 登出
 *  1. 使用 apiAuth.delete('/user/logout') 登出
 *  2. user.logout() 清除用戶資料
 *  3. createSnackbar 產生登出成功訊息
 *  4. router.push('/') 回到首頁
 */
/******  da20ea83-962b-4117-aca1-b6213507b0fb  *******/
const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: t('logout.success'),
    snackbarProps: {
      color: 'green'
    }
  })
  // 在購物車頁面登出後回首頁
  router.push('/')
}

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<!-- <script>
export default {
  data() {

    return {
      isLoggedIn: false,
      user: {},

      // 在用戶登錄後
  login() {
    // ...
    this.isLoggedIn = true
    this.user = { username: '...' }
  },
  components: {
    Avatar, // 註冊 Avatar 元件
  },
}
</script> -->

<style scoped>
.v-btn:active,
.v-btn:focus {
  box-shadow: none !important;
}

.icon-shadow {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 添加 icon 陰影 */
}
.fixed-button {
  position: fixed;
  bottom: 60px;
  right: 60px;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}
.text-center {
  font-size: 12px;
}
</style>
