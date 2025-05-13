export interface IBoard {
  id: number
  title: string
  description: string
}
export interface IBoardForm {
  title: string | null
  description: string | null
}
export interface IBoardState {
  boards: IBoard[]
  form: IBoardForm
  visibleBoardFormModal: boolean
}
