export interface IsRetry {
   isOpen: Boolean;
   retryCount: number;
   waittime: number;
}
//ts-ignore
export interface RequestRetryType {
   validateMess: string;
   api: string;
   isRetry?: IsRetry;
}
