<template>
   <div class="flex flex-col" v-show="isShow">
      <span class="font-bold-25 animate-inleft animate-d-5">二维码登录</span>
      <div class="margintop-20 marginleft-20 animate-blockleftmed animate-d-6">
         <a-qrcode error-level="H" value="https://localhost:5173" />
         <!-- icon="http://localhost:5000/svg"服务器图片地址 -->
      </div>
      <span class="margintop-20 marginleft-20 animate-blockleftmed animate-d-10"
         >扫描后点击确认即可完成登录</span
      >
      <el-button
         type="primary"
         class="h-16 w-56 marginleft-5 animate-blockleftmed animate-d-10 margintop-20 marginleft-20"
         @click="handleBack"
         >返回</el-button
      >
   </div>
</template>
<script setup lang="ts">
import { LoginState, useLogin } from './useLogin';
import { computed } from 'vue';
const { getCurrentState, setCurrentState } = useLogin();
const isShow = computed(() => {
   if (getCurrentState.value === LoginState.LoginQrcode) {
      return true;
   } else {
      return false;
   }
});
const handleBack = () => {
   setCurrentState(LoginState.LoginDefault);
};
</script>
