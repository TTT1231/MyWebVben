import { IMAGE_HOME } from '@/enums/imagehomepath';
export interface GrowCardItem {
   icon: string;
   title: string;
   value: number;
   total: number;
   color: string;
   time: string;
}

export const growCardList: GrowCardItem[] = [
   {
      title: '访问数',
      icon: `${IMAGE_HOME}clock.png`,
      value: 2000,
      total: 120000,
      color: 'green',
      time: '月'
   },
   {
      title: '成交额',
      icon: `${IMAGE_HOME}commit.png`,
      value: 20000,
      total: 500000,
      color: 'blue',
      time: '月'
   },
   {
      title: '下载数',
      icon: `${IMAGE_HOME}download.png`,
      value: 8000,
      total: 120000,
      color: 'orange',
      time: '周'
   },
   {
      title: '成交数',
      icon: `${IMAGE_HOME}pie.png`,
      value: 5000,
      total: 50000,
      color: 'purple',
      time: '年'
   }
];
