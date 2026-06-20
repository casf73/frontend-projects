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
import { useUserStore } from '@/store/user';

const UserStore = useUserStore();
UserStore.loadUserFromLocalStorage()

const user = UserStore.user


const SavedPost = localStorage.getItem('post');

const post = reactive(
   SavedPost
    ? JSON.parse(SavedPost)
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
  UserStore.saveUserToLocalStorage()
}

let edit_text = (content) =>{
  post.count++;
  post.posts.push({
    id:post.count,
    Username: user.last_name + user.first_name,
    content:content
  })
}
</script>

<style scoped>
.border-left{
  border-left:1px solid #ccc;
}
</style>
