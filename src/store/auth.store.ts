import { defineStore } from 'pinia'
import type {
  IAuthRegisterForm,
  IAuthState,
  TAuthLoginForm
} from '../types/auth.ts'
import { login, register } from '@/services/auth.service.ts'
import useCore from '@/composables/useCore.ts'
const { redirect } = useCore()
const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    activeTab: 'login',
    loading: false,
    registerForm: {
      username: null,
      password: null,
      fullName: null
    },
    loginForm: {
      username: null,
      password: null
    }
  }),
  actions: {
    async register(form: IAuthRegisterForm) {
      this.loading = true
      const isRegister = await register(form)
      if (isRegister) {
        this.activeTab = 'login'
        this.registerForm.fullName = null
        this.registerForm.username = null
        this.registerForm.password = null
      }
      this.loading = false
    },
    async login(form: TAuthLoginForm) {
      this.loading = true
      const isAuth = await login(form)
      if (isAuth) {
        redirect({ name: 'DashboardView' })
      }
      this.loading = false
    },
    logout() {
      localStorage.clear()
      window.location.replace('/')
    }
  }
})

export default useAuthStore
