<script setup>
// import RecipeList from "./components/RecipeList.vue"; // 引入元件
</script>

<template>
  <v-app>
    <!-- <LeftSidebar></LeftSidebar> -->
    <!--
    :key="$route.fullPath"
    用於強制 <router-view> 的重新渲染
    這樣的設置會根據完整路徑 ($route.fullPath) 的變更來判斷是否重建組件 -->
    <!-- <RecipeList /> 顯示食譜列表 -->
    <router-view :key="$route.fullPath" />
  </v-app>

</template>

<!-- <script>
import LeftSidebar from '@/components/LeftSidebar.vue'

export default {
  components: {
    LeftSidebar
  }
}
</script> -->


<style>
body {
  background-color: #f5f5f5;
}

.navbar {
  background-color: rgba(0, 0, 0, 0);
}

.sidebar {
  background-color: rgb(43, 38, 38);
}

/* .left-sidebar {
  height: 100vh;
} */
</style>
