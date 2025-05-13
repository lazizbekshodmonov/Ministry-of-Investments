import { api } from '@/utils/api.ts'
import useCore from '@/composables/useCore.ts'
import type { ITask, ITaskForm } from '@/types/task.ts'

const { handleError } = useCore()
export async function getTasks(boardId: number) {
  try {
    const response = await api<ITask[]>({
      url: `/boards/${boardId}/tasks`
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export async function createTask(
  boardId: number,
  stateId: number,
  form: ITaskForm
) {
  try {
    const response = await api<ITask>({
      url: `/boards/${boardId}/tasks`,
      method: 'POST',
      data: {
        stateId,
        ...form
      }
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export async function updateStateTask(taskId: number, stateId: number) {
  try {
    const response = await api<ITask>({
      url: `/boards/tasks/${taskId}`,
      method: 'PUT',
      data: { stateId }
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export async function updateTask(taskId: number, form: ITaskForm) {
  try {
    const response = await api<ITask>({
      url: `/boards/tasks/${taskId}`,
      method: 'PUT',
      data: form
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export async function deleteTask(taskId: number) {
  try {
    await api({
      url: `/boards/tasks/${taskId}`,
      method: 'DELETE'
    })
    return true
  } catch (error) {
    handleError(error)
  }
}
