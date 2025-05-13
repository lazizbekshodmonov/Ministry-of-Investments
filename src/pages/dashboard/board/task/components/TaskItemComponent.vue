<script setup lang="ts">
import type { ITask, ITaskForm, TTaskPriority } from '@/types/task.ts'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconPencilLine from '@/components/icons/IconPencilLine.vue'
import useTaskStore from '@/store/task.store.ts'
import { reactive, ref } from 'vue'

const props = defineProps<{
  task: ITask
}>()
const titleContentEditable = ref<boolean>(false)
const descriptionContentEditable = ref<boolean>(false)
const titleElement = ref<HTMLElement>()
const descriptionElement = ref<HTMLElement>()
const priorities = ref<string[]>(['low', 'normal', 'high', 'critical'])
const form = reactive<ITaskForm>({
  title: null,
  description: null,
  priority: null
})

const taskStore = useTaskStore()

function toggleContentEditable() {
  descriptionContentEditable.value = !descriptionContentEditable.value
  titleContentEditable.value = !titleContentEditable.value
}

function handleContentTitle(event: Event) {
  ;(event.target as HTMLInputElement).blur()
  form.title = titleElement.value?.innerText.trim() ?? null
  toggleContentEditable()
  taskStore.updateTask(props.task.id, form)
}

function handleContentDescription(event: Event) {
  ;(event.target as HTMLInputElement).blur()
  form.description = descriptionElement.value?.innerText.trim() ?? null
  taskStore.updateTask(props.task.id, form)
  toggleContentEditable()
}

function handeChangePriority(priority: TTaskPriority) {
  form.priority = priority
  taskStore.updateTask(props.task.id, form)
}

function deleteTask(taskId: number) {
  taskStore.deleteTask(taskId)
}
</script>

<template>
  <a-card>
    <template #title>
      <div
        @keydown.enter="handleContentTitle"
        ref="titleElement"
        :contenteditable="titleContentEditable"
      >
        {{ task.title }}
      </div>
    </template>
    <div
      class="min-h-10 border-b mb-2"
      @keydown.enter="handleContentDescription"
      ref="descriptionElement"
      :contenteditable="descriptionContentEditable"
    >
      {{ task.description }}
    </div>
    <div class="flex justify-end">
      <a-dropdown>
        <a-tag color="red">
          {{ task.priority }}
        </a-tag>
        <template #overlay>
          <a-menu>
            <a-menu-item
              @click="handeChangePriority(item)"
              v-for="item in priorities"
              :key="item"
            >
              {{ item }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <template #actions>
      <a-space>
        <a-button
          @click="toggleContentEditable"
          class="!flex items-center justify-center"
        >
          <template #icon>
            <icon-pencil-line />
          </template>
        </a-button>
        <a-button
          @click="deleteTask"
          class="!flex items-center justify-center"
          danger
        >
          <template #icon>
            <icon-trash />
          </template>
        </a-button>
      </a-space>
    </template>
  </a-card>
</template>

<style scoped></style>
