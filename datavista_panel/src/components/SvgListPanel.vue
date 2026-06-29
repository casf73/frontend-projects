<template>
  <svg width="400" height="80" viewBox="0 0 400 80" v-for="item in arr" :key="item.id" >
  <rect
    x="10"
    y="5"
    width="380"
    height="70"
    rx="20"
    ry="20"
    fill="orange"
  />
  <text x="40" y="50" fill="black" font-size="20">{{ `第${item.id}季度 ${item.money}元` }}</text>
</svg>

<form class="quarter-form" @submit.prevent="handle">
      <h3>新增季度数据</h3>

      <label class="field">
        <span>输入 id</span>
        <input v-model="id" type="text" inputmode="numeric" placeholder="例如 1" />
      </label>

      <label class="field">
        <span>输入 money</span>
        <input v-model="money" type="text" inputmode="numeric" placeholder="请输入金额" />
      </label>

      <button type="submit" class="submit-btn">
        添加 / 更新
      </button>
</form>
</template>

<script setup>
import{ref,reactive} from 'vue'

const id = ref();
const money = ref();
const arr = reactive([])
const emit = defineEmits(['type'])


function handle(){
  const newid = Number(id.value);
  const index = arr.findIndex(item=>item.id === newid)
  if(id.value <= 0){
    alert('不能为0')
  }
  else if(index !== -1){
    arr[index].money = Number(money.value);
    emit('type',arr);
  }
  else{
    const newseason={
      id:Number(id.value),
      money:Number(money.value)
    }
    arr.push(newseason);
    arr.sort((a, b) => a.id - b.id)
    emit('type',arr);
  }
  id.value = null;
  money.value = null;
}



</script>

<style scoped>
.quarter-form {
  margin-top: auto;
  padding: 16px;
  border-radius: 16px;
  background: #0f172a;
  color: white;
}

.quarter-form h3 {
  margin: 0 0 14px;
  font-size: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.field input {
  height: 38px;
  padding: 0 12px;
  border: 1px solid #475569;
  border-radius: 10px;
  background: #1e293b;
  color: white;
  outline: none;
}


.submit-btn {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #38bdf8;
  color: #0f172a;
  font-weight: 700;
  cursor: pointer;
}

</style>