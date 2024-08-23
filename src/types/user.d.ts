import type { HttpResponseStatus } from '@/enums/httprespstatus';
import type { AuthMenus, AvoidMenusReactiable } from '@/types/menus';

export interface UserInfo {
   user_id: number;
   user_name: string;
   user_realname: string;
   user_account: string;
   user_password: string;
   user_mobile: string;
   // /**
   //  * @description 左侧侧边栏权限菜单表
   //  */
   // authMenus:AuthMenus[],
   // role:UserRole,
   // /**
   //  * @description 令牌
   //  */
   // token:string,
   // status:number,
   // message:string,
   // /**
   //  * @description 请求发送之前发送给服务器验证信息，服务器返回回来
   //  */
   // validatemess:string,
}
//请求登录类型
export interface RequestUserInfo {
   user_account: string;
   user_password: string;
   user_mobile?: string;
   validatemess: string;
}
/**
 * 真实token存储类型
 */
export interface RealToken {
   status: HttpResponseStatus;
   token: string;
}
