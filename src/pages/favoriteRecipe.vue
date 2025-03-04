<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h4">My Favorite Recipes</h2>
      </v-col>
    </v-row>

    <!-- 加入空格 -->
    <v-row class="mt-4"></v-row>

    <v-row>
      <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4">
        <v-card>
          <v-img :src="item.image" height="200px" cover></v-img>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-actions>
            <v-btn
              :color="isFavorited(item.id) ? 'red' : 'grey'"
              icon
              @click="toggleFavorite(item.id)"
            >
              <v-icon>{{ isFavorited(item.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [
        { id: 1, name: "Linguine E Americana", image:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHMhf88NWNdvHtPSmbyw5qai8ttdG3Z0hayXpIByElqPQmbFU8IYARFs6naFvA9YdqQQmpF4CSkzbkTrA7PGO257Cdos4S6ey0rpHgZiyNM5_H7N-gnNiR7vRto1BBgSHfn1EW2n5KoI0/s1600/031.JPG"},
        { id: 2, name: "Beef Lo Mein Noodles", image:"https://www.wellplated.com/wp-content/uploads/2021/08/Mongolian-Beef-Lo-Mein-500x500.jpg"},
        { id: 3, name: "Pistachio Pasta", image:"https://images.dissapore.com/wp-content/uploads/2024/01/pasta-pasticciata-ricetta.jpg?width=1280&height=720&quality=50"},
      ],
      favorites: new Set(),
    };
  },
  async mounted() {
    await this.fetchFavorites();
  },
  methods: {
    async fetchFavorites() {
      const { data } = await axios.get("http://localhost:4000/favorites");
      this.favorites = new Set(data);
    },
    isFavorited(id) {
      return this.favorites.has(id);
    },
    async toggleFavorite(id) {
      if (this.isFavorited(id)) {
        await axios.delete(`http://localhost:4000/favorites/${id}`);
        this.favorites.delete(id);
      } else {
        await axios.post(`http://localhost:4000/favorites/${id}`);
        this.favorites.add(id);
      }
    },
  },
};
</script>

<style scoped>
/* 卡片外觀與懸停效果 */
.custom-card {
  border-radius: 20px; /* 圓角效果 */
  background: linear-gradient(135deg, #e3f2fd, #ffffff); /* 漸變背景 */
  transition: all 0.4s ease; /* 動畫效果 */
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15); /* 增加柔和陰影 */
  overflow: hidden; /* 防止圖片溢出 */
}

/* 懸停效果：放大與陰影 */
.custom-card:hover {
  transform: translateY(-5px) scale(1.05); /* 懸停時輕微上移與放大 */
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.2); /* 加強陰影 */
}

/* 圖片圓角 */
.custom-img {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  filter: brightness(0.8); /* 降低圖片亮度，讓文字更突出 */
  transition: filter 0.3s ease;
}

/* 當圖片懸停時，亮度提高 */
.custom-card:hover .custom-img {
  filter: brightness(1); /* 懸停時圖片亮度恢復 */
}

/* 文字置中 */
/* h2 {
  font-weight: bold;
  text-align: center;
  color: 0; // 調整標題顏色
} */

/* 按鈕顏色和樣式 */
.v-btn {
  transition: background-color 0.3s ease; /* 按鈕顏色過渡效果 */
}

.v-btn:hover {
  background-color: rgba(255, 0, 0, 0.1); /* 按鈕懸停效果 */
}
</style>


<!-- <template>
  <v-container>
    <v-row>
      <v-col v-for="(value, index) in favoriteRecipes" :key="value.id" cols="3">
        <v-card>
          <v-img :src="value.image" class="image" cover></v-img>
          <v-card-title>{{ value.title }}</v-card-title>
          <v-btn @click="removeFromFavorites(value)">{{ $t('removeFromFavorites') }}</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useI18n } from 'vue-i18n'
import { useSnackbar } from 'vuetify-use-dialog'
import { ref, computed } from 'vue'

const { api, apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()


const props = defineProps({
  favoriteRecipes: {
    type: Array,
    required: true,
  },
})

// 取得食品清單
const getRecipes = async () => {
  try {
    const { data } = await api.get('/recipe')
    recipes.value = data.result // 確保資料結構符合
    await getFavorites() // 取得喜愛的貓咪資料
  } catch (error) {
    console.log(error)
  }
}

const favorites = async () => {
  try {
    const { data } = await apiAuth.get('/user/favorites')
    favorites.value = data.result.map((recipe) => recipe._id) // 存入已按讚的 ID 陣列

    // 更新 `recipes` 陣列，標記哪些是使用者按過讚的
    recipes.value.forEach((recipe) => {
      recipe.liked = userFavorites.value.includes(recipe._id)
    })
  } catch (error) {
    console.log('無法獲取使用者的喜好資料:', error)
  }
}

// 移除收藏的食譜
const removeFromFavorites = async (recipe) => {
  try {
    // 調用後端 API 移除收藏
    const response = await apiAuth.get('/favorites/all')
    response.value = data.result.map((recipe) => ({
      ...recipe,
      isFavorite: favoriteRecipes.value.some((favRecipe) => favRecipe.id === recipe.id), // 檢查是否已經收藏
    }))
    createSnackbar(t('removeFromFavoritesSuccess'))
  } catch (error) {
    console.error('移除收藏失敗:', error)
  }
}
</script>

<style>
.image {
  border-radius: 5px;
}
</style>

<route lang="yaml">
  meta:
    login: true
    admin: false
    title: 'nav.favoriteRecipes'
</route> -->
