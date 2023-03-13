import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import searchingImg from './image/searching.png';
import searchingImgAfter from './image/searchingAfter.png';

import SelectionFactor from './chart/SelectionFactor';

const AboutPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  }, []);

  return (
    <AboutContainer>
      {console.log(scrollPosition)}
      <IntroContainer>
        <h1 className={scrollPosition > 250 ? 'none' : ''}>이사가게?</h1>
        <h2 className={scrollPosition > 250 ? 'hidden' : ''}>
          "체감시간 기반 역세권 추천 서비스"
        </h2>
        <span className={scrollPosition > 250 ? 'hidden' : 'arrow'}>
          &darr;
        </span>
        <h1 className={scrollPosition > 250 ? 'h1-purple' : 'hidden'}>
          <span>어디</span>가게?
        </h1>
        <img
          src={scrollPosition < 900 ? searchingImg : searchingImgAfter}
          className={
            scrollPosition > 200 && scrollPosition < 1150 ? '' : 'hidden'
          }
          alt='searchingImg'
        ></img>
        <div
          className={
            scrollPosition > 300 && scrollPosition < 900 ? '' : 'hidden'
          }
        >
          <p
            className={
              scrollPosition > 450 && scrollPosition < 550 ? 'focus' : ''
            }
          >
            서울이 익숙하지 않아서 가장 좋은 동네가 어디인지 잘 모르겠는데...
          </p>
          <p
            className={
              scrollPosition > 550 && scrollPosition < 650 ? 'focus' : ''
            }
          >
            저번 집은 회사에서 거리는 짧아도 막상 출근하면 오래걸리던데...
          </p>
          <p
            className={
              scrollPosition > 650 && scrollPosition < 750 ? 'focus' : ''
            }
          >
            출근시간에 사람 좀 많이 없는쾌적한 지하철을 타고싶은데...
          </p>
          <p
            className={
              scrollPosition > 750 && scrollPosition < 850 ? 'focus' : ''
            }
          >
            대략적인 부동산 가격대를 알고싶은데 허위매물때문에 헷갈리네...
          </p>
        </div>
      </IntroContainer>
      <InsightContainer>
        <ChartContainer>
          <SelectionFactor></SelectionFactor>
          <ChartDescription>통근 주거 중요하죵?</ChartDescription>
        </ChartContainer>
        <ChartContainer>
          <ChartDescription>다른 데이터도 중요하죵?</ChartDescription>
          <SelectionFactor></SelectionFactor>
        </ChartContainer>
      </InsightContainer>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  width: 100%;
  height: 3000px;
  font-family: 'NanumSquareNeoExtraBold';
  * {
    transition: opacity 0.2s ease-out;
  }
  .hidden {
    opacity: 0;
  }
  .none {
    display: none;
  }
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
  }
`;

const IntroContainer = styled.div`
  height: 1700px;
  padding: 30px;

  h1 {
    position: absolute;
    top: 140px;
    font-size: 110px;
  }
  h2 {
    position: absolute;
    top: 380px;
    color: #4b2789;
  }
  .arrow {
    position: sticky;
    top: 850px;
    transform: scaleY(3);
  }
  .h1-purple {
    top: 40px;
    position: sticky;
    span {
      color: #4b2789;
    }
  }
  img {
    position: sticky;
    top: 570px;
    padding-right: 500px;
  }
  div {
    position: sticky;
    top: 300px;

    p {
      text-align: center;
      width: 1000px;

      margin: 10px;
      opacity: 0.3;
      font-size: 30px;
    }
    .focus {
      opacity: 1;
    }
  }
`;

const InsightContainer = styled.div`
  height: 2000px;
  padding: 30px;
  div {
    flex-direction: row;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  justify-content: space-around;
`;

const ChartDescription = styled.div`
  font-size: 40px;
`;

export default AboutPage;
