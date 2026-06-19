<template>
  <ContentBar>
    <div class="row">
        <div class="col-3">
          <UserProfile_info :user="user" @follow="handleFollow"/>
          <UserProfile_write @request="edit_text"/>
        </div>
        <div class="col-9 border-left">
          <UserProfile_posts :post="post"/>
        </div>
    </div>
  </ContentBar>
</template>

<script setup>
import ContentBar from '@/components/ContentBar.vue';
import UserProfile_info from '@/components/UserProfile_info.vue';
import UserProfile_posts from '@/components/UserProfile_posts.vue';
import UserProfile_write from '@/components/UserProfile_write.vue';
import { reactive,watch } from 'vue';

const user = reactive({
  id:1,
  Username:"Liu Yun Yan",
  FollowerCount:999999999,
  is_followed:false,
})

const savedPost = localStorage.getItem('post');

const post = reactive(
   savedPost
    ? JSON.parse(savedPost)
    : {
        count: 0,
        posts: []
      }
)

watch(
  post,
  (newPost) => {
    localStorage.setItem('post', JSON.stringify(newPost));
  },
  { deep: true }
);

let handleFollow = () =>{
  if(user.is_followed){
    user.FollowerCount--
  }
  else user.FollowerCount++
  user.is_followed = !user.is_followed
}

let edit_text = (content) =>{
  post.count++;
  post.posts.push({
    id:post.count,
    Username:user.Username,
    content:content
  })
}
</script>

<style scoped>
.border-left{
  border-left:1px solid #ccc;
}
</style>
