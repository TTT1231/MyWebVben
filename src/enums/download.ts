/**文件下载类型 */
export enum Mime {
   XLS = 'application/vnd.ms-excel',
   DOC = 'application/msword',
   PDF = 'application/pdf',
   PNG = 'image/png',
   JPG = 'image/jpeg',
   JPEG = 'image/jpeg',
   JSON = 'application/json',
   TXT = 'text/plain',
   /**默认类型，启用时应该手动给文件名加后缀类型 */
   DEFAULT = 'application/octet-stream'
}
