import { IMAGE_HOME } from '@/enums/imagehomepath';
import type { EChartsOption } from 'echarts';
const imgHome = `${IMAGE_HOME}sys/workbench/`;
export const fastNavCardImgPath = [
   {
      title: '首页',
      imgpath: `${imgHome}home.png`
   },
   {
      title: '仪表盘',
      imgpath: `${imgHome}panel.png`
   },
   {
      title: '组件',
      imgpath: `${imgHome}module.png`
   },
   {
      title: '系统管理',
      imgpath: `${imgHome}setting.png`
   },
   {
      title: '权限管理',
      imgpath: `${imgHome}key.png`
   },
   {
      title: '图表',
      imgpath: `${imgHome}chart.png`
   }
];
export const raderDataOptions: EChartsOption = {
   legend: {
      bottom: 0,
      data: ['Visits', 'Sales']
   },
   tooltip: {},
   radar: {
      radius: '60%',
      splitNumber: 8,
      indicator: [
         {
            name: '2017'
         },
         {
            name: '2017'
         },
         {
            name: '2018'
         },
         {
            name: '2019'
         },
         {
            name: '2020'
         },
         {
            name: '2021'
         }
      ]
   },
   series: [
      {
         type: 'radar',
         symbolSize: 0,
         areaStyle: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1
         },
         data: [
            {
               value: [90, 50, 86, 40, 50, 20],
               name: 'Visits',
               itemStyle: {
                  color: '#b6a2de'
               }
            },
            {
               value: [70, 75, 70, 76, 20, 85],
               name: 'Sales',
               itemStyle: {
                  color: '#67e0e3'
               }
            }
         ]
      }
   ]
};
export const statrtworkImgPath = `${imgHome}startwork.png`;
