<template>
   <a-dropdown placement="bottom">
      <div class="flex">
         <el-avatar :src="userImgHome" :size="30" class="-ml-4" />
         <span class="ml-3 mt-1">用户管理</span>
      </div>

      <template #overlay>
         <a-menu class="min-w-36">
            <a-menu-item @click="notImpl">
               <div class="flex">
                  <el-avatar :src="doc" :size="21" shape="square" />
                  <span class="ml-2 flex-1">文档</span>
               </div>
            </a-menu-item>
            <a-menu-item @click="notImpl">
               <div class="flex">
                  <el-avatar :src="change" :size="21" shape="square" />
                  <span class="ml-2 flex-1">切换API</span>
               </div>
            </a-menu-item>
            <a-menu-item @click="notImpl">
               <div class="flex">
                  <el-avatar :src="lock" :size="21" shape="square" />
                  <span class="ml-2 flex-1">锁定屏幕</span>
               </div>
            </a-menu-item>
            <a-menu-item @click="loginOutSys">
               <div class="flex">
                  <el-avatar :src="close" :size="21" shape="square" />
                  <span class="ml-2 flex-1">退出系统</span>
               </div>
            </a-menu-item>
         </a-menu>
      </template>
   </a-dropdown>
</template>
<script lang="ts" setup>
import { IMAGE_HOME } from '@/enums/imagehomepath';
import { Modal } from 'ant-design-vue';
import { useStore } from 'vuex';
import { createVNode } from 'vue';
import { useMessage } from '@/hooks/useMessage';
const userImgHome = `${IMAGE_HOME}eyu.png`;
const dropImgHome = `${IMAGE_HOME}sys/header/`;
const doc = `${dropImgHome}doc.png`;
const change = `${dropImgHome}change.png`;
const lock = `${dropImgHome}lock.png`;
const close = `${dropImgHome}close.png`;
const warn = `${IMAGE_HOME}warn.png`;
const store = useStore();
const createMessage = useMessage();
const notImpl = () => {
   createMessage('暂未实现', { type: 'error', duration: 800 });
};
const loginOutSys = () => {
   //退出系统时，显示警告框
   Modal.confirm({
      title: '确定要退出系统嘛？',
      icon: createVNode('img', { src: `${warn}` }),
      content: createVNode('div', {}, '注:此操作会重新回到登录页，并清空缓存'),
      style: {
         marginTop: '150px'
      },
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
         await store.dispatch('UserModule/loginOut');
      }
   });
};
</script>
