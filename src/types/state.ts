export interface IState {
  id: number
  boardId: number
  name: string
}
export interface IStateForm {
  boardId: number | null
  name: string | null
}
export interface IStateState {
  states: IState[]
  form: IStateForm
  visibleStateFormModal: boolean
}
