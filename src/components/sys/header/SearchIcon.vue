<template>
   <div
      class="h-full hover-pointer-color flex items-center w-8 justify-center"
      @click="handleSearch"
   >
      <a-tooltip placement="bottom">
         <template #title>
            <span>搜索</span>
         </template>
         <img :src="reactiableImagePath" class="h-1/2" />
      </a-tooltip>
   </div>
</template>
<script setup lang="ts">
import { IMAGE_HOME } from '@/enums/imagehomepath';
import { useMessage } from '@/hooks/useMessage';
const reactiableImagePath = `${IMAGE_HOME}search.png`;
const createMessage = useMessage();
const handleSearch = () => {
   createMessage('暂未实现', { type: 'error', duration: 800 });
};
</script>
