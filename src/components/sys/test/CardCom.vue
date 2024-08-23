<template>
   <a-card>
      <template #title
         ><div class="font-bold qwe enter-y">{{ title }}</div></template
      >
      <template #extra><slot></slot></template>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
   </a-card>
</template>
<script setup lang="ts">
defineProps({
   title: {
      type: String,
      required: false
   }
});
</script>
<style scoped>
.qwe {
   font-size: 20px;
}
</style>
