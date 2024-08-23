export function createFakeUserList() {
   return [
      {
         userInfo: {
            user_id: 1,
            user_name: 'adminname',
            user_realname: 'superadmin',
            user_account: 'admin',
            user_password: '123456',
            user_mobile: '18811111133'
         },
         role: 'admin',
         token: 'admintoken',
         sessionTimeout: false,
         lastUpdateTime: 2024
      }
   ];
}
