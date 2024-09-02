<template>
   <div class="flex flex-col">
      <a-card title="文件下载示例" class="w-full" />
      <div class="w-full flex flex-row border mt-4 bg-slate-50 h-12 items-center">
         <el-button type="primary" @click="handleFileStreamDownload">文件流下载</el-button>
         <el-button type="primary" @click="handleFilePathToDownload">根据文件地址下载</el-button>
         <el-button type="primary" @click="handleFileDownloadBase64">base64文件流下载</el-button>
      </div>
   </div>
</template>
<script setup lang="ts">
import { Mime } from '@/enums/download';
import { IMAGE_HOME } from '@/enums/imagehomepath';
import { downLoadByData, urlToBase64, base64ToBlob } from '@/utils/files/download';
import { useMessage } from '@/hooks/useMessage';

const createMessage = useMessage();
const handleFileStreamDownload = () => {
   //使用mime约束
   downLoadByData('你好啊\n换行显示', 'hello', Mime.TXT);
   //使用默认,不带后缀会以文件流处理
   // downLoadByData('你好啊\n换行显示','hello');
};
/**根据文件地址下载
 * 1、假设在后端中直接调用api返回一张图片，假设这个api地址为127.0.0.1:6000/image
 * 这种方式除非访问这个地址就能自动下载该图片，否则就会预览该图片(第一种情况下注释部分)，这种情况下只能将
 * 该图片转化为blob对象，将其转化为base64编码数据后处理
 * 2、假设后端返回图片的base64图片编码，处理方式如handleFileDownloadBase64
 */
const handleFilePathToDownload = () => {
   //第一种
   handleFilePathToDownload_1();
   //第二种
   // FileReader
};
const imageUrl = 'http://localhost:5000/konglong.png';
const handleFilePathToDownload_1 = async () => {
   const a = document.createElement('a');
   // // a.href='127.0.0.1:6000/image';
   // //在新窗口或选项卡中打开
   // // a.target='_blank';
   // a.style.display='none';
   // a.setAttribute('download','konglong.png')
   // document.body.appendChild(a);
   // a.click();
   // document.body.removeChild(a);
   try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      a.href = blobUrl;
      a.download = '';
      a.click();
      URL.revokeObjectURL(blobUrl);
   } catch (e: any) {
      createMessage('服务器请求失败', { type: 'error', duration: 1000 });
   }
};
const handleFilePathToDownload_2 = () => {};
const handleFileDownloadBase64 = async () => {
   const base64url = await urlToBase64(`${IMAGE_HOME}sea.png`);
   let blob: Nullable<Blob> = base64ToBlob(base64url);

   const url = URL.createObjectURL(blob);
   let a: HTMLAnchorElement | null = document.createElement('a');
   a.href = url;
   a.download = 'eyu.png';
   a.click();
   URL.revokeObjectURL(url);
   a = null;
   blob = null;
};
</script>
