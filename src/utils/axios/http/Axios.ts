import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';
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
