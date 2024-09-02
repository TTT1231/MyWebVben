<template>
   <div class="flex flex-col enter-y">
      <a-card title="ripple示例(指令式)" class="w-full" />
      <div
         class="w-52 h-52 bg-blue-400 text-white text-center flex content-center justify-center select-none"
         v-ripple
      >
         点我测试水波纹
      </div>
   </div>
</template>
<script setup lang="ts">
import RippleDirective from '@/directives/ripple';
const vRipple = RippleDirective;
</script>
