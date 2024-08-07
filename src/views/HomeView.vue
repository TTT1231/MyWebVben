<template>
   <main>
      <TheWelcome />
   </main>
   <el-button type="success" @click="handlerequest">发送请求</el-button>
   <a-button type="primary" :loading="myvalue">这是antdesign的按钮</a-button>
</template>
<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
import axios from 'axios';
const myvalue = true;
const handlerequest = async () => {
   await axios.post('', {}, { baseURL: '/api/qwe' }).then((res) => {
      console.log(res);
   });
};
</script>
