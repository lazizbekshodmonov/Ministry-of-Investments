<script setup lang="ts">
import useAuthStore from '@/store/auth.store.ts'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { loginForm, loading } = storeToRefs(authStore)
</script>

<template>
  <a-card class="w-[480px]">
    <a-form :model="loginForm" layout="vertical" @finish="authStore.login">
      <a-row>
        <a-col :span="24">
          <a-form-item name="username" label="Username">
            <a-input v-model:value="loginForm.username" size="large" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item name="password" label="Password">
            <a-input-password v-model:value="loginForm.password" size="large" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-button
            :loading="loading"
            html-type="submit"
            type="primary"
            size="large"
            class="w-full"
          >
            Login
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<style scoped></style>
