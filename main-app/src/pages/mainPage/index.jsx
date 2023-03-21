import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const MainPage = () => {
  const mapElement = useRef(null);
  const [mapOption, setMapOption] = useState({
    logoControl: false,
    mapDataControl: false,
    scaleControl: false,
  });
  const [markers, setMarkers] = useState([]);

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
              <div class='station'>
                <h2>${marker.station_name}</h2>
                <p>${marker.station_line}</p>
              </div>
              <div class='station-info'>
                <div class='time'>
                  <p>소요시간: ${marker.travel_time}</p>
                  <p>체감시간: ${marker.feel_time}</p>
                </div>
                <hr>
                <div class='price'>
                 <p>월세: ${marker.rent_price}</p>
                 <p>전세: ${marker.lease_price}</p>
                </div>                    
              </div>
            </div>
            <div class='wish'>
              <div></div>
            </div>
          </div>
        `,
        anchorSize: { width: 10, height: 10 },
        borderWidth: 0,
        backgroundColor: 'transparent',
      });
      naver.maps.Event.addListener(
        myMarker,
        'click',
        getClickHandler(myMarker, myInfoWindow)
      );
      if (marker.rank === 1) {
        myInfoWindow.open(map, myMarker);
      }
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
    content: '';
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
      font-family: 'NanumSquareNeoHeavy';
    }
  }

  //정보창 CSS 설정
  .iw {
    width: 298px;
    height: 116px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
    background-color: white;
    border-radius: 5px;
    p {
      margin: 5px 8px;
    }
    .iw-inner {
      padding: 14px;
      div {
        display: flex;
      }
      .station {
        border-bottom: 1px solid #bdbdbd;
        padding-bottom: 5px;
        h2 {
          margin: 0;
          color: #33a23d;
        }
        p {
          margin-bottom: 0px;
          font-weight: bold;
          color: #696969;
        }
      }
      .station-info {
        padding: 5px;
        justify-content: space-between;
        .time,
        .price {
          justify-content: center;
          width: 120px;
          flex-direction: column;
        }
      }
    }
    .wish {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 30px;
      height: 30px;
      background-color: yellowgreen;
    }
  }
`;

export default MainPage;
