<template>
  <div class="container">
    <!-- 左側欄位 -->
    <div class="sidebar">
      <!-- 群組成員標題 -->
      <h1>F.R.I.E.N.D.S.</h1>
      <!-- 群組成員列表 -->
      <ul class="members">
        <!-- 遍歷 members 數組，顯示每個成員的頭像和名字 -->
        <li v-for="member in members" :key="member.id" class="member-item">
          <!-- 成員頭像 -->
          <img :src="member.avatar" :alt="member.name" class="avatar" />
          <!-- 成員名字（滑鼠懸停時顯示） -->
          <span class="member-name">{{ member.name }}</span>
        </li>
      </ul>
      <!-- 邀請按鈕 -->
      <ul class="categories">
        <li class="category-item" @click="selectCategory('Invite')">Invite</li>
      </ul>
    </div>
    <!-- 右側主內容 -->
    <div class="main-content">
      <!-- 食譜分類標題 -->
      <h2>Recipe Categories</h2>
      <!-- 食譜分類網格 -->
      <div class="category-grid">
        <!-- 遍歷 categories 數組，顯示每個分類 -->
        <div
          v-for="(category, index) in categories"
          :key="category"
          :class="['category-box', `box-${(index) + 1}`]"
          @click="selectCategory(category)"
        >
          {{ category }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 群組成員數據
      members: [
        { id: 1, name: "Charlotte", avatar: "https://static.vecteezy.com/system/resources/previews/022/432/960/non_2x/bored-disinterested-woman-semi-flat-character-head-feeling-moody-colorful-avatar-icon-editable-cartoon-user-portrait-simple-colour-spot-illustration-for-web-graphic-design-and-animation-vector.jpg" },
        { id: 2, name: "William", avatar: "https://static.vecteezy.com/system/resources/previews/022/832/725/non_2x/smiling-man-with-athletic-headband-semi-flat-character-head-sportsman-editable-cartoon-style-face-emotion-simple-colorful-avatar-icon-spot-illustration-for-web-graphic-design-and-animation-vector.jpg" },
        { id: 3, name: "Carman", avatar: "https://static.vecteezy.com/system/resources/thumbnails/023/506/962/small_2x/beautiful-short-haired-woman-with-restrained-smile-semi-flat-character-head-editable-cartoon-avatar-icon-face-emotion-colorful-spot-illustration-for-web-graphic-design-and-animation-vector.jpg" },
        { id: 4, name: "Charlie", avatar: "https://static.vecteezy.com/system/resources/previews/022/432/956/non_2x/irritated-young-man-with-prickly-hair-semi-flat-character-head-colorful-avatar-icon-editable-cartoon-user-portrait-simple-colour-spot-illustration-for-web-graphic-design-and-animation-vector.jpg" },
        { id: 5, name: "Vincent", avatar: "https://static.vecteezy.com/system/resources/previews/028/595/357/non_2x/cute-young-man-with-mustache-semi-flat-character-head-red-haired-male-editable-cartoon-avatar-icon-face-emotion-colorful-spot-illustration-for-web-graphic-design-animation-vector.jpg" }
      ],
      // 食譜分類數據
      categories: [
        "All Recipes",
        "Breakfast",
        "Beverages",
        "Lunch",
        "Appetizers/Snacks",
        "Summer Holidays",
        "Dinner",
        "Deserts"
      ]
    };
  },
  methods: {
    // 點擊分類時的處理函數
    selectCategory(category) {
      alert(`Selected: ${category}`);
    }
  }
};
</script>

<style>
/* 全局樣式 */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
}

/* 容器樣式 */
.container {
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0);
  padding: 10px;
}

/* 左側欄位樣式 */
.sidebar {
  width: 250px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 將內容居中 */
}

/* 右側主內容樣式 */
.main-content {
  flex: 1;
  padding-left: 20px;
}

/* 標題樣式 */
h1, h2 {
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

/* 群組成員列表樣式 */
.members, .categories {
  list-style-type: none;
  padding: 0;
  width: 100%; /* 確保寬度填滿 */
}

/* 群組成員項目樣式 */
.member-item {
  position: relative;
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: center; /* 頭像居中 */
  align-items: center;
}

/* 頭像樣式 */
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

/* 滑鼠懸停時頭像放大 */
.member-item:hover .avatar {
  transform: scale(1.1);
}

/* 成員名字樣式（滑鼠懸停時顯示） */
.member-name {
  position: absolute;
  top: 50%;
  left: 80px; /* 調整名字位置 */
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* 滑鼠懸停時顯示名字 */
.member-item:hover .member-name {
  opacity: 1;
}

.categories {
  list-style-type: none;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

/* 邀請按鈕樣式 */
.categories li, .category-item {
  color: #333; /* 文字顏色 */
  margin: 10px 0;
  padding: 15px;
  border: 2px dashed #ccc; /* 虛線邊框 */
  border-radius: 50%; /* 圓形 */
  width: 70px; /* 固定寬度 */
  height: 70px; /* 固定高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  cursor: pointer;
  transition: border-color 0.3s ease, transform 0.3s ease;
  font-size: 16px;
  font-weight: 500;
}

/* 滑鼠懸停時的效果 */
.category-item:hover {
  border-color: #6f7de2; /* 懸停時邊框顏色 */
  transform: scale(1.1); /* 懸停時放大 */
}

/* 滑鼠懸停時按鈕效果 */
.category-item:hover {
  background-color: #5f6fd6;
  transform: translateY(-5px);
}

/* 食譜分類網格樣式 */
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}

/* 食譜分類項目樣式 */
.category-box {
  background: #f2f2f2;
  color: #333;
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;
  font-weight: 500;
}

/* 滑鼠懸停時分類項目效果 */
.category-box:hover {
  background-color: #dce3e8;
  transform: translateY(-5px);
}

/* 調整分類項目大小 */
.box-1 {
  height: 200px;
  background-color: #e7f3fe;
}

.box-2 {
  height: 150px;
  background-color: #e2f8e7;
}

.box-3 {
  height: 250px;
  background-color: #fef2d7;
}

.box-4 {
  height: 180px;
  background-color: #fce0e0;
}

.box-5 {
  height: 150px;
  background-color: #e2f8e7;
}

.box-6 {
  height: 300px;
  background-color: #fef2d7;
}

.box-7 {
  height: 200px;
  background-color: #e7f3fe;
}

.box-8 {
  height: 250px;
  background-color: #e2f8e7;
}

/* 響應式設計：螢幕寬度小於 768px 時的樣式 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  /* .sidebar {
    width: 100%;
    margin-bottom: 20px;
  } */

  .main-content {
    width: 100%;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
