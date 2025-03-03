<!-- 複製 pages > orders.vue 的模板來改 -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- 更改標題 -->
        <h1 class="text-center">{{ $t('nav.adminOrders') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="orders" :headers="headers">
          <template #[`item.cart`]="data">
            <ul>
              <li v-for="item in data.item.cart" :key="item._id">
                {{ item.product.name }} x {{ item.quantity }}
              </li>
            </ul>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()

const orders = ref([])

const headers = computed(() => {
  return [
    { title: 'ID', key: '_id' },
    // 新增顯示下訂單的使用者帳號
    { title: t('order.account'), key: 'user.account' },
    { title: t('order.createdAt'), key: 'createdAt', value: item => new Date(item.createdAt).toLocaleString() },
    { title: t('order.cart'), key: 'cart', sortable: false },
    {
      title: t('order.price'),
      key: 'price',
      value: item => {
        return item.cart.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)
      }
    }
  ]
})

const getOrders = async () => {
  try {
    // 更改路由
    const { data } = await apiAuth.get('/order/all')
    orders.value = data.result
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
getOrders()
</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  # 改網頁名稱
  title: 'nav.adminOrders'
</route>
