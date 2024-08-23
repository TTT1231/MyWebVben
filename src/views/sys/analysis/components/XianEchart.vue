<template>
   <div ref="refchart" :style="{ width, height }"></div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useEchart } from '@/hooks/useEchart';
import { xianChartSetting } from './chartprops';
const refchart = ref<HTMLDivElement | null>(null);
import { onMounted } from 'vue';
import { basicProps } from './props';
defineProps({ ...basicProps });
const { setOptions } = useEchart(refchart as Ref<HTMLDivElement>);
onMounted(() => {
   setOptions(xianChartSetting);
});
</script>
