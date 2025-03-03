<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminProducts') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="products" :headers="headers" :search="search">
          <!-- 插槽 v-slot 簡寫為 #  -->
          <template #top>
            <v-toolbar>
              <!-- 新增商品 -->
              <v-btn @click="openDialog(null)">{{ $t('adminProduct.new') }}</v-btn>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" variant="underlined"></v-text-field>
            </v-toolbar>
          </template>

          <!-- 插槽 v-slot 簡寫為 #  -->
          <!-- 插槽引入的值非單一時需要用 [``] 包起來 -->
          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="50"></v-img>
          </template>
          <template #[`item.sell`]="{ value }">
            <v-icon v-if="value" icon="mdi-check"></v-icon>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.category`]="{ value }">
            {{ $t('productCategory.' + value) }}
          </template>
          <!-- 編輯用的虛擬欄位 -->
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <!-- 對話框 -->
  <!-- persistent 固定表單不會因為點擊外部而關閉 -->
  <v-dialog v-model="dialog.open" persistent>
    <!-- 送出時執行 submit -->
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <!-- 如果商品本身有 id 就判定可以編輯，沒有就判定可以新增 -->
        <v-card-title>{{ $t(dialog.id ? 'adminProduct.edit' : 'adminProduct.new') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            :label="$t('product.name')"
            :error-messages="name.errorMessage.value"
          ></v-text-field>

          <v-text-field
            v-model="price.value.value"
            :label="$t('product.price')"
            :error-messages="price.errorMessage.value"
            type="number" min="0"
          ></v-text-field>

          <v-select
            v-model="category.value.value"
            :error-messages="category.errorMessage.value"
            :items="categoryOptions"
            :label="$t('product.category')"
            item-title="text"
            item-value="value"
          ></v-select>

          <v-checkbox
            v-model="sell.value.value"
            :label="$t('product.onSell')"
            :error-messages="sell.errorMessage.value"
          ></v-checkbox>

          <v-textarea
            v-model="description.value.value"
            :label="$t('product.description')"
            :error-messages="description.errorMessage.value"
          ></v-textarea>

          <!-- vue-file-agent 上傳圖檔 -->
          <!-- accept 限定支援的檔案．deletable 可刪除．max-size 最大尺寸 -->
          <VueFileAgent
            ref="fileAgent" v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            :help-text="$t('fileAgent.helpText')"
            :error-text="{ type: $t('fileAgent.errorType'), size: $t('fileAgent.errorSize') }"
            ></VueFileAgent>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="closeDialog">{{ $t('adminProduct.cancel') }}</v-btn>
          <v-btn type="submit" :loading="isSubmitting">{{ $t('adminProduct.submit') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>


<script setup>
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import { reactive, computed, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const products = reactive([])
const search = ref('')
const headers = computed(() => {
  return [
    // 控制表格分類項目之排序，sortable 是否開啟該項排序
    { title: 'ID', key: '_id', sortable: true },
    { title: t('product.image'), key: 'image', sortable: false },
    { title: t('product.name'), key: 'name', sortable: true },
    { title: t('product.description'), key: 'description', sortable: true },
    { title: t('product.price'), key: 'price', sortable: true },
    { title: t('product.category'), key: 'category', sortable: true },
    { title: t('product.sell'), key: 'sell', sortable: true },
    { title: t('product.createdAt'), key: 'createdAt', sortable: true },
    { title: t('product.updatedAt'), key: 'updatedAt', sortable: true },
    // 編輯 (虛擬欄位)
    { title: t('adminProduct.edit'), key: 'edit', sortable: false },
  ]
})

const getProducts = async () => {
  try {
    // 跟後端 router > product.js 取得'給管理員看的'商品資料
    const { data } = await apiAuth.get('/product/all')
    products.push(...data.result)
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
getProducts()

// 對話框
const dialog = ref({
  open: false,
  // id 空值表示需要新增
  id: ''
})

// 開啟對話框的編輯鈕
const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id
    name.value.value = item.name
    price.value.value = item.price
    description.value.value = item.description
    category.value.value = item.category
    sell.value.value = item.sell
  }
  dialog.value.open = true
}
const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
  fileAgent.value.deleteFileRecord()
}
// 新增或編輯商品的表單
const schema = yup.object({
  // 商品名稱
  name: yup
    .string()
    .required(t('api.productNameRequired')),
  // 價格
  price: yup
    .number()
    .typeError(t('api.productPriceRequired'))
    .required(t('api.productPriceRequired'))
    .min(0, t('api.productPriceTooSmall')),
  // 商品敘述
  description: yup
    .string()
    .required(t('api.productDescriptionRequired')),
  // 分類
  category: yup
    .string()
    .required(t('api.productCategoryRequired'))
    .oneOf(['food', 'drink', 'music', 'game'], t('api.productCategoryInvalid')),
  // 販售中
  sell: yup
    .boolean()
    .required(t('api.productSellRequired')),
})

// vee-validate 需要要先建立 form 才能建立欄位
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    category: '',
    sell: false,
  }
})
const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')
const categoryOptions = computed(() => [
  { text: t('productCategory.food'), value: 'food' },
  { text: t('productCategory.drink'), value: 'drink' },
  { text: t('productCategory.music'), value: 'music' },
  { text: t('productCategory.game'), value: 'game' },
])


const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

// 新增、編輯的提交
const submit = handleSubmit(async (values) => {
  // 先檢查有沒有錯誤
  if (fileRecords.value[0]?.error)      return
  // 做新增但沒有選圖的話也 return
  if (dialog.value.id.length === 0 && fileRecords.value.length === 0) {
    createSnackbar({
      text: t('api.productImageRequired'),
      snackbarProps: {
        color: 'red'
      }
    })
    return
  }

  try {
    const fd = new FormData()
    // fd.append(key, value)
    fd.append('name', values.name)
    fd.append('price', values.price)
    fd.append('description', values.description)
    fd.append('category', values.category)
    fd.append('sell', values.sell)
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    // fileRecords 的長度大於 0 (如果有檔案)
    // 就加入 fileRecords 陣列內
    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/product/' + dialog.value.id, fd)
    } else {
      await apiAuth.post('/product', fd)
    }

    products.splice(0, products.length)
    getProducts()
    createSnackbar({
      text: t(dialog.value.id.length > 0 ? 'adminProduct.editSuccess' : 'adminProduct.newSuccess'),
      snackbarProps: {
        color: 'green'
      }
    })
    closeDialog()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red'
      }
    })
  }
})
</script>


<route lang="yaml">
  meta:
    layout: admin
    login: true
    admin: true
    title: 'nav.adminProducts'
  </route>
