export function toUint8(jsonString: string): Uint8Array {
   //这里使用web-api textencoder 解决json string 中有非ASCII字符的字符串
   const encoder = new TextEncoder();
   const uint8Array = encoder.encode(jsonString);
   return uint8Array;
}
