//数据转化工具
export function resultSuccess<T = Recordable>(result: T, { message = 'ok' } = {}) {
   return {
      status: 200,
      message,
      data: { ...result }
   };
}
export function resultFailure(message = 'fail') {
   return {
      status: 404,
      message: message,
      data: {}
   };
}
