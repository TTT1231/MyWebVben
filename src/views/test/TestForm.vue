<template>
   <div class="flex flex-col">
      <a-card title="excel选择导出" class="w-full" />
      <a-card title="基本表格示例" class="w-full">
         <a-table
            :dataSource="dataSource"
            :columns="columns"
            :pagination="pagination"
            :scroll="{ y: 500 }"
            sticky
            tableLayout="fixed"
         >
         </a-table>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import { IMAGE_HOME } from '@/enums/imagehomepath';
import type { PaginationProps } from 'ant-design-vue';
const noDataIconPath = `${IMAGE_HOME}images/sys/excel/nodata.png`;
const dataSource: Array<{
   key: number;
   ID: number;
   name: string;
   age: number;
   bianhao: string;
   address: string;
   starttime: string;
   endtime: string;
}> = [];

const columns = [
   {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      align: 'center'
   },
   {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
   },
   {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center'
   },
   {
      title: '编号',
      dataIndex: 'bianhao',
      key: 'bianhao',
      align: 'center'
   },
   {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      align: 'center'
   },
   {
      title: '开始时间',
      dataIndex: 'starttime',
      key: 'starttime',
      align: 'center'
   },
   {
      title: '结束时间',
      dataIndex: 'endtime',
      key: 'endtime',
      align: 'center'
   }
];
for (let a = 0; a < 80; a++) {
   dataSource.push({
      key: a,
      ID: a,
      name: 'Eric',
      age: 22,
      bianhao: `${a}00012`,
      address: `地址${a}号`,
      starttime: '2024/8/15 12:15:08',
      endtime: '2024/8/16 12:15:08'
   });
}

const pagination: PaginationProps = {
   defaultPageSize: 30,
   total: dataSource.length,
   pageSizeOptions: ['10', '20', '30', '40', '50', '60'],
   showSizeChanger: true,
   buildOptionText: (opt: { value: any }) => {
      return `${opt.value}条/页`;
   },
   showTotal(total, range) {
      return `共${total}条数据`;
   },
   showQuickJumper: true
};
</script>
