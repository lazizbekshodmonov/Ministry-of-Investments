import { ref } from 'vue'
import type { AxiosError } from 'axios'
import type { RouteLocationRaw } from 'vue-router'

interface INotification {
  type: 'success' | 'error' | 'warning' | null
  message: string | null
}
const location = ref<RouteLocationRaw | null>(null)
const notification = ref<INotification>({
  type: null,
  message: null
})

const useCore = () => {
  function setToast(toast: INotification) {
    notification.value = toast
  }
  function handleError(error: unknown) {
    const { response, status } = error as AxiosError<{ message: string }>
    if (status !== 401) {
      notification.value.type = 'error'
      notification.value.message =
        response?.data.message || (error as Error)?.message
    }
  }
  function redirect(route: RouteLocationRaw) {
    location.value = route
  }

  return { notification, location, setToast, handleError, redirect }
}

export default useCore
