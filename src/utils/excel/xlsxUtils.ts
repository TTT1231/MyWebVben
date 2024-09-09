import type { TableType } from "@/types/fun/excel";
import * as XLSX from 'xlsx';
import { utils, writeFileXLSX } from 'xlsx';

export function headerBodyToExcelArray(header:Array<{ title: string }> ,body:Array<TableType>){
    if(!body.length){return}
    const excelArray: Array<Record<string, string|number>> = [];  
    const keys=Object.keys(body[0]);
    for(let i=0;i<body.length;i++){
        const rowData: Record<string, string|number> = {}; 
        for(let j=1;j<keys.length;j++){
            rowData[header[j-1].title] = body[i][keys[j]];
        } 
        excelArray.push(rowData)
    }
    return excelArray;
}

export function exportExcel(excelArray:Record<string, string | number>[],
    filename:string){
        const ws = utils.json_to_sheet(excelArray as Record<string, string | number>[]);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFileXLSX(wb, `${filename}.xlsx`);
}