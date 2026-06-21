import axios from 'axios'
import { useUserStore } from '@/store/user'

const api = axios.create({ baseURL: '/api', timeout: 10000 })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const userStore = useUserStore()
      userStore.logout()

      if (!window.location.pathname.includes('/LoginView/')) {
        window.location.assign('/LoginView/')
      }
    }

    return Promise.reject(error)
  }
)

export const registerApi = data => api.post('/auth/register', data)
export const loginApi = data => api.post('/auth/login', data)
export const getUsersApi = () => api.get('/users')
export const getUserApi = id => api.get(`/users/${id}`)
export const getPostsApi = userId => api.get('/posts', { params: { userId } })
export const createPostApi = content => api.post('/posts', { content })
export const followApi = id => api.post(`/users/${id}/follow`)
export const unfollowApi = id => api.delete(`/users/${id}/follow`)

export default api