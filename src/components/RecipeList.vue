<!-- <script setup>
import { ref, onMounted } from "vue";
const recipes = ref([]);

onMounted(async () => {
  try {
    console.log("開始取得食譜資料...");
    const response = await fetch("http://localhost:4000/recipeAPI/getPasta");
    // https://api.spoonacular.com/recipes/complexSearch?apiKey=d681f890752f4178b9373b6814b093e0&query=pasta
    console.log("取得食譜資料成功!");
    console.log(response.result)
    const data = await response.json();
    console.log("前端收到的資料:", data);
    recipes.value = data.result;
  } catch (error) {
    console.error("取得食譜資料失敗:", error);
  }
});
</script>

<template>
  <div>
    <h2>🍽️ 食譜列表</h2>
    {{ recipes }}
    <ul>
      <li v-for="value in recipes" :key="value.id">
        TITLE: {{ value.title }} ID: {{ value.id }}
        <img :src="value.image" :alt="value.title">
      </li>

    </ul>
  </div>
</template> -->
