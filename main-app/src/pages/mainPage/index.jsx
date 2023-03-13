import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import mapImg from "./naver_map.png";

const MainPage = () => {
  useEffect(() => {
    const navermaps = window.naver.maps;

    // Create a map object
    const map = new navermaps.Map("map", {
      center: new navermaps.LatLng(37.5665, 126.978),
      zoom: 13,
    });

    // Create a marker object
    const marker = new navermaps.Marker({
      position: new navermaps.LatLng(37.5665, 126.978),
      map: map,
    });
  }, []);

  return (
    <>
      <MainContainer>
        <SideBarContainer>
          <Outlet />
        </SideBarContainer>
        <MainContainer id='map'></MainContainer>
      </MainContainer>
    </>
  );
};

const DemoNav = styled.div`
  height: 60px;
  width: 100%;
  position: fixed;
  background-color: #4b2789;
  z-index: 30;
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 360px 1fr;
  height: 100vh;
`;

const SideBarContainer = styled.div`
  padding-top: 60px;
`;

// const MapContainer = styled.div`
//   padding-top: 50px;
//   background-image: url(${mapImg});
// `;

export default MainPage;
