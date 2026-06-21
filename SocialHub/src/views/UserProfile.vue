<template>
  <ContentBar>
  <div v-if="loading">正在加载...</div>
  <div v-else-if="errorMessage" class="text-danger">
    {{ errorMessage }}
  </div>

  <template v-else>
    <UserProfile_info
      :user="user"
      :can-follow="!isOwnProfile"
      @follow="handleFollow"
    />
    <UserProfile_write v-if="isOwnProfile" @request="edit_text"/>
    <UserProfile_posts :posts="posts"/>
  </template>
</ContentBar>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getUserApi, getPostsApi, createPostApi, followApi, unfollowApi } from '@/api'
import { useUserStore } from '@/store/user'
import ContentBar from '@/components/ContentBar.vue'
import UserProfile_info from '@/components/UserProfile_info.vue'
import UserProfile_write from '@/components/UserProfile_write.vue'
import UserProfile_posts from '@/components/UserProfile_posts.vue'

const route = useRoute()
const userStore = useUserStore()
const user = ref({})
const posts = ref([])
const loading = ref(false)
const errorMessage = ref('')

const targetId = computed(() => route.params.userId || userStore.user.id)
const isOwnProfile = computed(
  () => Number(targetId.value) === Number(userStore.user.id)
)

async function loadProfile() {
  loading.value = true
  errorMessage.value = ''

  try {
    const [userResponse, postResponse] = await Promise.all([
      getUserApi(targetId.value),
      getPostsApi(targetId.value)
    ])

    user.value = userResponse.data
    posts.value = postResponse.data
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || '个人主页加载失败'
  } finally {
    loading.value = false
  }
}

async function edit_text(content) {
  try {
    const response = await createPostApi(content)
    posts.value.unshift(response.data)
  } catch (error) {
    alert(error.response?.data?.message || '帖子发布失败')
  }
}

async function handleFollow() {
  try {
    if (user.value.followed) {
      await unfollowApi(user.value.id)
    } else {
      await followApi(user.value.id)
    }

    await loadProfile()
  } catch (error) {
    alert(error.response?.data?.message || '关注操作失败')
  }
}

watch(targetId, loadProfile, { immediate: true })
</script>

<style scoped>
.border-left{
  border-left:1px solid #ccc;
}
</style>
