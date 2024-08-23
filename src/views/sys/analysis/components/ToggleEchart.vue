<template>
   <a-card
      :tab-list="tabListTitle"
      :active-tab-key="activeKey"
      @tab-change="handlechange"
      :loading="loading"
   >
      <p v-if="activeKey === 'tab1'">
         <XianEchart />
      </p>
      <p v-if="activeKey === 'tab2'">
         <ColumnarEchart />
      </p>
   </a-card>
</template>
<script setup lang="ts">
import ColumnarEchart from './ColumnarEchart.vue';
import XianEchart from './XianEchart.vue';
import { ref } from 'vue';
defineProps({
   loading: {
      type: Boolean
   }
});
const tabListTitle = [
   {
      key: 'tab1',
      tab: '流量趋势'
   },
   {
      key: 'tab2',
      tab: '访问量'
   }
];
const activeKey = ref('tab1');
const handlechange = (key: any) => {
   activeKey.value = key;
};
</script>
