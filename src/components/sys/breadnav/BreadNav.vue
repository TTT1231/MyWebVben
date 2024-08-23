<template>
   <div>
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
                  {{ item.title }}
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
function handleChange(currentKey: string) {
   //  alert('tab切换面板回调');
   store.commit('TabsModule/changeCurrentTabIndex', currentKey);
}
const remove = (targetKey: string) => {
   // alert(targetKey)
   store.commit('TabsModule/deleteTab', targetKey);
};
const tempkey = ref(1);
const qwe = ref('');
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
