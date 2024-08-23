<template>
   <el-scrollbar class="leftmenu-sider-bar">
      <div class="flex flex-row hover:cursor-pointer border-1">
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
import MenuItem from './MenuItem.vue';
import { useStore } from 'vuex';
import { HttpResponseStatus } from '@/enums/httprespstatus';
import type { BreadNavRaw } from '@/types/tabs';
import { onMounted, ref } from 'vue';
import { computed } from 'vue';
import type { MenusState } from '@/types/permission';
import { ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
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
</script>
<style scoped>
.menutitle {
   font-size: 16px;
   color: deepskyblue;
   font-weight: 700;
   place-items: center;
   transform: translateY(25%);
}
.leftmenu-sider-bar {
   width: 200px;
}
</style>
@/types/user
