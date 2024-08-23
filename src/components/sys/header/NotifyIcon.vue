<template>
   <div class="h-full hover-pointer-color flex items-center w-8 justify-center">
      <img :src="reactiableImagePath" class="h-1/2" />
   </div>
</template>
<script setup lang="ts">
import { IMAGE_HOME } from '@/enums/imagehomepath';
const reactiableImagePath = `${IMAGE_HOME}notify.png`;
</script>
