import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import MultiRangeSlider from '../../utils/MultiRangeSlider';
import ModalInput from '../../components/ModalInput';
import useHttpRequest from '../../utils/useHttp';
import axios from 'axios';

const SearchSide = () => {
  const [price, setPrice] = useState({ min: 10, max: 100 });
  const [commuteTime, setCommuteTime] = useState({ min: 10, max: 120 });
  const { setMapOption, setMarkers } = useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ pos_x: '', pos_y: '' });
  const { sendRequest } = useHttpRequest();

  const handleQueryFocus = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCoordinatesUpdate = (pos_x, pos_y) => {
    setCoordinates(pos_x, pos_y);
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
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setMapOption((cur) => ({
      //모든 지도 컨트롤 숨기기
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      zoomControl: false,
      mapTypeControl: false,
      tileTransition: true,
    }));
    setMarkers([]);
    console.log(coordinates);
    fetchData();
  }, [coordinates]);

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
              placeholder='찾고싶은 장소를 입력해주세요'
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
              max={120}
              step={10}
              value={commuteTime}
              onChange={setCommuteTime}
            ></MultiRangeSlider>
          </Fieldset>

          <Fieldset className='radioContainer'>
            <legend>거래유형 </legend>
            <label htmlFor='rent'>전세: </label>
            <input id='jeonse' type='radio' name='rent' />
            <label htmlFor='rent'>월세: </label>
            <input id='monthlyRent' type='radio' name='rent' />
          </Fieldset>
          <Fieldset>
            <legend>단위면적 당 가격 </legend>
            <RangeInfo>
              {price.min} ~ {price.max} 만원
            </RangeInfo>
            <MultiRangeSlider
              min={10}
              max={100}
              step={5}
              value={price}
              onChange={setPrice}
            ></MultiRangeSlider>
          </Fieldset>
        </FieldContainer>
      </SearchForm>
      <SearchButton>
        <Link to={'stationlist'}>찾아보자!</Link>
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
    padding-top: 40px;
    padding-bottom: 30px;
  }
  .radioContainer {
    flex-direction: row;
    padding-top: 50px;
  }
`;
const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  height: 70px;
  align-items: center;
  justify-content: center;
  width: 93%;
  border: solid #33a23d13;
  border-width: 1px 0 0px 0;
  padding-top: 60px;

  legend {
    font-family: 'NanumSquareNeoExtraBold';
  }

  *:focus {
    outline: none;
  }
  #query {
    width: 80%;
    height: 45px;
    margin: 10px auto;
    border: 3px solid #33a23d;
    padding: 0px 20px;
    border-radius: 4px;
  }
  #query:focus {
    border: 3px solid #83d189;
  }

  input[type='radio'] {
    margin-left: 15px;
    margin-right: 30px;
    appearance: none;
    border: max(2px, 0.1em) solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
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
  margin-top: 60px;
  a {
    border-radius: 3px;
    line-height: 50px;
    text-align: center;
    height: 50px;
    width: 110px;
    color: white;
    background-color: #33a23d;
    text-decoration: none;
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 0.1);
  }
  a:hover {
    background-color: #83d189;
  }
`;

export default SearchSide;
