// import 'tailwindcss'
import './assets/tailwindcss/input.css';
import './assets/css/login.css';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from '@/router/index';
import { setupStore } from './store';
import { setupRouterRuard } from './router/guard';
import { router } from './router/index';
import { setupCountDownDirective } from './directives/countdown';
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
   app.component(key, component);
}
//配置路由
setupRouter(app);
//配置vuex
setupStore(app);
//配置路由守卫
setupRouterRuard(router);
//配置倒计时指令
setupCountDownDirective(app);
app.mount('#app');
