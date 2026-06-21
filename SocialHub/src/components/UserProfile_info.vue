<template>
    <div class="row">
        <div class="col-3">
            <img :src="user.head"> <!--使用pinia存储的数据，实时上传数据-->
        </div>
        <div class="col-9">
            <div>{{ user.lastName }}{{ user.firstName }}</div>
            <div>粉丝数：{{ user.followerCount }}</div>
            <button v-if="canFollow" @click="$emit('follow')">
                {{ user.followed ? '取消关注' : '关注' }}
            </button>
        </div>
    </div>
</template>

<script setup>


defineProps({
  user: {
    type: Object,
    required: true
  },
  canFollow: {
    type: Boolean,
    default: true
  }
})

defineEmits(['follow'])

</script>

<style scoped> /* scoped是用来让css只作用于这一个文件内容*/ 
img{
    width:100%;
    height:100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
}

.username{
    font-weight: bold;
}

.fan{
    font-size:12px;
    color:grey;
}

button{
    padding:2px 4px;
    font-size:12px;
}
</style>