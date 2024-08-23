<template>
   <div class="flex flex-col justify-around" v-show="isShow">
      <span class="font-bold-25 animate-blockleftmin animate-d-5">手机号登录</span>
      <el-form
         ref="ruleFormRef"
         :model="ruleForm"
         :rules="rules"
         label-width="70px"
         style="max-width: 400px"
         class="margintop-20 marginleft-20"
      >
         <el-form-item
            prop="mobile"
            label="手机号"
            class="animate-blockleftmed animate-d-5 margintop-20"
         >
            <el-input v-model="ruleForm.mobile" placeholder="手机号" />
         </el-form-item>
         <el-form-item
            prop="vaildcode"
            label="验证码"
            class="margintop-25 animate-blockleftmed animate-d-7 margintop-30"
         >
            <div class="flex flex-row">
               <el-input v-model="ruleForm.vaildcode" placeholder="验证码" />
               <el-button
                  round
                  @click="countdownHandle"
                  :disabled="isStart"
                  class="marginleft-20 w-32"
                  >{{ validTimeTip }}</el-button
               >
            </div>
         </el-form-item>
      </el-form>
      <el-button
         type="primary"
         class="w-full animate-blockleftmed marginleft-10 animate-d-10 margintop-20"
         >登录</el-button
      >
      <el-button class="w-full animate-blockleftmed animate-d-10 margintop-15" @click="handleBack"
         >返回</el-button
      >
   </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { computed } from 'vue';
import { unref } from 'vue';
import { reactive, ref } from 'vue';
import { LoginState, useLogin } from './useLogin';
const { getCurrentState, setCurrentState } = useLogin();
const isShow = computed(() => {
   if (getCurrentState.value === LoginState.LoginMobile) {
      return true;
   } else {
      return false;
   }
});
const handleBack = () => {
   setCurrentState(LoginState.LoginDefault);
};
interface RuleForm {
   mobile: string;
   vaildcode: string;
}
const ruleForm = reactive<RuleForm>({
   mobile: '',
   vaildcode: ''
});
//表单对象用于最后验证
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
   mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],

   vaildcode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
});
const getvalidcode = ref('');
//默认没有开始倒计时
const isStart = ref(false);
const downtime = ref(10);
const countdowntime = ref();
countdowntime.value = downtime.value;
const validTimeTip = computed(() => {
   if (!unref(isStart)) {
      return '获取验证码';
   } else {
      return downtime.value + '秒后重新获取';
   }
});
const countdownHandle = () => {
   isStart.value = true;
   ruleForm.vaildcode = '123456';
   let timeId = setInterval(() => {
      if (unref(downtime) === 0) {
         clearInterval(timeId);
         downtime.value = countdowntime.value;
         isStart.value = false;
         ruleForm.vaildcode = '';
      } else {
         downtime.value = unref(downtime) - 1;
      }
   }, 1000);
};
</script>
