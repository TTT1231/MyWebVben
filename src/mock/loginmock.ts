import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, resultFailure } from './_utils';
import { createFakeUserList } from './fakedata';

export default [
   {
      url: '/api/test',
      method: 'post',
      // timeout: 1000,
      response: ({ body }) => {
         const { user_account, user_password, user_mobile } = body;
         //   const {user_account,user_password,user_mobile}={...body}
         return {
            status: 200,
            user_mobile: body
         };
      }
   },
   {
      url: '/api/user',
      method: 'post',
      timeout: 200,
      response: ({ body }) => {
         const { user_account, user_password, user_mobile } = body;
         const checkUser = createFakeUserList().find(
            (item) =>
               (item.userInfo.user_account === user_account &&
                  item.userInfo.user_password === user_password) ||
               item.userInfo.user_mobile === user_mobile
         );
         if (!checkUser) {
            return resultFailure();
         }
         return resultSuccess(checkUser);
      }
   },
   {
      url: '/api/user/error',
      method: 'post',
      timeout: 200,
      response: (body: any) => {
         return resultFailure(body.body);
      }
   }
] as MockMethod[];
