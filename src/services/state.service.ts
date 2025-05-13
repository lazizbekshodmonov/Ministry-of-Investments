import useCore from '@/composables/useCore.ts'
import { api } from '@/utils/api.ts'
import type { IState, IStateForm } from '@/types/state.ts'

const { handleError } = useCore()
export async function getStates(boardId: number) {
  try {
    const response = await api<IState[]>({
      url: `/boards/${boardId}/states`
    })
    return response.data
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function createState(form: IStateForm) {
  try {
    const response = await api<IState>({
      url: `/boards/${form.boardId}/states`,
      method: 'POST',
      data: form
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}
