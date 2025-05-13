import { defineStore } from 'pinia'
import type { IUserState } from '@/types/user.ts'
import { getUserMe } from '@/services/user.service.ts'

const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    user: null
  }),
  actions: {
    async getUserMe() {
      const user = await getUserMe()
      if (user) {
        this.user = user
      }
    }
  }
})

export default useUserStore
