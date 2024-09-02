<template>
   <div
      class="h-full hover-pointer-color flex items-center w-8 justify-center"
      @click="handleFullScreen"
   >
      <a-tooltip placement="bottom">
         <template #title>
            <span>全屏</span>
         </template>
         <img :src="reactiableImagePath" class="h-1/2" />
      </a-tooltip>
   </div>
</template>
<script setup lang="ts">
import { IMAGE_HOME } from '@/enums/imagehomepath';
import { useFullscreen } from '@vueuse/core';
const reactiableImagePath = `${IMAGE_HOME}fullscreen.png`;
const { toggle } = useFullscreen();
const handleFullScreen = () => {
   toggle();
};
</script>
