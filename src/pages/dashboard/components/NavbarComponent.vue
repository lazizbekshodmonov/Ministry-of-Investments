<script setup lang="ts">
import UserInfoComponent from '@/pages/dashboard/components/UserInfoComponent.vue'
import useAuthStore from '@/store/auth.store.ts'
const authStore = useAuthStore()
</script>

<template>
  <header>
    <nav class="px-4 py-4 bg-white">
      <a-flex justify="end">
        <div>
          <a-dropdown trigger="click">
            <div class="cursor-pointer">
              <user-info-component />
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="authStore.logout()"> Log out </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-flex>
    </nav>
  </header>
</template>

<style scoped></style>
