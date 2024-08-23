<template>
   <div>
      <a-card :loading="loading">
         <template #title><span class="font-bold-25">访问来源</span></template>
         <div ref="refchart" :style="{ width, height }"></div>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { ref, type Ref, watch } from 'vue';
import { pietwoChartSetting } from './chartprops';
const refchart = ref<HTMLDivElement | null>(null);
import { medProps } from './props';
import { useEchart } from '@/hooks/useEchart';
const props = defineProps({
   ...medProps,
   loading: {
      type: Boolean
   }
});
const { setOptions } = useEchart(refchart as Ref<HTMLDivElement>);
watch(
   () => props.loading,
   () => {
      if (props.loading) return;
      setOptions(pietwoChartSetting);
   },
   { immediate: true }
);
</script>
