<template>
  <div class="card margin">
    <div class="card-body">
        <div class="mb-3">
            <label for="edit" class="form-label" >编辑帖子：</label>
            <textarea class="form-control" id="edit" rows="3" v-model="content"></textarea>
            <button type="button" class="btn btn-secondary margin" @click="send">发送</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
const content = ref('');

const emit = defineEmits('request');

let send = () =>{
    emit('request',content.value)
    content.value = '';
}
</script>
<style scoped>
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}

.margin{
    margin-top:25px;
}

#edit{
    resize: none;
}

</style>