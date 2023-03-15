import React, { forwardRef } from 'react';
import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Title, Legend);

const data = {
  labels: [
    '경제적 여건',
    '교통 여건',
    '교육 환경',
    '편익/위락시설',
    '거주안정성/주변치안',
    '자녀육아 및 양육',
    '재테크 수단',
    '공원 및 녹지여건',
    '해당 지역의 이미지',
  ],
  datasets: [
    {
      label: '거주지 선택시 고려사항',
      data: [50.4, 20.6, 6.6, 4.8, 4.7, 3.6, 3.9, 3.1, 2.3],
      backgroundColor: [
        '#4B2789',
        '#8B5AD8',
        '#c9c9c9',
        '#c9c9c9c0',
        '#c9c9c9ae',
        '#c9c9c98f',
        '#c9c9c968',
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
      position: 'left',
      onClick: (e) => e.stopPropagation(),
      labels: {
        boxWidth: 20,
        padding: 15,
      },
    },
    title: {
      display: true,
      text: '서울시 거주지 선택시 고려요인',
    },
  },
  animation: {
    duration: 2000,
  },
  rotation: 180,
  layout: {},
};

const SelectionFactor2 = forwardRef((props, ref) => {
  return (
    <div>
      <Pie
        id='selectionFactor2'
        data={data}
        options={option}
        width={600}
        height={300}
        ref={ref}
        redraw={props.redraw}
      />
    </div>
  );
});

export default SelectionFactor2;