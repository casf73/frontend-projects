import { defineStore } from "pinia"

export const useUserStore = defineStore('user',{
  state:() =>({
    user:{
      id:null,
      last_name:'',
      first_name:'',
      head:'',
      FollowerCount:0,
      is_followed:false,
    }
  }),
  getters:{
    isLogin:(state) => state.user.id !==null,
    fullName:(state) => state.user.last_name + state.user.first_name
  },
  actions:{
    setUser(userInfo) {
      this.user.id = userInfo.id
      this.user.last_name = userInfo.last_name
      this.user.first_name = userInfo.first_name
      this.user.head = userInfo.head
      this.user.FollowerCount = userInfo.FollowerCount
      this.user.is_followed = userInfo.is_followed
    },
    loadUserFromLocalStorage() {
      const savedUser = localStorage.getItem('currentUser')

      if (!savedUser) {
        return
      }

      const userInfo = JSON.parse(savedUser)

      this.user.id = userInfo.id
      this.user.last_name = userInfo.last_name
      this.user.first_name = userInfo.first_name
      this.user.head = userInfo.head
      this.user.FollowerCount = userInfo.FollowerCount
      this.user.is_followed = userInfo.is_followed
    },
    saveUserToLocalStorage() {
      localStorage.setItem('currentUser', JSON.stringify(this.user))
    },
    clearUser() {
      this.user.id = null
      this.user.last_name = ''
      this.user.first_name = ''
      this.user.head = ''
      this.user.FollowerCount = 0
      this.user.is_followed = false;

      localStorage.removeItem('currentUser')
}
  }
})
