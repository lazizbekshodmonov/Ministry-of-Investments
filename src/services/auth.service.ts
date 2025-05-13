import type {
  IAuthRegisterForm,
  IAuthTokenResponse,
  TAuthLoginForm
} from '@/types/auth.ts'
import { api } from '@/utils/api.ts'
import useCore from '@/composables/useCore.ts'

const { handleError, setToast } = useCore()
export async function register(form: IAuthRegisterForm): Promise<boolean> {
  try {
    await api<IAuthTokenResponse>({
      url: 'signup',
      data: form,
      method: 'POST'
    })
    setToast({ type: 'success', message: 'Register successfully' })
    return true
  } catch (error) {
    handleError(error)
    return false
  }
}
export async function login(form: TAuthLoginForm): Promise<boolean> {
  try {
    const response = await api<IAuthTokenResponse>({
      url: 'login',
      data: form,
      method: 'POST'
    })
    console.log(response.data)
    localStorage.setItem('access_token', response.data.token)
    setToast({ type: 'success', message: 'Register successfully' })
    return true
  } catch (error) {
    handleError(error)
    return false
  }
}
