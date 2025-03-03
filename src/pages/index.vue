<template>
  <v-container>
    <v-row>
      <div style="width: 100%" class="d-flex justify-start">
        <v-col cols="6">
          <v-text-field v-model="search" prepend-inner-icon="mdi-magnify"></v-text-field>
        </v-col>
      </div>
      <v-col v-for="(value, index) in recipes" :key="value.id" cols="3">
        <v-card>
          <v-img :src="value.image" class="image" cover>
            <v-icon v-if="!isFavorite" class="add-favorite-icon" @click="toggleFavorite(value)">
              {{ value.isFavorite ? 'mdi-heart' : 'mdi-heart-plus-outline' }}
              <!-- 讓圖示根據 value.isFavorite 的狀態動態變化 -> 如果 value.isFavorite 為 true，則顯示 "mdi-heart"，否則顯示 "mdi-heart-plus-outline"。 -->
            </v-icon>
            <!-- <v-icon v-else class="remove-favorite-icon" @click="removeFromFavorite(value)">mdi-heart</v-icon> -->
          </v-img>
          <v-card-title>{{ value.title }}</v-card-title>
        </v-card>
      </v-col>
      <!-- 無限滾動觸發點 -->
      <v-col v-if="hasMore" ref="loadMoreTrigger" cols="12">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const recipes = ref([]) // 存儲食譜數據
const page = ref(1) // 當前頁碼
const hasMore = ref(true) // 是否還有更多數據
const loadMoreTrigger = ref(null) // 無限滾動觸發點
// const isFavorite = ref(false); // 新增 isFavorite 變數


onMounted(async () => {
  await loadRecipes()
  setupInfiniteScroll()
})

// 加載食譜數據
const loadRecipes = async () => {
  try {
    console.log('開始取得食譜資料...')
    const response = await fetch(`http://localhost:4000/recipeAPI/getPasta?page=${page.value}`)
    console.log('取得食譜資料成功!')
    const data = await response.json()
    console.log('前端收到的資料:', data)

    if (data.result.length > 0) {
      // 將新數據添加到現有數據中
      recipes.value = [...recipes.value, ...data.result.map((recipe) => ({
        ...recipe,
        isFavorite: false, // 每個 recipe 都有獨立的 isFavorite 屬性
      }))]
      page.value += 1 // 頁碼加 1
    } else {
      hasMore.value = false // 沒有更多數據時，停止加載
    }
  } catch (error) {
    console.error('取得食譜資料失敗:', error)
  }
}

// 設置無限滾動
const setupInfiniteScroll = () => {
  useIntersectionObserver(
    loadMoreTrigger,
    ([{ isIntersecting }]) => {
      if (isIntersecting && hasMore.value) {
        loadRecipes() // 當觸發點進入視口時，加載更多數據
      }
    },
    {
      threshold: 0.5, // 當觸發點 50% 進入視口時觸發
    }
  )
}

// 改寫成一個函式 toggleFavorite -> addToFavorite(value)、removeFromFavorite(value) 兩個函式
// const addToFavorite = (index) => {
//   recipes.value[index].isFavorite = true;
// };

// const removeFromFavorite = (index) => {
//   recipes.value[index].isFavorite = false;
// };
</script>

<style>
.image {
  border-radius: 5px;
}

.add-favorite-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: 3px solid #ffb6c1;
  border-radius: 50%;
  padding: 10px;
  font-size: 18px;
  background-color: #ffb6c1;
}

.remove-favorite-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: 3px solid #ffb6c1;
  border-radius: 50%;
  padding: 10px;
  font-size: 18px;
  background-color: #ffb6c1;
}
</style>
