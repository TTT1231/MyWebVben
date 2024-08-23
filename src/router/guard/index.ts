import { HttpResponseStatus } from '@/enums/httprespstatus';
import { RouterPageEnum } from '@/enums/routerpageEnums';
import type { RealToken } from '@/types/user';
import type { Router } from 'vue-router';
import store from '@/store';
import { computed } from 'vue';
export function setupRouterRuard(router: Router) {
   createPermissionRuard(router);
}
//路由白名单下面已实现，暂时未用
const routerWhiltePath: RouterPageEnum[] = [RouterPageEnum.BASE_LOGIN];
function createPermissionRuard(router: Router) {
   const realToken = computed(() => store.getters['UserModule/getUserToken'] as RealToken);

   //    router.beforeEach(async to=>{
   //     console.log(to)
   //    })
   router.beforeEach(async (to, _, next) => {
      //不是登录页，且获取到了token,同时引入主页未找到路由地址 notfound
      if ((to.path !== '/' || to.name === 'notfound') && realToken !== undefined) {
         if (realToken.value?.status === HttpResponseStatus.HAVEIT || to.name === 'notfound') {
            //输入路径，更新面包屑导航以及左侧菜单currentIndex
            await store.dispatch('TabsModule/isInallTabs', to.path);
            next();
         } else {
            //登录过期返回登录页
            next({ name: 'login' });
         }
      } else {
         if (to.path === '/' || to.name === 'notfound') {
            //放行
            next();
         } else {
            //没有获取到token情况下，且没有触发notfound,重定位登录页
            next({ name: 'login' });
         }
      }
   });
}
