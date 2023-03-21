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
            id='feel_time_weekday_m'
            value='feel_time_weekday_m'
            onChange={handleChange}
            checked={feelTimeMethod === 'feel_time_weekday_m'}
          />
          <label htmlFor='feel_time_weekday_m'>평일 출근</label>
        </div>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='feel_time_weekday_d'
            value='feel_time_weekday_d'
            onChange={handleChange}
            checked={feelTimeMethod === 'feel_time_weekday_d'}
          />
          <label htmlFor='feel_time_weekday_d'>평일 종일</label>
        </div>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='feel_time_weekday_n'
            value='feel_time_weekday_n'
            onChange={handleChange}
            checked={feelTimeMethod === 'feel_time_weekday_n'}
          />
          <label htmlFor='feel_time_weekday_n'>평일 퇴근</label>
        </div>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='feel_time_weekend_m'
            value='feel_time_weekend_m'
            onChange={handleChange}
            checked={feelTimeMethod === 'feel_time_weekend_m'}
          />
          <label htmlFor='feel_time_weekend_m'>주말 아침</label>
        </div>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='feel_time_weekend_d'
            value='feel_time_weekend_d'
            onChange={handleChange}
            checked={feelTimeMethod === 'feel_time_weekend_d'}
          />
          <label htmlFor='feel_time_weekend_d'>주말 점심</label>
        </div>
        <div>
          <input
            type='radio'
            name='feel_time_method'
            id='feel_time_weekend_n'
            value='feel_time_weekend_n'
            onChange={handleChange}
            checked={feelTimeMethod === 'feel_time_weekend_n'}
          />
          <label htmlFor='feel_time_weekend_n'>주말 저녁</label>
        </div>
      </fieldset>
    </form>
  );
};

export default FeelTimeMethod;
