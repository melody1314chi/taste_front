<template>
  <div>
    <!-- <h2>🍽️ 食譜列表</h2> -->
      <v-row>
        <v-col cols="4">
          <v-card v-for="recipe in recipes" :key="recipe.id" class="mb-4" outlined></v-card>
          <v-img :src="recipe.image" height="150" width="150"></v-img>
        </v-col>
        <v-col cols="8">
          <v-card-title>{{ recipe.title }}</v-card-title>
          <v-card-text>{{ recipe.description }}</v-card-text>
          <v-img :src="recipe.image" height="150" width="150"></v-img>
        </v-col>
      </v-row>

  </div>
</template>
<!-- <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        {{ recipe.title }}
      </li>
    </ul> -->


<script setup>
import { ref, onMounted } from "vue"; // Vue 內建的函式
import { VCard } from 'vuetify'; // 引入 Vuetify 的元件

const recipes = ref([]); // 建立一個變數來存食譜資料

onMounted(async () => {
  // try {
  //   const response = await fetch("http://localhost:3000/api/recipes"); // 從後端取得資料
  //   const data = await response.json(); // 解析 JSON
  //   console.log("前端收到的資料:", data);
  //   recipes.value = data.results; // 把 API 回傳的 `results` 存起來
  // } catch (error) {
  //   console.error("取得食譜資料失敗:", error);
  // }
});
</script>

<style>
.v-card {
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.v-card .v-card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.v-card-text {
  font-size: 14px;
  color: #666;
}

.v-row {
  margin-bottom: 20px;
}

.v-col {
  padding: 10px;
}

.v-img {
  border-radius: 10px;
}
</style>
