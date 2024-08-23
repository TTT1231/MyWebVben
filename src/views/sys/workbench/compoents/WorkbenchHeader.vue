<template>
   <div class="flex h-16 items-center">
      <el-avatar :src="imgepath" :shape="circle" :size="70" :fit="fit" />
      <div class="flex flex-col">
         <h1 class="tipTitleWorkbench">早安，{{ user_realname }},开始你的工作一天吧！</h1>
         <span>今日晴，温度28-32℃</span>
      </div>
      <div class="flex flex-1 justify-end">
         <div class="flex flex-col justify-center mr-24">
            <span class="text-secondary"> 待办 </span>
            <span class="text-2xl">2/10</span>
         </div>
         <div class="flex flex-col mr-14 text-right">
            <span>项目</span>
            <span class="text-2xl">8</span>
         </div>
         <div class="flex flex-col">
            <span>团队</span>
            <span class="text-2xl">10</span>
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
import { IMAGE_HOME } from '@/enums/imagehomepath';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const user_realname = ref(store.getters['UserModule/getUserInfo']?.user_realname);
const imgepath = `${IMAGE_HOME}eyu.png`;
const circle = 'circle';
const fit = ref('fill');
</script>
<style scoped>
.tipTitleWorkbench {
   font-size: 20px;
   font-weight: 600;
}
text-20 {
   font-size: 40px;
   font-weight: bold;
}
</style>
