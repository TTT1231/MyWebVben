<template>
   <div>
      <a-card title="最新动态" :loading="props.loading">
         <template #extra><span class="more-action">更多</span></template>
         <div class="h-72">还没有人发布动态</div>
      </a-card>
   </div>
</template>
<script setup lang="ts">
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
<style scoped>
.h-72 {
   height: 600px;
}
</style>
