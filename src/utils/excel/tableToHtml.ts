import { ExcelMime } from '@/enums/excel';
import type { TableType } from '@/types/fun/excel';
export function tableToHtml(
   header: Array<{ title: string }>,
   dataSource: Array<TableType>,
   filename: string
) {
   const frontStr = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>HTML表格数据</title>
        </head>
        <body>
        <table border="1">`;
   const endStr = `</table>
	</body>
</html>`;
   let bodyStr = ``;
   let tableHeader = `<thead><tr><th></th>`; //<thead><tr></tr></thead>

   for (let i = 0; i < header.length; i++) {
      tableHeader += `<th>${header[i].title}</th>`;
   }
   tableHeader += `</tr></thead>`;

   let tableBody = '<tbody>'; //</tbody>
   for (let j = 0; j < dataSource.length; j++) {
      let obj = dataSource[j];
      tableBody += `<tr>`; //</tr>
      Object.keys(obj).forEach((key) => {
         tableBody += `<td>${obj[key]}</td>`;
      });
      tableBody += `</tr>`; //</tr>
   }
   tableBody += `</tbody>`;
   bodyStr = tableHeader + tableBody;
   const tableHTMLStr = frontStr + bodyStr + endStr;

   const blob = new Blob([tableHTMLStr], { type: ExcelMime.HTML });
   const url: string | null = URL.createObjectURL(blob);
   let tempDownLoadLink: HTMLAnchorElement | null = document.createElement('a');
   tempDownLoadLink.href = url;
   tempDownLoadLink.style.display = 'none';
   tempDownLoadLink.setAttribute('download', `${filename}.html`);
   tempDownLoadLink.click();

   tempDownLoadLink = null;
   URL.revokeObjectURL(url);
}
