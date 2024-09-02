<template>
   <div class="flex flex-col enter-y">
      <a-card title="剪切板示例" />
      <a-card title="剪切板卡片标题示例" class="mt-4">
         <div class="w-full flex flex-row">
            <a-input v-model:value="text" placeholder="please input copt text" class="w-1/4" />
            <a-button type="primary" @click="handleCopyText">Copy</a-button>
         </div>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { copyText } from '@/utils/cuttext';
import { useMessage } from '@/hooks/useMessage';

const text = ref('');
const createMessage = useMessage();
const handleCopyText = () => {
   console.log(text.value);
   if (text.value === '') {
      createMessage('请输入粘贴文本', { type: 'warning', duration: 1000 });
      return;
   }
   copyText(text.value);
};
</script>
