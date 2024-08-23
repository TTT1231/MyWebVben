import defhttp from '@/utils/axios';
import type { RequestRaw } from '@/utils/axios/http/Axios';
enum LoginApi {
   ACCOUNT_LOGIN = '/api/user',
   AUTHMENUS = '/api/authmenus'
}
/**
 * @description 登录请求post方法
 * @template T 返回数据类型
 * @template D 登录请求数据类型
 * @param data 发出请求之前post传递的数据
 */
export function LoginRequestApi<T, D>(data: D): Promise<RequestRaw<T>> {
   return defhttp.postRequest<T, D>({ url: LoginApi.ACCOUNT_LOGIN, data: data });
}
export function AuthMenusRequestApi<T, D>(data: D): Promise<RequestRaw<T>> {
   return defhttp.postRequest<T, D>({ url: LoginApi.AUTHMENUS, data: data });
}
