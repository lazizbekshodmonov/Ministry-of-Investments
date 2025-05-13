import { defineStore } from 'pinia'
import type { IStateState } from '@/types/state.ts'
import { createState, getStates } from '@/services/state.service.ts'

const useTaskStateStore = defineStore('state', {
  state: (): IStateState => ({
    states: [],
    loading: false,
    loadData: false,
    form: {
      boardId: null,
      name: null
    },
    visibleStateFormModal: false
  }),
  actions: {
    async getStates(boardId: number) {
      this.loadData = true
      this.states = await getStates(boardId)
      this.loadData = false
    },
    async createState() {
      this.loading = true
      const state = await createState(this.form)
      if (state) {
        this.states.push(state)
        this.visibleStateFormModal = false
        this.loading = false
      }
    }
  }
})

export default useTaskStateStore
