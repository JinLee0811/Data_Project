import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
//image
import searchingImg from './image/searching.png';
import searchingImgAfter from './image/searchingAfter.png';
import trainBgImg from './image/trainBg2.jpg';
import trainImg from './image/train2.png';
import trainImgAfter from './image/train3.png';
import rushHourImg from './image/rushhour.jpg';
//chart
import SelectionFactor from './chart/SelectionFactor';
import SelectionFactor2 from './chart/SelectionFactor2';
import CongestionByStation from './chart/CongestionByStation';
import CongestionByLine from './chart/CongestionByLine';

const AboutPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  }, []);

  const congestionByStationRef = useRef(null);
  const congestionByLineRef = useRef(null);
  const selectionFactorRef = useRef(null);
  const selectionFactor2Ref = useRef(null);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  return (
    <AboutContainer>
      {console.log(scrollPosition)}
      <IntroContainer>
        <h1 className={scrollPosition > 250 ? 'hidden' : ''}>이사가게?</h1>
        <h2 className={scrollPosition > 250 ? 'hidden' : ''}>
          "체감시간 기반 역세권 추천 서비스"
        </h2>
        <span className={scrollPosition > 250 ? 'none' : 'arrow'}>&darr;</span>
        <h1 className={scrollPosition > 250 ? 'h1-purple' : 'hidden'}>
          <span>어디</span>가게?
        </h1>

        <IntroDescription
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
            출근시간에 사람 좀 많이 없는 쾌적한 지하철을 타고싶은데...
          </p>
          <p
            className={
              scrollPosition > 750 && scrollPosition < 850 ? 'focus' : ''
            }
          >
            대략적인 부동산 가격대를 알고싶은데 허위매물때문에 헷갈리네...
          </p>
        </IntroDescription>
        <img
          src={scrollPosition < 900 ? searchingImg : searchingImgAfter}
          className={
            scrollPosition > 200 && scrollPosition < 1150 ? '' : 'hidden'
          }
          alt='searchingImg'
        ></img>
        <LogoBox className={scrollPosition < 900 ? 'hidden' : ''}>
          * 대충 로고 자리
        </LogoBox>
      </IntroContainer>
      <InsightContainer1>
        <ChartContainer className='pieChart'>
          <SelectionFactor
            ref={selectionFactorRef}
            redraw={scrollPosition > 1200}
          ></SelectionFactor>
          <ChartDescription>통근 주거 중요하죵?</ChartDescription>
        </ChartContainer>
        <ChartContainer className='pieChart'>
          <ChartDescription>다른 데이터도 중요하죵?</ChartDescription>
          <SelectionFactor2
            ref={selectionFactor2Ref}
            redraw={scrollPosition > 1800}
          ></SelectionFactor2>
        </ChartContainer>
      </InsightContainer1>

      <TrainContainer
        style={{
          backgroundColor: `${scrollPosition > 5500 ? ' #B4C9DE' : ''}`,
        }}
      >
        <TrainImage
          src={scrollPosition < 5515 ? trainImg : trainImgAfter}
          style={{
            transform: `translate(${
              scrollPosition < 4350
                ? scrollPosition * 2 - 8800
                : scrollPosition > 5880
                ? -100 + (scrollPosition - 5880) * 2
                : -100
            }px, 0px) scale(${
              scrollPosition > 4400
                ? scrollPosition > 5520
                  ? 2.12
                  : 1 + (scrollPosition - 4400) * 0.001
                : 1
            })`,
            opacity: `${1 - (scrollPosition - 5880) * 0.003}`,
          }}
          className={scrollPosition > 6300 ? 'none' : ''}
        ></TrainImage>
        <TrainBackground
          style={{
            backgroundPositionX: `${
              scrollPosition > 5520 ? -3520 : 2000 - scrollPosition
            }px`,
            backgroundPositionY: `${
              scrollPosition > 4400
                ? -300 + (scrollPosition - 4400) * 0.018
                : -300
            }px`,
            transform: `scale(${
              scrollPosition > 4400
                ? scrollPosition > 5520
                  ? 2.12
                  : 1 + (scrollPosition - 4400) * 0.001
                : 1
            })`,
          }}
          className={
            scrollPosition > 5520
              ? scrollPosition > 6300
                ? 'none'
                : 'hidden'
              : ''
          }
        ></TrainBackground>
        <TrainDescribe>
          <p>내가 힘들 때</p>
          <p>울 것 같을 때</p>
          <p>기운도 이젠</p>
          <p>나지 않을 때</p>
          <p>It's you</p>
          <p>날 걱정하네</p>
          <p>It's you</p>
          <p>날 웃게하네</p>
          <p>말 안 해도 돼</p>
        </TrainDescribe>
      </TrainContainer>
      <InsightContainer2>
        <h1>소요시간과 만족도</h1>
      </InsightContainer2>

      <RushHourContainer>
        <div className='rushHourImage'></div>
        <div className='rushHourDescription'>
          <span
            className={
              scrollPosition > 8350 && scrollPosition < 8350 + 100
                ? 'focus'
                : ''
            }
          >
            출퇴근 시간에 붐비는 지하철은 너무 숨막힌다.{' '}
          </span>
          <span
            className={
              scrollPosition > 8350 + 100 && scrollPosition < 8350 + 200
                ? 'focus'
                : ''
            }
          >
            좁은 공간에 너무 많은 사람이 모여있는 것을 반복한다.
          </span>
          <span
            className={
              scrollPosition > 8350 + 200 && scrollPosition < 8350 + 300
                ? 'focus'
                : ''
            }
          >
            이미 지하철안에는 사람이 가득차서 타지 못하고 보낸 것이 벌써 몇
            개이다.
          </span>
          <span
            className={
              scrollPosition > 8350 + 300 && scrollPosition < 8350 + 400
                ? 'focus'
                : ''
            }
          >
            회사까지 걸리는 소요시간이{' '}
            <strong>실제로 내가 느껴지는 시간</strong>과 완전히 다르다.
          </span>
          <span
            className={
              scrollPosition > 8350 + 400 && scrollPosition < 8350 + 500
                ? 'focus'
                : ''
            }
          >
            몇 분밖에 안 됐는데 느껴지는 시간은 너무나도 길다.
          </span>
          <span
            className={
              scrollPosition > 8350 + 500 && scrollPosition < 8350 + 600
                ? 'focus'
                : ''
            }
          >
            걸리는 실제 시간이 조금 더 오래걸려도{' '}
            <strong>혼잡하지 않은 지하철을 탈 수 있는 곳</strong>으로 집을
            옮기고 싶다.
          </span>
        </div>
      </RushHourContainer>
      <InsightContainer3>
        <ChartContainer className='barChart'>
          <ChartDescription>
            역마다 혼잡도 차이가 이렇게나 큽니다요
          </ChartDescription>
          <CongestionByStation
            ref={congestionByStationRef}
            redraw={0}
          ></CongestionByStation>
        </ChartContainer>
        <ChartContainer className='barChart'>
          <ChartDescription>
            상선/하선 혼잡도 차이가 이렇게나 큽니다요
          </ChartDescription>
          <CongestionByLine ref={congestionByLineRef}></CongestionByLine>
        </ChartContainer>
      </InsightContainer3>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  width: 100%;
  height: 3000px;
  font-family: 'NanumSquareNeoExtraBold';

  * {
    transition: opacity 0.1s ease-out;
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
  }
`;

const IntroContainer = styled.div`
  height: 1800px;
  padding: 30px;

  h1 {
    position: sticky;
    top: 140px;
    font-size: 110px;
  }
  h2 {
    position: absolute;
    top: 450px;
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
`;
const IntroDescription = styled.div`
  position: sticky;
  top: 300px;
  z-index: -1;
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
`;

const LogoBox = styled.div`
  padding-top: 50px;
  position: sticky;
  top: 200px;

  color: #4b2789;
  font-size: 40px;
`;

const InsightContainer1 = styled.div`
  height: 1200px;
  padding: 30px;
  .pieChart {
    flex-direction: row;
  }
  .barChart {
    margin-bottom: 200px;
    flex-direction: column;
  }
`;

const InsightContainer2 = styled.div`
  height: 1400px;
  background-color: #4b2789;
`;

const InsightContainer3 = styled.div`
  height: 2200px;
  padding: 30px;
  .barChart {
    margin-bottom: 200px;
    flex-direction: column;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  justify-content: center;
  canvas {
    margin: 50px;
  }
`;

const ChartDescription = styled.div`
  margin: 100px;
  font-size: 40px;
`;

const TrainContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 3700px;
  white-space: nowrap;
`;

const TrainBackground = styled.div`
  background-image: url(${trainBgImg});
  position: sticky;
  width: 100%;
  top: 0px;
  height: 1200px;
`;
const TrainImage = styled.img`
  position: sticky;
  top: 410px;
  height: 280px;
  z-index: 2;
`;
const TrainDescribe = styled.div`
  z-index: 1;
  position: absolute;
  top: 800px;
  p {
    font-size: 50px;
  }
`;
const RushHourContainer = styled.div`
  display: grid !important;
  align-items: flex-start !important;
  grid-template-columns: 1fr 450px;
  height: 1900px;
  position: relative;
  .rushHourImage {
    background-image: url(${rushHourImg});
    background-size: cover;
    height: 94vh;
    position: sticky;
    top: 50px;
    margin: 50px;
  }
  .rushHourDescription {
    padding-right: 30px;
    display: inline;
    position: sticky;
    padding-top: 100px;
    padding-bottom: 150px;
    top: 0px;
    span {
      font-size: 40px;
      opacity: 0.3;
    }
    .focus {
      opacity: 1;
      strong {
        color: #4b2789;
      }
    }
  }
`;

export default AboutPage;
