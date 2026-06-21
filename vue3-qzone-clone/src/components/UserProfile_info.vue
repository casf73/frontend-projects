<template>
    <div class="row">
        <div class="col-3">
            <img :src="user.head"> <!--使用pinia存储的数据，实时上传数据-->
        </div>
        <div class="col-9">
            <div class="username">{{ user.last_name }}{{ user.first_name }}</div>
            <div class="fan">粉丝数:{{ user.FollowerCount }}</div>
            <button type="button" class="btn btn-secondary" @click="sendmessage">{{ user.is_followed ? "取消关注" : "关注" }}</button>
        </div>
    </div>
</template>

<script setup>


defineProps({ //用来接受父组件传来的数据
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['follow']); //当关注按钮被触发，向父组件发出信息提示

let sendmessage = () =>{
    emit('follow');
}
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
    padding:2px,4px;
    font-size:12px;
}
</style>