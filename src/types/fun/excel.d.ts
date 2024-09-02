import { validMime } from '@/enums/excel';
export interface RuleForm {
   filename: string;
   mime: validMime | '';
}
export interface WatchRuleForm extends RuleForm {
   isstart: Boolean;
}
export interface TableType {
   [key: string]: number | string;
   key: number;
   ID: number;
   name: string;
   age: number;
   bianhao: string;
   address: string;
   starttime: string;
   endtime: string;
}
