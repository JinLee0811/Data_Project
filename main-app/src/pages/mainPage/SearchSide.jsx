import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SearchSide = () => {
  const [minPrice, setMinPrice] = useState(10);
  const [commuteTime, setCommuteTime] = useState(10);
  const minPriceRef = useRef(null);

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
            />
          </Fieldset>
          <Fieldset>
            <RangeInfo>{commuteTime}분</RangeInfo>
            <legend>희망 소요시간 </legend>
            <input
              id='commuteTime'
              class='input'
              type='range'
              name='time'
              min='10'
              max='120'
              value={commuteTime}
              onChange={(e) => {
                setCommuteTime(e.target.value);
              }}
            />
          </Fieldset>
          <Fieldset>
            <legend>거래유형 </legend>
            <label htmlFor='rent'>전세: </label>
            <input id='jeonse' type='radio' name='rent' />
            <label htmlFor='rent'>월세: </label>
            <input id='monthlyRent' type='radio' name='rent' />
          </Fieldset>
          <Fieldset>
            <RangeInfo>{minPrice}만원</RangeInfo>
            <legend>단위면적 당 가격 </legend>
            <input
              id='pricePerArea'
              class='input'
              type='range'
              name='price'
              min='10'
              max='100'
              value={minPrice}
              ref={minPriceRef}
              onChange={(e) => {
                setMinPrice(e.target.value);
              }}
            />
          </Fieldset>
        </FieldContainer>
      </SearchForm>
      <SearchButton>
        <Link to={'stationlist'}>찾아보자!</Link>
      </SearchButton>
    </SearchSideContainer>
  );
};

const SearchSideContainer = styled.div``;

const SearchForm = styled.form`
  padding: 15px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .queryContainer{
    border: 0px;
  }
`;
const Fieldset = styled.fieldset`
  display: flex;
  width: 93%;
  border: solid #4b278913;
  border-width: 1px 0 1px 0;
  margin: 10px 0;
  padding: 30px;
  
  legend {
    font-family: 'NanumSquareNeoExtraBold';
  }

  *:focus {
    outline: none;
  }
  #query {
    width: 88%;
    height: 45px;
    margin: 10px auto;
    border: 3px solid #4b2789;
    padding: 0px 20px;
    border-radius: 4px;
    margin-bottom: 50px;
  }

  input[type='range'] {
    width: 60%;
    margin: auto;
    filter: hue-rotate(45deg);
  }

  input[type='radio'] {
    margin-left: 15px;
    margin-right: 30px;
    appearance: none;
    border: max(2px, 0.1em) solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
  }
  label{
    margin-left: 16px;
  }

  input[type='radio']:checked {
    border: 0.3em solid #8b5ad8;
  }
`;

const RangeInfo = styled.div`
  width: 70px;
  text-align: right;
`;

const SearchButton = styled.div`
  display: flex;
  position: absolute;
  bottom: 220px;
  left: 130px;
  box-shadow: 2px 2px 2px rgb(0, 0, 0, 0.1);
  a {
    border-radius: 3px;
    line-height: 50px;
    text-align: center;
    height: 50px;
    width: 110px;
    color: white;
    background-color: #8b5ad8;
    text-decoration: none;
  }
`;


export default SearchSide;
