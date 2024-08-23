<template>
   <template v-for="item in props.treedata">
      <el-sub-menu
         :key="item._id"
         :index="item._id.toString()"
         v-if="item.childrens.length > 0 && item.menutype === 'tree'"
      >
         <template #title>
            <!-- <el-icon v-if="item.iconpath!==''">
               <component :is="item.iconpath"></component>
            </el-icon>  -->

            <el-icon v-if="item.iconpath !== ''">
               <img :src="formatIconPath(item.iconpath)" />
            </el-icon>
            <span class="marginleft-20"> {{ item.menuname }}</span>
         </template>
         <MenuItem :treedata="item.childrens" />
      </el-sub-menu>
      <el-menu-item :index="item.path" v-if="item.menutype === 'node'">
         <template #title> {{ item.menuname }}</template>
      </el-menu-item>
   </template>
</template>
<script setup lang="ts">
import MenuItem from '@/views/menu/MenuItem.vue';
import { computed } from 'vue';
import { IMAGE_HOME } from '@/enums/imagehomepath';
const props = defineProps(['treedata']);
//element-plus自带图标库使用,路径转换
const formatIcon = computed(() => {
   return (item: string) => {
      if (item === '') {
         return '';
      } else {
         const withoutPrefix = item.replace('el-icon-', '');
         const convertStr = withoutPrefix.charAt(0).toUpperCase() + withoutPrefix.slice(1);
         return convertStr;
      }
   };
});
//图片路径转换
const formatIconPath = (item: string): string => {
   return item === '' ? '' : `${IMAGE_HOME}${item}.png`;
};
</script>
<style scoped></style>
