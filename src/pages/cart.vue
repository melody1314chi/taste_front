<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.cart') }}</h1>
      </v-col>

      <v-divider></v-divider>

      <v-col cols="12">
        <!-- https://vuetifyjs.com/en/components/lists/#three-line -->
        <v-list lines="two">
          <template v-for="(item, i) in cart" :key="item._id">
            <!-- :active="!item.product.sell" 沒上架就是 active -->
            <v-list-item
              :title="item.product.name"
              :subtitle="item.product.price"
              active-class="bg-pink-lighten-4"
              :active="!item.product.sell"
            >
              <template #prepend>
                <v-avatar rounded="0">
                  <v-img :src="item.product.image"></v-img>
                </v-avatar>
              </template>
              <template #append>
                <!-- 點擊時使用 editCart 的 function -->
                <v-btn color="red" icon="mdi-minus" size="x-small" class="mr-4" @click="editCart(item.product._id, -1) "></v-btn>
                {{ item.quantity }}
                <v-btn color="green" icon="mdi-plus" size="x-small" class="ml-4" @click="editCart(item.product._id, 1)"></v-btn>
              </template>
            </v-list-item>
            <!-- 不是最後一個才會跑分隔線 -->
            <v-divider v-if="i < cart.length - 1"></v-divider>
          </template>
        </v-list>
      </v-col>

      <v-col cols="12" class="text-center">
        <!-- 金額 -->
        <p>{{ total }}</p>
        <!-- 結帳 -->
        <v-btn color="red" :disabled="!canCheckout" @click="checkout">{{ $t('cart.checkout') }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// 引入 computed 計算總金額
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
// 進行跳頁、引入路由
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'


const { apiAuth } = useAxios()
const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()
const { t } = useI18n()

const cart = ref([])

const getCart = async () => {
  try {
    const { data } = await apiAuth.get('/user/cart')
    cart.value = data.result
  } catch (error) {
    console.log(error)
  }
}
getCart()

const total = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
})

// 有下架商品就不可以結帳
const canCheckout = computed(() => {
  return cart.value.length > 0 && cart.value.every(item => item.product.sell)
})


const editCart = async (product, quantity) => {
  try {
    const { data } = await apiAuth.patch('/user/cart', { product, quantity })
    user.cart = data.result
    getCart()
  } catch (error) {
    console.log(error)
  }
}

// 結帳
const checkout = async () => {
  try {
    // .post('/order') 新增到後端資料庫的路由
    await apiAuth.post('/order')
    // 結帳後購物車清空
    user.cart = 0
    // .push('/orders') 新增到前端頁面的路由 (用戶訂單列表)
    router.push('/orders')
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
</script>

<route lang="yaml">
  meta:
    login: true
    title: 'nav.cart'
  </route>
