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
import { lineColors } from '../../utils/stationColor';
import ReactPaginate from 'react-paginate';

const StationListSide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { naver } = window;
  const { sendRequest } = useHttpRequest();
  const { setMapOption, setMarkers, setClickEvent } = useOutletContext();

  const [feelTimeMethod, setFeelTimeMethod] = useState('dm');
  const [stationList, setStationList] = useState([]);
  const [stationRank, setStationRank] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState();

  useEffect(() => {
    setClickEvent(false); //출발마커 클릭으로 옮기기 이벤트 제거
    setIsLoading(true);
    setInputs(
      sessionStorage.getItem('inputs')
        ? JSON.parse(sessionStorage.getItem('inputs'))
        : location.state
    );
  }, []);
  useEffect(() => {
    if (inputs) {
      sessionStorage.setItem('inputs', JSON.stringify(inputs));
      getStationList();
    }
  }, [inputs]);

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
    }
  }, [stationList, feelTimeMethod]);

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

  //페이지 네이션
  useEffect(() => {
    const itemsPerPage = 5;
    if (stationList.length > 0) {
      setTotalPage(Math.ceil(stationList.length / itemsPerPage));
      setStationRank(stationList.slice(page * 5, (page + 1) * 5));
    }
  }, [stationList, page]);

  const handlePageClick = (e) => {
    setPage(e.selected);
  };

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
      setStationList(newStationList.slice(0, 49));
    } catch (err) {
      console.log(err);
    }
  };

  const setMarkerList = () => {
    setMarkers((cur) =>
      stationRank.map((item, index) => ({
        lat: item.station.pos_x,
        lng: item.station.pos_y,
        rank: index + 1 + page * 5,
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
    navigate(`/stationinfo/${item.id}`, {
      state: {
        redirectUrl: location.pathname + location.search,
        leasePrice: `${Math.round(
          item.station['lease_price'] * inputs.size * 3.3 * 100
        ).toLocaleString()}`,
        rentPrice: `${inputs.deposit}/${Math.round(
          item.station['rent_price'] * inputs.size * 3.3 - inputs.deposit / 100
        )}`,
      },
    });
  };

  return (
    <StationListSideContainer>
      {isLoading && <LoadingScreen text={'딱 맞는 역세권을 계산중입니다'} />}
      <FeelTimeMethod
        feelTimeMethod={feelTimeMethod}
        setFeelTimeMethod={setFeelTimeMethod}
      ></FeelTimeMethod>
      <StartInfo>
        {inputs?.stationName}역 <span>&rarr;</span>
      </StartInfo>
      <StationListContainer>
        {stationRank.length > 0
          ? stationRank.map((item, index) => (
              <StationContainer
                key={index}
                onClick={(e) => handleStationClick(e, item)}
              >
                <div className='rank'>{index + 1 + page * 5}</div>
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
                      <br></br>{' '}
                      <span className='price'>
                        {inputs.type === 'rent'
                          ? `${inputs.deposit}/${Math.round(
                              item.station['rent_price'] * inputs.size * 3.3 -
                                inputs.deposit / 100
                            )}`
                          : Math.round(
                              item.station['lease_price'] *
                                inputs.size *
                                3.3 *
                                100
                            ).toLocaleString()}{' '}
                      </span>
                      만원
                    </p>
                  </div>
                </div>
              </StationContainer>
            ))
          : !isLoading && <div>조건에 맞는 역세권이 없습니다...😢</div>}
      </StationListContainer>
      <ReactPaginate
        nextLabel='>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPage}
        previousLabel='<'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakLabel='...'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
        renderOnZeroPageCount={null}
      />
      <Link className='back' to={'/'}>
        다시 검색해볼래요?
      </Link>
    </StationListSideContainer>
  );
};

const StationListSideContainer = styled.div`
  padding-top: 60px;
  height: calc(100%-60px);
  position: relative;
  .back {
    position: absolute;
    right: 10px;
    padding: 10px;
  }
  .back:hover {
    font-weight: bold;
    color: #505050;
  }
  .pagination {
    display: flex;
    width: 100%;
    flex-direction: row;
    list-style: none;
    padding: 0px;
    justify-content: space-evenly;
    li {
      cursor: pointer;
    }
    .active {
      a {
        font-weight: bold;
      }
    }
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
  position: relative;
  display: flex;
  height: 20%;
  overflow: hidden;
  justify-content: space-between;
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer;
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
  .rank {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background-color: #33a23d;
    position: absolute;
    left: 8px;
    top: 20%;
    transform: translate(0, -50%);
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
  .stationName {
    display: flex;
    flex-direction: column;

    justify-content: center;
    width: 140px;
    height: 100%;
    padding: 0px;
    padding-left: 30px;

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
    width: 150px;
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
