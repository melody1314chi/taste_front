<template>
  <div class="position-fixed">
  <v-card>
    <v-layout style="display: flex; flex-direction: column; height: 100vh;">
      <v-navigation-drawer
        class="bg-deep-purple"
        theme="dark"
        permanent
      >
        <v-list color="transparent">
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
        </v-list>

        <template #append>
          <div class="pa-2">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 400px"></v-main>
    </v-layout>
  </v-card>
  </div>
</template>


<style scoped>
.left-sidebar {
  height: 100vh;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}
</style>
