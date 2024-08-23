<template>
   <div class="loginimage">
      <div class="flex flex-row justify-around loginbox">
         <div class="bg-red-300 w-80 login-top">store中数据存储验证F5</div>
         <div class="w-96 h-96 login-top">
            <LoginForm />
            <LoginMobile />
            <LoginQrcode />
            <LoginRegister />
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
import LoginForm from './LoginForm.vue';
import LoginMobile from './LoginMobile.vue';
import LoginQrcode from './LoginQrcode.vue';
import LoginRegister from './LoginRegister.vue';
</script>
<style scoped>
.loginimage {
   width: 100%;
   height: 735px;
   /* background-image: url('../../assets/bg.png'); 指定背景图片 */
   background-size: cover; /* 使背景图片覆盖整个元素，不留空白 */
   background-position: center; /* 背景图片居中显示 */
}
.login-top {
   margin-top: 200px;
}
</style>
