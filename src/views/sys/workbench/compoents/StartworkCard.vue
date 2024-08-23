<template>
   <div>
      <a-card :loading="props.loading">
         <img class="w-full h-full mx-auto" :src="statrtworkImgPath" />
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { statrtworkImgPath } from './data';
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
