<template>
   <div class="box ml-2">
      <a-tabs
         :activeKey="activeKey"
         :animated="false"
         :hideAdd="true"
         :tabBarGutter="8"
         type="editable-card"
         @change="handleChange"
         @edit="onEdit"
      >
         <template v-for="item in panes" :key="item.path">
            <a-tab-pane>
               <template #tab>
                  <div class="select-none" @dblclick="handleDBClick">{{ item.title }}</div>
                  <!-- <BreadItem :title="item.title"/> -->
               </template>
            </a-tab-pane>
         </template>
      </a-tabs>
   </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { watch } from 'vue';
import { router } from '@/router';

const store = useStore();
const panes = computed(() => store.getters['TabsModule/getCurrentTab']);
const activeKey = computed(() => store.getters['TabsModule/getCurrentTabIndex']);
const tempkey = ref(1);
const qwe = ref('');

const handleDBClick = (mouse: any) => {
   const baseURI = mouse?.target?.baseURI;
   if (baseURI) {
      const url = new URL(baseURI);
      const targetKey = url.pathname;
      remove(targetKey);
   }
};

function handleChange(currentKey: string) {
   //  alert('tab切换面板回调');
   store.commit('TabsModule/changeCurrentTabIndex', currentKey);
}

const remove = (targetKey: string) => {
   // alert(targetKey)
   store.commit('TabsModule/deleteTab', targetKey);
};

const add = () => {
   qwe.value = `newTab${++tempkey.value}`;
   store.commit('TabsModule/addTab', {
      title: 'sd',
      key: 'Content of new Tab',
      path: `${qwe.value}`
   });
   // go(activeKey, false);
};
const onEdit = (targetKey: string | MouseEvent, action: string) => {
   if (action === 'add') {
      add();
   } else {
      remove(targetKey as string);
   }
};
watch(
   activeKey,
   (newValue) => {
      router.push(newValue);
   },
   { immediate: true }
);
</script>
<style scoped>
:deep(.ant-tabs-tab) {
   border-radius: 15px 15px 0 0 !important;
}
:deep(.ant-tabs-tab.ant-tabs-tab-active) {
   background-color: #8bc0f1 !important;
}
</style>
