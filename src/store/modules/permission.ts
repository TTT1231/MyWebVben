import { RouterControlMethod } from '@/enums/routerEunms';
import type { AuthMenus, JsonMenus } from '@/types/permission';
import type { RequestUserInfo } from '@/types/user';
import type { Module } from 'vuex';
import { AuthMenusRequestApi } from '@/api/login';
import type { AuthMenusState, MenusState } from '@/types/permission';
import { HttpResponseStatus } from '@/enums/httprespstatus';
import { persistent } from '@/utils/cache/persistent';
import { Menus_Key } from '@/enums/cacheEnums';
const PermissionModule: Module<AuthMenusState, any> = {
   namespaced: true,
   state() {
      return {
         // permCodeList:[],
         isDynamicAddedRoute: false,
         // frontMenuList:[],
         backMenuList: [],
         currentPermissionMode: RouterControlMethod.ROUTERBACKCONTROL
      };
   },
   mutations: {
      // setPermCodeList(state,payload:string[] | number[]){
      //   state.permCodeList=payload;
      // },
      // setFrontMenuList(state,payload:AuthMenus[]){
      //   state.frontMenuList=payload;
      // },
      setIsDynamicAddedRoute(state, payload) {
         state.isDynamicAddedRoute = payload;
      },
      initPermissionStore(state) {
         if (state.backMenuList.length === 0) {
            const menuState: MenusState = JSON.parse(
               JSON.stringify(persistent.getSessionOfKey(Menus_Key))
            );
            if (menuState?.status === HttpResponseStatus.HAVEIT) {
               state.backMenuList = menuState.menus;
            }
         }
      },
      setBackMenuList(state, payload: AuthMenus[]) {
         state.backMenuList = payload;
         persistent.setSession(Menus_Key, { status: HttpResponseStatus.HAVEIT, menus: payload });
      },
      setCurrentPermissionMode(state, payload: RouterControlMethod) {
         state.currentPermissionMode = payload;
      },
      setAll(state, payload: AuthMenusState) {
         state.backMenuList = payload.backMenuList;
         state.isDynamicAddedRoute = payload.isDynamicAddedRoute;
         state.currentPermissionMode = payload.currentPermissionMode;
      }
   },
   getters: {
      // getPermCodeList(state){
      //     return  state.permCodeList;
      // },
      // getFrontMenuList(state){
      //   return state.frontMenuList;
      // },
      getIsDynamicAddedRoute(state) {
         return state.isDynamicAddedRoute;
      },
      getBackMenuList(state) {
         if (state.backMenuList.length !== 0) {
            return {
               status: HttpResponseStatus.HAVEIT,
               menus: state.backMenuList
            };
         } else {
            const sessionMenu: MenusState = JSON.parse(
               JSON.stringify(persistent.getSessionOfKey(Menus_Key))
            );
            if (sessionMenu === null) {
               return { status: HttpResponseStatus.FAIL, menus: [] };
            }
            if (sessionMenu?.status === HttpResponseStatus.HAVEIT) {
               return {
                  status: sessionMenu.status,
                  menus: sessionMenu.menus
               };
            } else {
               return {
                  status: HttpResponseStatus.SESSIONOUT,
                  menus: []
               };
            }
         }
      },
      getCurrentPermissionMode(state) {
         return state.currentPermissionMode;
      },
      getAllOfObj(state) {
         return { ...state };
      }
   },
   actions: {
      async getMenusList(
         { commit, getters, state },
         payload: RequestUserInfo
      ): Promise<AuthMenus[] | null> {
         if (state.currentPermissionMode === RouterControlMethod.ROUTERBACKCONTROL) {
            //该项目采用后端返回菜单,其他两种方式未实现
            const menusState: MenusState = getters['getBackMenuList'];
            if (menusState.menus.length === 0) {
               //state与session中状态都没初始化，调用api获取菜单数据
               const Menus = await AuthMenusRequestApi<JsonMenus, RequestUserInfo>(payload).then(
                  (rawdata) => {
                     return rawdata.data;
                  }
               );

               if (Menus.status === HttpResponseStatus.SUCCESS) {
                  //获取成功
                  commit('setBackMenuList', Menus.data);
                  commit('setIsDynamicAddedRoute', true);
                  return Promise.resolve(Menus.data);
               } else {
                  //获取失败
                  return Promise.reject(null);
               }
            } else {
               //session中有menus
               return Promise.resolve(menusState.menus);
            }
         } else {
            //其他方式处理，这里直接返回null
            return Promise.reject(null);
         }
      }
   }
};
export default PermissionModule;
