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
    '합동청사역',
    '소요산역',
    '정부과천청사역',
    '진위역',
    '양천구청역',
    '국제업무지구역',
    '동작(현충원)역',
    '신포역',
    '고진역',
    '둔촌오륜역',
    '...',
    '동대문역사문화공원역',
    '남영역',
    '이대역',
    '몽촌토성(평화의문)역',
    '을지로3가역',
    '죽전역',
    '강남역',
    '종로5가역',
    '잠실(송파구청)역',
    '명동역',
  ],
  price: [
    58.5051923358198, 74.44168734491315, 83.41675008341676, 94.42870632672333,
    98.86325995964951, 112.86681715575621, 126.60318159299828,
    128.84236559449005, 137.40185581727337, 140.22931617586406, 0,
    841.84417858185, 853.715518358449, 863.9695260586113, 866.82934623813,
    893.2424054556726, 924.0970377468453, 968.5869811748696, 977.0865422125196,
    1021.1938872970392, 1044.3548387096773,
  ],
};
const options = {
  plugins: [{}],
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
      label: '지하철 역별 단위면적당 전세 가격',
      data: datasets.price,
      backgroundColor: ['#33a23d'],
      yAxisID: 'y',
    },
  ],
};
const RealEstatePrice = forwardRef((props, ref) => {
  return (
    <div>
      <Bar
        options={options}
        data={data}
        ref={ref}
        redraw={props.redraw}
        width={1200}
        height={600}
      />
    </div>
  );
});

export default RealEstatePrice;
