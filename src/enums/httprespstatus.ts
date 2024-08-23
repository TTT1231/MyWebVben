/**
 * @description http响应状态码200-成功状态码,304缓存已存在未过期使用缓存,
 * 305缓存已过期
 * 404请求失败
 */
export enum HttpResponseStatus {
   SUCCESS = 200,
   HAVEIT = 303,
   SESSIONOUT = 304,
   FAIL = 404,
   UNKNOWNERROR = 500
}
