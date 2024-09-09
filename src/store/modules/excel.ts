import type { TableType, WatchRuleForm } from '@/types/fun/excel';
import type { Module } from 'vuex';
import { validMime } from '@/enums/excel';
import { useExcel } from '@/hooks/useExcel';
import { useMessage } from '@/hooks/useMessage';
import { headerBodyToExcelArray,exportExcel} from '@/utils/excel/xlsxUtils'
import * as XLSX from 'xlsx';

import { utils, writeFileXLSX } from 'xlsx';
interface ExcelStateType extends WatchRuleForm {
   header: Array<{ title: string }>;
   data: Array<TableType>;
   achieve: Boolean;
}
const ExcelModule: Module<ExcelStateType, any> = {
   namespaced: true,
   state: () => {
      return {
         filename: '',
         mime: '',
         isstart: false,
         header: [],
         data: [],
         achieve: true
      };
   },
   mutations: {
      setFileName(state, payload: string) {
         state.filename = payload;
      },
      setMime(state, payload: any) {
         state.mime = payload;
      },
      setIsStart(state, payload: boolean) {
         state.isstart = payload;
      },
      setHeader(state, payload: Array<{ title: string }>) {
         state.header = payload;
      },
      setData(state, payload: Array<TableType>) {
         state.data = payload;
      },
      setRuleFormAll(
         state,
         payload: {
            filename: string;
            mime: '' | validMime;
            isstart: Boolean;
         }
      ) {
         state.filename = payload.filename;
         state.mime = payload.mime;
         state.isstart = payload.isstart;
      },
      setAchieve(state, payload: Boolean) {
         state.achieve = payload;
      }
   },
   getters: {
      getFileName(state) {
         return state.filename;
      },
      getMime(state) {
         return state.mime;
      },
      getIsStart(state) {
         return state.isstart;
      },
      getHeader(state) {
         return state.header;
      },
      getData(state) {
         return state.data;
      },
      getAchieve(state) {
         return state.achieve;
      }
   },
   actions: {
      hanldeUnionProcedure({ state }) {
         const { tableToTxt, tableToHtml } = useExcel();
         const createMessage = useMessage();
         if (state.isstart) {
            switch (state.mime) {
               case validMime.CSV:
                  state.achieve = false;
                  createMessage('暂未实现', { type: 'error', duration: 800 });
                  break;
               case validMime.HTML:
                  tableToHtml(state.header, state.data, state.filename);
                  break;
               case validMime.TXT:
                  tableToTxt(state.header, state.data, state.filename);
                  break;
               case validMime.XLSX:
                  const excelArray= headerBodyToExcelArray(state.header,state.data);
                  if(!excelArray){ createMessage('数据转化错误', { type: 'error', duration: 1000 });}
                  else{
                     exportExcel(excelArray,state.filename);
                  }
                  break;
               default:
                  break;
            }
         }
      }
   }
};
export default ExcelModule;
