<template>
   <div class="fixed top-0 left-0 w-full h-full">
      <el-container>
         <el-aside :width="isCollapse ? '64px' : '200px'" class="h-screen">
            <LeftMenus :is-collapse="isCollapse" />
         </el-aside>
         <el-container>
            <el-header class="border-1 h-90px flex flex-col cleanmargin">
               <div class="flex flex-row justify-between">
                  <div class="w-24 h-11 flex items-center">
                     <CollapseIcon :is-collapse="isCollapse" @click="handleCollapse" />
                  </div>
                  <HearderRight />
               </div>
               <div class="w-full h-14 border-1 left-0">
                  <BreadNav />
               </div>
            </el-header>
            <el-scrollbar style="height: 660px">
               <el-main class="bg-red-200">
                  <RouterView />
               </el-main>
            </el-scrollbar>
         </el-container>
      </el-container>
   </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import LeftMenus from './menu/LeftMenus.vue';
import { computed } from 'vue';
import CollapseIcon from '@/components/sys/header/CollapseIcon.vue';
import HearderRight from '@/views/sys/header/HearderRight.vue';
import GrouCard from './sys/analysis/components/GrouCard.vue';
import BreadNav from '@/components/sys/breadnav/BreadNav.vue';
const isCollapse = ref(false);
const collapseImage = computed(() => {
   if (isCollapse.value === false) {
      return '/images/expand.png';
   } else {
      return '/images/collapse.png';
   }
});
const handleCollapse = () => {
   isCollapse.value = !isCollapse.value;
   console.log(isCollapse.value);
};
</script>
<style scoped>
.el-aside {
   overflow-x: hidden;
   overflow-y: auto;
   text-align: left;
   cursor: pointer;
   transition: width 0.2s linear;
}
.h-90px {
   height: 90px;
}
.cleanmargin {
   padding: 0;
}
</style>
