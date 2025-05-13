import { api } from '@/utils/api.ts'
import useCore from '@/composables/useCore.ts'
import type { IUser } from '@/types/user.ts'

const { handleError } = useCore()
export async function getUserMe() {
  try {
    const response = await api<IUser>({
      url: 'user-me',
      method: 'GET'
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}
