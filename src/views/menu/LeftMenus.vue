<template>
   <el-scrollbar class="leftmenu-sider-bar">
      <div class="flex flex-row hover:cursor-pointer border-1 select-none">
         <img :src="logoImagePath" class="w-14 h-11" />
         <div v-if="!isCollapse" class="menutitle">My Admin CMS</div>
      </div>
      <el-menu
         :width="props.width"
         router
         :collapse="isCollapse"
         :default-active="currentIndex"
         @select="addBreadNavItem"
      >
         <MenuItem :treedata="treedata" />
      </el-menu>
   </el-scrollbar>
</template>
<script setup lang="ts">
import './menus.css';
import MenuItem from './MenuItem.vue';
import { useStore } from 'vuex';
import { HttpResponseStatus } from '@/enums/httprespstatus';
import type { BreadNavRaw } from '@/types/tabs';
import { onMounted, ref } from 'vue';
import { computed } from 'vue';
import type { MenusState } from '@/types/permission';
import { ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { watch } from 'vue';
const router = useRouter();
const logoImagePath = '/images/leftmenulogo.png';
const store = useStore();
const props = defineProps({
   width: {
      type: String,
      default: '224px',
      required: false
   },
   isCollapse: {
      type: Boolean,
      default: false,
      required: false
   }
});
const currentIndex = computed(() => store.getters['TabsModule/getCurrentTabIndex']);
const currentTabLen = computed(() => store.getters['TabsModule/getCurrentTab'].length);
//面包屑菜单激活时的回调
const addBreadNavItem = async (index: string) => {
   let title = await store.dispatch('TabsModule/getTitleOfKey', index);
   const obj: BreadNavRaw = {
      title: title,
      path: index
   };
   if (title === '') {
   } else store.commit('TabsModule/addTab', obj);
};
const isCollapse = computed(() => {
   return props.isCollapse;
});
const treedata = ref();
onMounted(() => {
   const menuState: MenusState = store.getters['PermissionModule/getBackMenuList'];
   if (menuState.status === HttpResponseStatus.HAVEIT) {
      treedata.value = menuState.menus;
   } else {
      //菜单数据获取失败返回登录页
      ElMessageBox.alert('菜单数据获取失败，点击确认返回登录页', '接口调用失败', {
         confirmButtonText: '确认',
         cancelButtonText: 'Cancel',
         type: 'error',
         center: true,
         showClose: false,
         draggable: true,
         callback: () => {
            router.replace('/');
         }
      });
   }
});
watch(
   () => currentTabLen.value,
   () => {
      if (currentTabLen.value !== 0) {
         return;
      }
      let currentPath = router.currentRoute.value.fullPath;
      if (currentPath === '/main') {
         return;
      }
      router.replace('/main');
      //这里应该是dom更新之后调用
   },
   { immediate: true, flush: 'post' }
);
</script>
