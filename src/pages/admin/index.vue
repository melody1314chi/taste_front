<template>
  <v-container class="h-100">
    <v-row class="h-100" align="center">
      <v-col cols="12">
        <h1 class="text-center">{{ $t('admin.index') }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<route lang="yaml">
  meta:
    layout: admin
    # 一定要登入、一定要管理員 (擋掉使用網址 admin 登入的情況)
    login: true
    admin: true
    title: 'nav.admin'
</route>
