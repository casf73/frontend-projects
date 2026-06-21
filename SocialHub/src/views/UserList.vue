<template>
  <ContentBar>
  <form class="input-group mb-3" @submit.prevent="getuserlist">
    <input
      v-model="keyword"
      type="text"
      class="form-control"
      placeholder="输入用户姓名"
    >

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="loading"
    >
      搜索
    </button>

    <button
      v-if="keyword"
      type="button"
      class="btn btn-outline-secondary"
      @click="clearSearch"
    >
      清空
    </button>
  </form>

  <div v-if="loading">正在搜索...</div>

  <div v-else-if="errorMessage" class="text-danger">
    {{ errorMessage }}
  </div>

  <div v-else-if="userlist.length === 0">
    没有找到符合条件的用户
  </div>

  <template v-else>
    <router-link
      v-for="user in userlist"
      :key="user.id"
      :to="{
        name: 'UserProfile',
        params: { userId: user.id }
      }"
      class="card margin cursor"
    >
      <img :src="user.head" class="avatar">
      <div>{{ user.lastName }}{{ user.firstName }}</div>
      <div>粉丝数：{{ user.followerCount }}</div>
    </router-link>
  </template>
</ContentBar>
</template>

<script setup>
import {  ref } from 'vue'
import ContentBar from '@/components/ContentBar.vue'
import { getUsersApi } from '@/api'

const userlist = ref([])
const keyword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const hasSearched = ref(false)

async function getuserlist() {
  const searchName = keyword.value.trim()

  if (!searchName) {
    errorMessage.value = '请输入要搜索的用户姓名'
    userlist.value = []
    hasSearched.value = false
    return
  }

  loading.value = true
  errorMessage.value = ''
  hasSearched.value = true

  try {
    const response = await getUsersApi(searchName)
    userlist.value = response.data
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || '搜索用户失败'
  } finally {
    loading.value = false
  }
}

function clearSearch() {
  keyword.value = ''
  userlist.value = []
  errorMessage.value = ''
  hasSearched.value = false
}

</script>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
.user-item {
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  text-align: start;
}

.username {
  font-weight: bold;
  font-size:20px;
}

.follow-count {
  color: gray;
  font-size: 14px;
  margin-top: 5px;
}

.margin{
  margin-bottom:5px;
}

.cursor{
  cursor:pointer
}


.card:hover{
  box-shadow: 2px 2px 10px grey;
  transition: box-shadow 500ms;
}
</style>
