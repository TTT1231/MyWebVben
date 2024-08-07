import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

//ElementPlus自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

//Ant Design Vue 解析器，识别antd组件通过unplugin-vue-components插件引入  
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
//mock服务
import {viteMockServe} from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({importStyle:true}),
        AntDesignVueResolver({importStyle:false}),//antd4内部采用css in js无需引入样式
      ],
    }),
    viteMockServe({
      mockPath:'./src/assets/mock',
      enable:true,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    proxy: {
      '/api': {
        target: 'https://localhost:3000',
        // changeOrigin: true,
        // // only https
        // secure: false,
      }
    }
  }
})
