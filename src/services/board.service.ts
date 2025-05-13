import useCore from '@/composables/useCore.ts'
import { api } from '@/utils/api.ts'
import type { IBoard, IBoardForm } from '@/types/board.ts'

const { handleError } = useCore()
export async function getBoards() {
  try {
    const response = await api<IBoard[]>({
      url: '/boards'
    })
    return response.data
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function createBoard(board: IBoardForm) {
  try {
    const response = await api<IBoard>({
      url: '/boards',
      method: 'POST',
      data: board
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}
