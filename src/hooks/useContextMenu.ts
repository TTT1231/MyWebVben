import {
   createContextMenu,
   destroyContextMenu
} from '@/components/fun/src/functioncom/createContextMenu';
import { getCurrentInstance, onUnmounted } from 'vue';
export function useContextMenu() {
   if (getCurrentInstance()) {
      onUnmounted(() => {
         destroyContextMenu();
      });
   }
   return [createContextMenu, destroyContextMenu];
}
