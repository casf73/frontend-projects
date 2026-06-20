<template>
  <ContentBar>
    <div class="card margin cursor" v-for="user in userlist" :key="user.id">
    <div class="card-body user-item">
      <img :src="user.photo" class="avatar">
      <div class="user-info">
        <div class="username">{{ user.username }}</div>
        <div class="follow-count">粉丝数：{{ user.followerCount }}</div>
      </div>
    </div>
  </div>
  </ContentBar>
</template>

<script setup>
import ContentBar from '@/components/ContentBar.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';

const userlist = ref([]);

async function getuserlist() {
  try{
    const res = await axios.get('https://app165.acapp.acwing.com.cn/myspace/userlist/');
    userlist.value = res.data;
  }
  catch(err){
    console.log("访问失败");
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
  transition:500;
}
</style>
