import { ElMessage } from 'element-plus';

type MessageType = 'info' | 'success' | 'warning' | 'error';
interface MessageOptionType {
   type?: MessageType;
   duration?: number;
   showClose?: boolean;
   offset?: number;
   grouping?: boolean;
}
const createMessage = (message: string, option?: MessageOptionType) => {
   if (option !== null) {
      const istype = option?.type ? option.type : 'info';
      const isduration = option?.duration ? option.duration : 3000;
      const isoffset = option?.offset ? option.offset : 16;
      const isShowClose = option?.showClose ? true : false;
      const isgrouping = option?.grouping ? true : false;
      return ElMessage({
         message: message,
         type: istype,
         duration: isduration,
         offset: isoffset,
         showClose: isShowClose,
         grouping: isgrouping
      });
   } else {
      return ElMessage({ message: message });
   }
};
export function useMessage() {
   return createMessage;
}
