/**文件上传类型 对应的上传示例其实可以上传多种，这里我取图片
 * 图片预览判断用,使用常见几种图片类型，
 */
export enum UploadMimeImage {
   PNG = 'image/png',
   JPG = 'image/jpeg',
   JPEG = 'image/jpeg',
   SVG = 'image/svg+xml'
}
export enum UploadResponseStatus {
   SUCCESS = 'done',
   //ts-ignore 不会用在http response中
   UPLOADING = 'uploading',
   FAIL = 'error'
}
