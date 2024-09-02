import defhttp from '@/utils/axios';
import type { WebSocketRequest } from '@/types/fun/websocket';

export function WebSocketTest<T>(sendData: WebSocketRequest) {
   return defhttp
      .postRequest<T>({ url: sendData.api, data: sendData })
      .then((rawdata) => rawdata.data);
}
