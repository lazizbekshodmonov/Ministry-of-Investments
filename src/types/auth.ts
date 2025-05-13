export interface IAuthRegisterForm {
  username: string | null
  password: string | null
  fullName: string | null
}
export type TAuthLoginForm = Omit<IAuthRegisterForm, 'fullName'>
export interface IAuthState {
  activeTab: 'login' | 'register'
  loading: boolean
  registerForm: IAuthRegisterForm
  loginForm: TAuthLoginForm
}

export interface IAuthTokenResponse {
  token: string
}
