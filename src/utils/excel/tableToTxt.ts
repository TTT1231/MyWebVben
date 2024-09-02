import type { TableType } from '@/types/fun/excel';
import { ExcelMime } from '@/enums/excel';

export function tableToTxt(
   header: Array<{ title: string }>,
   dataSource: Array<TableType>,
   filename: string
) {
   let headstr = '';
   header.forEach((item) => {
      headstr += `${item.title}\t`;
   });
   let bodystr = '' + headstr + '\n';
   dataSource.forEach((item) => {
      bodystr += `${item.ID}\t${item.name}\t${item.age}\t${item.bianhao}\t${item.address}\t${item.starttime}\t${item.endtime}\t\n`;
   });
   const blob = new Blob([bodystr], { type: `${ExcelMime.TXT};chartset=utf-8` });
   const url = URL.createObjectURL(blob);
   let downloadTxt: HTMLAnchorElement | null = document.createElement('a');
   downloadTxt.href = url;
   downloadTxt.setAttribute('download', `${filename}.txt`);
   downloadTxt.style.display = 'none';
   downloadTxt.click();
   URL.revokeObjectURL(url);
   downloadTxt = null;
}
