import { RouterPageEnum } from '@/enums/routerpageEnums';
import type { AppRouteRecordRaw } from '@/types/router';

// /**根路由 */
// export const RootRoute:AppRouteRecordRaw={
//     path: '/main',
//     name: 'main',
//     redirect: '/main/analysis',
//     meta:{
//         title:'根路由'
//     }
// }
/**登录路由 */
export const LoginRoute: AppRouteRecordRaw = {
   path: '/',
   name: 'login',
   component: () => import('@/views/login/LoginMain.vue'),
   meta: {
      title: '登录界面'
   }
};
export const NotfoundRoute: AppRouteRecordRaw = {
   name: 'notfound',
   path: '/:path(.*)*',
   component: () => import('@/components/NotFound.vue'),
   meta: {
      title: '页面找不到'
   }
   // children: [
   //     {
   //       path: '/:path(.*)*',
   //       name:'notfound',
   //       component:()=>import('@/components/NotFound.vue'),
   //       meta:{
   //           title:'页面找不到'
   //       },
   //     },
   //   ],
};
export const basicRoutes = [LoginRoute, NotfoundRoute];
