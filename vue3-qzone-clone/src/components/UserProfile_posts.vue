<template>
  <div class="card">
    <div class="card-body">
        <div class="card padding" v-for="item in [...post.posts].reverse()" :key="item.id">
          <div class="card-body">
            <div></div>
            {{ item.content }}
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ //接受父组件传来的帖子内容
  post:{
    type:Object,
    required:true,
  }
})
</script>
<style scoped>
.padding{
  margin:10px;
}
</style>
