import { en } from "vuetify/locale"

export default {
  $vuetify: en,
  //  🌼 nav {} 是導航選單（UI 相關）
  nav: {
    register: 'register',
    login: 'login',
    myProfile: 'personal profile',
    myOrders: 'order history',
    settings: 'settings',
  },
  register: {
    submit: 'submit',
    success: 'registered successfully',
  },
  login: {
    submit: 'login', // 再確認?
    success: 'login successfully',
  },
  user: {
    account: 'account',
    email: 'email',
    password: 'password',
    passwordConfirm: 'confirm password',
  },
  cart: {
    checkout: 'checkout',
  },
  order: {
    createdAt: '訂單時間',
    cart: '商品',
    price: '訂單金額',
    account: 'order account',
  },
  admin: {
    index: '選擇管理項目',
  },
  adminProduct: {
    new: 'add new product',
    edit: 'edit product',
    cancel: 'delete product',
    submit: '確認',
    newSuccess: 'new product added successfully',
    editSuccess: 'product edit successfully',
  },
  product: {
    image: 'image',
    name: 'name',
    description: 'description',
    price: 'price',
    category: 'category',
    sell: '販售狀態',
    createdAt: 'created at',
    updatedAt: 'updated at',
    onSell: '上架',
    notOnSell: '下架',
    addCart: '加入購物車',
    addCartQuantityInvalid: '數量格式不符',
    addCartSuccess: '加入購物車成功',
  },
  productCategory: {
    food: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    dessert: '甜點',
    snack: '點心',
    soup: '湯品',
    drink: '飲料',
    vegetarian: '素食',
    vegan: '純素',
    holidayRecipes: '節慶',
  },
  fileAgent: {
    helpText: '點擊或拖曳檔案至此',
    errorType: '檔案類型錯誤',
    errorSize: '檔案大小超過限制',
  },

  // page {}
  page: {
    // createRecipe 新增食譜
    createRecipe: 'create recipe',
    group: 'group',
    // favorite Recipes
    removeFromFavoriteRecipes: 'remove from favorite recipes',

    // setting
    accountSetup: {
      title: 'Account Setup',
      displayName: 'Display Name',
      username: 'Username',
      bio: 'Bio',
      email: 'Email',
      uploadAvatar: 'Upload Avatar',
      notificationSettings: 'Notification Settings',
      newRecipeUploads: 'New recipe uploads from group members',
      newCommentNotifications: 'New comment notifications',
      newMessageNotifications: 'New message notifications',
      favoriteTags: 'Favorite Tags',
    },
  },
  // 🌼 後端 API 錯誤訊息（伺服器回應相關）
  api: {
    // 🔻models > user.js > cartSchema
    userCartProductRequired: '購物車商品必填',
    userCartQuantityRequired: '購物車數量必填',
    userCartQuantityTooSmall: '購物車數量不符',

    // 🔻models > user.js > Schema
    // ⤷ account:
    userAccountRequired: 'user account required',
    userAccountTooShort: 'user account too short',
    userAccountTooLong: 'user account too long',
    userAccountInvalid: 'user account invalid',
    // userAccountDuplicate: 'user account duplicate',
    // ⤷ password:
    userPasswordRequired: 'user password required',
    // ⤷ email:
    userEmailRequired: 'user email required',
    userEmailInvalid: 'user email invalid',
    // ⤷ schema.pre()
    userPasswordTooShort: 'user password too short',
    userPasswordTooLong: 'user password too long',
    userPasswordNotMatch: 'user password do not match',

    // 🔻passport.js
    userNotFound: 'user not found', // *2
    userPasswordIncorrect: 'user password incorrect',

    // 🔻middlewares > auth.js
    userPermissionDenied: '使用者權限不足',

    // register.vue
    // userPasswordNotMatch: '使用者密碼不符',

    // 🔹 passport.js
    // 🔹 auth.js
    userTokenInvalid: '使用者驗證錯誤',
    userTokenExpired: '登入過期',

    // 🔻product.js
    productNameRequired: '商品名稱必填',
    productPriceRequired: '商品價格必填',
    productPriceTooSmall: '商品價格不符',
    productImageRequired: '商品圖片必填',
    productDescriptionequired: '商品說明必填',
    productCategoryRequired: '商品分類必填',
    productCategoryInvalid: '商品分類不符',
    productSellRequired: '商品上下架必填',

    // 🔻controllers > product.js (getId)
    productIdInvalid: '商品 ID 錯誤',
    productNotFound: '查無商品',
    // 🔻controllers > user.js
    productNotOnSell: '商品未上架',

    // 🔻 back > models > order.js
    orderCartProductRequired: '訂單商品必填',
    orderCartQuantityRequired: '訂單數量必填',
    orderCartQuantityTooSmall: '訂單數量不符',
    orderUserRequired: '訂單使用者必填',
    orderCartRequired: '訂單購物車必填',
    orderCartEmpty: '訂單購物車為空',
    // 🔻 back > controllers > order.js
    orderProductNotSell: '訂單商品未販售',

    // 🔻middlewares > upload.js
    uploadFailed: '上傳失敗',

    // 🔻controllers > user.js
    userAccountDuplicate: '使用者帳號重複',

    // 🔹 passport.js *2
    // 🔹 controllers > user.js*2
    // 🔹 auth.js
    serverError: '伺服器錯誤',

    // 🔹 index.js
    // 🔹 auth.js
    requestFormatError: '請求格式錯誤',

    // 🔶 vuetify-project > register.vue
    unknownError: '未知錯誤',
  },
}
