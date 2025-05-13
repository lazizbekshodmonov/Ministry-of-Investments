<script setup lang="ts">
import type { IBoard } from '@/types/board.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  board: IBoard
}>()
function navigateToTasks() {
  router.push({
    name: 'TasksView',
    params: {
      boardId: props.board.id
    }
  })
}
</script>

<template>
  <a-card @click="navigateToTasks" :title="board.title" class="cursor-pointer">
    {{ board.description }}
  </a-card>
</template>

<style scoped></style>
