<template>
   <div class="w-1/3">
      <a-card title="测试">
         <a-list
            item-layout="vertical"
            size="large"
            :pagination="pagination"
            :data-source="listData"
         >
            <template #renderItem="{ item }">
               <a-list-item key="item.title">
                  <a-list-item-meta :description="item.description">
                     <template #title>
                        <a :href="item.href">{{ item.title }}</a>
                     </template>
                     <template #avatar><a-avatar :src="item.avatar" /></template>
                  </a-list-item-meta>
               </a-list-item>
            </template>
         </a-list>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import type { PaginationProps } from 'ant-design-vue';
import { IMAGE_HOME } from '@/enums/imagehomepath';
import { ref } from 'vue';
const listData: Record<string, string>[] = [];

for (let i = 0; i < 5; i++) {
   listData.push({
      title: `ant design vue part ${i}`,
      avatar: `${IMAGE_HOME}eyu.png`,
      description: '1999-9-9'
   });
}
const current = ref(2);
const pagination: PaginationProps = {
   // onChange: (page: number) => {
   //     console.log(page);
   // },
   // pageSize:2,
   defaultPageSize: 3,
   total: 5,
   pageSizeOptions: ['1', '2', '3'],
   showSizeChanger: true,
   // showSizeChange:(current:any,size:any)=>{
   //     console.log(current+'size:'+size);

   // },
   buildOptionText: (opt: { value: any }) => {
      return `${opt.value}条/页`;
   }
   //     showTotal(total, range) {
   //         console.log(range)
   //         return `共${total}条记录 当前第${Math.ceil(range[0] / 5)} 页`
   //    },
};
</script>
