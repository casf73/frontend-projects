<template>
  <ContentBar>
    <form @submit.prevent="login">
  <div class="mb-3">
    <label for="account" class="form-label" >用户名</label>
    <input type="input" class="form-control" v-model="account" id="account" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="Password" class="form-label" >密码</label>
    <input type="password" class="form-control" id="Password" v-model="password">
  </div>
  <div class="error_message">{{ error_message }}</div>
  <button type="submit" class="btn btn-primary">登录</button>
</form>
  </ContentBar>
</template>

<script setup>
import ContentBar from '@/components/ContentBar.vue';
import {ref} from 'vue';
import { useRouter , useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { loginApi } from '@/api'

const router = useRouter();
const route = useRoute()

const account = ref('');
const password = ref('');
const error_message = ref('');
const userStore = useUserStore()
const submitting = ref(false)

async function login() {
  error_message.value = ''

  if (!account.value.trim() || !password.value) {
  error_message.value = '请输入用户名和密码'
  return
}

  if (submitting.value) return

  submitting.value = true

  try {
    const response = await loginApi({
      account: account.value.trim(),
      password: password.value
    })

    userStore.setLogin(response.data.token, response.data.user)
    router.push(route.query.redirect || '/')
  } catch (error) {
    error_message.value = error.response?.data?.message || '用户名或密码错误'
  }
  finally {
  submitting.value = false
  }
}


</script>

<style scoped>
.error_message{
  color:red;
}
</style>
