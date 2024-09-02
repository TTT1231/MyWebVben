<template>
   <div title="全屏模式" class="flex flex-col">
      <a-card title="全屏模式示例" class="w-full" />
      <a-card class="flex flex-row w-full mt-4">
         <el-button type="primary" @click="handleEnterFullScreen" :disabled="disabled"
            >切换全屏</el-button
         >
         <el-button type="primary" @click="handleExitFullScreen" :disabled="!disabled"
            >退出全屏</el-button
         >
         <el-button type="primary" @click="handleToggleFullScreen">状态切换</el-button>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import { computed } from 'vue';
import { ref } from 'vue';
/**全屏模式实现借助vueuse的useFullScreen方法
 * useFullscreen加上参数可传递需要全屏的dom对象
 */
const { toggle, enter, isFullscreen, exit } = useFullscreen();
const disabled = computed(() => isFullscreen.value);
const handleEnterFullScreen = () => {
   enter();
};
const handleExitFullScreen = () => {
   exit();
};
const handleToggleFullScreen = () => {
   toggle();
};
</script>
