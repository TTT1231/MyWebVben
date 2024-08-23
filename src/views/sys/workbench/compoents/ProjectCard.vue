<template>
   <div>
      <a-card title="项目" :hoverable="props.hoverable" :loading="props.loading">
         <template #extra><span class="more-action">更多</span></template>
         <a-card-grid class="text-center w-1/3">
            <span class="flex">
               <el-avatar :src="htmlImagePath" :size="30" />
               <span class="text-lg ml-3">HTML</span>
            </span>
            <div class="flex mt-2 h-10">HTML是前端基础语言，也是前端底层核心</div>
         </a-card-grid>

         <a-card-grid class="text-center w-1/3">
            <span class="flex">
               <el-avatar :src="jsImagePath" :size="30" />
               <span class="text-lg ml-3">JavaScript</span>
            </span>
            <div class="flex mt-2 h-10">JavaScript是一种高级的、解释执行的编程语言</div>
         </a-card-grid>

         <a-card-grid class="text-center w-1/3">
            <span class="flex">
               <el-avatar :src="vueImagePath" :size="30" />
               <span class="text-lg ml-3">Vue</span>
            </span>
            <div class="flex mt-2 h-10">Vue前端三大框架之一，旨在快速搭建前端项目</div>
         </a-card-grid>

         <a-card-grid class="text-center w-1/3">
            <span class="flex">
               <el-avatar :src="tailImagePath" :size="30" />
               <span class="text-lg ml-3">TailWindcss</span>
            </span>
            <div class="flex mt-2 h-10">TailWindcss是一款css框架，旨在快速搭建html</div>
         </a-card-grid>

         <a-card-grid class="text-center w-1/3">
            <span class="flex">
               <el-avatar :src="bulmaImagePath" :size="30" />
               <span class="text-lg ml-3">Bulma</span>
            </span>
            <div class="flex mt-2 h-10">Bulma基于Flexbox的CSS框架，简化网页布局和样式设计</div>
         </a-card-grid>

         <a-card-grid class="text-center w-1/3">
            <span class="flex">
               <el-avatar :src="bootsImagePath" :size="30" />
               <span class="text-lg ml-3">BootStrap</span>
            </span>
            <div class="flex mt-2 h-10">
               BootStrap响应式前端框架之一，旨在快速构建出Web应用程序和网站
            </div>
         </a-card-grid>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { IMAGE_HOME } from '@/enums/imagehomepath';
const vueImagePath = `${IMAGE_HOME}sys/workbench/vue.png`;
const tailImagePath = `${IMAGE_HOME}sys/workbench/tailwindcss.png`;
const jsImagePath = `${IMAGE_HOME}sys/workbench/javascript.png`;
const htmlImagePath = `${IMAGE_HOME}sys/workbench/html.png`;
const bootsImagePath = `${IMAGE_HOME}sys/workbench/bootstrap.png`;
const bulmaImagePath = `${IMAGE_HOME}sys/workbench/bulma.png`;
const props = defineProps({
   hoverable: {
      type: Boolean,
      default: true
   },
   loading: {
      type: Boolean
   }
});
</script>
