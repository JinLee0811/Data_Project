import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const mapOption = {
  //모든 지도 컨트롤 숨기기
  scaleControl: false,
  logoControl: false,
  mapDataControl: false,
  zoomControl: false,
  mapTypeControl: false,
};

const MainPage = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    const map = new naver.maps.Map(mapElement.current, mapOption);
  }, []);

  return (
    <>
      <MainContainer>
        <SideBarContainer>
          <Outlet />
        </SideBarContainer>
        <MapContainer ref={mapElement}>map</MapContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 320px 1fr;
  height: calc(100vh - 62px);
  *:focus {
    outline: none;
  }
`;

const SideBarContainer = styled.div`
  padding-top: 0px;
`;

const MapContainer = styled.div``;

export default MainPage;
