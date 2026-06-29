<template>
 <div class="show" ref="chartref">

 </div>
</template>

<script setup>
import {onMounted, ref,onUnmounted} from 'vue'
import * as echarts from 'echarts'
import { watch } from 'vue'

const props = defineProps({
    arr:{
        type:Array,
        default:()=>[]
    }
})

const chartref = ref(null)
let chartInstance = null

watch(
  () => props.arr,
  () => {
    updatecharts()
  },
  {
    deep: true
  }
)

function updatecharts(){
    const xdata = props.arr.map(item=>`第${item.id}季度`);
    const ydata = props.arr.map(item=>item.money);

    const option = {
        title:{
            text:'季度收入统计表',
            subtext:'副标题',
            textStyle:{
                color:'red',
                fontSize:24,
            },
            subtextStyle:{
                color:'red',
                fontSize:12,
            }
        },
        xAxis:{
            type:'category',
            data:xdata,
            axisLabel:{
                color:'lightblue'
            }
        },
        yAxis:{
            type:'value',
            axisLabel:{
                formatter:'{value}元'
            }
        },
        series:[
            {
                name:'money柱状图',
                type:'bar',
                data:ydata,
                label:{
                    show:true,
                    position:'top',
                },
                itemStyle:{
                    color:'orange',
                    borderRadius:8,
                    borderWidth:2,
                    barMaxWidth:2,
                    borderColor: 'black',
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    containLabel: true
                },
            },
            {
                name:'money折线图',
                type:'line',
                data:ydata,
                smooth:true,
                areaStyle:{
                    color:'lightblue',
                }
            }
        ],
        dataZoom:[{
            type:'slider'
        }],
        legend:{
            left:'right',
            top:'top',
            data: ['money柱状图', 'money折线图']
        },
        tooltip: {
            trigger: 'item'
        },
        toolbox:{
            feature:{
                saveAsImage:{},
                dataZoom:{},
                restore:{},
                magicType:{},
            }
        }
    }

    chartInstance.setOption(option)
}

onMounted(()=>{
    chartInstance = echarts.init(chartref.value)
    updatecharts()
})

onUnmounted(() => {
  chartInstance?.dispose()
})

</script>

<style scoped>
.show{
    display:flex;
    width:800px;
    height:500px;

}


</style>