export interface IUser {
  id: number
  fullName: string
  username: string
}

export interface IUserState {
  user: IUser | null
}
