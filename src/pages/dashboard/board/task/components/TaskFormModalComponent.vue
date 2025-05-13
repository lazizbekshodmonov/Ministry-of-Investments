<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { requiredField } from '@/utils/rules.ts'
import useTaskStore from '@/store/task.store.ts'

const props = defineProps<{
  boardId: number
  stateId: number
}>()

const taskStore = useTaskStore()
const { form, visibleTaskFormModal, loading } = storeToRefs(taskStore)
const formRef = ref()
function handleSubmit() {
  formRef.value
    .validate()
    .then(() => {
      taskStore.createTask(props.boardId, props.stateId)
    })
    .catch(() => {})
}
</script>

<template>
  <slot />
  <a-modal
    @ok="handleSubmit"
    v-model:open="visibleTaskFormModal"
    title="Create new board"
    ok-text="Save"
    :ok-button-props="{ loading }"
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
          <a-form-item label="Description" name="description">
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
