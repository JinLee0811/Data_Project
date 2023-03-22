import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import buildingImg from './markerImage/building.png';

const MainPage = () => {
  const mapElement = useRef(null);
  const [mapOption, setMapOption] = useState({
    scaleControl: false,
    logoControl: false,
    mapDataControl: false,
    zoomControl: false,
    mapTypeControl: false,
    tileTransition: false,
    background: '#33A23D',
    minZoom: 12,
  });
  const [markers, setMarkers] = useState([]);
  const [startPoint, setStartPoint] = useState([]);
  //맵 클릭 이벤트 활성화
  const [clickEvent, setClickEvent] = useState(false);
  //맵 클릭 이벤트 좌표 값
  const clickPoint = useRef({});

  useEffect(() => {
    const { naver } = window;
    const map = new naver.maps.Map(mapElement.current, mapOption);
    //마커클릭
    const getClickHandler = (myMarker, myInfoWindow) => {
      return () => {
        myInfoWindow.getMap()
          ? myInfoWindow.close()
          : myInfoWindow.open(map, myMarker);
      };
    };
    //맵클릭
    const handleClickMap = (e) => {
      console.log(e.coord);
      clickPoint.current = e.coord;
      console.log(clickPoint);
    };

    //사용자가 찍은 시작점과 가까운 지하철역 마커 그리기
    if (startPoint.length === 2) {
      const startPointMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(startPoint[0].lat, startPoint[0].lng),
        setClickable: false,
        map,
        icon: {
          url: buildingImg,
          anchor: new naver.maps.Point(32, 54),
          origin: new naver.maps.Point(0, 0),
        },
      });
      const startStationMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(startPoint[1].lat, startPoint[1].lng),
        setClickable: false,
        map,
        icon: {
          content: `
            <div class='startStation'>
              <div class='start'>출발</div>
              <span class='stationName'>${startPoint[1].station_name}역</span>
            </div>
          `,
          anchor: new naver.maps.Point(0, -10),
        },
      });
    }

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
                  <p>소요시간: ${marker.travel_time}분</p>
                  <p>체감시간: ${marker.feel_time}분</p>
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
      //마커 클릭시 정보창 띄워주기
      naver.maps.Event.addListener(
        myMarker,
        'click',
        getClickHandler(myMarker, myInfoWindow)
      );
      if (marker.rank === 1) {
        myInfoWindow.open(map, myMarker);
      }
    });

    if (clickEvent) {
      naver.maps.Event.addListener(map, 'click', handleClickMap);
    } else {
      naver.maps.Event.clearListeners(map, 'click');
    }
  }, [mapOption, markers, startPoint]);

  return (
    <>
      <MainContainer>
        <SideBarContainer>
          <Outlet
            context={{
              setMapOption,
              setMarkers,
              setStartPoint,
              setClickEvent,
            }}
          />
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
  overflow-y: auto;
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
          width: 130px;
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
  //출발마커 CSS
  .startStation {
    position: relative;
    height: 28px;
    white-space: nowrap;
    background: #fff;
    border: 1px solid #a1a1a1;
    border-radius: 10px;
    z-index: 11;
    .stationName {
      line-height: 28px;
      margin-left: 16px;
      padding-right: 5px;
      font-size: 12px;
      font-family: 'NanumSquareNeoExtraBold';
    }
    .start {
      text-align: center;
      line-height: 28px;
      position: absolute;
      width: 28px;
      height: 28px;
      left: -20px;
      top: -3px;
      border-radius: 50%;
      border: 4px solid #33a23d;
      color: #f7f7f7;
      font-size: 13px;
      font-family: 'NanumSquareNeoExtraBold';
      background-color: #33a23d;
    }
    .start:after {
      bottom: 100%;
      left: 50%;
      border: solid transparent;
      content: '';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-color: rgba(51, 162, 61, 0);
      border-bottom-color: #33a23d;
      border-width: 12px;
      margin-left: -12px;
    }
  }
`;

export default MainPage;
