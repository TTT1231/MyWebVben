<template>
   <div ref="refchart" :style="{ width, height }"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import * as echarts from 'echarts';
import { columarChartSetting } from './chartprops';
const refchart = ref(null);
import { onMounted } from 'vue';
import { basicProps } from './props';
defineProps({ ...basicProps });
onMounted(() => {
   if (refchart.value) {
      //柱状图
      const columnarChart = echarts.init(refchart.value);
      columnarChart.setOption(columarChartSetting);
   }
});
</script>
