<script setup lang="ts">
import * as XLSX from 'xlsx';
import { utils, writeFileXLSX } from 'xlsx';
import type { PaginationProps } from 'ant-design-vue';
import type { TableType } from '@/types/fun/excel';
import { ref } from 'vue';

const dataSource= ref<Array<any>>([]);

const columns = ref<Array<any>>([]);

let header=ref<Array<{ title: string }>>([]);



const pagination: PaginationProps = {
   defaultPageSize: 10,
   total: dataSource.value.length,
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
const handleUpload=(event:Event)=>{
    const targetInput=event.target as HTMLInputElement;
    if(targetInput.files?.length){
        const file=targetInput.files[0];
        const reader=new FileReader();
        reader.onload=(e)=>{
            if(e.target!==null){
               const data=e.target.result;
               const workbook=XLSX.read(data,{type:'binary'});
               const firstSheetName = workbook.SheetNames[0];  
               const worksheet = workbook.Sheets[firstSheetName];  
  
            // 将工作表的数据转换为JSON  
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1}) as any;  
            //表数据展示,初始化columns
            console.log(jsonData);

            let tempLine=jsonData[0] as Record<string,any>;
            let header:Array<{title:string,dataIndex:string,align:'center'}>=[];
            for(let oneLineKey in tempLine){
                header.push({
                    title:tempLine[oneLineKey],
                    dataIndex:tempLine[oneLineKey],
                    align:'center'
                })
            }
            columns.value=header;

            const keys:Array<string>=[];
            for(let temp in header){
                keys.push(header[temp].title);
            }
            //   console.log(header)
            //   console.log(keys)

            for(let i=1;i<jsonData.length;i++){
                let item:Record<string,any>={};
         
                for(let j=0;j<keys.length;j++){
                    item[keys[j]]=jsonData[i][j];
                }

                dataSource.value.push(item)
            }
            // console.log(dataSource.value);
            // console.log(jsonData);

            }
            
      
        }
        reader.readAsBinaryString(file);
    }
}
</script>
<template>
    <div class="flex flex-col">

       <a-card title="Excel导入" class="w-full">
        <a-table
         :dataSource="dataSource"
         :columns="columns"
         :pagination="pagination"
         :scroll="{ y: 500 }"
         sticky
         tableLayout="fixed"
      >
      </a-table>
          <template #extra>
             <input type="file" @change="handleUpload($event)"/>
          </template>
       </a-card>
    </div>
 </template>