import { tableToTxt } from '@/utils/excel/tableToTxt';
import { tableToBase64 } from '@/utils/excel/tableToBase64';
import { tableToHtml } from '@/utils/excel/tableToHtml';
export function useExcel() {
   return { tableToTxt, tableToBase64, tableToHtml };
}
