import { HttpResponseStatus } from '@/enums/httprespstatus';
import { RouterPageEnum } from '@/enums/routerpageEnums';
import type { RealToken } from '@/types/user';
import type { Router } from 'vue-router';
import store from '@/store';
import { computed } from 'vue';
export function setupRouterRuard(router: Router) {
   createPermissionRuard(router);
}
import {useRouterLoading} from '@/hooks/useRouterLoading'
const {isStart,handleChange} = useRouterLoading()
//路由白名单下面已实现，暂时未用
const routerWhiltePath: RouterPageEnum[] = [RouterPageEnum.BASE_LOGIN];
function createPermissionRuard(router: Router) {
   const realToken = computed(() => store.getters['UserModule/getUserToken'] as RealToken);

   //    router.beforeEach(async to=>{
   //     console.log(to)
   //    })
   router.beforeEach(async (to, _, next) => {
      console.log('Route before:', to.path);
      isStart.value=true;
      // next();
      // isStart.value=!isStart.value;
      //不是登录页，且获取到了token,登录成功获取到了token，路由地址找不到
      if ((to.path !== '/' && realToken.value !== undefined)|| to.name === 'notfound' )   {
         if (realToken.value?.status === HttpResponseStatus.HAVEIT || to.name === 'notfound') {
            //更新面包屑导航以及左侧菜单currentIndex
            await store.dispatch('TabsModule/isInallTabs', to.path);

            next();
         } else {
            //登录过期返回登录页
            next({ name: 'login' });
         }
      } 
      else {
         if (to.path === '/' || to.name === 'notfound') {
            //放行
    
            next();
         } else {
            //没有获取到token情况下，且没有触发notfound,重定位登录页
            next({ name: 'login' });
         }
      }
   });
   router.afterEach(async (to, from) => {
      // 在路由跳转完成后重置状态
      // console.log('Route changed:', to.path, 'from', from.path);
     await  handleChange();
    });
   
}
