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
    '길동',
    '철산',
    '굽은다리',
    '남태령',
    '광명사거리',
    '...',
    '노원',
    '김포공항',
    '개화산',
    '상계',
    '도봉산',
  ],
  congestion: [
    88.47, 86.97, 83.55, 83.18, 77.53, 0, 3.77, 3.63, 1.97, 1.68, 0.28,
  ],
};
const options = {
  plugins: {
    title: {
      display: true,
      text: '지하철 혼잡도 정보 <출처: 서울교통공사>',
      position: 'bottom',
      font: {
        size: 16,
      },
    },
  },
  animation: {
    duration: 5000,
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
      label: '출근 시간대 지하철 역별 혼잡도',
      data: datasets.congestion,
      backgroundColor: [
        '#585858',
        '#585858',
        '#585858',
        '#585858',
        '#585858',
        '#585858',
        '#33a23d',
        '#33a23d',
        '#33a23d',
        '#33a23d',
        '#33a23d',
      ],
      yAxisID: 'y',
    },
  ],
};
const CongestionByStation = forwardRef((props, ref) => {
  return (
    <div>
      <Bar
        options={options}
        data={data}
        ref={ref}
        redraw={props.redraw}
        width={1200}
        height={500}
      />
    </div>
  );
});

export default CongestionByStation;
