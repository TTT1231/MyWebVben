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
         path: '/:patchMatch(.*)',
         name: 'notfound',
         component: () => import('@/components/NotFound.vue')
      },
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
            title: '工作台页面'
         }
      },
      {
         path: 'fun',
         name: 'fun',
         meta: {
            title: '功能'
         },
         children: [
            {
               path: 'shotscreen',
               name: 'shotscreen',
               component: () => import('@/components/fun/src/ShotScreen.vue'),
               meta: {
                  title: '截图'
               }
            },
            {
               path: 'websocket',
               name: 'websocket',
               component: () => import('@/components/fun/src/WebSocket.vue'),
               meta: {
                  title: 'websocket测试'
               }
            },
            {
               path: 'requestretry',
               name: 'requestretry',
               component: () => import('@/components/fun/src/RequestRetry.vue'),
               meta: {
                  title: '测试请求重试'
               }
            },
            {
               path: 'loginout',
               name: 'loginout',
               component: () => import('@/components/fun/src/LoginOut.vue'),
               meta: {
                  title: '登录过期'
               }
            },
            {
               path: 'print',
               name: 'print',
               component: () => import('@/components/fun/src/PrintFun.vue'),
               meta: {
                  title: '打印'
               }
            },
            {
               path: 'rightmenu',
               name: 'rightmenu',
               component: () => import('@/components/fun/src/RightMenu.vue'),
               meta: {
                  title: '右键菜单'
               }
            },
            {
               path: 'download',
               name: 'download',
               component: () => import('@/components/fun/src/DownLoad.vue'),
               meta: {
                  title: '文件下载'
               }
            },
            {
               path: 'imgpreview',
               name: 'imgpreview',
               component: () => import('@/components/fun/src/UploadImg.vue'),
               meta: {
                  title: '图片预览'
               }
            },
            {
               path: 'cuttext',
               name: 'cuttext',
               component: () => import('@/components/fun/src/CutPanel.vue'),
               meta: {
                  title: '剪切板'
               }
            },
            {
               path: 'ripple',
               name: 'ripple',
               component: () => import('@/components/fun/src/RippleWrap.vue'),
               meta: {
                  title: '水波纹'
               }
            },
            {
               path: 'fullscreen',
               name: 'fullscreen',
               component: () => import('@/components/fun/src/FullScreen.vue'),
               meta: {
                  title: '全屏'
               }
            },
            {
               path: 'excel',
               name: 'excel',
               meta: {
                  title: 'excel'
               },
               children: [
                  {
                     path: 'export1',
                     name: 'export1',
                     component: () => import('@/views/sys/fun/excel/SelectExport.vue'),
                     meta: {
                        title: '选择导出方式'
                     }
                  },
                  {
                     path: 'import',
                     name: 'import',
                     component: () => import('@/components/fun/src/basetable/src/ExcelImport.vue'),
                     meta: {
                        title: 'Excel导入'
                     }
                  },
               ]
            }
         ]
      },
      {
         path: 'test',
         name: 'test',
         component: () => import('@/components/fun/src/basetable/src/ExcelExport.vue'),
         meta: {
            title: '单元测试'
         }
      }
   ]
};
export default menu;
