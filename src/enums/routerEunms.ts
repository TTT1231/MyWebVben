export enum RouterControlMethod {
   /**
    * 前端控制，根据角色过滤路由，路由和菜单分开配置
    */
   ROUTERMENUSDIVIDE = 'Router_Menus_Divide_',
   /**
    * 前端控制，根据角色过滤路由，菜单由路由自动配置生成（前端路已经写好了）
    */
   ROUTERMENUSAUTO = 'Router_Menus_Auto_',
   /**
    * 后端接口返回路由,这里采用这种方式
    */
   ROUTERBACKCONTROL = 'Router_Menus_Back_'
}
