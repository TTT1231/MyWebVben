import { Mime } from '@/enums/download';
export function downLoadByData(data: BlobPart, filename: string, mime: Mime = Mime.DEFAULT) {
   const blobData = [data];
   const blob = new Blob(blobData, { type: mime });
   //指向对象的url字符串
   const blobURL = window.URL.createObjectURL(blob);
   //借助html5 a标签的download属性实现
   const aDownload = document.createElement('a');
   //隐藏
   aDownload.style.display = 'none';
   aDownload.href = blobURL;
   aDownload.setAttribute('download', filename);
   document.body.appendChild(aDownload);
   aDownload.click();
   document.body.removeChild(aDownload);
   window.URL.revokeObjectURL(blobURL);
}
/**将图片url转化为base64 */
export function urlToBase64(url: string, mime: Mime = Mime.PNG): Promise<string> {
   return new Promise((resolve, reject) => {
      let canvas = document.createElement('canvas') as Nullable<HTMLCanvasElement>;
      const ctx = canvas!.getContext('2d');
      const img = new Image();
      img.onload = function () {
         //图片加载
         if (!canvas || !ctx) {
            return reject();
         }
         canvas.height = img.height;
         canvas.width = img.width;
         ctx.drawImage(img, 0, 0);
         const dataURL = canvas.toDataURL(mime);
         canvas = null;
         resolve(dataURL);
      };
      img.src = url;
   });
}
/**base64 to blob */
export function base64ToBlob(base64_str: string): Blob {
   console.log(base64_str);
   const parts = base64_str.split(';');
   const mime = (parts as string[])[0].split(',')[1];
   const convertBase64 = (parts as string[])[1].split(',')[1];

   const binaryBase64 = atob(convertBase64);
   let n = binaryBase64.length;
   const uint8 = new Uint8Array(n);
   while (n--) {
      uint8[n] = binaryBase64.charCodeAt(n);
   }
   return new Blob([uint8], { type: mime });
}
