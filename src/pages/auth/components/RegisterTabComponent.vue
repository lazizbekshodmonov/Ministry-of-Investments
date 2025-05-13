<script setup lang="ts">
import useAuthStore from '@/store/auth.store.ts'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { registerForm } = storeToRefs(authStore)
</script>

<template>
  <a-card class="w-[480px]">
    <a-form
      :model="registerForm"
      layout="vertical"
      @finish="authStore.register"
    >
      <a-row>
        <a-col :span="24">
          <a-form-item name="fullName" label="Full Name">
            <a-input v-model:value="registerForm.fullName" size="large" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item name="username" label="Username">
            <a-input v-model:value="registerForm.username" size="large" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item name="password" label="Password">
            <a-input-password
              v-model:value="registerForm.password"
              size="large"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-button
            html-type="submit"
            type="primary"
            size="large"
            class="w-full"
          >
            Register
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<style scoped></style>
