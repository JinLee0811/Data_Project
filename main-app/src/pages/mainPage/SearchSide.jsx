import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import MultiRangeSlider from '../../utils/MultiRangeSlider';
import ModalInput from '../../components/ModalInput';
import useHttpRequest from '../../utils/useHttp';
import axios from 'axios';
import LoadingScreen from '../../components/LoadingScreen';

const SearchSide = () => {
  const navigate = useNavigate();
  const { naver } = window;
  const { setMapOption, setMarkers, setStartPoint, setClickEvent, clickPoint } =
    useOutletContext();

  const [coordinates, setCoordinates] = useState({
    pos_x: '',
    pos_y: '',
  });
  const [address, setAddress] = useState('');
  const [commuteTime, setCommuteTime] = useState({ min: 0, max: 80 });
  const [type, setType] = useState('rent');
  const [price, setPrice] = useState({ min: 2, max: 13 });
  const [size, setSize] = useState(8);
  const [deposit, setDeposit] = useState(3000);
  const [priority, setPriority] = useState('congestion');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startStation, setStartStation] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);

  const { sendRequest } = useHttpRequest();
  const handleQueryFocus = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  //모달에게, 서브밋 시 사용되는 함수 전달
  const handleModalSubmit = async (query) => {
    const apiUrl = process.env.REACT_APP_GOOGLE_API_URL;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `${apiUrl}?address=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      console.log(response.data.results);
      const pos_x = response.data.results[0].geometry.location.lat;
      const pos_y = response.data.results[0].geometry.location.lng;
      setCoordinates({ pos_x, pos_y });
      const resAddress = response.data.results[0].address_components.reduce(
        (acc, cur, idx, arr) => {
          if (idx === arr.length - 4) arr.splice(1);
          return (acc = cur.short_name + ' ' + acc);
        },
        ''
      );
      setAddress(resAddress);
    } catch (err) {
      console.log(err);
    }

    handleModalClose();
  };

  const handleSubmit = () => {
    //validation
    if (!startStation) {
      setIsModalOpen(true);
      return;
    }

    const inputs = {
      stationId: startStation.id,
      time_min: commuteTime.min * 60,
      time_max: commuteTime.max * 60,
      type,
      price_min: price.min,
      price_max: price.max,
      priority,
      size,
      deposit,
      stationName: startStation.station_name,
    };

    navigate('/stationlist', { state: inputs });
  };

  const fetchData = async () => {
    try {
      const response = await sendRequest('/main/station', 'post', coordinates);
      console.log(response);
      setStartStation(response.station);
      setFetchLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setClickEvent(true);
  }, []);

  useEffect(() => {
    if (clickPoint) {
      setCoordinates({ pos_x: clickPoint.y, pos_y: clickPoint.x });
    }
  }, [clickPoint]);

  useEffect(() => {
    setFetchLoading(true);
    fetchData();
    setMarkers([]);
  }, [coordinates]);

  //geo와 가까운 역 찾기가 완료된 이후 startPoint를 수정하여 index에서 마커그리게 하기
  useEffect(() => {
    if (!fetchLoading && startStation) {
      setStartPoint((cur) => [
        {
          name: 'startPoint',
          lat: Number(coordinates.pos_x),
          lng: Number(coordinates.pos_y),
        },
        {
          name: 'startStation',
          station_name: startStation.station_name,
          lat: Number(startStation.pos_x),
          lng: Number(startStation.pos_y),
        },
      ]);

      setMapOption((cur) => ({
        ...cur,
        center: new naver.maps.LatLng(
          Number(coordinates.pos_x),
          Number(coordinates.pos_y)
        ),
      }));
    } else {
      setStartPoint([]);
    }
  }, [fetchLoading]);

  return (
    <SearchSideContainer>
      {fetchLoading && (
        <LoadingScreen text={'가장 가까운 역을 계산중입니다.'} />
      )}
      <SearchForm>
        <FieldContainer>
          <Fieldset className='queryContainer'>
            <input
              required
              type='text'
              name='query'
              id='query'
              value={address}
              placeholder='🔍 찾고 싶은 장소를 입력해주세요! '
              onFocus={handleQueryFocus}
            />
          </Fieldset>
          <Fieldset>
            <legend>희망 소요시간 </legend>
            <RangeInfo>
              {commuteTime.min} ~ {commuteTime.max}분
            </RangeInfo>
            <MultiRangeSlider
              min={0}
              max={80}
              step={5}
              value={commuteTime}
              onChange={setCommuteTime}
            ></MultiRangeSlider>
          </Fieldset>

          <Fieldset className='radioContainer'>
            <legend>거래방식 </legend>
            <label htmlFor='type'>전세: </label>
            <input
              id='lease'
              value='lease'
              type='radio'
              name='type'
              checked={type === 'lease'}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor='type'>월세: </label>
            <input
              id='rent'
              value='rent'
              type='radio'
              name='type'
              checked={type === 'rent'}
              onChange={(e) => setType(e.target.value)}
            />
          </Fieldset>
          <Fieldset>
            <legend>평균 단위면적 당 가격 </legend>
            <RangeInfo>
              {price.min} ~ {price.max} 만원
            </RangeInfo>
            <MultiRangeSlider
              min={2}
              max={13}
              step={1}
              value={price}
              onChange={setPrice}
            ></MultiRangeSlider>
          </Fieldset>

          <div className='calcBox'>
            <p className='calcPrice'>
              예상 평균 가격{' '}
              <strong>({type === 'rent' ? '월세' : '전세'})</strong>
            </p>
            <p>
              <input
                className='size'
                id='size'
                value={size}
                onChange={(e) => {
                  if (e.target.value < 0 || e.target.value > 100) {
                    alert('1이상 100이하의 값을 입력해주세요ㅠ');
                    return;
                  }
                  setSize(e.target.value);
                }}
              ></input>
              평형 기준:{' '}
              {type === 'rent' ? (
                //월세 예상 가격
                <span>
                  <input
                    className='deposit'
                    id='deposit'
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                  ></input>
                  /
                  {Math.round(price.min * size * 3.3 - deposit / 100) < 0
                    ? 0
                    : Math.round(price.min * size * 3.3 - deposit / 100)}
                  ~
                  {Math.round(price.max * size * 3.3 - deposit / 100) < 0
                    ? 0
                    : Math.round(price.max * size * 3.3 - deposit / 100)}{' '}
                  만원
                </span>
              ) : (
                //전세 예상 가격
                <span>
                  {Math.round(price.min * size * 3.3 * 100).toLocaleString()} ~{' '}
                  {Math.round(price.max * size * 3.3 * 100).toLocaleString()}{' '}
                  만원
                </span>
              )}
            </p>
          </div>

          <Fieldset className='radioContainer'>
            <legend>무엇이 더 중요한가요?? </legend>
            <label htmlFor='priority'>혼잡도: </label>
            <input
              id='congestion'
              value='congestion'
              type='radio'
              name='priority'
              checked={priority === 'congestion'}
              onChange={(e) => setPriority(e.target.value)}
            />
            <label htmlFor='priority'>시간: </label>
            <input
              id='time'
              value='time'
              type='radio'
              name='priority'
              checked={priority === 'time'}
              onChange={(e) => setPriority(e.target.value)}
            />
            <label htmlFor='priority'>가격: </label>
            <input
              id='price'
              value='price'
              type='radio'
              name='priority'
              checked={priority === 'price'}
              onChange={(e) => setPriority(e.target.value)}
            />
          </Fieldset>
        </FieldContainer>
      </SearchForm>
      <SearchButton onClick={() => handleSubmit()}>
        <div>찾아보자!</div>
      </SearchButton>
      <ModalInput
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      >
        출발지 주소를 입력하세요
      </ModalInput>
    </SearchSideContainer>
  );
};

const SearchSideContainer = styled.div`
  height: 100%;
`;

const SearchForm = styled.form`
  height: 100%;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .queryContainer {
    border: 0px;
    padding-top: 60px;
    padding-bottom: 60px;
  }
  .radioContainer {
    flex-direction: row;
    padding-top: 40px;
    height: 70px;
  }
  .calcBox {
    margin-bottom: 30px;
    color: #585858;
    p {
      text-align: center;
      margin: 5px;
      font-size: 14px;
    }
    .calcPrice {
      font-size: 14px;
      margin-bottom: 8px;
    }
    input {
      border: 0;
      border-bottom: 1px dotted #7bc745;
      font-family: 'NanumSquareNeoExtraBold';
      color: #585858;
    }
    .size {
      text-align: center;
      width: 24px;
      font-size: 15px;
    }
    .deposit {
      height: 18px;
      width: 48px;
      padding: 0;
      font-size: 15px;
    }
  }
`;
const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  height: 50px;
  align-items: center;
  justify-content: center;
  width: 93%;
  border: solid #33a23d13;
  border-width: 1px 0 0px 0;
  padding-top: 60px;

  legend {
    font-family: 'NanumSquareNeoExtraBold';
    padding-left: 10px;
  }

  *:focus {
    outline: none;
  }
  #query {
    width: 80%;
    height: 45px;
    margin: 10px auto;
    border: 3px solid #33a23d;
    padding: 5px 20px;
    border-radius: 4px;
  }
  #query:focus {
    border: 3px solid #83d189;
  }

  input[name='type'] {
    margin-left: 15px;
    margin-right: 30px;
    appearance: none;
    border: max(2px, 0.1em) solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
    cursor: pointer;
  }
  input[name='priority'] {
    margin-left: 10px;
    margin-right: 10px;
    appearance: none;
    border: max(1.5px, 0.1em) solid gray;
    border-radius: 50%;
    width: 1.1em;
    height: 1.1em;
    cursor: pointer;
  }
  label {
    margin-left: 16px;
  }
  input[type='radio']:hover {
    border: 3px solid #b3b3b3;
  }

  input[type='radio']:checked {
    border: 0.3em solid #7bc745;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

const RangeInfo = styled.div`
  position: absolute;
  padding-bottom: 50px;
`;

const SearchButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    position: absolute;
    bottom: 20px;
    border-radius: 3px;
    line-height: 60px;
    text-align: center;
    height: 60px;
    width: 200px;
    color: white;
    background-color: #33a23d;
    text-decoration: none;
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 0.1);
    cursor: pointer;
  }
  div:hover {
    background-color: #83d189;
  }
`;

export default SearchSide;
