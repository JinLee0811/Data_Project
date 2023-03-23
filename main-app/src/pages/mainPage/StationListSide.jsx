import React, { useState, useEffect } from 'react';
import {
  Link,
  useOutletContext,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import FeelTimeMethod from './FeelTimeMethod';
import LoadingScreen from '../../components/LoadingScreen';

const StationListSide = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { sendRequest } = useHttpRequest();
  const { setMapOption, setMarkers } = useOutletContext();
  const inputs = location.state;

  const [feelTimeMethod, setFeelTimeMethod] = useState('dm');
  const [stationList, setStationList] = useState([]);
  const [stationRank, setStationRank] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStationList = async () => {
    try {
      const res = await sendRequest('/main/stationWithin', 'post', inputs);
      setStationList([...res.stationList]);
      if (res.stationList.length === 0) {
        setIsLoading(false);
      }
    } catch (err) {}
  };

  //이전 페이지에서 받아온 검색 조건으로 지하철 조회
  useEffect(() => {
    setIsLoading(true);
    getStationList();
  }, []);

  //지하철 목록 순위매기기
  useEffect(() => {
    if (stationList.length > 0) {
      if (inputs.priority === 'congestion') {
        stationList.sort((a, b) => a[feelTimeMethod] - b[feelTimeMethod]);
      } else if (inputs.priority === 'price') {
        stationList.sort(
          (a, b) =>
            a.station[`${inputs.type}_price`] -
            b.station[`${inputs.type}_price`]
        );
      } else {
        stationList.sort((a, b) => a['time'] - b['time']);
      }
      //중복 제거
      const seen = new Set();
      const newStationList = stationList.filter((obj) => {
        if (seen.has(obj.station.station_name)) return false;
        seen.add(obj.station.station_name);
        return true;
      });
      setStationRank(newStationList.slice(0, 5));
    }
  }, [stationList, feelTimeMethod]);

  //순위 목록으로 지도 다시 그리기
  useEffect(() => {
    const { naver } = window;
    if (stationRank.length > 0) {
      setMapOption((cur) => ({
        ...cur,
        zoom: 14,
      }));
      getMarkerList();
      setIsLoading(false);
    }
  }, [stationRank]);

  const getMarkerList = () => {
    setMarkers((cur) =>
      stationRank.map((item, index) => ({
        lat: item.station.pos_x,
        lng: item.station.pos_y,
        rank: index + 1,
        station_name: item.station.station_name,
        station_line: item.station.station_line,
        rent_price: item.station.rent_price,
        lease_price: item.station.lease_price,
        travel_time: Math.round(item.time / 60),
        feel_time: Math.round(item[feelTimeMethod] / 60),
      }))
    );
  };

  return (
    <div>
      {isLoading && <LoadingScreen text={'딱 맞는 역세권을 계산중입니다'} />}
      <FeelTimeMethod
        feelTimeMethod={feelTimeMethod}
        setFeelTimeMethod={setFeelTimeMethod}
      ></FeelTimeMethod>
      <StationListContainer>
        {stationRank.length > 0
          ? stationRank.map((item, index) => (
              <StationContainer
                key={index}
                onClick={() =>
                  navigate(`/stationinfo/${item.id}/general`, {
                    state: { item },
                  })
                }
              >
                {item.station.station_name}
              </StationContainer>
            ))
          : !isLoading && <div>조건에 맞는 역세권이 없습니다...😢</div>}
      </StationListContainer>

      <Link to={'/'}>다시 검색하기</Link>
    </div>
  );
};

const StationListContainer = styled.div``;
const StationContainer = styled.div`
  cursor: pointer;
`;

export default StationListSide;
