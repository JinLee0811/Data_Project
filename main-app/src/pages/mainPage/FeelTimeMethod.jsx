import React from 'react';
import styled from 'styled-components';

const FeelTimeMethod = ({ feelTimeMethod, setFeelTimeMethod }) => {
  const handleChange = (e) => {
    setFeelTimeMethod(e.target.value);
  };
  return (
    <StyledForm>
      <legend>
        주로 <strong>언제</strong> 지하철을 사용하세요?
      </legend>
      <fieldset>
        <RadioContainer>
          <RadioInput
            type='radio'
            name='feel_time_method'
            id='dm'
            value='dm'
            onChange={handleChange}
            checked={feelTimeMethod === 'dm'}
          />
          <label htmlFor='dm'>평일 출근</label>
        </RadioContainer>
        <RadioContainer>
          <RadioInput
            type='radio'
            name='feel_time_method'
            id='dd'
            value='dd'
            onChange={handleChange}
            checked={feelTimeMethod === 'dd'}
          />
          <label htmlFor='dd'>평일 종일</label>
        </RadioContainer>
        <RadioContainer>
          <RadioInput
            type='radio'
            name='feel_time_method'
            id='dn'
            value='dn'
            onChange={handleChange}
            checked={feelTimeMethod === 'dn'}
          />
          <label htmlFor='dn'>평일 퇴근</label>
        </RadioContainer>
        <RadioContainer>
          <RadioInput
            type='radio'
            name='feel_time_method'
            id='em'
            value='em'
            onChange={handleChange}
            checked={feelTimeMethod === 'em'}
          />
          <label htmlFor='em'>주말 아침</label>
        </RadioContainer>
        <RadioContainer>
          <RadioInput
            type='radio'
            name='feel_time_method'
            id='ed'
            value='ed'
            onChange={handleChange}
            checked={feelTimeMethod === 'ed'}
          />
          <label htmlFor='ed'>주말 점심</label>
        </RadioContainer>
        <RadioContainer>
          <RadioInput
            type='radio'
            name='feel_time_method'
            id='en'
            value='en'
            onChange={handleChange}
            checked={feelTimeMethod === 'en'}
          />
          <label htmlFor='en'>주말 저녁</label>
        </RadioContainer>
      </fieldset>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  margin-bottom: 30px;
  legend {
    text-align: center;
    padding-bottom: 10px;
    strong {
      color: #33a23d;
    }
  }
  fieldset {
    height: 100px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    padding: 0px;
    margin: 10px;
    grid-gap: 5px;
    border: 0px;
  }
`;

const RadioContainer = styled.div`
  label {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    font-family: 'NanumSquareNeoBold';
    background-color: #ebebeb;
    font-size: 14px;
    color: #3f3f3f;
  }
  input:checked + label {
    background-color: #33a23d;
    color: white;
  }
`;
const RadioInput = styled.input`
  display: none;
`;

export default FeelTimeMethod;
