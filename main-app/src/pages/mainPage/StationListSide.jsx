import React, { useState, useEffect } from 'react';
import {
  Link,
  useOutletContext,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import FeelTimeMethod from './FeelTimeMethod';
import LoadingScreen from '../../components/LoadingScreen';
import { lineColors } from '../../utils/stationColor';

const StationListSide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { naver } = window;
  const { sendRequest } = useHttpRequest();
  const { setMapOption, setMarkers, setClickEvent } = useOutletContext();
  const inputs = location.state;

  const [feelTimeMethod, setFeelTimeMethod] = useState('dm');
  const [stationList, setStationList] = useState([]);
  const [stationRank, setStationRank] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setClickEvent(false); //출발마커 클릭으로 옮기기 이벤트 제거
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
      setStationRank(stationList.slice(0, 5));
    }
  }, [stationList, feelTimeMethod]);

  useEffect(() => {
    setStationRank(stationList.slice((page - 1) * 5, page * 5));
  }, [page]);

  //순위 목록으로 지도에 마커 그리기
  useEffect(() => {
    if (stationRank.length > 0) {
      setMapOption((cur) => ({
        ...cur,
        zoom: 14,
      }));
      setMarkerList();
      setIsLoading(false);
    }
  }, [stationRank]);

  //이전 페이지에서 받아온 검색 조건으로 지하철 조회
  const getStationList = async () => {
    try {
      const res = await sendRequest('/main/stationWithin', 'post', inputs);
      //조건에 맞는 지하철역 없음
      if (res.stationList.length === 0) {
        setIsLoading(false);
      }
      //다른 호선 같은 역 제거
      const seen = new Set();
      const newStationList = res.stationList.filter((obj) => {
        if (seen.has(obj.station.station_name)) return false;
        seen.add(obj.station.station_name);
        return true;
      });
      setStationList(newStationList);
    } catch (err) {
      console.log(err);
    }
  };

  const setMarkerList = () => {
    setMarkers((cur) =>
      stationRank.map((item, index) => ({
        lat: item.station.pos_x,
        lng: item.station.pos_y,
        rank: index + 1 + (page - 1) * 5,
        price:
          inputs.type === 'rent'
            ? `${inputs.deposit}/${Math.round(
                item.station['rent_price'] * inputs.size * 3.3 -
                  inputs.deposit / 100
              )}`
            : Math.round(
                item.station['lease_price'] * inputs.size * 3.3 * 100
              ).toLocaleString(),
        station_name: item.station.station_name,
        station_line: item.station.station_line,
        travel_time: Math.round(item.time / 60),
        feel_time: Math.round(item[feelTimeMethod] / 60),
      }))
    );
  };

  const handleStationClick = (e, item) => {
    setMapOption((cur) => ({
      ...cur,
      center: new naver.maps.LatLng(item.station.pos_x, item.station.pos_y),
    }));
    navigate(`/stationinfo/${item.id}/general`);
  };

  return (
    <StationListSideContainer>
      {isLoading && <LoadingScreen text={'딱 맞는 역세권을 계산중입니다'} />}
      <FeelTimeMethod
        feelTimeMethod={feelTimeMethod}
        setFeelTimeMethod={setFeelTimeMethod}
      ></FeelTimeMethod>
      <StartInfo>
        {inputs.stationName}역 <span>&rarr;</span>
      </StartInfo>
      <StationListContainer>
        {stationRank.length > 0
          ? stationRank.map((item, index) => (
              <StationContainer
                key={index}
                onClick={(e) => handleStationClick(e, item)}
              >
                <div className='rank'>{index + 1 + (page - 1) * 5}</div>
                <div className='stationName'>
                  <p
                    style={{
                      color: `${lineColors[item.station.station_line]}`,
                    }}
                  >
                    {item.station.station_line}
                  </p>
                  <h2>{item.station.station_name}</h2>
                </div>

                <div className='stationInfo'>
                  <div className='time'>
                    <p>
                      <strong>{Math.round(item.time / 60)}</strong> 분
                    </p>
                    <p>
                      체감시간:{' '}
                      <span className='feel'>
                        {Math.round(item[feelTimeMethod] / 60)}분
                      </span>
                    </p>
                    <p>
                      부동산 점수:{' '}
                      <span className='price'>
                        {inputs.type === 'rent'
                          ? item.station.rent_price
                          : item.station.lease_price}
                      </span>
                    </p>
                  </div>
                </div>
              </StationContainer>
            ))
          : !isLoading && <div>조건에 맞는 역세권이 없습니다...😢</div>}
      </StationListContainer>
      <Link to={'/'}>다시 검색해볼래요?</Link>
    </StationListSideContainer>
  );
};

const StationListSideContainer = styled.div`
  padding-top: 60px;
  height: calc(100%-60px);
  position: relative;
  a {
    position: absolute;
    right: 10px;
    padding: 10px;
  }
`;
const StartInfo = styled.div`
  text-align: right;
  font-size: 14px;
  margin: 8px 14px;
  span {
    font-weight: bold;
    color: #33a23d;
  }
`;
const StationListContainer = styled.ul`
  padding: 0;
  height: 60vh;
  margin: 0px;
  margin-bottom: 10px;
`;
const StationContainer = styled.li`
  display: flex;
  height: 20%;
  overflow: hidden;
  justify-content: space-between;
  border-bottom: 1px solid #e9e9e9;
  &:hover {
    background-color: #f8f8f8;
  }
  &:first-child {
    border-top: 1px solid #e9e9e9;
  }
  hr {
    border-top: 0px;
    border-left: 1px solid #e9e9e9;
    margin: 10px;
  }
  .stationName {
    display: flex;
    flex-direction: column;
    width: 140px;
    padding: 20px 0px 10px 10px;

    h2 {
      font-size: 22px;
      display: inline;
      margin: 10px;
    }
    p {
      font-weight: bold;
      margin: 0px 10px;
    }
  }
  .stationInfo {
    width: 140px;
    text-align: right;
    padding: 15px 10px 15px 10px;
    p {
      font-size: 15px;
      margin: 5px;
      strong {
        font-size: 20px;
      }
      .feel {
        font-size: 15px;
        font-weight: 600;
        color: #be3131;
      }
      .price {
        font-weight: 600;
      }
    }
  }
`;

export default StationListSide;
