<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <div class="navbar-brand">我的空间</div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <!--router-link是Vue Router的跳转方式，用来配合路由页面-->
          <router-link class="nav-link" :to="{name:'home'}">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'UserList'}">好友列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'UserProfile'}">用户动态</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <template v-if="userStore.isLogin"> <!--如果是登录状态就显示用户名和退出登录-->
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'UserProfile' }">
            {{ userStore.fullName }}
            </router-link>
          </li>
          <li class="nav-item">
            <button class="btn nav-link" @click="logout">退出登录</button>
          </li>
        </template>

        <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'LoginView' }">登录</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'RegisterView' }">注册</router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

function logout() {
  userStore.logout()
  router.push({ name: 'LoginView' })
}
</script>

<style scoped>

</style>