<template>
   <div
      class="h-full hover-pointer-color flex items-center w-12 justify-center"
      @click="handleNotify"
   >
      <a-badge :dot="true">
         <div v-show="!isMultiForm" class="flex">
            <a-tooltip placement="bottom" trigger="hover">
               <template #title>
                  <span>通知</span>
               </template>
               <a-avatar size="small" :src="reactiableImagePath" />
            </a-tooltip>
         </div>

         <div v-show="isMultiForm">
            <a-popover v-model:open="multiForm">
               <template #content>
                  <div class="w-64" :style="{ height: h96 }">
                     <a-tabs
                        v-model:activeKey="activeKey"
                        :tab-position="tabTop"
                        :style="{ height: h96 }"
                     >
                        <a-tab-pane key="1" :tab="`通知(${listData.length})`">
                           <a-list
                              item-layout="vertical"
                              size="small"
                              :pagination="pagination"
                              :data-source="listData"
                           >
                              <template #renderItem="{ item }">
                                 <a-list-item key="item.title">
                                    <a-list-item-meta :description="item.description">
                                       <template #title>
                                          <a href="#">{{ item.title }}</a>
                                       </template>
                                       <template #avatar><a-avatar :src="item.avatar" /></template>
                                    </a-list-item-meta>
                                 </a-list-item>
                              </template>
                           </a-list>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="消息(0)">
                           <div>没有内容</div>
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="待办(0)">
                           <div>没有内容</div>
                        </a-tab-pane>
                        <a-tab-pane key="4" tab="其他(0)">
                           <div>没有内容</div>
                        </a-tab-pane>
                     </a-tabs>
                  </div>
               </template>
               <a-avatar :size="30" :src="reactiableImagePath" />
            </a-popover>
         </div>
      </a-badge>
   </div>
</template>
<script setup lang="ts">
import { IMAGE_HOME } from '@/enums/imagehomepath';
import { computed } from 'vue';
import { ref } from 'vue';
import type { TabsProps } from 'ant-design-vue';
import { listData } from './data';

const reactiableImagePath = `${IMAGE_HOME}notify.png`;
const multiForm = ref(false);
const isMultiForm = computed(() => multiForm.value);

const h96 = ref('384px');
const activeKey = ref('1');
const tabTop = ref<TabsProps['tabPosition']>('top');

const handleNotify = () => {
   multiForm.value = !multiForm.value;
};
const pagination = {
   onChange: (page: number) => {
      console.log(page);
   },
   pageSize: 3
};
</script>
<style scoped></style>
