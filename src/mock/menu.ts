import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, resultFailure } from './_utils';
import menus from '../assets/authmenu.json';
import { createFakeUserList } from './fakedata';
export default [
   {
      url: '/api/authmenus',
      method: 'post',
      timeout: 1000,
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
         return resultSuccess(menus.data);
      }
   }
] as unknown as MockMethod;
