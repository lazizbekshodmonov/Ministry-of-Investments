<script setup lang="ts">
import LoginTabComponent from '@/pages/auth/components/LoginTabComponent.vue'
import RegisterTabComponent from '@/pages/auth/components/RegisterTabComponent.vue'
import useAuthStore from '@/store/auth.store.ts'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { activeTab } = storeToRefs(authStore)
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <a-tabs v-model:active-key="activeTab">
      <a-tab-pane key="login" tab="Login">
        <login-tab-component />
      </a-tab-pane>
      <a-tab-pane key="register" tab="Register">
        <register-tab-component />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped></style>
