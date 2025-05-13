<script setup lang="ts">
import useBoardStore from '@/store/board.store.ts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { requiredField } from '@/utils/rules.ts'

defineProps<{
  id?: number
}>()

const boardStore = useBoardStore()
const { form, visibleBoardFormModal } = storeToRefs(boardStore)
const formRef = ref()
function handleSubmit() {
  formRef.value
    .validate()
    .then(() => {
      boardStore.createBoard()
    })
    .catch(() => {})
}
</script>

<template>
  <slot />
  <a-modal
    @ok="handleSubmit"
    v-model:open="visibleBoardFormModal"
    :title="id ? 'Update board' : 'Create new board'"
    ok-text="Save"
    :closable="false"
    centered
  >
    <a-form :model="form" ref="formRef" layout="vertical">
      <a-row>
        <a-col :span="24">
          <a-form-item label="Title" :rules="[requiredField]" name="title">
            <a-input placeholder="Enter title..." v-model:value="form.title" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="Description"
            :rules="[requiredField]"
            name="description"
          >
            <a-textarea
              placeholder="Enter description..."
              v-model:value="form.description"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<style scoped></style>
