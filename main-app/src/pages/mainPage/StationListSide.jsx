import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import FeelTimeMethod from './FeelTimeMethod';

const StationListSide = () => {
  const location = useLocation();

  const { sendRequest } = useHttpRequest();
  const { setMapOption, setMarkers } = useOutletContext();

  const [feelTimeMethod, setFeelTimeMethod] = useState('feel_time_weekday_m');
  const [stationList, setStationList] = useState([]);
  const [stationRank, setStationRank] = useState([]);
  const inputs = location.state;

  const getStationList = async () => {
    try {
      const res = await sendRequest('/main/stationWithin', 'post', inputs);
      setStationList([...res.stationList]);
    } catch (err) {}
  };

  //이전 페이지에서 받아온 검색 조건으로 지하철 조회
  useEffect(() => {
    getStationList();
  }, []);

  //지하철 목록 순위매기기
  useEffect(() => {
    if (stationList) {
      setStationRank(stationList.slice(0, 5));
    }
  }, [stationList]);

  //순위 목록으로 지도 다시 그리기
  useEffect(() => {
    const { naver } = window;
    if (stationRank.length > 0) {
      console.log(stationRank);
      setMapOption((cur) => ({
        ...cur,
        center: new naver.maps.LatLng(37.540693, 127.07023),
        zoom: 14,
      }));
      getMarkerList();
    }
  }, [stationRank]);

  const getMarkerList = () => {
    stationRank.forEach((item, index) => {
      setMarkers((cur) => [
        ...cur,
        {
          lat: item.station.pos_x,
          lng: item.station.pos_y,
          rank: index + 1,
          station_name: item.station.station_name,
          station_line: item.station.station_line,
          rent_price: item.station.rent_price,
          lease_price: item.station.lease_price,
          travel_time: item.time,
          feel_time: item.dd,
        },
      ]);
    });
  };

  return (
    <div>
      <FeelTimeMethod
        feelTimeMethod={feelTimeMethod}
        setFeelTimeMethod={setFeelTimeMethod}
      ></FeelTimeMethod>
      <StationListContainer>
        {stationRank &&
          stationRank.map((item, index) => (
            <StationContainer key={index}>
              {item.station.station_name}
            </StationContainer>
          ))}
      </StationListContainer>

      <Link to={'/'}>다시 검색하기</Link>
    </div>
  );
};

const StationListContainer = styled.div``;
const StationContainer = styled.div``;

export default StationListSide;
