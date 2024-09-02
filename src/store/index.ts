import { createStore } from 'vuex';
import UserModule from './modules/user';
import PermissionModule from './modules/permission';
import TabsModule from './modules/tabs';
import ExcelModule from './modules/excel';
import type { App } from 'vue';
const store = createStore({
   state: {},
   mutations: {
      testSate(state) {
         console.log('test root state');
      }
   },
   actions: {},
   modules: {
      UserModule,
      PermissionModule,
      TabsModule,
      ExcelModule
   }
});
export function setupStore(app: App<Element>) {
   //刷新之后，按照session恢复store状态
   store.commit('UserModule/initUserStore');
   store.commit('PermissionModule/initPermissionStore');
   app.use(store);
}
export default store;
