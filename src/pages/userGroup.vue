<template>
  <div class="container">
    <div class="sidebar">
      <h2>Group Members</h2>
      <ul class="members">
        <li v-for="member in members" :key="member.id" class="member-item">
          <img :src="member.avatar" :alt="member.name" class="avatar" />
          <span class="member-name">{{ member.name }}</span>
        </li>
      </ul>
      <ul class="categories">
        <li class="category-item" @click="selectCategory('Invite')">Invite</li>
      </ul>
    </div>
    <div class="main-content">
      <h1>Recipe Categories</h1>
      <div class="category-grid">
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
      members: [
        { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" }
      ],
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
    selectCategory(category) {
      alert(`Selected: ${category}`);
    }
  }
};
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
}

.container {
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0);
  padding: 10px;
}

.sidebar {
  width: 250px;
  padding-right: 20px;
}

.main-content {
  flex: 1;
  padding-left: 20px;
}

h1, h2 {
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.members, .categories {
  list-style-type: none;
  padding: 0;
}

.member-item {
  position: relative;
  margin: 10px 0;
  cursor: pointer;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.member-item:hover .avatar {
  transform: scale(1.1);
}

.member-name {
  position: absolute;
  top: 50%;
  left: 60px;
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

.member-item:hover .member-name {
  opacity: 1;
}

.categories li, .category-item {
  background: linear-gradient(135deg, #6f7de2, #7d94f2);
  color: white;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 16px;
  font-weight: 500;
}

.category-item:hover {
  background-color: #5f6fd6;
  transform: translateY(-5px);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}

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

.category-box:hover {
  background-color: #dce3e8;
  transform: translateY(-5px);
}

/* Adjust box sizes */
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

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .main-content {
    width: 100%;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
