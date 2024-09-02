import { UploadMimeImage } from '@/enums/upload';
/** 文件类型转base64*/
export function getBase64(file: Blob, callback: (base64Url: string) => void) {
   const reader = new FileReader();
   //待图片加载完成，执行回调函数
   reader.addEventListener('load', () => {
      callback(reader.result as string);
   });
   reader.readAsDataURL(file);
}
/**
 * @description 根据传递过来types判断是否是常见图片类型
 * @param fileType 文件类型
 * @returns true is image else no
 */
export function isImage(fileType: string | undefined) {
   if (undefined) {
      return false;
   }
   let flag = true;
   switch (fileType) {
      case UploadMimeImage.JPEG:
         break;
      case UploadMimeImage.PNG:
         break;
      case UploadMimeImage.SVG:
         break;
      default:
         flag = false;
         break;
   }
   return flag;
}
