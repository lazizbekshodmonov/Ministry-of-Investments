<script setup lang="ts">
import { useRoute } from 'vue-router'
import useTaskStateStore from '@/store/state.store.ts'
import { computed, onMounted } from 'vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import TaskStateFormModalComponent from '@/pages/dashboard/board/task/components/TaskStateFormModalComponent.vue'
import { storeToRefs } from 'pinia'
import TaskStateItemComponent from '@/pages/dashboard/board/task/components/TaskStateItemComponent.vue'
import useTaskStore from '@/store/task.store.ts'
import TaskFormModalComponent from '@/pages/dashboard/board/task/components/TaskFormModalComponent.vue'

const route = useRoute()

const stateStore = useTaskStateStore()
const taskStore = useTaskStore()
const { visibleStateFormModal, states } = storeToRefs(stateStore)
const { visibleTaskFormModal } = storeToRefs(taskStore)
const boardId = computed(() =>
  route.params.boardId ? parseInt(route.params.boardId as string) : null
)
const stateId = computed(() =>
  states.value.length > 0 ? states.value[0].id : null
)

onMounted(() => {
  if (boardId.value) {
    stateStore.getStates(boardId.value)
    taskStore.getTasks(boardId.value)
  }
})
</script>

<template>
  <page-header-component title="Tasks">
    <template #actions>
      <task-form-modal-component
        v-if="boardId && stateId"
        :board-id="boardId"
        :state-id="stateId"
      >
        <a-button
          @click="visibleTaskFormModal = true"
          type="primary"
          size="large"
        >
          New Task
        </a-button>
      </task-form-modal-component>
    </template>
  </page-header-component>
  <div class="flex mx-4 overflow-x-auto">
    <div class="w-max flex gap-4">
      <task-state-item-component v-for="state in states" :state="state" />
      <task-state-form-modal-component v-if="boardId" :board-id="boardId">
        <a-button
          @click="visibleStateFormModal = true"
          type="default"
          size="large"
        >
          New State
        </a-button>
      </task-state-form-modal-component>
    </div>
  </div>
</template>

<style scoped></style>
