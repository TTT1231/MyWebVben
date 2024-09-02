//利用promise模拟休眠
export function sleep(ms: number) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}
