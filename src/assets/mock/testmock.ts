import type { MockMethod } from 'vite-plugin-mock';
const mockAPI: MockMethod[] = [
   {
      url: '/api/qwe',
      method: 'post',
      // timeout: 1000,
      response: () => {
         return {
            mess: '成功',
            data: {
               hello: '你好'
            }
         };
      }
   }
];
export default mockAPI;
