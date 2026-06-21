<template>
  <ContentBar>
    <div class="row">
        <div class="col-3">
          <UserProfile_info :user="user" @follow="handleFollow"/>
          <UserProfile_write @request="edit_text"/>
        </div>
        <div class="col-9 border-left">
          <UserProfile_posts :post="post"/> <!--其中：user='user'是用来向子组件传递信息的，
          @follow='handleFollow'是用来接受子组件发送的行为，然后执行函数-->
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

let handleFollow = () =>{ //通过子组件传递的关注信息，来更改关注数与关注状态
  if(user.is_followed){
    user.FollowerCount--
  }
  else user.FollowerCount++
  user.is_followed = !user.is_followed
  UserStore.saveUserToLocalStorage()
}

let edit_text = (content) =>{ //把子组件上传的帖子内容保存下来，并且通过props传递给posts区
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
