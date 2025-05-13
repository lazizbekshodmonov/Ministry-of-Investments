import { defineStore } from 'pinia'
import type { IBoardState } from '@/types/board.ts'
import { createBoard, getBoards } from '@/services/board.service.ts'

const useBoardStore = defineStore('board', {
  state: (): IBoardState => ({
    boards: [],
    form: {
      title: null,
      description: null
    },
    visibleBoardFormModal: false
  }),
  actions: {
    async getBoards(): Promise<void> {
      this.boards = await getBoards()
    },
    async createBoard(): Promise<void> {
      const newBoard = await createBoard(this.form)
      if (newBoard) {
        this.boards.push(newBoard)
        this.visibleBoardFormModal = false
        this.form.title = null
        this.form.description = null
      }
    }
  }
})

export default useBoardStore
