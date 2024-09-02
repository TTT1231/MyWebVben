import type { AuthMenus } from '@/types/permission';
import type { Ref } from 'vue';

//权限菜单用，这里以后端返回为主，并不使用前端管理

/**
 * @description 按菜单_id更新菜单名
 */
export function updateMenusNameById(data: AuthMenus[], id: number, newValue: string): void {
   for (const item of data) {
      if (item._id === id) {
         item.menuname = newValue;
         return; // 找到并更新后直接返回
      }
      if (item.menutype === 'tree') {
         updateMenusNameById(item.childrens, id, newValue); // 递归查找子项
      }
   }
}
/**
 * @description 按菜单_id获取菜单名
 */
export function getMenusNameById(data: AuthMenus[], id: number, returnvalue: Ref): void {
   for (const item of data) {
      if (item._id === id) {
         returnvalue.value = item.menuname;
         return; // 找到并更新后直接返回
      }
      if (item.menutype === 'tree') {
         getMenusNameById(item.childrens, id, returnvalue); // 递归查找子项
      }
   }
}
