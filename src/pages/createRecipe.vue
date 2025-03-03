<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card>
      <v-card-title>Add a New Recipe</v-card-title>
      <v-card-text>
        <p>It just takes a few minutes, but your new recipe will last for generations to come. Follow the steps and add a new recipe.</p>

        <!-- 食譜名稱 -->
        <v-text-field
          v-model="recipe.name"
          :rules="nameRules"
          label="Recipe Name"
          required
        ></v-text-field>

        <!-- 選擇分類 -->
        <v-select
          v-model="recipe.categories"
          :rules="categoriesRules"
          :items="categoryOptions"
          label="Choose Categories (select one or more)"
          multiple
          chips
        ></v-select>

        <!-- 簡短描述 -->
        <v-textarea
          v-model="recipe.description"
          :rules="descriptionRules"
          label="Write a short summary or description of your delicious recipe here"
          required
        ></v-textarea>

        <!-- 選擇群組 -->
        <v-select
          v-model="recipe.groups"
          :rules="groupsRules"
          :items="groupOptions"
          label="Add to a Group (select one or more)"
          multiple
          chips
        ></v-select>

        <!-- 上傳圖片 -->
        <v-file-input
          v-model="recipe.image"
          :rules="imageRules"
          label="Upload a Recipe Photo"
          accept="image/*"
        ></v-file-input>

        <!-- 食譜材料部分 -->
        <v-subheader>Add Your Recipe's Ingredients</v-subheader>
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient-row">
          <v-text-field
            v-model="ingredient.amount"
            label="Amount"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model="ingredient.unit"
            label="Unit"
            required
          ></v-text-field>
          <v-text-field
            v-model="ingredient.name"
            label="Ingredient"
            required
          ></v-text-field>
        </div>
        <v-btn color="primary" class="mt-3" @click="addIngredient">
          + Add Another Ingredient
        </v-btn>

        <!-- 食譜份數 -->
        <v-text-field
          v-model="recipe.servings"
          :rules="servingsRules"
          label="How much does this recipe make?"
          required
        ></v-text-field>

        <!-- 食譜步驟 -->
        <v-subheader>Add Your Recipe's Steps</v-subheader>
        <v-textarea
          v-for="(step, index) in recipe.steps"
          :key="index"
          v-model="recipe.steps[index]"
          :label="`Step ${index + 1}`"
          required
        ></v-textarea>
        <v-btn color="primary" class="mt-3" @click="addStep">
          + Add Another Step
        </v-btn>

        <!-- 儲存草稿 -->
        <v-checkbox
          v-model="recipe.saveToDrafts"
          label="Save to Drafts"
        ></v-checkbox>
      </v-card-text>

      <!--  下一步按鈕 -->
      <v-card-actions>
        <v-btn color="primary" @click="submitForm">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      recipe: {
        name: '',
        categories: [],
        description: '',
        groups: [],
        image: null,
        ingredients: [{ amount: '', unit: '', name: '' }], // 預設一個材料
        servings: '',
        steps: ['', '', ''], // 預設 3 個步驟
        saveToDrafts: false,
      },
      categoryOptions: [
        'Breakfast',
        'Lunch',
        'Dinner',
        'Appetizers / Snacks',
        'Beverages',
        'Deserts',
        'Summer Holidays',
        'Winter Holidays',
      ],
      groupOptions: [
        'Family Recipes',
        'Healthy Eating',
        'Quick Meals',
        'Holiday Specials',
      ],
      nameRules: [
        v => !!v || 'Recipe Name is required', // !!!v 檢查 v 是否有值（非空白）
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      categoriesRules: [
        v => (v && v.length > 0) || 'At least one category must be selected',
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 250) || 'Description must be less than 250characters',
      ],
      groupsRules: [
        v => (v && v.length > 0) || 'At least one group must be selected',
      ],
      imageRules: [
        v => !v || v.size < 2000000 || 'Image size must be less than 2MB',
      ],

    };
  },
  methods: {
    // 添加新材料
    addIngredient() {
      this.recipe.ingredients.push({ amount: '', unit: '', name: '' });
    },
    // 添加新步驟
    addStep() {
      this.recipe.steps.push('');
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        // 表單驗證通過，提交資料到後端
        this.saveRecipe();
      }
    },
    async saveRecipe() {
      try {
        const formData = new FormData();
        formData.append('name', this.recipe.name);
        formData.append('categories', JSON.stringify(this.recipe.categories));
        formData.append('description', this.recipe.description);
        formData.append('groups', JSON.stringify(this.recipe.groups));
        formData.append('image', this.recipe.image);
        formData.append('ingredients', JSON.stringify(this.recipe.ingredients));
        formData.append('servings', this.recipe.servings);
        formData.append('steps', JSON.stringify(this.recipe.steps));
        formData.append('saveToDrafts', this.recipe.saveToDrafts);

        const response = await this.$axios.post('/api/recipes', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Recipe saved successfully:', response.data);
        this.$router.push({ name: 'NextStep' }); // 跳轉到下一步
      } catch (error) {
        console.error('Error saving recipe:', error);
      }
    },
  },
};
</script>

<style scoped>
/* 自訂樣式 */
.v-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
