<template>
   <div class="flex flex-col enter-y">
      <a-card title="登录过期示例" class="w-full">
         用户登录过期示例，直接调用user module中loginout方法直接
         覆盖当前页面，同时清除session与state状态，(或者也可以直接设置
         token为304过期状态,暂时未实现采用上面方法)
      </a-card>
      <a-card title="点击按钮开始测试" class="w-full mt-1">
         <el-button type="primary" plain @click="handleLoginOut">测试登录过期</el-button>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore();
const handleLoginOut = () => {
   store.dispatch('UserModule/loginOut');
};
</script>
