import { defineStore } from 'pinia'
import type { ITaskForm, ITaskState } from '@/types/task.ts'
import {
  createTask,
  deleteTask,
  getTasks,
  updateStateTask,
  updateTask
} from '@/services/task.service.ts'

const useTaskStore = defineStore('task', {
  state: (): ITaskState => ({
    tasks: [],
    form: {
      title: null,
      description: null,
      priority: null
    },
    visibleTaskFormModal: false
  }),
  actions: {
    async createTask(boardId: number, stateId: number) {
      const task = await createTask(boardId, stateId, this.form)
      if (task) {
        this.tasks.push(task)
        this.visibleTaskFormModal = false
      }
    },
    async getTasks(boardId: number) {
      const tasks = await getTasks(boardId)
      if (tasks) {
        this.tasks = tasks
      }
    },
    async updateStateTask(taskId: number, stateId: number) {
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId)
      if (taskIndex >= 0) {
        const task = await updateStateTask(taskId, stateId)
        if (task) {
          this.tasks[taskIndex].stateId = stateId
        }
      }
    },
    async updateTask(taskId: number, form: ITaskForm) {
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId)
      if (taskIndex >= 0) {
        const task = await updateTask(taskId, form)
        if (task) {
          this.tasks[taskIndex] = task
        }
      }
    },
    async deleteTask(taskId: number) {
      const isDeleted = await deleteTask(taskId)
      if (isDeleted) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId)
      }
    }
  }
})
export default useTaskStore
