/**假设这里模拟从后端获取routes，
 * 并且账号密码，或手机号登录成功,
 * 动态组件已经引入，路由根据角色已经过滤
 * 生成了routes
 */
const menu = {
   path: '/main',
   name: 'main',
   component: () => import('@/views/MainForm.vue'),
   // redirect: '/main/analysis',
   meta: {
      title: '主页'
   },
   children: [
      {
         path: 'analysis',
         name: 'analysis',
         component: () => import('@/views/sys/analysis/index.vue'),
         meta: {
            title: '分析页面'
         }
      },
      {
         path: 'workbench',
         name: 'workbench',
         component: () => import('@/views/sys/workbench/index.vue'),
         meta: {
            title: '分析页面'
         }
      }
   ]
};
export default menu;
