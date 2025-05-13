import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/pages/auth/AuthView.vue'
import DashboardView from '@/pages/dashboard/DashboardView.vue'
import AppView from '@/pages/index.vue'
import BoardsView from '@/pages/dashboard/board/BoardsView.vue'
import TasksView from '@/pages/dashboard/board/task/TasksView.vue'
import BoardIndex from '@/pages/dashboard/board/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AppView',
      component: AppView,
      redirect: 'dashboard',
      children: [
        {
          path: 'auth',
          name: 'AuthView',
          component: AuthView
        },
        {
          path: 'dashboard',
          name: 'DashboardView',
          component: DashboardView,
          redirect: { name: 'BoardIndex' },
          children: [
            {
              path: 'board',
              name: 'BoardIndex',
              component: BoardIndex,
              redirect: { name: 'BoardsView' },
              children: [
                {
                  path: '',
                  name: 'BoardsView',
                  component: BoardsView
                },
                {
                  path: 'task/:boardId',
                  name: 'TasksView',
                  component: TasksView
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    if (to.path.includes('dashboard')) {
      return next()
    } else if (to.name === 'ServerError') {
      return next()
    } else {
      return next({ name: 'DashboardView' })
    }
  } else {
    if (!to.path.includes('dashboard')) {
      return next()
    } else {
      return next({ name: 'AuthView' })
    }
  }
})

export default router
