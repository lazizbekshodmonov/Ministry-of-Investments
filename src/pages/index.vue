<script setup lang="ts">
import useCore from '@/composables/useCore.ts'
import { watch } from 'vue'
import { App } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { message } = App.useApp()
const { notification, location } = useCore()
watch(
  notification,
  () => {
    switch (notification.value.type) {
      case 'success':
        message.success(notification.value.message)
        break
      case 'error':
        message.error(notification.value.message)
        break
      case 'warning':
        message.warning(notification.value.message)
    }
  },
  {
    deep: true
  }
)

watch(
  location,
  () => {
    if (location.value) {
      router.push(location.value)
    }
  },
  { deep: true }
)
</script>

<template>
  <router-view />
</template>

<style scoped></style>
