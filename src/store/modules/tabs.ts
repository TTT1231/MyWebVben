import type { Module } from 'vuex';
import type { BreadNavRaw, TabsRoot } from '@/types/tabs';
/**假设全部导航数据已经全部初始化 */
const allNavData: BreadNavRaw[] = [
   {
      title: '分析页',
      key: '1',
      path: '/main/analysis'
   },
   {
      title: '工作台',
      key: '2',
      path: '/main/workbench'
   }
];
/**这里我们没有用session存储刷新直接清空 */
const TabsModule: Module<TabsRoot, any> = {
   namespaced: true,
   state() {
      return {
         currentTab: [],
         allTab: allNavData,
         currentTabIndex: '',
         lastTabIndex: -1
      };
   },
   mutations: {
      addTab(state, payload: BreadNavRaw) {
         //currentTab有就更新索引,没有就增加
         if (payload === null) {
            return;
         }
         let isNotHave = true;
         /*在currentTab中homeIndexPath */
         let homeIndexPath = '';
         state.currentTab.forEach((item, index) => {
            if (item.path === payload.path) {
               isNotHave = false;
               homeIndexPath = state.currentTab[index].path;
            }
         });
         if (isNotHave) {
            state.currentTab.push(payload);
            let len = state.currentTab.length - 1;
            state.currentTabIndex = state.currentTab[len].path;
         } else {
            //有就更新索引，没有就增加
            state.currentTabIndex = homeIndexPath;
         }
      },
      deleteTab(state, targetKey: string) {
         let lastIndex = 0;
         state.currentTab.forEach((item, i) => {
            if (item.path === targetKey) {
               lastIndex = i - 1;
            }
         });
         //更新currentTab,删除要删除的tab
         state.currentTab = state.currentTab.filter((item) => item.path !== targetKey);
         //删除当前currentTab
         if (state.currentTab.length && state.currentTabIndex === targetKey) {
            if (lastIndex >= 0) {
               //   alert('删除后回到上一级')
               state.currentTabIndex = state.currentTab[lastIndex].path;
            } else {
               state.currentTabIndex = state.currentTab[0].path;
            }
         } else {
            state.currentTabIndex = state.currentTab[0] ? state.currentTab[0].path : '';
         }
         //最后这里activeKey.value是删除后当前索引
      },
      changeCurrentTabIndex(state, newIndex: string) {
         state.currentTabIndex = newIndex;
      }
   },
   getters: {
      getCurrentTabIndex(state) {
         return state.currentTabIndex;
      },
      getCurrentTab(state) {
         return state.currentTab;
      }
   },
   actions: {
      getTitleOfKey({ state }, key: string) {
         let title = '';
         state.allTab.forEach((item, index) => {
            if (item.path === key) {
               title = item.title;
            }
         });
         return title;
      },
      async isInallTabs({ state, dispatch, commit }, payload: string) {
         //根据传递过来path判断在不在allTabs里面避免，解决直接输入路径不显示面包屑导航问题
         let tempitem: Nullable<BreadNavRaw> = null;
         state.allTab.forEach((item, index) => {
            if (item.path === payload) {
               tempitem = item;
            }
         });
         if (tempitem) {
            //判断在不在currentTab里面,不在调用addTab
            let temp: BreadNavRaw = tempitem;
            const inCurrentTabFlag = await dispatch('isInCurrentTab', temp.path);
            if (inCurrentTabFlag) {
               commit('addTab', temp);
            }
         }
      },
      isInCurrentTab({ state }, payload: string) {
         //判断path在不在currentTab里面默认为不在
         let flag = false;
         let tempitem: Nullable<BreadNavRaw> = null;
         state.currentTab.forEach((item, index) => {
            if (item.path === payload) {
               flag = true;
               tempitem = item;
            }
         });
         if (flag) {
            //如果在里面返回false,不在返回true
            return false;
         } else {
            return true;
         }
      }
   }
};
export default TabsModule;
