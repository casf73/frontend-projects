import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '@/views/UserList.vue'
import UserProfile from '@/views/UserProfile.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFound from '@/views/NotFound.vue'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/UserList/',
    name: 'UserList',
    meta: { requiresAuth: true },
    component: UserList
  },
  {
    path: '/UserProfile/:userId?',
    name: 'UserProfile',
    meta: { requiresAuth: true },
    component: UserProfile
  },
  {
    path: '/LoginView/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/RegisterView/',
    name: 'RegisterView',
    component: RegisterView
  },
  {
    path: '/404/',
    name: '404',
    component: NotFound
  },
  {
    path:'/:pathMatch(.*)', //重点是:pathMatch可以去匹配
    redirect:'/404/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLogin) {
    next({
      name: 'LoginView',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})


export default router
