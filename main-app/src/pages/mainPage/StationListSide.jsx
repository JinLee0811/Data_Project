import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import FeelTimeMethod from './FeelTimeMethod';

const StationListSide = () => {
  const [stationList, setStationList] = useState();
  const [feelTimeMethod, setFeelTimeMethod] = useState('feel_time_weekday_m');
  const { setMapOption, setMarkers } = useOutletContext();

  useEffect(() => {
    getStationList();
  }, []);

  useEffect(() => {
    const { naver } = window;
    if (stationList) {
      getMarkerList();
      setMapOption((cur) => ({
        ...cur,
        center: new naver.maps.LatLng(37.500799, 127.036969),
        zoom: 14,
      }));
    }
  }, [stationList]);

  const getStationList = async () => {
    try {
      const res = await axios.get('/data/StationData.json');
      setStationList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMarkerList = () => {
    stationList.map((station, index) => {
      setMarkers((cur) => [
        ...cur,
        {
          lat: station.pos_y,
          lng: station.pos_x,
          rank: index + 1,
          station_name: station.station_name,
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
        {stationList &&
          stationList.map((station, index) => (
            <StationContainer key={index}>
              {station.station_name}
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
