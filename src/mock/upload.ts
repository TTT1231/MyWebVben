import type { MockMethod } from 'vite-plugin-mock';
export const UploadMock: MockMethod[] = [
   {
      url: '/upload/success',
      method: 'post',
      timeout: 1000,
      response: ({ body }) => {
         return {
            body: body,
            status: 'done'
         };
      }
   },
   {
      url: '/upload/fail',
      method: 'post',
      timeout: 1000,
      response: ({ body }) => {
         return {
            body: body,
            status: 'error'
         };
      }
   }
];
export default UploadMock;
