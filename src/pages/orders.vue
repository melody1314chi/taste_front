<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.orders') }}</h1>
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
    // 去改 pages > admin > products.vue
    { title: t('order.createdAt'), key: 'createdAt', value: item => new Date(item.createdAt).toLocaleString() },
    { title: t('order.cart'), key: 'cart', sortable: false},
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
    const { data } = await apiAuth.get('/order')
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
  login: true
  title: 'nav.orders'
</route>
