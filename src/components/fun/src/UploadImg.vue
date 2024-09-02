<template>
   <div class="flex flex-row enter-y">
      <div class="border h-125">
         <a-upload action="/upload/success" @change="handleChange" listType="picture">
            <div
               class="h-96 upload-container flex flex-col justify-center items-center select-none"
               :style="{ width: `${w_96}px` }"
            >
               <img :src="bgURL" />
               <span>点击上传按钮进行上传</span>
               <span>----或拖拉文件进行上传------</span>
            </div>
         </a-upload>
      </div>
      <div class="flex flex-col border ml-8" :style="{ width: `${w_96}px` }">
         <span class="font-bold">图片预览(.png .jpg .jpeg .svg格式，不处理img base64格式)</span>
         <a-image v-if="imageUrl" :src="imageUrl" alt="avatar" />
      </div>
   </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { sleep } from '@/utils/sleep';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { IMAGE_HOME } from '@/enums/imagehomepath';
import { UploadResponseStatus } from '@/enums/upload';
import { useMessage } from '@/hooks/useMessage';
import { getBase64, isImage } from '@/utils/files/upload';
const bgURL = `${IMAGE_HOME}upload.png`;
const w_96 = ref(384);
const createMessage = useMessage();
const handleChange = (info: UploadChangeParam, fileList: any) => {
   if (info.file.status === UploadResponseStatus.UPLOADING) {
      return;
   }
   if (info.file.status === UploadResponseStatus.SUCCESS) {
      //是图片类型
      if (isImage(info.file.type)) {
         getBase64(info.file.originFileObj as Blob, (base64Url: string) => {
            imageUrl.value = base64Url;
         });
      }
      // console.log(info)
      createMessage('上传成功', { type: 'success', duration: 1000 });
   }
   if (info.file.status === UploadResponseStatus.FAIL) {
      createMessage('上传失败', { type: 'error', duration: 1000 });
   }
};
//当不需要将文件进行上传的时候，可调用该函数返回false阻止上传
const handleBeforeUpload: UploadProps['beforeUpload'] = (file, fileList) => {
   const isImge = isImage(file.type);
   if (!isImge) {
      createMessage('文件类型错误', { type: 'error', duration: 1000 });
      return false;
   }
   // 创建一个FileReader来读取文件
   const reader = new FileReader();
   reader.onload = (e) => {
      // 当文件读取完成后，将结果赋值给imageUrl
      imageUrl.value = e.target?.result as string;
   };
   // 读取文件
   reader.readAsDataURL(file);
   return true;
};
const imageUrl = ref<string>('');
</script>
<style scoped>
.h-125 {
   height: 595px;
}
.upload-container:hover {
   border-width: 2px;
   border-style: dotted;
   border-color: #42acef;
}
.upload-container {
   border-width: 1px;
}
</style>
