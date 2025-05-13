import { defineStore } from 'pinia'
import type { IStateState } from '@/types/state.ts'
import { createState, getStates } from '@/services/state.service.ts'

const useTaskStateStore = defineStore('state', {
  state: (): IStateState => ({
    states: [],
    form: {
      boardId: null,
      name: null
    },
    visibleStateFormModal: false
  }),
  actions: {
    async getStates(boardId: number) {
      this.states = await getStates(boardId)
    },
    async createState() {
      const state = await createState(this.form)
      if (state) {
        this.states.push(state)
        this.visibleStateFormModal = false
      }
    }
  }
})

export default useTaskStateStore
