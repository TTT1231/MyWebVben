/**使用hooks封装休眠函数 */
export function sleep(ms: number) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function useSleep(ms: number) {
   await sleep(ms);
}
