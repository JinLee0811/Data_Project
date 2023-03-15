import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { forwardRef } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const datasets = {
  station: [
    '사당',
    '방배',
    '어린이대공원',
    '군자',
    '중곡',
    '한성대입구',
    '성신여대입구',
    '독립문',
    '서초',
    '무악재',
  ],
  downLineCongestion: [
    678.5, 665.4, 612.6, 618.4, 602.1, 580.4, 571.9, 552.1, 629.2, 546.0,
  ],
  upLineCongestion: [
    156.8, 147.8, 107.4, 113.7, 107.1, 94.0, 85.7, 69.2, 152.1, 70.8,
  ],
};
const options = {
  plugins: {},
  animation: {
    duration: 2000,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      ticks: {
        color: '#646464',
      },
    },
  },
};

const data = {
  labels: datasets.station,
  datasets: [
    {
      label: '출근 시간대 외선/하선 혼잡도',
      data: datasets.downLineCongestion,
      borderColor: '#4b2789',
      backgroundColor: '#4b2789',
      yAxisID: 'y',
    },
    {
      label: '출근 시간대 내선/상선 혼잡도',
      data: datasets.upLineCongestion,
      borderColor: '#4b2789',
      backgroundColor: '#b6b6b6',
      yAxisID: 'y',
    },
  ],
};
const CongestionByLine = forwardRef((props, ref) => {
  return (
    <div>
      <Bar
        options={options}
        data={data}
        ref={ref}
        redraw={props.redraw}
        width={800}
        height={500}
      />
    </div>
  );
});

export default CongestionByLine;
