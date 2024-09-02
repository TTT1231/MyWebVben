<template>
   <div class="flex flex-col">
      <a-card title="截图示例" class="w-full">
         <div class="flex flex-row">
            <el-button type="primary" @click="handleShotScreen">截取当前body</el-button>
            <el-button type="primary" @click="handleDeleteScreen" :disabled="!onlyonce"
               >删除图片</el-button
            >
            <el-button type="primary" @click="handlePrintImg" :disabled="!onlyonce"
               >打印图片</el-button
            >
            <el-button type="primary" @click="handleDownImg" :disabled="!onlyonce"
               >下载图片</el-button
            >
         </div>
      </a-card>
      <a-card title="截图内容" class="w-full mt-4">
         <div ref="divRef" class="flex flex-col w-full screenshot-mt-4">
            <!-- 这里截图只截取一张，配合cropper来编辑该图片 -->
            <img v-if="onlyonce" :src="screenshot" />
         </div>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import print from 'print-js';
import html2canvas from 'html2canvas';
//截图这里通过将html中元素转化成canvas画布中图片
//这里我们用前端流行js库html2cavas解决
const onlyonce = ref(false);
const screenshot = ref<string | undefined>(undefined);
const divRef = ref<HTMLDivElement | null>(null);
const handleShotScreen = async () => {
   //截取多张图片
   // const img = document.createElement('img');
   // const canvas=await html2canvas(document.body);
   // img.src=canvas.toDataURL('image/png') as string
   // divRef.value?.appendChild(img);

   //截取一张图片
   const canvas = await html2canvas(document.body, { scale: 2 });
   screenshot.value = canvas.toDataURL('image/png', 1);
   onlyonce.value = true;
   console.log(screenshot.value);
};
const handleDeleteScreen = () => {
   //没有图片
   if (!onlyonce.value) {
   } else {
      //有图片
      // divRef.value?.remove();
      onlyonce.value = false;
      screenshot.value = undefined;
   }
};
const handlePrintImg = () => {
   if (onlyonce.value) {
      print({
         printable: screenshot.value as string,
         type: 'image'
      });
   }
};
const handleDownImg = () => {
   if (onlyonce.value) {
      const parts = screenshot.value?.split(';');
      //获取screenshot中类型,这里时image/png格式
      const mime = (parts as string[])[0].split(',')[1];
      const base64Str = (parts as string[])[1].split(',')[1];
      //将base64字符串转化ascill
      const ascill = atob(base64Str);
      //下面将其转换原始二进制数据byte字节数据
      let n = ascill.length;
      const uint8 = new Uint8Array(n);
      while (n--) {
         uint8[n] = ascill.charCodeAt(n);
      }
      let blob: Blob | null = new Blob([uint8], { type: mime });
      //创建一个临时的url指向Blob对象
      const url = URL.createObjectURL(blob);
      //创建下载链接,借助html5的a标签的download属性实现
      let a: HTMLAnchorElement | null = document.createElement('a');
      a.href = url;
      a.download = 'newShotScreen.png';
      a.click();
      //回收
      URL.revokeObjectURL(url);
      a = null;
      blob = null;
   }
};
</script>
<style scoped>
.screenshot-mt-4 > :not(:first-child) {
   margin-top: 16px;
}
</style>
