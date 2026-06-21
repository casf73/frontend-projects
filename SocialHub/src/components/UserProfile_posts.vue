<template>
  <div class="card">
    <div class="card-body">
      <div class="card padding" v-for="item in posts" :key="item.id">
        <div class="card-body">
          {{ item.content }}
        </div>
      </div>

      <div v-if="posts.length === 0">暂无帖子</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>
<style scoped>
.padding{
  margin:10px;
}
</style>
