<template>
  <v-card>
    <v-img :src="image" height="200" cover></v-img>
    <v-card-title>
      <!-- 加入可以連至商品頁面的連結 -->
      <!-- 要在 pages 開 product 資料夾 -->
      <router-link :to="'/product/' + _id">{{ name }}</router-link>
    </v-card-title>
    <v-card-subtitle>{{ $t( 'productCategory.'+ category) }}</v-card-subtitle>
    <v-card-subtitle>{{ price }}</v-card-subtitle>
    <v-card-text>{{ description }}</v-card-text>
  </v-card>
</template>

<script setup>


// 定義外層可以傳哪些資料進來
defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>
