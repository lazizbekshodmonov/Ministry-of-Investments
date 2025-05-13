<script setup lang="ts">
import useBoardStore from '@/store/board.store.ts'
import { onMounted } from 'vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import BoardFormModalComponent from '@/pages/dashboard/board/components/BoardFormModalComponent.vue'
import { storeToRefs } from 'pinia'
import BoardItemCardComponent from '@/pages/dashboard/board/components/BoardItemCardComponent.vue'

const boardStore = useBoardStore()
const { visibleBoardFormModal, boards } = storeToRefs(boardStore)

onMounted(() => {
  boardStore.getBoards()
})
</script>

<template>
  <page-header-component title="Boards">
    <template #actions>
      <board-form-modal-component>
        <a-button
          @click="visibleBoardFormModal = true"
          type="primary"
          size="large"
        >
          New Board
        </a-button>
      </board-form-modal-component>
    </template>
  </page-header-component>
  <div class="px-4">
    <a-row :gutter="16">
      <a-col
        v-if="boards.length"
        v-for="board in boards"
        :key="board.id"
        :span="6"
      >
        <board-item-card-component :board="board" />
      </a-col>
      <a-col v-else :span="24" class="flex justify-center align-center py-8">
        <a-empty />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped></style>
