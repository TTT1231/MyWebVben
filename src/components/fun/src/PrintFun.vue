<template>
   <div class="flex flex-col">
      <a-card title="打印示例" class="w-full" />

      <el-collapse class="mt-4">
         <el-collapse-item title="JSON打印" name="print">
            <a-button type="primary" @click="handlePrintJSON">打印</a-button>
         </el-collapse-item>
      </el-collapse>
      <a-button type="primary" @click="handlePrintMulityImages" class="w-36 mt-4"
         >多张图片的打印</a-button
      >
   </div>
</template>
<script setup lang="ts">
import printJS from 'print-js';
import { IMAGE_HOME } from '@/enums/imagehomepath';
const someJSONdata = [
   {
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '12345678910'
   },
   {
      name: 'Barry Allen',
      email: 'barry@flash.com',
      phone: '12345678910'
   },
   {
      name: 'Cool Dude',
      email: 'cool@dude.com',
      phone: '12345678910'
   }
];
const handlePrintJSON = () => {
   printJS({
      printable: JSON.parse(JSON.stringify(someJSONdata)),
      properties: [
         { field: 'name', displayName: '姓名' },
         { field: 'email', displayName: '邮箱' },
         { field: 'phone', displayName: '手机号' }
      ],
      //style设置了任何值会覆盖原来的style
      gridHeaderStyle: ' color: red;border: 1px solid lightgray',
      // gridStyle:''
      header: '<span>我的第一次打印</span>',
      type: 'json'
   });
   // printJS({printable: someJSONdata, properties: ['name', 'email', 'phone'], type: 'json'})
};
/**要打印图片的地址,打印图片与图片像素有很大关系 */
const mulityImagesPaths = [
   `${IMAGE_HOME}eyu.png`,
   `${IMAGE_HOME}search.png`,
   `${IMAGE_HOME}sea.png`
];
// function resizeImage(path:string,targetWidth:number=800){
//     let img=new Image();
//     img.onload=()=>{
//         const canvas=document.createElement('canvas');
//         const ctx=canvas.getContext('2d');

//         let height=(img.height/img.width)*targetWidth;
//         canvas.width=targetWidth;
//         canvas.height=height;
//         ctx?.drawImage(img,0,0,targetWidth,height)
//         const dataURL=canvas.toDataURL('image/png')
//         console.log(dataURL)
//     }
//     img.src=path;
// }

const handlePrintMulityImages = () => {
   printJS({
      printable: mulityImagesPaths,
      type: 'image'
   });
};
</script>
<style scoped></style>
