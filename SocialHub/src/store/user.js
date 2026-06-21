import { defineStore } from "pinia"

const emptyUser = () => ({
  id: null,
  account: '',
  firstName: '',
  lastName: '',
  head: '',
  followerCount: 0
})

function loadCachedUser() {
  try {
    const value = localStorage.getItem('currentUser')

    if (!value) {
      localStorage.removeItem('token')
      return emptyUser()
    }

    return {
      ...emptyUser(),
      ...JSON.parse(value)
    }
  } catch {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    return emptyUser()
  }
}

export const useUserStore = defineStore('user',{
  state:() =>({ //用来存token，通过登录验证，以及用户信息
    token: localStorage.getItem('token') || '',
    user: loadCachedUser()
  }),
  getters:{ //用来内置一些计算，方便使用
    isLogin: state => Boolean(state.token && state.user.id !== null),
    fullName: state => state.user.lastName + state.user.firstName
  },
  actions:{ //用来暴露在外的接口，可以通过实例来使用
    setLogin(token, user) {
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
      const cachedUser = {
  id: user.id,
  account: user.account,
  firstName: user.firstName,
  lastName: user.lastName,
  followerCount: user.followerCount
}

localStorage.setItem('currentUser', JSON.stringify(cachedUser))
    },

    logout() {
      this.token = ''
      this.user = emptyUser()
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
    }
  }
})
