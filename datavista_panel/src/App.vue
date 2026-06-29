<template>
  <div class="main">
    <div class="left-area">
      <h2 >每个季度赚了how much：</h2>
      <svg-list-panel @type="submit"></svg-list-panel>
    </div>
    <div class="right-area">
      <chart-panel :arr="arr"></chart-panel>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import SvgListPanel from './components/SvgListPanel.vue';
import ChartPanel from './components/ChartPanel.vue';

const arr = ref([]);

function submit(content){
  arr.value = content.map((item) =>({
    id:item.id,
    money:item.money,
  }))
}

</script>

<style scoped>
.main{
  display:grid;
  grid-template-columns: 420px 1fr;
  gap:24px;
  min-height:100vh;
  padding:24px;
}

.left-area{
  background-color: lightblue;
  border-radius: 16px;
  padding:10px;
}

.right-area{
  background-color: grey;
  border-radius: 16px;
  padding:10px;
}
</style>