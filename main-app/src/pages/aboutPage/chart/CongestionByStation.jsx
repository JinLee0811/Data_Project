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
  plugins: [
    {
      afterLayout: (chart) => {
        let ctx = chart.chart.ctx;
        ctx.save();
        let yAxis = chart.scales['y-axis-0'];
        let yThresholdMax = yAxis.getPixelForValue(data.limits.max);
        let yThresholdMin = yAxis.getPixelForValue(data.limits.min);

        let offsetMax = (1 / yAxis.bottom) * yThresholdMax;
        let offsetMin = (1 / yAxis.bottom) * yThresholdMin;

        let gradient = ctx.createLinearGradient(0, yAxis.top, 0, yAxis.bottom);

        gradient.addColorStop(0, 'red');
        gradient.addColorStop(offsetMax, 'darkred');
        gradient.addColorStop(offsetMax, 'blue');
        gradient.addColorStop(offsetMin, 'blue');
        gradient.addColorStop(offsetMin, 'darkred');
        gradient.addColorStop(1, 'red');
        chart.data.datasets[0].borderColor = gradient;
        ctx.restore();
      },
    },
  ],
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
      label: '출근 시간대 지하철 역별 혼잡도',
      data: datasets.congestion,
      borderColor: '#4b2789',
      backgroundColor: '#4b2789',
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
        width={800}
        height={500}
      />
    </div>
  );
});

export default CongestionByStation;
