<template>
   <div>
      <GrouCard :loading="loading" :hoverable="true" class="enter-y" />
      <ToggleEchart :loading="loading" class="my-4 enter-y" />
      <div class="flex enter-y">
         <RardarEchart class="w-1/3 pr-4 pb-4 enter-y" :loading="loading" />
         <PieoneEchart class="w-1/3 pr-4 pb-4 enter-y" :loading="loading" />
         <PietwoEchart class="w-1/3 enter-y" :loading="loading" />
      </div>
   </div>
</template>
<script setup lang="ts">
import GrouCard from './components/GrouCard.vue';
import ToggleEchart from './components/ToggleEchart.vue';
import RardarEchart from './components/RardarEchart.vue';
import PieoneEchart from './components/PieoneEchart.vue';
import PietwoEchart from './components/PietwoEchart.vue';
import { ref } from 'vue';
const loading = ref(true);
setTimeout(() => {
   loading.value = false;
}, 800);
</script>
<style scoped></style>
