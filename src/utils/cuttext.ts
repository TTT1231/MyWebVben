import { useMessage } from '@/hooks/useMessage';

const createMessgae = useMessage();
/**此粘贴功能仅用在一些支持https中使用，可能会因为用户游览器设置而粘贴失败 */
export function copyText(text: string, tipText?: string) {
   navigator.clipboard
      .writeText(text)
      .then(() => {
         if (tipText) {
            createMessgae(tipText, { type: 'success', duration: 1000 });
         } else {
            createMessgae('粘贴成功', { type: 'success', duration: 1000 });
         }
      })
      .catch((e) => {
         createMessgae('粘贴失败' + e.message, { type: 'error', duration: 1000 });
      });
}
