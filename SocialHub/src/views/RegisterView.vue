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
import { registerApi } from '@/api'

const router = useRouter();

const account = ref('');
const password = ref('');
const first_name = ref('');
const last_name = ref('');
const head=ref('');


function handleHeadUpload(event) { //此方法主要是实现了头像的保存，把图片文件保存为字符串base64
  head.value = ''
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    event.target.value = ''
    alert('请选择图片文件')
    return
  }

  const reader = new FileReader()

  if(file.size > 2 * 1024 * 1024){
    alert('头像不能超过 2MB')
    event.target.value = ''
    return
  }

  reader.onload = () => { //因为图片的读取，包括各种数据的传输都是需要时间的，要采用异步方法，需要先等到load完毕
    head.value = reader.result
  }

  reader.onerror = () => {
    alert('图片读取失败')
  }

  reader.readAsDataURL(file)
}

async function register() {
  if (!account.value.trim() || !password.value ||
      !first_name.value.trim() || !last_name.value.trim()) {
    alert('请填写完整注册信息')
    return
  }

  if (!head.value) {
    alert('请选择头像')
    return
  }

  try {
    await registerApi({
      account: account.value.trim(),
      password: password.value,
      firstName: first_name.value.trim(),
      lastName: last_name.value.trim(),
      head: head.value
    })

    alert('注册成功')
    router.push('/LoginView/')
  } catch (error) {
    alert(error.response?.data?.message || '注册失败')
  }
}

</script>

<style scoped>
</style>
