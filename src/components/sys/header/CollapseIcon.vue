<template>
   <div class="h-full hover-pointer-color flex items-center w-8 justify-center select-none">
      <img :src="reactiableImagePath" class="h-1/2" />
   </div>
</template>
<script setup lang="ts">
import { IMAGE_HOME } from '@/enums/imagehomepath';
import { computed } from 'vue';
const props = defineProps({
   isCollapse: {
      type: Boolean,
      required: true
   }
});
const reactiableImagePath = computed(() => {
   if (props.isCollapse === true) {
      return `${IMAGE_HOME}collapse.png`;
   } else {
      return `${IMAGE_HOME}expand.png`;
   }
});
</script>
