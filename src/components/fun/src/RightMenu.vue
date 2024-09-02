<template>
   <div class="flex flex-col">
      <a-card title="右键菜单示例" class="w-full"></a-card>
      <el-collapse class="mt-4">
         <el-collapse-item title="单右键菜单" name="1">
            <a-dropdown :trigger="['contextmenu']">
               <a-button type="primary" class="mt-4">right click for here</a-button>
               <template #overlay>
                  <div class="whilte-box flex flex-col">
                     <span class="w-full whilte-box-item h-10" @click="handleNew">
                        <span class="text-xl ml-4">+</span>
                        <span class="content-center ml-4">New</span>
                     </span>
                     <span class="w-full whilte-box-item h-10" @click="handleOpen">
                        <span class="text-xl ml-4">=</span>
                        <span class="content-center ml-4">Open</span>
                     </span>
                  </div>
               </template>
            </a-dropdown>
         </el-collapse-item>
      </el-collapse>

      <el-collapse class="mt-4">
         <el-collapse-item title="多右键菜单" name="2">
            <a-dropdown :trigger="['contextmenu']">
               <a-button type="primary">right click for here</a-button>
               <template #overlay>
                  <a-menu>
                     <SubMenu title="子按钮" popupClassName="qwe">
                        <MenuItem class="w-full h-full">二级菜单</MenuItem>
                     </SubMenu>
                  </a-menu>
               </template>
            </a-dropdown>
         </el-collapse-item>
      </el-collapse>
      <el-collapse class="mt-4">
         <el-collapse-item title="多右键菜单" name="2">
            <a-dropdown :trigger="['contextmenu']">
               <a-button type="primary" @contextmenu="handleRightMutily"
                  >right click for here</a-button
               >
            </a-dropdown>
         </el-collapse-item>
      </el-collapse>
   </div>
</template>
<script setup lang="ts">
import { useMessage } from '@/hooks/useMessage';
import { useContextMenu } from '@/hooks/useContextMenu';
import { ref } from 'vue';
import { Menu, SubMenu, MenuItem } from 'ant-design-vue';
const createMessage = useMessage();
const [createContextMenu] = useContextMenu();
const handleNew = () => {
   createMessage('new', {
      type: 'success',
      duration: 500
   });
};
const handleOpen = () => {
   createMessage('open', {
      type: 'success',
      duration: 500
   });
};
type qwe = Fn<number, any>;
const myfn: qwe = (a) => {
   console.log(a);
};
const handleRightMutily = (e: MouseEvent) => {
   createContextMenu({
      event: e,
      items: [
         {
            label: 'New',
            front: '+',
            children: [
               {
                  handler: myfn,
                  label: 'New1-1',
                  front: '+',
                  children: [
                     {
                        label: 'New1-1-1'
                     },
                     {
                        label: 'New1-2-1',
                        diabled: true
                     }
                  ]
               },
               {
                  label: 'New2-1',
                  front: '+'
               }
            ]
         }
      ]
   });
};
const items = ref([
   {
      key: 'sub1',
      label: 'Navigation Three',
      title: 'Navigation Three',
      children: [
         {
            key: '3',
            label: 'Option 3',
            title: 'Option 3'
         },
         {
            key: '4',
            label: 'Option 4',
            title: 'Option 4'
         },
         {
            key: 'sub1-2',
            label: 'Submenu',
            title: 'Submenu',
            children: [
               {
                  key: '5',
                  label: 'Option 5',
                  title: 'Option 5'
               },
               {
                  key: '6',
                  label: 'Option 6',
                  title: 'Option 6'
               }
            ]
         }
      ]
   }
]);
</script>
<style scoped>
.whilte-box {
   width: 150px;
   height: 150px;
   background-color: white;
}
.whilte-box-item:hover {
   cursor: pointer;
   background-color: whitesmoke;
}
.qwe {
   margin-top: -4px;
}
</style>
