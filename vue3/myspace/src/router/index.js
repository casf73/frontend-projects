import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '@/views/UserList.vue'
import UserProfile from '@/views/UserProfile.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/UserList',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/UserProfile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/RegisterView',
    name: 'RegisterView',
    component: RegisterView
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
