/**轴心 */
export interface Axis {
   x: number;
   y: number;
}
export interface ContextMenuItem {
   label: string;
   front?: string;
   hidden?: boolean;
   diabled?: boolean;
   handler?: Fn;
   children?: ContextMenuItem[];
}
export interface ContextMenuProps {
   event?: MouseEvent;
   styles: any;
   items: ContextMenuItem[];
   customEvent: MouseEvent;
   axis?: Axis;
   width?: number;
}
export interface CreteContextOptions {
   event: MouseEvent;
   front?: string;
   styles?: any;
   items?: ContextMenuItem[];
}
export interface ItemContentProps {
   showIcon: boolean | undefined;
   item: ContextMenuItem;
   handler: Fn;
}
