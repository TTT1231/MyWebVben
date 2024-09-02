import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';
import { requestRetryApi } from '@/api/fun/requestretry';
import { sleep } from '@/utils/sleep';
// import { useSleep } from '@/hooks/useSleep';
import type { RequestRetryType } from '@/types/fun/requestretry';

export interface RequestRaw<T> {
   config: any;
   data: T;
   headers: AxiosHeaders;
   request: XMLHttpRequest;
   status: number;
}
export class VAxios {
   private axiosInstance: AxiosInstance;
   private readonly config: AxiosRequestConfig;
   constructor(config: AxiosRequestConfig) {
      this.config = config;
      this.axiosInstance = axios.create(config);
   }

   setupResponseRetryInterceptor() {
      this.axiosInstance.interceptors.response.use(async (resp) => {
         console.log(resp);
         if (resp.config.data) {
            const data: RequestRetryType = JSON.parse(resp.config.data);
            console.log(data);
            if (data?.isRetry?.isOpen) {
               //请求重试
               if (data.isRetry.retryCount !== 0) {
                  data.isRetry.retryCount = data.isRetry.retryCount - 1;
                  //休眠后,重新发起请求
                  // await useSleep(data.isRetry.waittime);
                  await sleep(data.isRetry.waittime);
                  //请求也要花费时间,其所在mock默认等待时间为500ms
                  await requestRetryApi(data);
               }
            }
         }
         return resp;
      });
   }
   getAxiosInstance(): AxiosInstance {
      return this.axiosInstance;
   }
   getRequest<T = any>(config?: AxiosRequestConfig): Promise<T> {
      return this.axiosInstance.request({ ...config, method: 'GET' });
   }
   postRequest<T = any, D = any>(config?: AxiosRequestConfig<D>): Promise<RequestRaw<T>> {
      return this.axiosInstance.request({ ...config, method: 'POST' });
   }
}
