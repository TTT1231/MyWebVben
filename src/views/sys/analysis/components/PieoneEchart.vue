<template>
   <div>
      <a-card :loading="loading">
         <template #title><span class="font-bold-25">成交占比</span></template>
         <div ref="refchart" :style="{ width, height }"></div>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useEchart } from '@/hooks/useEchart';
import { pieoneChartSetting } from './chartprops';
const refchart = ref<HTMLDivElement | null>(null);
import { medProps } from './props';
import { watch } from 'vue';
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
      setOptions(pieoneChartSetting);
   },
   { immediate: true }
);
</script>
