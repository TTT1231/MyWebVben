import type { MockMethod } from 'vite-plugin-mock';
export default [
   {
      //测试服务器,没有api或api为空默认地址栏上http地址
      url: '/main/fun/websocket',
      method: 'post',
      timeout: 500,
      response: ({ body }) => {
         const { validateMess } = body;
         return {
            status: 200,
            mess: '成功',
            data: {
               validateMess: validateMess,
               serverMess: '服务器响应成功'
            }
         };
      }
   },
   {
      //测试api
      url: '/websocket_test',
      method: 'post',
      timeout: 500,
      response: ({ body }) => {
         const { validateMess } = body;
         return {
            status: 200,
            mess: '成功',
            data: {
               validateMess: validateMess,
               serverMess: `
                    receiveData:${validateMess === '' ? '你发送数据为空' : validateMess} ,\n
                    sentData:websocket_test API测试成功
                `
            }
         };
      }
   }
] as MockMethod[];
