<script setup lang="ts">
import draggable from 'vuedraggable'
import { computed, ref, watch } from 'vue'
import type { IState } from '@/types/state.ts'
import useTaskStore from '@/store/task.store.ts'
import { storeToRefs } from 'pinia'
import TaskItemComponent from '@/pages/dashboard/board/task/components/TaskItemComponent.vue'
import type { ITask } from '@/types/task.ts'

const props = defineProps<{
  state: IState
}>()

const taskStore = useTaskStore()

const { tasks } = storeToRefs(taskStore)
const modelValue = computed(() =>
  tasks.value.filter((task) => task.stateId === props.state.id)
)

function handleMoveTask(evt: any) {
  if (evt.added) {
    const task: ITask = evt.added?.element
    const newStateId = props.state.id

    if (task?.stateId !== newStateId) {
      taskStore.updateStateTask(task?.id, newStateId)
    }
  }
}
</script>

<template>
  <a-card :title="state.name" class="w-[320px]">
    <draggable
      class="draggable-list"
      :list="modelValue"
      @change="handleMoveTask"
      :group="{ name: 'tasks', pull: true, put: true }"
      item-key="id"
    >
      <template #item="{ element }">
        <task-item-component :task="element" />
      </template>
    </draggable>
  </a-card>
</template>

<style scoped>
.draggable-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 10vh;
  max-height: calc(100dvh - 260px);
  overflow-y: auto;
}
.draggable-list > div {
  cursor: pointer;
}
</style>
