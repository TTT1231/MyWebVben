<template>
   <div class="flex flex-col">
      <a-card title="Excel导出" class="w-full">
         <BaseTable :filename="ruleForm.filename" :mime="ruleForm.mime" />
         <template #extra>
            <a-button type="primary" @click="handleShowDialog">导出</a-button>
         </template>
         <a-modal v-model:open="showDialog" title="导出excel数据" @ok="handleOk(ruleFormRef)">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
               <el-form-item label="文件名" prop="filename">
                  <el-input v-model="ruleForm.filename" placeholder="请输入文件名" />
               </el-form-item>
               <el-form-item label="文件类型" prop="mime">
                  <el-select
                     v-model="ruleForm.mime"
                     placeholder="请选择文件类型"
                     @blur="handleSelectValid"
                  >
                     <el-option v-for="value in validMime" :key="value" :value="value" />
                  </el-select>
               </el-form-item>
            </el-form>
         </a-modal>
      </a-card>
   </div>
</template>
<script setup lang="ts">
import BaseTable from './BaseTable.vue';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { useMessage } from '@/hooks/useMessage';
import type { RuleForm, WatchRuleForm } from '@/types/fun/excel';
import { validMime } from '@/enums/excel';
import { useStore } from 'vuex';

const ruleForm = reactive<WatchRuleForm>({
   filename: '',
   mime: '',
   isstart: false
});
const ruleFormRef = ref<FormInstance | null>(null);
const rules = reactive<FormRules<RuleForm>>({
   filename: [{ required: true, message: '文件名不能为空', trigger: 'blur' }],
   mime: [{ required: true, message: '文件类型不能为空', trigger: 'blur' }]
});
//验证后启动导出

//解决select验证不成功问题，手动调用
const handleSelectValid = () => {
   ruleFormRef.value?.validateField('mime');
};
const showDialog = ref(false);
const handleShowDialog = () => {
   showDialog.value = true;
};
const handleColseDialog = () => {
   showDialog.value = false;
};
const createMessage = useMessage();

const store = useStore();

//异步调用等待表单校验成功
const handleOk = async (formEl: FormInstance | undefined | null) => {
   if (!formEl) {
      return;
   }
   try {
      await formEl.validate(async (valid) => {
         if (valid) {
            ruleForm.isstart = true;
            store.commit('ExcelModule/setRuleFormAll', {
               filename: ruleForm.filename,
               mime: ruleForm.mime,
               isstart: ruleForm.isstart
            });
            await store.dispatch('ExcelModule/hanldeUnionProcedure');

            ruleForm.isstart = false;
            store.commit('ExcelModule/setIsStart', ruleForm.isstart);
            const achieve = store.getters['ExcelModule/getAchieve'];
            if (achieve) {
               createMessage('导出成功', { type: 'success', duration: 800 });
            } else {
               store.commit('ExcelModule/setAchieve', true);
            }

            ruleForm.filename = '';
            ruleForm.mime = '';

            handleColseDialog();
         } else {
         }
      });
   } catch (e: any) {
      createMessage('表单校验发生错误' + e?.message, { type: 'error', duration: 800 });
      handleColseDialog();
   }
};
</script>
