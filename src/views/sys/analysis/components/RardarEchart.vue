<template>
   <div>
      <a-card :loading="loading">
         <template #title><span class="font-bold-25">转化率</span></template>
         <div ref="refchart" :style="{ width, height }"></div>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { radarChartSetting } from './chartprops';
import { medProps } from './props';
import { useEchart } from '@/hooks/useEchart';
import { watch } from 'vue';
const refchart = ref<HTMLDivElement | null>(null);
const { setOptions } = useEchart(refchart as Ref<HTMLDivElement>);
const props = defineProps({
   ...medProps,
   loading: {
      type: Boolean
   }
});
watch(
   () => props.loading,
   () => {
      if (props.loading) {
         return;
      }
      //转化率
      setOptions(radarChartSetting);
   },
   { immediate: true }
);
</script>
