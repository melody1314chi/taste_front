<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <!-- 註冊頁標題 -->
        <h1 class="text-center">{{ $t('nav.register') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="4">
        <!-- :disabled="isSubmitting" 送出時停止送出鈕 -->
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <!-- 帳號 -->
          <v-text-field
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
            :label="$t('user.account')"
            minlength="4" maxlength="20" counter
          />
          <!-- 信箱 -->
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            :label="$t('user.email')"
          />
          <!-- 密碼 -->
          <v-text-field
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
            :label="$t('user.password')"
            minlength="4" maxlength="20" counter
          />
          <!-- 密碼驗證 -->
          <v-text-field
            v-model="passwordConfirm.value.value"
            type="password"
            :error-messages="passwordConfirm.errorMessage.value"
            :label="$t('user.passwordConfirm')"
            minlength="4" maxlength="20" counter
          />
          <div class="text-center">
            <v-btn :loading="isSubmitting" type="submit" color="primary">{{ $t('register.submit') }}</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useForm, useField } from 'vee-validate'
  import * as yup from 'yup'
  import validator from 'validator'
  import { useI18n } from 'vue-i18n'
  import { useAxios } from '@/composables/axios'
  import { useSnackbar } from 'vuetify-use-dialog'
  import { useRouter } from 'vue-router'

  const { t } = useI18n()
  const { api } = useAxios()
  const createSnackbar = useSnackbar()
  const router = useRouter()

  // 使用 yup 執行物件的驗證
  const schema = yup.object({
    // 驗證規則要寫的跟後端寫 model 一樣
    // 🔻帳號：文字、必填、最小值4、最大值20、判斷是否為英數字
    account: yup
      // 資料型態為文字
      .string()
      // 必填
      .required(t('api.userAccountRequired'))
      // 最短長度
      .min(4, t('api.userAccountTooShort'))
      // 最長長度
      .max(20, t('api.userAccountTooLong'))
      // 自訂驗證(自訂驗證名稱, 錯誤訊息, function)
      .test(
        'isAlphanumeric', t('api.userAccountInvalid'),
        value => validator.isAlphanumeric(value)),
    // 🔻 信箱
    email: yup
      .string()
      .required(t('api.userEmailRequired'))
      .test(
        'isEmail', t('api.userEmailInvalid'),
        value => validator.isEmail(value)),
    // 🔻 密碼
    password: yup
      .string()
      .required(t('api.userPasswordRequired'))
      .min(4, t('api.userPasswordTooShort'))
      .max(20, t('api.userPasswordTooLong')),
    // 🔻 驗證密碼
    passwordConfirm: yup
      .string()
      // .oneOf(陣列, 訊息)  必須要是陣列內其中一個值
      // .ref(欄位名稱)      取得欄位的值
      // .ref('password')   password 欄位的值
      .oneOf([yup.ref('password')], t('api.userPasswordNotMatch'))
  })

  // 💡 一定要先建立 From 再建立 Field，順序不可變動
  // 🔻 建立表單
  const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
  })

  // 🔻 建立欄位
  // 要跟 account: yup 設定的名稱一樣
  const account = useField('account')
  const email = useField('email')
  const password = useField('password')
  const passwordConfirm = useField('passwordConfirm')

  // 驗證是否表單內容都 OK，確認完成後才會執行 function
  const submit = handleSubmit(async (values) => {
  try {
    await api.post('/user', {
      account: values.account,
      email: values.email,
      password: values.password
    })
    createSnackbar({
      text: t('register.success'),
      snackbarProps: {
        color: 'green'
      }
    })
    router.push('/login')
  } catch (error) {
    console.log(error)
    createSnackbar({
      // 'api' 指向 zhHant.js 內 api 的錯誤訊息
      text: t('api.' + error?.response?.data?.message || 'unknownError'),
      snackbarProps: {
        color: 'red'
      }
    })
  }
})
</script>

<route lang="yaml">
  meta:
    title: 'nav.register'
  </route>
