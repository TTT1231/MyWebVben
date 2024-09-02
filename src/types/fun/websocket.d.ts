export interface WebSocketServeReturnType {
   status: number;
   message: string;
   data: Boolean;
}
export interface WebSocketReturnType {
   status: number;
   message: string;
   data: DataReturnType;
}
export interface DataReturnType {
   validateMess: string;
   serverMess: string;
}
export interface WebSocketRequest {
   api: string;
   validateMess: string;
}
