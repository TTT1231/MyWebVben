<template>
   <div>
      <a-card title="快捷导航" :loading="props.loading">
         <template v-for="item in fastNavCardImgPath" :key="item.title">
            <a-card-grid class="w-1/3 flex flex-col justify-center content-center">
               <ElAvatar :src="item.imgpath" :size="20" />
               <span class="mt-2 truncate">{{ item.title }}</span>
            </a-card-grid>
         </template>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { fastNavCardImgPath } from './data';
const props = defineProps({
   hoverable: {
      type: Boolean,
      default: true
   },
   loading: {
      type: Boolean
   }
});
</script>
<style scoped></style>
