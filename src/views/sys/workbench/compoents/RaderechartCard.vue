<template>
   <div>
      <a-card title="销售统计" :loading="props.loading">
         <div ref="raderMount" :style="{ width, height }"></div>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { type PropType, type Ref, ref, watch } from 'vue';
import { raderDataOptions } from './data';
import { useEchart } from '@/hooks/useEchart';
const props = defineProps({
   loading: Boolean,
   width: {
      type: String as PropType<string>,
      default: '100%'
   },
   height: {
      type: String as PropType<string>,
      default: '400px'
   }
});
const raderMount = ref<HTMLDivElement | null>(null);
const { setOptions } = useEchart(raderMount as Ref<HTMLDivElement>);
watch(
   () => props.loading,
   () => {
      if (props.loading) {
         return;
      }
      //销售统计
      setOptions(raderDataOptions);
   },
   { immediate: true }
);
</script>
