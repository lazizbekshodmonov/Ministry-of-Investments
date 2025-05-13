<script setup lang="ts">
import NavbarComponent from '@/pages/dashboard/components/NavbarComponent.vue'
import useUserStore from '@/store/user.store.ts'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.getUserMe()
})
</script>

<template>
  <navbar-component />
  <router-view />
</template>

<style scoped></style>
