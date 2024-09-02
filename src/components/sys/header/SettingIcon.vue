<template>
   <div
      class="h-full hover-pointer-color flex items-center w-8 justify-center select-none"
      @click="handleShowDrawer"
   >
      <a-tooltip placement="bottom">
         <template #title>
            <span>设置</span>
         </template>
         <img :src="reactiableImagePath" class="h-1/2" />
      </a-tooltip>
      <a-drawer v-model:open="open" title="设置抽屉" placement="right">
         <p>内容填充</p>
         <p>内容填充</p>
         <p>内容填充</p>
      </a-drawer>
   </div>
</template>
<script setup lang="ts">
import { IMAGE_HOME } from '@/enums/imagehomepath';
import { ref } from 'vue';
const reactiableImagePath = `${IMAGE_HOME}setting.png`;
const open = ref<boolean>(false);
const handleShowDrawer = () => {
   open.value = true;
   console.log('wqtest');
};
</script>
