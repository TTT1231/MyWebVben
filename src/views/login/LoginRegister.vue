<template>
   <div class="flex flex-col" v-show="isShow">
      <span class="font-bold-25">注册</span>

      <el-form
         ref="ruleFormRef"
         style="max-width: 400px"
         :model="ruleForm"
         :rules="rules"
         label-width="70px"
         class="marginleft-20"
      >
         <el-form-item
            label="账号"
            prop="account"
            class="margintop-25 animate-blockleftmax animate-d-5"
         >
            <el-input v-model="ruleForm.account" placeholder="账号" />
         </el-form-item>
         <el-form-item
            label="密码"
            prop="password"
            class="margintop-25 animate-blockleftmax animate-d-7"
         >
            <el-input
               type="password"
               v-model="ruleForm.password"
               placeholder="密码"
               show-password
            />
         </el-form-item>
         <el-form-item
            label="手机号"
            prop="mobile"
            class="margintop-25 animate-blockleftmax animate-d-7"
         >
            <el-input
               type="password"
               v-model="ruleForm.mobile"
               placeholder="手机号"
               show-password
            />
         </el-form-item>
      </el-form>
      <div>
         <el-button
            type="primary"
            class="w-full margintop-25 marginleft-5 animate-blockleftmed animate-d-10"
            >注册</el-button
         >
      </div>
      <div>
         <el-button
            class="w-full margintop-25 marginleft-5 animate-blockleftmed animate-d-10"
            @click="handleBack"
            >返回</el-button
         >
      </div>
   </div>
</template>
<script setup lang="ts">
import type { FormRules } from 'element-plus';
import { reactive } from 'vue';
import { LoginState, useLogin } from './useLogin';
import { computed } from 'vue';
const { getCurrentState, setCurrentState } = useLogin();
const isShow = computed(() => {
   if (getCurrentState.value === LoginState.LoginRegister) {
      return true;
   } else {
      return false;
   }
});
const handleBack = () => {
   setCurrentState(LoginState.LoginDefault);
};
interface RuleForm {
   account: string;
   password: string;
   mobile: string;
}
const ruleForm = reactive<RuleForm>({
   account: '',
   password: '',
   mobile: ''
});
const rules = reactive<FormRules<RuleForm>>({
   account: [{ required: true, message: '账号不能为空' }],
   password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { required: true, min: 3, message: '密码必须要大于三位', trigger: 'blur' }
   ],
   mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }]
});
</script>
