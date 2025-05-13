<script setup lang="ts">
import useUserStore from '@/store/user.store.ts'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <header>
    <nav class="px-4 py-4 bg-white">
      <a-flex justify="end">
        <a-flex gap="8">
          <a-avatar size="large">
            <template #icon>
              <img src="@/assets/images/img.png" alt="" />
            </template>
          </a-avatar>
          <div class="flex flex-col justify-center gap-1">
            <h2 class="font-medium text-md m-0 leading-4">
              {{ user?.fullName }}
            </h2>
            <span class="text-xs leading-3">
              {{ user?.username }}
            </span>
          </div>
        </a-flex>
      </a-flex>
    </nav>
  </header>
</template>

<style scoped></style>
