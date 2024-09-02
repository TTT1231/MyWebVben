import defhttp from '@/utils/axios';
import type { WebSocketServeReturnType } from '@/types/fun/websocket';
import type { RequestRetryType } from '@/types/fun/requestretry';
export function requestRetryApi(sendData: RequestRetryType) {
   return defhttp
      .postRequest<WebSocketServeReturnType>({ url: sendData.api, data: sendData })
      .then((rawdata) => rawdata.data);
}
