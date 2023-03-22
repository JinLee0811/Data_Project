import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import MultiRangeSlider from '../../utils/MultiRangeSlider';
import ModalInput from '../../components/ModalInput';
import axios from 'axios';

const SearchSide = () => {
  const navigate = useNavigate();
  const { naver } = window;
  const { setMapOption, setMarkers, setStartPoint, setClickEvent, clickPoint } =
    useOutletContext();

  const [coordinates, setCoordinates] = useState({ pos_x: '', pos_y: '' });
  const [commuteTime, setCommuteTime] = useState({ min: 0, max: 80 });
  const [type, setType] = useState('rent');
  const [price, setPrice] = useState({ min: 1, max: 13 });
  const [priority, setPriority] = useState('congestion');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startStation, setStartStation] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);

  const handleQueryFocus = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCoordinatesUpdate = (pos_x, pos_y) => {
    setCoordinates(pos_x, pos_y);
  };

  const handleSubmit = () => {
    //validation
    if (!startStation) {
      alert('출발지를 설정해주세요');
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
    };

    navigate('/stationlist', { state: inputs });
  };

  const fetchData = async () => {
    const serverUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.post(
        serverUrl + '/main/station',
        coordinates,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response.data.message);
      setStartStation(response.data.station);
      setFetchLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

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
      <SearchForm>
        <FieldContainer>
          <Fieldset className='queryContainer'>
            <input
              required
              type='text'
              name='query'
              id='query'
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
            <legend>거래유형 </legend>
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
            <legend>단위면적 당 평균 가격 </legend>
            <RangeInfo>
              {price.min} ~ {price.max} 만원
            </RangeInfo>
            <MultiRangeSlider
              min={1}
              max={13}
              step={1}
              value={price}
              onChange={setPrice}
            ></MultiRangeSlider>
          </Fieldset>

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
        onUpdateCoordinates={handleCoordinatesUpdate}
      >
        목적지 장소를 입력하세요
      </ModalInput>
    </SearchSideContainer>
  );
};

const SearchSideContainer = styled.div``;

const SearchForm = styled.form``;

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
`;
const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  height: 60px;
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
`;

const RangeInfo = styled.div`
  position: absolute;
  padding-bottom: 50px;
`;

const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  div {
    border-radius: 3px;
    line-height: 50px;
    text-align: center;
    height: 50px;
    width: 110px;
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
