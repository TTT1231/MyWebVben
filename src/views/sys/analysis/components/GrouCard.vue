<template>
   <div class="flex">
      <template v-for="(item, index) in growCardList" :key="item.title">
         <a-card
            :loading="loading"
            size="small"
            class="w-1/4 pr-4"
            :hoverable="hoverable"
            :class="{ 'mr-4': index + 1 < 4 }"
         >
            <template #title
               ><div class="font-bold">{{ item.title }}</div></template
            >
            <template #extra
               ><a-tag :color="item.color">{{ item.time }}</a-tag></template
            >

            <div class="flex justify-between items-center py-4 px-4">
               <span v-countdown="true" class="text-lg font-bold">{{ item.value }}</span>
               <img :src="item.icon" />
            </div>

            <div class="flex justify-between items-center py-4 px-4">
               <span>总{{ item.title }}</span>
               <span v-countdown="true">{{ item.total }}</span>
            </div>
         </a-card>
      </template>
   </div>
</template>
<script setup lang="ts">
import { growCardList } from './data';
const props = defineProps({
   loading: {
      type: Boolean
   },
   hoverable: {
      type: Boolean
   }
});
</script>
