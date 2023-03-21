import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SearchStation = () => {
  const [query, setQuery] = useState('');
  const [coordinates, setCoordinates] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}`,
        {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': '7i91u5s2cy',
            'X-NCP-APIGW-API-KEY': 'xxjJYgz0XdU06ihtYwYDrcox65sjspzWKegexuUWt',
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCoordinates(
          response.data.addresses[0].x,
          response.data.addresses[0].y
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(query);
  };

  return (
    <SearchSideContainer>
      <FieldContainer>
        <Fieldset className='queryContainer'>
          <input
            required
            type='text'
            name='query'
            id='query'
            value={query}
            onChange={handleChange}
            placeholder='목적지 장소를 입력해주세요'
          />
        </Fieldset>
      </FieldContainer>

      <SearchButton onClick={handleSubmit}>Get GEO Location</SearchButton>
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
  border: solid #4b278913;
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
    border: 3px solid #4b2789;
    padding: 0px 20px;
    border-radius: 4px;
  }
  #query:focus {
    border: 3px solid #6e39c9;
  }

  label {
    margin-left: 16px;
  }
  input[type='radio']:hover {
    border: 3px solid #b3b3b3;
  }

  input[type='radio']:checked {
    border: 0.3em solid #8b5ad8;
  }
`;

const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 1rem;
  margin: auto;
  color: white;
  background-color: #8b5ad8;
  text-decoration: none;
  box-shadow: 2px 2px 2px rgb(0, 0, 0, 0.1);
  border-radius: 4px;
  hover {
    background-color: #8a5ad8d8;
  }
`;

export default SearchStation;
