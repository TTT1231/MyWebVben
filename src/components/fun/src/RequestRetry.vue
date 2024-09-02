<template>
   <div class="flex flex-col enter-y">
      <a-card title="请求错误重试" class="w-full"></a-card>
      <div class="w-2/5 mt-4">
         <a-card title="示例">
            <div class="flex flex-col h-64">
               <a-input
                  v-model:value="requestRetryCount"
                  addon-before="请求失败次数"
                  class="w-2/3 mt-4"
               />
               <a-input
                  v-model:value="requestRetryWaitting"
                  addon-before="请求等待时间"
                  class="w-2/3 mt-4"
               />
               <a-button
                  type="primary"
                  class="w-1/2 mt-4"
                  @click="handleRequestRetry"
                  :loading="loading"
                  >点击会发生请求错误，重试{{ requestRetryCount }}次</a-button
               >
               <span class="mt-4">按F12打开network即可查看，或者调试控制台</span>
            </div>
         </a-card>
      </div>
   </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { requestRetryApi } from '@/api/fun/requestretry';
const loading = ref(false);
const requestRetryCount = ref(6);
const requestRetryWaitting = ref(1000);
const handleRequestRetry = async () => {
   try {
      const data = await requestRetryApi({
         api: '/retry',
         validateMess: '请求重试示例',
         isRetry: {
            isOpen: true,
            retryCount: requestRetryCount.value,
            waittime: requestRetryWaitting.value
         }
      });
      console.log(data);
   } catch (e) {
   } finally {
   }
};
</script>
