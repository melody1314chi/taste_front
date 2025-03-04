<template>
  <div class="profile-container">
    <h1>個人資料</h1>
    <div class="profile-picture">
      <!-- 使用 vue-boring-avatars 作為預設頭像 -->
      <Avatar
        v-if="!user.avatar"
        :size="100"
        variant="beam"
        :name="user.username"
        :colors="colors"
      />
      <!-- 如果有上傳頭像，則顯示上傳的頭像 -->
      <img v-else :src="user.avatar" alt="使用者頭像" />
      <input
        ref="avatarInput"
        type="file"
        accept="image/*"
        style="display: none;"
        @change="handleAvatarChange"
      />
      <button class="change-picture-btn" @click="triggerAvatarUpload">
        更換頭像
      </button>
    </div>
    <form @submit.prevent="saveProfile">
      <div class="form-group">
        <label for="username">使用者名稱</label>
        <input
          id="username"
          v-model="user.username"
          type="text"
          :readonly="!isEditing"
          :class="{ readonly: !isEditing }"
        />
      </div>
      <div class="form-group">
        <label for="email">電子郵件</label>
        <input
          id="email"
          v-model="user.email"
          type="email"
          :readonly="!isEditing"
          :class="{ readonly: !isEditing }"
        />
      </div>
      <div class="form-group">
        <label for="bio">個人簡介</label>
        <textarea
          id="bio"
          v-model="user.bio"
          :readonly="!isEditing"
          :class="{ readonly: !isEditing }"
        ></textarea>
      </div>
      <div class="form-actions">
        <button
          v-if="!isEditing"
          type="button"
          class="edit-btn"
          @click="toggleEdit"
        >
          編輯資料
        </button>
        <button v-else type="submit" class="save-btn">儲存變更</button>
        <button
          v-if="isEditing"
          type="button"
          class="cancel-btn"
          @click="cancelEdit"
        >
          取消
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Avatar } from "vue-boring-avatars";

export default {
  components: {
    Avatar,
  },
  data() {
    return {
      isEditing: false, // 是否處於編輯模式
      user: {
        username: "JohnDoe",
        email: "johndoe@example.com",
        bio: "我是一個熱愛編程的開發者！",
        avatar: "", // 預設為空，使用 vue-boring-avatars
      },
      originalUser: {}, // 用於儲存原始資料，以便取消編輯時恢復
      colors: ["#FFAD08", "#EDD75A", "#73B06F", "#0C8F8F", "#405059"], // 自定義顏色
    };
  },
  methods: {
    // 觸發頭像上傳
    triggerAvatarUpload() {
      this.$refs.avatarInput.click();
    },
    // 處理頭像上傳
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    // 切換編輯模式
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        // 進入編輯模式時，備份原始資料
        this.originalUser = { ...this.user };
      }
    },
    // 取消編輯
    cancelEdit() {
      this.isEditing = false;
      // 恢復原始資料
      this.user = { ...this.originalUser };
    },
    // 儲存變更
    saveProfile() {
      this.isEditing = false;
      alert("個人資料已儲存");
      console.log("更新後的資料：", this.user);
      // 這裡可以加入 API 呼叫，將資料傳送到後端
    },
  },
};
</script>

<style scoped>
.profile-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.profile-picture {
  text-align: center;
  margin-bottom: 20px;
}

.profile-picture img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.change-picture-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.change-picture-btn:hover {
  background-color: #0056b3;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.form-group textarea {
  resize: vertical;
  height: 100px;
}

.readonly {
  background-color: #f9f9f9;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.edit-btn,
.save-btn,
.cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.edit-btn {
  background-color: #007bff;
  color: #fff;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.save-btn {
  background-color: #28a745;
  color: #fff;
}

.save-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #dc3545;
  color: #fff;
}

.cancel-btn:hover {
  background-color: #c82333;
}
</style>
