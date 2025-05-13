export type TTaskPriority = 'low' | 'normal' | 'high' | 'critical'

export interface ITask {
  id: number
  title: string
  description: string
  stateId: number
  priority: TTaskPriority
}
export interface ITaskForm {
  title: string | null
  description: string | null
  priority: TTaskPriority | null
}
export interface ITaskState {
  tasks: ITask[]
  loading: boolean
  loadData: boolean
  form: ITaskForm
  visibleTaskFormModal: boolean
}
