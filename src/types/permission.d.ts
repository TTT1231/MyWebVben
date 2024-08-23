import type { HttpResponseStatus } from '@/enums/httprespstatus';

/**
 * @description根据_id查询权限按钮名字类型
 */
export interface AlterMenusType {
   _id: number;
   payload: any;
}
/**
 * @description 解决json文件类型不能赋值让ts编译器明白其类型
 */
export interface JsonMenus {
   status: HttpResponseStatus;
   message: string;
   data: AuthMenus[];
}
export interface AuthMenusState {
   // Permission code list
   // 权限代码列表这里假设从后端读取，这里没有实现
   // permCodeList: string[] | number[];
   // 路由是否动态添加,记录左侧菜单是否已经加载
   isDynamicAddedRoute: Boolean;
   // 后台菜单列表
   backMenuList: AuthMenus[];
   // 菜单列表
   // frontMenuList: AuthMenus[];
   //当前路由控制模式
   currentPermissionMode: RouterControlMethod;
}
export interface AuthMenus {
   _id: number;
   user_id: number;
   menuname: string;
   menutype: string;
   parent_id: number;
   iconpath: string;
   path: string;
   childrens: AuthMenus[];
}
/**
 * @description session存储authMenus类型
 */
export interface PermissionModuleState {
   status: HttpResponseStatus;
   menusobj: AuthMenusState;
}
export interface MenusState {
   status: HttpResponseStatus;
   menus: AuthMenus[];
}
