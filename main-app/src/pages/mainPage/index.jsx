import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MainPage = () => {
  const mapElement = useRef(null);
  const [mapOption, setMapOption] = useState({
    logoControl: false,
    mapDataControl: false,
    scaleControl: false,
  });
  const [markers, setMarkers] = useState([]);
  const [infoWindos, setInfoWindows] = useState([]);

  useEffect(() => {
    const { naver } = window;
    const map = new naver.maps.Map(mapElement.current, mapOption);

    const getClickHandler = (myMarker, myInfoWindow) => {
      return () => {
        myInfoWindow.getMap()
          ? myInfoWindow.close()
          : myInfoWindow.open(map, myMarker);
      };
    };

    //마커 그리기
    markers.forEach((marker) => {
      const myMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(marker.lat, marker.lng),
        setClickable: true,
        icon: {
          content: `
          <div class='marker'></div>
          <div class='rank'>
            <span>${marker.rank}</span>
          </div>
          `,
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(0, 50),
        },
        map,
      });
      //마커 클릭 시 보여줄 정보창 정보 입력
      const myInfoWindow = new naver.maps.InfoWindow({
        content: `
          <div class='iw'>
            <div class='iw-inner'>
                    ${marker.station_name}
            </div>
          </div>
        `,
        anchorSize: { width: 10, height: 10 },
        borderWidth: 0,
      });
      naver.maps.Event.addListener(
        myMarker,
        "click",
        getClickHandler(myMarker, myInfoWindow)
      );
    });
  }, [mapOption, markers]);

  return (
    <>
      <MainContainer>
        <SideBarContainer>
          <Outlet context={{ setMapOption, setMarkers }} />
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
  height: calc(100vh - 48px);
  *:focus {
    outline: none;
  }
`;

const SideBarContainer = styled.div`
  padding-top: 0px;
`;

const MapContainer = styled.div`
  //마커CSS설정
  .marker {
    background-color: #b9b9b9;
    border: 1px solid #a8a8a8;
    border-radius: 5px;
    width: 5px;
    height: 50px;
    span {
    }
  }
  .marker:before {
    position: absolute;
    top: -9px;
    left: -1px;
    display: block;
    border-radius: 50%;
    background-color: #b9b9b9;
    border: 1px solid #a8a8a8;
    width: 8px;
    height: 8px;
    content: "";
  }
  .rank {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 2px;
    z-index: 10;
    background-color: #30ba63;
    border: 1px solid #30ba63;
    box-shadow: 3px 1px 1px rgb(0, 0, 0, 0.05);
    width: 45px;
    height: 30px;
    span {
      color: white;
      font-family: "NanumSquareNeoHeavy";
    }
  }

  //정보창 CSS 설정
  .iw {
    width: 298px;
    height: 116px;
    .iw-inner {
      border-radius: 50px;
    }
  }
`;

export default MainPage;
