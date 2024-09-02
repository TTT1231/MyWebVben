<template>
   <div class="flex flex-col enter-y">
      <a-card title="websocket测试" class="w-full"> </a-card>
      <div class="flex flex-row mt-8">
         <a-card class="w-3/5">
            <div class="flex flex-col">
               <div class="text-2xl">
                  连接状态:
                  <span class="connect-style-default" :style="{ color: color.color }">{{
                     color.text
                  }}</span>
               </div>
               <div class="mt-2 text-2xs font-bold">
                  注:没有配置根路由mock的拦截，默认已该网址也即服务器根网址去掉后缀，后面跟测试
                  api地址即可返回服务器响应信息
               </div>
               <div class="flex mt-6">
                  <a-input v-model:value="serverPath" addon-before="服务地址" />
                  <a-button
                     type="primary"
                     :danger="!isclose"
                     @click="handleConnect"
                     :loading="loading"
                  >
                     {{ isclose === true ? '开启连接' : '关闭连接' }}
                  </a-button>
               </div>
               <div class="w-3/4 mt-6">
                  <a-input v-model:value="apiPath" addon-before="api地址" :disabled="isclose" />
               </div>
               <div class="mt-6">
                  <el-input
                     v-model="textarea"
                     :rows="2"
                     type="textarea"
                     placeholder="发送给服务器的内容"
                     :disabled="isclose"
                  />
               </div>
               <el-button
                  type="primary"
                  class="mt-6"
                  :loading="sentloading"
                  :disabled="isclose"
                  @click="handleSentData"
                  >发送</el-button
               >
            </div>
         </a-card>
         <a-card title="消息记录:" class="w-full ml-4">
            <div ref="receiveServe"></div>
         </a-card>
      </div>
   </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { WebSocketTest } from '@/api/fun/websocket';
import type { WebSocketReturnType, WebSocketServeReturnType } from '@/types/fun/websocket';
import { HttpResponseStatus } from '@/enums/httprespstatus';
import { useMessage } from '@/hooks/useMessage';
const createMessage = useMessage();
const isclose = ref(true);
const loading = ref(false);
const sentloading = ref(false);
const textarea = ref('');
const receiveServe = ref<HTMLDivElement>();
const color = computed(() => {
   if (isclose.value) {
      return {
         color: '#ee6969',
         text: 'CLOSED'
      };
   } else {
      return {
         color: '#7fed8e',
         text: 'OPENED'
      };
   }
});
const serverPath = ref('localhost:5137/main/websocket');
const apiPath = ref('');
const WebSocketTestApi = '/websocket_test';
const handleConnect = async () => {
   try {
      loading.value = true;
      //先测试服务器是否连接成功
      if (isclose.value) {
         const data = await WebSocketTest<WebSocketServeReturnType>({
            api: '',
            validateMess: '127.0.0.1:5137发送请求'
         });
         if (data.status === HttpResponseStatus.SUCCESS) {
            isclose.value = !isclose.value;
            createMessage('websocket连接成功', { type: 'success', duration: 800 });
            apiPath.value = WebSocketTestApi;
         }
      } else {
         isclose.value = !isclose.value;
         createMessage('websocket连接关闭', { type: 'error', duration: 800 });
      }
   } catch (e) {
   } finally {
      loading.value = false;
   }
};
const handleSentData = async () => {
   try {
      sentloading.value = true;
      const data = await WebSocketTest<WebSocketReturnType>({
         api: apiPath.value,
         validateMess: textarea.value
      });
      if (data.status === HttpResponseStatus.SUCCESS) {
         (receiveServe.value as HTMLDivElement).innerText = data.data.serverMess;
         createMessage('api测试成功', { type: 'success', duration: 800 });
      } else {
         (receiveServe.value as HTMLDivElement).innerText = '测试失败';
         createMessage('api测试失败', { type: 'error', duration: 800 });
      }
   } catch (e) {
   } finally {
      sentloading.value = false;
   }
};
</script>
<style scoped>
.connect-style-default {
   border: 1px;
   border-style: solid;
}
</style>
