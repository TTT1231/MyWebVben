import echarts from '@/utils/lib/echarts';
import { unref, type Ref, nextTick, ref, computed } from 'vue';
import type { EChartsOption } from 'echarts';
import { CanvasRenderer } from 'echarts/renderers';
export function useEchart(elRef: Ref<HTMLDivElement>) {
   let chartInstance: echarts.ECharts | null = null;
   // const cacheOptions = ref({}) as Ref<EChartsOption>;
   // const getOptions=computed(()=>{
   //     return {...cacheOptions.value} as EChartsOption
   // })
   function initCharts() {
      const el = unref(elRef);
      if (!el || !unref(el)) {
         return;
      }
      echarts.use(CanvasRenderer);
      chartInstance = echarts.init(el);
   }
   /**
    * @description 解决a-card嵌套dom异步加载问题
    */
   function setOptions(options: EChartsOption, clean = true) {
      return new Promise((resolve) => {
         // if (unref(elRef)?.offsetHeight === 0) {
         //       setOptions(options);
         //       resolve(null);
         // }
         nextTick(() => {
            if (!chartInstance) {
               initCharts();
               if (!chartInstance) return;
            }
            clean && chartInstance?.clear();
            chartInstance?.setOption(options);
            resolve(null);
         });
      });
   }
   return {
      setOptions
   };
}
