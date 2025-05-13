<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { requiredField } from '@/utils/rules.ts'
import useTaskStateStore from '@/store/state.store.ts'

const props = defineProps<{
  id?: number
  boardId: number
}>()

const stateStore = useTaskStateStore()
const { form, visibleStateFormModal, loading } = storeToRefs(stateStore)
const formRef = ref()
function handleSubmit() {
  form.value.boardId = props.boardId
  formRef.value
    .validate()
    .then(() => {
      stateStore.createState()
    })
    .catch(() => {})
}
</script>

<template>
  <slot />
  <a-modal
    @ok="handleSubmit"
    v-model:open="visibleStateFormModal"
    title="Create new state"
    ok-text="Save"
    :ok-button-props="{ loading }"
    :closable="false"
    centered
  >
    <a-form :model="form" ref="formRef" layout="vertical">
      <a-row>
        <a-col :span="24">
          <a-form-item label="Name" :rules="[requiredField]" name="name">
            <a-input placeholder="Enter name..." v-model:value="form.name" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<style scoped></style>
