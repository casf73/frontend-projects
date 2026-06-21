<template>
  <ContentBar>
    <router-link v-for="user in userlist" :key="user.id" :to="{ name: 'UserProfile', params: { userId: user.id } }" class="card margin cursor">
      <img :src="user.head" class="avatar">
      <div>{{ user.lastName }}{{ user.firstName }}</div>
      <div>粉丝数：{{ user.followerCount }}</div>
    </router-link>
  </ContentBar>
</template>

<script setup>
import ContentBar from '@/components/ContentBar.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { getUsersApi } from '@/api'

const userlist = ref([]);


async function getuserlist() {
  try {
    const response = await getUsersApi()
    userlist.value = response.data
  } catch (error) {
    console.error('获取用户列表失败', error)
  }
}

onMounted(() =>{
  getuserlist();
})
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
