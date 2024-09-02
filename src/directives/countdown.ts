import type { App, Directive } from 'vue';
interface CountDownSetting {
   /**步长,默认500 */
   step: number;
   /**间隔时间,默认40ms */
   gaptime: number;
   /**总时间,默认800ms */
   totaltime: number;
}
const CountDown: Directive<any, CountDownSetting> = {
   mounted(el, binding) {
      const gaptime: number = binding.value.gaptime ? binding.value.gaptime : 30;
      const endCount: number = el.textContent;
      const totaltime: number = binding.value.totaltime ? binding.value.totaltime : 800;
      const step = Math.floor(endCount / (totaltime / gaptime));
      let start = 0;
      setTimeout(() => {
         const timer = setInterval(() => {
            start += step;
            if (start >= endCount) {
               start = endCount;
               el.textContent = start;
               clearInterval(timer);
            }
            el.textContent = start;
         }, gaptime);
      }, 100);
   }
};
export function setupCountDownDirective(app: App<Element>) {
   app.directive('countdown', CountDown);
}
