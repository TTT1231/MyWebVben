import type { TableType } from '@/types/fun/excel';
import { toUint8 } from '@/utils/string/touint8';
/**将table数据转化base64 */
export function tableToBase64(dataSource: Array<TableType>) {
   const jsonData = JSON.stringify(dataSource);
   const encoder = new TextEncoder();
   const uint8Array = encoder.encode(jsonData);
   const buff = Buffer.from(uint8Array);
   const base64_str = buff.toString('base64');
   console.log(base64_str);
   return base64_str;
}
export function base64ToBinaryString(uint8Array: Uint8Array) {}
