<template>
   <div class="flex flex-col loginform" v-show="isShow">
      <span class="font-bold fontsize-25 animate-blockleftmin animate-d-7">登录</span>

      <el-form
         ref="ruleFormRef"
         style="max-width: 400px"
         :model="ruleForm"
         :rules="rules"
         label-width="55px"
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
            class="margintop-30 animate-blockleftmax animate-d-7"
         >
            <el-input
               type="password"
               v-model="ruleForm.password"
               placeholder="密码"
               show-password
            />
         </el-form-item>
      </el-form>
      <div class="flex justify-between w-full animate-blockleftmax animate-d-8">
         <el-checkbox v-model="rememberpwStatue" class="marginleft-10" label="记住密码" />
         <div class="animate-blockleft-10">
            <span class="forgetbtn fontsize-15" @click="handleForgetpw">忘记密码?</span>
         </div>
      </div>
      <div
         class="flex flex-row animate-blockleftmed animate-d-10 marginleft-5 justify-between margintop-15"
      >
         <el-button @click="handleLoginPhone">手机登录</el-button>
         <el-button class="w-108" @click="hanleQrcodeLogin">二维码登录</el-button>
         <el-button class="w-118" @click="handleLoginRegister">注册</el-button>
      </div>
      <el-button
         type="primary"
         class="w-full marginleft-5 animate-blockleftmed animate-d-10 margintop-15"
         @click="handleLogin(ruleFormRef)"
         :loading="loading"
         >登录</el-button
      >

      <div class="marginleft-20"><el-divider>其他登录方式</el-divider></div>
   </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { LoginState, useLogin } from './useLogin';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useMessage } from '@/hooks/useMessage';
import { useRouter } from 'vue-router';
import { HttpResponseStatus } from '@/enums/httprespstatus';
const createMessage = useMessage();
const loading = ref(false);
const { getCurrentState, setCurrentState } = useLogin();
const router = useRouter();
const store = useStore();
const isShow = computed(() => {
   if (getCurrentState.value === LoginState.LoginDefault) {
      return true;
   } else {
      return false;
   }
});
const formValid = ref(false);
interface RuleForm {
   account: string;
   password: string;
}
//表单对象用于最后验证
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
   account: 'admin',
   password: '123456'
});

const rules = reactive<FormRules<RuleForm>>({
   account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
   password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 3, message: '密码需要在三位以上', trigger: 'blur' }
   ]
});
const hanleQrcodeLogin = () => {
   setCurrentState(LoginState.LoginQrcode);
};
const handleLoginPhone = () => {
   setCurrentState(LoginState.LoginMobile);
};
const handleLoginRegister = () => {
   setCurrentState(LoginState.LoginRegister);
};
const handleLogin = async (formEl: FormInstance | undefined) => {
   if (!formEl) {
      return;
   }
   await formEl.validate((valid) => {
      if (valid) {
         formValid.value = true;
      } else {
         formValid.value = false;
      }
   });
   if (formValid.value) {
      try {
         loading.value = true;
         const returndata = await store.dispatch('UserModule/login', {
            user_account: ruleForm.account,
            user_password: ruleForm.password,
            user_mobile: '',
            validatemess: '要发送给服务器的验证数据'
         });
         console.log(returndata);
         if (
            returndata === HttpResponseStatus.HAVEIT ||
            returndata === HttpResponseStatus.SUCCESS
         ) {
            await store.dispatch('PermissionModule/getMenusList', {
               user_account: ruleForm.account,
               user_password: ruleForm.password,
               user_mobile: '',
               validatemess: '要发送给服务器的验证数据'
            });
            createMessage('登录成功', { type: 'success', duration: 1000 });

            router.push('/main');
         } else {
            createMessage('登录失败: 404', { type: 'error', duration: 1000 });
         }
      } catch (e) {
         createMessage('登录失败: 网络错误');
      } finally {
         loading.value = false;
      }
   } else {
      return;
   }
};
const handleForgetpw = () => {
   createMessage('暂未实现', { type: 'error', duration: 800 });
};
const rememberpwStatue = ref(true);
</script>
<style scoped>
.forgetbtn:hover {
   cursor: pointer;
   color: darkturquoise;
}

.loginform {
   width: 400px;
   height: 400px;
}

.w-108 {
   width: 108px;
}

.w-118 {
   width: 118px;
}
</style>
