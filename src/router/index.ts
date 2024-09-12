import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { basicRoutes } from './routes/indes';
import menu from '@/router/routes/modules/index';
// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
   array.forEach((item) => {
      WHITE_NAME_LIST.push(item.name);
      getRouteNames(item.children || []);
   });
getRouteNames(basicRoutes);
export const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: basicRoutes as unknown as RouteRecordRaw[]
   //  scrollBehavior: () => ({ left: 0, top: 0 }),
});
function initRoutes(menu: any) {
   console.log('初始化路由')
   router.addRoute(menu);
}

export function setupRouter(app: App<Element>) {
   initRoutes(menu);
   app.use(router);
}
