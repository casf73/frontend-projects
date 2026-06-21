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
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const router = useRouter();

const account = ref('');
const password = ref('');
const error_message = ref('');

function login() {
  error_message.value = '';
  const savedUser = localStorage.getItem('users')
  if (!savedUser) {
    error_message.value = '当前还没有注册用户';
    return
  }

  const user = JSON.parse(savedUser).find(user => user.account === account.value.trim());
  if(!user){
    error_message.value = '用户名不存在';
    return;
  }
  //判断用户输入的账号密码是否正确，完成登陆验证
  if (
    account.value.trim() === user.account &&
    password.value === user.password
  ) {
    const userStore = useUserStore();
    userStore.setUser(user)
    userStore.saveUserToLocalStorage()
    //登录成功后把用户的信息上传到pinia中，方便各个页面使用
    alert('登录成功')
    router.push('/')
  } else {
    error_message.value = '用户名或密码错误'
  }
}


</script>

<style scoped>
.error_message{
  color:red;
}
</style>
