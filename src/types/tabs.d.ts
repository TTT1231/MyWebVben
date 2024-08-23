export interface BreadNavRaw {
   title: string;
   path: string;
   /**用于标识，好识别 */
   key?: string;
}
export interface TabsRoot {
   /**当前的导航 */
   currentTab: BreadNavRaw[];
   /**全部导航数据 */
   allTab: BreadNavRaw[];
   /**当前导航索引 */
   currentTabIndex: string;
}
