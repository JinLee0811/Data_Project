import React, { forwardRef } from 'react';
import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Title, Legend);

const data = {
  labels: [
    '통근·통학에 좋은 위치',
    '저렴한 주거비',
    '개인공간 확보',
    '예전부터 거주',
    '가족 등 거주',
    '생활서비스 제공',
    '기타',
  ],
  datasets: [
    {
      label: '현재 거처 선택 이유',
      data: [67.8, 46.7, 23.1, 12.7, 8.5, 5.0, 1.6],
      backgroundColor: [
        '#33a23d',
        '#7bc745',
        '#c9c9c9',
        '#c9c9c9ae',
        '#c9c9c97b',
        '#c9c9c958',
        '#c9c9c924',
      ],
      borderWidth: 0.5,
    },
  ],
};

const option = {
  plugins: {
    legend: {
      position: 'right',
      onClick: (e) => e.stopPropagation(),
      labels: {
        boxWidth: 20,
        padding: 15,
      },
    },
    title: {
      display: true,
      text: [
        '현재 거처 선택 이유 <출처: 「주택거처주거실태조사」, 국토교통부>',
      ],
      position: 'bottom',
      align: 'start',
      font: {
        size: 16,
      },
    },
  },
  animation: {
    duration: 2000,
  },
};

const SelectionFactor = forwardRef((props, ref) => {
  return (
    <div>
      <Pie
        id='selectionFactor'
        data={data}
        options={option}
        width={600}
        height={250}
        ref={ref}
        redraw={props.redraw}
      />
    </div>
  );
});

export default SelectionFactor;
