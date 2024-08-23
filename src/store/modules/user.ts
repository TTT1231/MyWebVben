import type { Module } from 'vuex';
import { LoginRequestApi } from '@/api/login/index';
import { persistent } from '@/utils/cache/persistent';
import { HttpResponseStatus } from '@/enums/httprespstatus';
import { UserRole } from '@/enums/userrole';
import { User_Info_Key } from '@/enums/cacheEnums';
import type { UserInfo, RequestUserInfo, RealToken } from '@/types/user';
import { router } from '@/router';

interface UserState {
   userInfo: Nullable<UserInfo>;
   role: UserRole;
   token?: string;
   sessionTimeout: boolean;
   lastUpdateTime: number;
}
interface JsonUserState {
   status: number;
   message: string;
   data: UserState;
}
const UserModule: Module<UserState, any> = {
   namespaced: true,
   state() {
      return {
         userInfo: null,
         //令牌
         token: undefined,
         role: UserRole.COMMON,
         //是否过期,默认已经过期重新发起请求
         sessionTimeout: true,
         lastUpdateTime: 0
      };
   },
   mutations: {
      initUserStore(state) {
         if (state.userInfo === null) {
            const realToken: RealToken = JSON.parse(
               JSON.stringify(persistent.getSessionOfKey(User_Info_Key))
            );
            if (realToken !== null) {
               if (realToken?.status === HttpResponseStatus.HAVEIT) {
                  const userState: UserState = JSON.parse(
                     JSON.stringify(persistent.getSessionOfKey(realToken.token))
                  );
                  //init userState all
                  state.userInfo = userState.userInfo;
                  state.token = userState?.token;
                  state.role = userState.role;
                  state.sessionTimeout = userState.sessionTimeout;
                  state.lastUpdateTime = userState.lastUpdateTime;
               }
            }
         }
      },
      setUserInfo(state, payload: UserInfo) {
         state.userInfo = payload;
      },
      setUserRole(state, payload: UserRole) {
         state.role = payload;
      },
      setUserSessionTimeout(state, payload: boolean) {
         state.sessionTimeout = payload;
      },
      setUserToken(state, payload: string) {
         state.token = payload;
      },
      setUseLastUpdateTime(state, payload: number) {
         state.lastUpdateTime = payload;
      },
      setUserStateAll(state, payload: UserState) {
         state.userInfo = payload.userInfo;
         state.token = payload?.token;
         state.role = payload.role;
         state.sessionTimeout = payload.sessionTimeout;
         state.lastUpdateTime = payload.lastUpdateTime;
         //session 会话存储
         persistent.setSession(User_Info_Key, {
            status: HttpResponseStatus.HAVEIT,
            token: payload.token
         });
         persistent.setSession(payload?.token as string, {
            ...payload
         });
      }
   },
   getters: {
      getUserInfo(state) {
         if (state.userInfo !== null) {
            return state.userInfo;
         }
         const storageToken: RealToken = JSON.parse(
            JSON.stringify(persistent.getSessionOfKey(User_Info_Key))
         );
         if (storageToken?.status === HttpResponseStatus.HAVEIT) {
            return JSON.parse(JSON.stringify(storageToken?.token))?.userInfo;
         } else return null;
      },
      getUserToken(state) {
         if (state.userInfo !== null) {
            return JSON.parse(JSON.stringify(persistent.getSessionOfKey(User_Info_Key)));
         }
         const storageToken: RealToken = JSON.parse(
            JSON.stringify(persistent.getSessionOfKey(User_Info_Key))
         );
         if (storageToken?.status === HttpResponseStatus.HAVEIT) {
            return storageToken;
         } else return undefined;
      },
      getUserSessionTimeout(state) {
         return state.sessionTimeout;
      },
      getUserRole(state) {
         if (state.userInfo !== null) {
            return state.role;
         }
         const storageToken: RealToken = JSON.parse(
            JSON.stringify(persistent.getSessionOfKey(User_Info_Key))
         );
         if (storageToken?.status === 303) {
            return JSON.parse(JSON.stringify(storageToken.token))?.role;
         } else return null;
      },
      getUserLastUpdateTime(state) {
         return state.lastUpdateTime;
      }
   },
   actions: {
      /**
       * @description 账号密码登录或手机号登录,304缓存读取时按登录时发送过来user_account为key,
       * 获取真实token
       * @returns 成功则返回200，失败则为404请求失败,500找不到请求地址
       */
      async login({ commit, getters }, payload: RequestUserInfo): Promise<number> {
         //根据请求的user_account从缓存中获取真实token
         const tokenState: RealToken = getters['getUserToken'];
         if (tokenState === null || tokenState === undefined) {
            try {
               let data = await LoginRequestApi<JsonUserState, RequestUserInfo>(payload).then(
                  (rawData) => rawData.data
               );

               if (data.status === HttpResponseStatus.SUCCESS) {
                  data.status = HttpResponseStatus.HAVEIT;
                  commit('setUserStateAll', data.data);
                  return Promise.resolve(HttpResponseStatus.SUCCESS);
               } else {
                  return Promise.resolve(HttpResponseStatus.FAIL);
               }
            } catch (e) {
               return Promise.reject(HttpResponseStatus.UNKNOWNERROR);
            }
         } else {
            //303,304状态码处理
            if (tokenState.status === HttpResponseStatus.HAVEIT) {
               return Promise.resolve(tokenState.status);
            } else if ((tokenState.status = HttpResponseStatus.SESSIONOUT)) {
               //缓存过期了重新请求,清空缓存
               persistent.cleanSessionOfKey(tokenState.token);
               persistent.cleanSessionOfKey(User_Info_Key);
               try {
                  let data = await LoginRequestApi<JsonUserState, RequestUserInfo>(payload).then(
                     (rawData) => rawData.data
                  );
                  if (data.status === HttpResponseStatus.SUCCESS) {
                     data.status = HttpResponseStatus.HAVEIT;
                     commit('setUserStateAll', data.data);
                     return Promise.resolve(HttpResponseStatus.SUCCESS);
                  } else {
                     return Promise.resolve(HttpResponseStatus.FAIL);
                  }
               } catch (e) {
                  return Promise.reject(HttpResponseStatus.UNKNOWNERROR);
               }
            } else {
               return Promise.resolve(HttpResponseStatus.FAIL);
            }
         }
      },
      /**退出登录，清除所有session会话存储 */
      loginOut() {
         persistent.cleanSessionAll();
         router.replace('/');
      }
   }
};

export default UserModule;
