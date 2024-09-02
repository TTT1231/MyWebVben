import { IMAGE_HOME } from '@/enums/imagehomepath';

const imgHomePath = `${IMAGE_HOME}sys/header/notify/`;

/** 通知数据*/
export const listData: Array<{
   title: string;
   avatar: string;
   description: string;
}> = [
   {
      title: '你收到了10份新周报',
      avatar: `${imgHomePath}1.png`,
      description: '2024-7-15'
   },
   {
      title: '今天多云',
      avatar: `${imgHomePath}2.png`,
      description: '2024-7-15'
   },
   {
      title: '电脑图片',
      avatar: `${imgHomePath}3.png`,
      description: '2024-7-15'
   },
   {
      title: '收到信息1',
      avatar: `${imgHomePath}4.png`,
      description: '2024-7-16'
   },
   {
      title: '收到信息2',
      avatar: `${imgHomePath}5.png`,
      description: '2024-7-17'
   },
   {
      title: '收到信息3',
      avatar: `${imgHomePath}6.png`,
      description: '2024-7-18'
   },
   {
      title: '收到信息4',
      avatar: `${imgHomePath}7.png`,
      description: '2024-7-19'
   },
   {
      title: '收到信息5',
      avatar: `${imgHomePath}8.png`,
      description: '2024-7-20'
   }
];
/**通知栏页签标题 */
export const notifyTitle: Array<{
   title: string;
   count: number;
}> = [
   {
      title: '通知',
      count: 10
   },
   {
      title: '通知',
      count: 10
   },
   {
      title: '通知',
      count: 10
   }
];
