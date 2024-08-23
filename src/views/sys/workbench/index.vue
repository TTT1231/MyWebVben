<template>
   <WorkbenchHeader />
   <div class="flex flex-row mt-8 w-full">
      <div class="flex flex-col w-percent-7 enter-y">
         <ProjectCard :loading="loading" class="enter-y" />
         <NewAction :loading="loading" class="my-4 enter-y" />
      </div>
      <div class="flex flex-col w-percent-3 ml-4 enter-y">
         <FastnavCard :loading="loading" class="enter-y" />
         <StartworkCard :loading="loading" class="mt-4 enter-y" />
         <RaderechartCard :loading="loading" class="mt-4 enter-y" />
      </div>
   </div>
</template>
<script setup lang="ts">
import WorkbenchHeader from './compoents/WorkbenchHeader.vue';
import ProjectCard from './compoents/ProjectCard.vue';
import FastnavCard from './compoents/FastnavCard.vue';
import NewAction from './compoents/NewAction.vue';
import StartworkCard from './compoents/StartworkCard.vue';
import RaderechartCard from './compoents/RaderechartCard.vue';
import { ref } from 'vue';
const loading = ref(true);
setTimeout(() => {
   loading.value = false;
}, 800);
</script>
<style scoped>
.w-percent-7 {
   width: 70%;
}
.w-percent-3 {
   width: 30%;
}
</style>
