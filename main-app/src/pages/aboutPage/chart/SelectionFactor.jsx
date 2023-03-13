import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

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
      label: '이사 시 고려사항',
      data: [67.8, 46.7, 23.1, 12.7, 8.5, 5.0, 1.6],
      backgroundColor: [
        '#4B2789',
        '#8B5AD8',
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
    },
  },
};

const SelectionFactor = () => {
  return (
    <div>
      <Pie data={data} options={option} width={600} height={300} />
    </div>
  );
};

export default SelectionFactor;
