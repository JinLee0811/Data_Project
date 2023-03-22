import React from 'react';

const FeelTimeMethod = ({ feelTimeMethod, setFeelTimeMethod }) => {
  const handleChange = (e) => {
    setFeelTimeMethod(e.target.value);
  };
  return (
    <form>
      <fieldset>
        <legend>주로 언제 지하철을 사용하세요?</legend>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='dm'
            value='dm'
            onChange={handleChange}
            checked={feelTimeMethod === 'dm'}
          />
          <label htmlFor='dm'>평일 출근</label>
        </div>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='dd'
            value='dd'
            onChange={handleChange}
            checked={feelTimeMethod === 'dd'}
          />
          <label htmlFor='dd'>평일 종일</label>
        </div>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='dn'
            value='dn'
            onChange={handleChange}
            checked={feelTimeMethod === 'dn'}
          />
          <label htmlFor='dn'>평일 퇴근</label>
        </div>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='em'
            value='em'
            onChange={handleChange}
            checked={feelTimeMethod === 'em'}
          />
          <label htmlFor='em'>주말 아침</label>
        </div>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='ed'
            value='ed'
            onChange={handleChange}
            checked={feelTimeMethod === 'ed'}
          />
          <label htmlFor='ed'>주말 점심</label>
        </div>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='en'
            value='en'
            onChange={handleChange}
            checked={feelTimeMethod === 'en'}
          />
          <label htmlFor='en'>주말 저녁</label>
        </div>
      </fieldset>
    </form>
  );
};

export default FeelTimeMethod;
