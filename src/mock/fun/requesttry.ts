import type { MockMethod } from 'vite-plugin-mock';
import { resultFailure } from '../_utils';
export default [
   {
      //测试api
      url: '/retry',
      method: 'post',
      timeout: 500,
      response: () => {
         return resultFailure();
      }
   }
] as MockMethod[];
