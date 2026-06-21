<template>
  <ContentBar>
    <form @submit.prevent="register">
  <div class="mb-3">
    <label for="account" class="form-label" >用户名</label>
    <input type="input" class="form-control" v-model="account" id="account" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="Password" class="form-label" >密码</label>
    <input type="password" class="form-control" id="Password" v-model="password">
  </div>
  <div class="mb-3">
    <label for="head" class="form-label" >头像</label>
    <input type="file" class="form-control" id="head" accept="image/*" @change="handleHeadUpload">
  </div>
  <div class="mb-3">
    <label for="last_name" class="form-label" >姓</label>
    <input type="text" class="form-control" id="last_name" v-model="last_name">
  </div>
  <div class="mb-3">
    <label for="first_name" class="form-label" >名</label>
    <input type="text" class="form-control" id="first_name" v-model="first_name">
  </div>
  <button type="submit" class="btn btn-primary">注册</button>
</form>
  </ContentBar>
</template>

<script setup>
import ContentBar from '@/components/ContentBar.vue';
import {ref} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const account = ref('');
const password = ref('');
const first_name = ref('');
const last_name = ref('');
const head=ref('');


function handleHeadUpload(event) { //此方法主要是实现了头像的保存，把图片文件保存为字符串base64
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件')
    return
  }

  const reader = new FileReader()

  reader.onload = () => { //因为图片的读取，包括各种数据的传输都是需要时间的，要采用异步方法，需要先等到load完毕
    head.value = reader.result
  }

  reader.onerror = () => {
    alert('图片读取失败')
  }

  reader.readAsDataURL(file)
}

function register() { //主要就是注册完把数据保存到LocalStorage，重点就是LocalStorage要存JSON字符串类型，所以上传前要先用stringify（）转化，如果取出来用要使用parse（）转化为对象
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const exists = users.find(user => user.account === account.value.trim())

  const newuser = {
    id:Date.now(),
    account:account.value.trim(),
    password:password.value,
    first_name:first_name.value.trim(),
    last_name:last_name.value.trim(),
    head:head.value,
    FollowerCount:0,
    is_followed:false,
  }

  if (exists) {
    alert('用户名已存在')
    account.value='';
    password.value='';
    return
  }
  else{
    users.push(newuser);
    localStorage.setItem('users',JSON.stringify(users));
    alert('注册成功');
    router.push('/LoginView/')
  }
}

</script>

<style scoped>
</style>
