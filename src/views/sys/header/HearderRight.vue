<template>
   <div class="w-72 h-11 flex items-center select-none">
      <SearchIcon />
      <NotifyIcon />
      <FullscreenIcon />
      <TranslateIcon />
      <div class="w-125px flex h-full justify-center items-center hover-shallow select-none">
         <UserDrop />
      </div>
      <SettingIcon />
   </div>
</template>
<script setup lang="ts">
import SearchIcon from '@/components/sys/header/SearchIcon.vue';
import FullscreenIcon from '@/components/sys/header/FullscreenIcon.vue';
import NotifyIcon from '@/components/sys/header/notifyicon/index';
import SettingIcon from '@/components/sys/header/SettingIcon.vue';
import TranslateIcon from '@/components/sys/header/TranslateIcon.vue';
import UserDrop from '@/components/sys/header/UserDrop.vue';
</script>
<style scoped>
.w-125px {
   width: 125px;
}
.hover-shallow:hover {
   cursor: pointer;
   background-color: rgba(221, 218, 218, 0.715);
}
</style>
