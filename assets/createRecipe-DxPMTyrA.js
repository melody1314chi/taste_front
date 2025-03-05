import{_ as R}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{V as h}from"./VForm-CqVZ6SJA.js";import{f as g,w as t,g as U,o as n,d as o,ao as k,ap as S,S as u,au as C,am as A,b as d,an as p,F as f,r as b,R as c,av as w}from"./index-BJ5mKrdB.js";import{V as y}from"./VSelect-D5Udv7xP.js";import{V as v}from"./VTextarea-R_hdnGZM.js";import{V as D}from"./VFileInput-SJW4p_Tg.js";import{V as N}from"./VCheckbox-Bgg1G2wu.js";import"./VList-BScphOTg.js";import"./VDivider-CdbKQ_Fw.js";import"./VMenu-CcMWMFbz.js";import"./VChip-B8gmADKn.js";const T={data(){return{valid:!0,recipe:{name:"",categories:[],description:"",groups:[],image:null,ingredients:[{amount:"",unit:"",name:""}],servings:"",steps:["","",""],saveToDrafts:!1},categoryOptions:["Breakfast","Lunch","Dinner","Appetizers / Snacks","Beverages","Deserts","Summer Holidays","Winter Holidays"],groupOptions:["Family Recipes","Healthy Eating","Quick Meals","Holiday Specials"],nameRules:[e=>!!e||"Recipe Name is required",e=>e&&e.length<=50||"Name must be less than 50 characters"],categoriesRules:[e=>e&&e.length>0||"At least one category must be selected"],descriptionRules:[e=>!!e||"Description is required",e=>e&&e.length<=250||"Description must be less than 250characters"],groupsRules:[e=>e&&e.length>0||"At least one group must be selected"],imageRules:[e=>!e||e.size<2e6||"Image size must be less than 2MB"]}},methods:{addIngredient(){this.recipe.ingredients.push({amount:"",unit:"",name:""})},addStep(){this.recipe.steps.push("")},submitForm(){this.$refs.form.validate()&&this.saveRecipe()},async saveRecipe(){try{const e=new FormData;e.append("name",this.recipe.name),e.append("categories",JSON.stringify(this.recipe.categories)),e.append("description",this.recipe.description),e.append("groups",JSON.stringify(this.recipe.groups)),e.append("image",this.recipe.image),e.append("ingredients",JSON.stringify(this.recipe.ingredients)),e.append("servings",this.recipe.servings),e.append("steps",JSON.stringify(this.recipe.steps)),e.append("saveToDrafts",this.recipe.saveToDrafts);const l=await this.$axios.post("/api/recipes",e,{headers:{"Content-Type":"multipart/form-data"}});console.log("Recipe saved successfully:",l.data),this.$router.push({name:"NextStep"})}catch(e){console.error("Error saving recipe:",e)}}}};function F(e,l,q,I,s,m){const V=U("v-subheader");return n(),g(h,{ref:"form",modelValue:s.valid,"onUpdate:modelValue":l[7]||(l[7]=r=>s.valid=r),"lazy-validation":""},{default:t(()=>[o(k,null,{default:t(()=>[o(S,null,{default:t(()=>l[8]||(l[8]=[u("Add a New Recipe")])),_:1}),o(C,null,{default:t(()=>[l[13]||(l[13]=A("p",null,"It just takes a few minutes, but your new recipe will last for generations to come. Follow the steps and add a new recipe.",-1)),o(p,{modelValue:s.recipe.name,"onUpdate:modelValue":l[0]||(l[0]=r=>s.recipe.name=r),rules:s.nameRules,label:"Recipe Name",required:""},null,8,["modelValue","rules"]),o(y,{modelValue:s.recipe.categories,"onUpdate:modelValue":l[1]||(l[1]=r=>s.recipe.categories=r),rules:s.categoriesRules,items:s.categoryOptions,label:"Choose Categories (select one or more)",multiple:"",chips:""},null,8,["modelValue","rules","items"]),o(v,{modelValue:s.recipe.description,"onUpdate:modelValue":l[2]||(l[2]=r=>s.recipe.description=r),rules:s.descriptionRules,label:"Write a short summary or description of your delicious recipe here",required:""},null,8,["modelValue","rules"]),o(y,{modelValue:s.recipe.groups,"onUpdate:modelValue":l[3]||(l[3]=r=>s.recipe.groups=r),rules:s.groupsRules,items:s.groupOptions,label:"Add to a Group (select one or more)",multiple:"",chips:""},null,8,["modelValue","rules","items"]),o(D,{modelValue:s.recipe.image,"onUpdate:modelValue":l[4]||(l[4]=r=>s.recipe.image=r),rules:s.imageRules,label:"Upload a Recipe Photo",accept:"image/*"},null,8,["modelValue","rules"]),o(V,null,{default:t(()=>l[9]||(l[9]=[u("Add Your Recipe's Ingredients")])),_:1}),(n(!0),d(f,null,b(s.recipe.ingredients,(r,a)=>(n(),d("div",{key:a,class:"ingredient-row"},[o(p,{modelValue:r.amount,"onUpdate:modelValue":i=>r.amount=i,label:"Amount",type:"number",required:""},null,8,["modelValue","onUpdate:modelValue"]),o(p,{modelValue:r.unit,"onUpdate:modelValue":i=>r.unit=i,label:"Unit",required:""},null,8,["modelValue","onUpdate:modelValue"]),o(p,{modelValue:r.name,"onUpdate:modelValue":i=>r.name=i,label:"Ingredient",required:""},null,8,["modelValue","onUpdate:modelValue"])]))),128)),o(c,{color:"primary",class:"mt-3",onClick:m.addIngredient},{default:t(()=>l[10]||(l[10]=[u(" + Add Another Ingredient ")])),_:1},8,["onClick"]),o(p,{modelValue:s.recipe.servings,"onUpdate:modelValue":l[5]||(l[5]=r=>s.recipe.servings=r),rules:e.servingsRules,label:"How much does this recipe make?",required:""},null,8,["modelValue","rules"]),o(V,null,{default:t(()=>l[11]||(l[11]=[u("Add Your Recipe's Steps")])),_:1}),(n(!0),d(f,null,b(s.recipe.steps,(r,a)=>(n(),g(v,{key:a,modelValue:s.recipe.steps[a],"onUpdate:modelValue":i=>s.recipe.steps[a]=i,label:`Step ${a+1}`,required:""},null,8,["modelValue","onUpdate:modelValue","label"]))),128)),o(c,{color:"primary",class:"mt-3",onClick:m.addStep},{default:t(()=>l[12]||(l[12]=[u(" + Add Another Step ")])),_:1},8,["onClick"]),o(N,{modelValue:s.recipe.saveToDrafts,"onUpdate:modelValue":l[6]||(l[6]=r=>s.recipe.saveToDrafts=r),label:"Save to Drafts"},null,8,["modelValue"])]),_:1}),o(w,null,{default:t(()=>[o(c,{color:"primary",onClick:m.submitForm},{default:t(()=>l[14]||(l[14]=[u("Submit")])),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])}const j=R(T,[["render",F],["__scopeId","data-v-fd1b72d1"]]);export{j as default};
