import { sleep } from "@/utils/sleep";
import { ref } from "vue";

export const rawPercentage=ref<number>(0);
export const isStart=ref(false);
export const iscomplish=ref(false);
const handleChange=async()=>{
    try {
          // isStart.value = !isStart.value;
          if (!isStart.value) return;
  
          for (let i = 0; i <= 100; i += 25) {
            rawPercentage.value = i;
            await sleep(50);
          }
          await sleep(500);
  
          // 完成后设置标志，并等待一段时间再重置
          iscomplish.value = true;
  
          // 重置状态
          isStart.value = false;
          rawPercentage.value = 0;
          isShow.value = false;
        } catch (e) {
          console.log(e);
        }
  
  
  }
  export const useRouterLoading=()=>{
    return {
        handleChange,
        rawPercentage,
        iscomplish,
        isStart
    }
  }