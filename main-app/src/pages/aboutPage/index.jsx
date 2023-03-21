import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
//image
import searchingImg from './image/searching.png';
import searchingImgAfter from './image/searchingAfter.png';
import trainBgImg from './image/trainBg2.jpg';
import trainImg from './image/train2.png';
import trainImgAfter from './image/train3.png';
import rushHourImg from './image/rushhour.jpg';
import cut1 from './image/cut1.jpg';
import cut2 from './image/cut2.jpg';
import cut3 from './image/cut3.jpg';
import cut4 from './image/cut4.jpg';
import article1 from './image/article1.png';
import article2 from './image/article2.png';
import article3 from './image/article3.png';
import article4 from './image/article4.png';

//chart
import SelectionFactor from './chart/SelectionFactor';
import SelectionFactor2 from './chart/SelectionFactor2';
import CongestionByStation from './chart/CongestionByStation';
import CongestionByLine from './chart/CongestionByLine';
import RealEstatePrice from './chart/RealEstatePrice';

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
        <h1
          className={
            scrollPosition > 250
              ? scrollPosition >= 900
                ? 'hidden h1-purple'
                : 'h1-purple'
              : 'hidden'
          }
        >
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
            출퇴근시간에 사람 좀 많이 없는 쾌적한 지하철을 타고싶은데...
          </p>
          <p
            className={
              scrollPosition > 750 && scrollPosition < 850 ? 'focus' : ''
            }
          >
            대략적인 부동산 가격대를 알고싶은데 허위매물때문에 헷갈리네...
          </p>
        </IntroDescription>
        <LogoBox className={scrollPosition < 900 ? 'hidden' : ''}>
          <Logo>
            <div>2</div>
            <span>사가게?</span>
          </Logo>
        </LogoBox>
        <img
          src={scrollPosition < 900 ? searchingImg : searchingImgAfter}
          className={scrollPosition > 200 && scrollPosition < 1150 ? '' : ''}
          alt='searchingImg'
        ></img>
      </IntroContainer>
      <InsightContainer1>
        <ChartContainer
          className={`${
            scrollPosition < 1300 ? 'hidden pieChart' : 'pieChart'
          }`}
        >
          <SelectionFactor
            ref={selectionFactorRef}
            redraw={scrollPosition > 1300}
          ></SelectionFactor>
          <ChartDescription>
            <p>서울에서 현재 거처 선택시 가장 중요하게 생각하는</p>
            <h1>"통근, 통학에 좋은 위치와 저렴한 주거비!"</h1>
          </ChartDescription>
        </ChartContainer>
        <ChartContainer
          className={`${
            scrollPosition < 1900 ? 'hidden pieChart' : 'pieChart'
          }`}
        >
          <ChartDescription>
            <h1 className='left'>또 다른 데이터 역시</h1>
            <h1 className='right'>
              <strong>경제적 여건</strong>과 <strong>교통 여건</strong> 이네요
            </h1>
          </ChartDescription>
          <SelectionFactor2
            ref={selectionFactor2Ref}
            redraw={scrollPosition > 1900}
          ></SelectionFactor2>
        </ChartContainer>
      </InsightContainer1>

      <TrainContainer>
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
          <p>여러분들의 소중한 시간...</p>
          <p>기나긴 출퇴근의 향연..</p>
          <p>하루의 큰 부분을 </p>
          <p>차지하는 출퇴근길 지겹지 않으세요?</p>
          <p>조금 줄여볼 생각 없으세요?</p>
          <p>매일 반복되는 일상 속에서</p>
          <p>이젠 좀 더 알차게 보내봐요</p>
          <p>내가 가지고 있는 소중한 시간을 허투로 보내는 게</p>
          <p>얼마나 아까운 일인지를 아는 당신!</p>
          <p></p>
          <p></p>
          <p></p>
          <p className={scrollPosition > 5550 ? 'bold' : 'small'}>
            {' '}
            <Logo>
              <div>2</div>
              <span>사가게?</span>
            </Logo>
          </p>
        </TrainDescribe>
      </TrainContainer>
      <InsightContainer2>
        <h1>
          직장인의 행복은 출퇴근 <strong>소요시간</strong>순이잖아요
        </h1>
        <ArticleContainer>
          <img
            src={article1}
            alt='article'
            style={{ transform: 'translate(100px,20px) skew(5deg,3deg)' }}
            className={`${
              scrollPosition < 7050 + 0 || scrollPosition > 7050 + 100
                ? ''
                : 'focus'
            }`}
          ></img>
          <img
            src={article2}
            alt='article'
            style={{ transform: 'translate(50px,40px) skew(5deg,3deg)' }}
            className={`${
              scrollPosition < 7050 + 100 || scrollPosition > 7050 + 200
                ? ''
                : 'focus'
            }`}
          ></img>
          <img
            src={article3}
            alt='article'
            style={{ transform: 'translate(-50px,60px) skew(5deg,3deg)' }}
            className={`${
              scrollPosition < 7050 + 200 || scrollPosition > 7050 + 300
                ? ''
                : 'focus'
            }`}
          ></img>
          <img
            src={article4}
            alt='article'
            style={{ transform: 'translate(-150px,80px) skew(5deg,3deg)' }}
            className={`${
              scrollPosition < 7050 + 300 || scrollPosition > 7050 + 400
                ? ''
                : 'focus'
            }`}
          ></img>
        </ArticleContainer>
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
        <ChartContainer
          className={`${
            scrollPosition < 9800 ? 'hidden barChart' : 'barChart'
          }`}
        >
          <ChartDescription>
            <h1>같은 출근 시간</h1>
            <h1>꽉 찬 지하철과 텅빈 지하철의 차이가 보이시나요?</h1>
          </ChartDescription>
          <CongestionByStation
            ref={congestionByStationRef}
            redraw={scrollPosition > 9750}
          ></CongestionByStation>
        </ChartContainer>
        <ChartContainer
          className={`${
            scrollPosition < 10600 ? 'hidden barChart' : 'barChart'
          }`}
        >
          <ChartDescription>
            <h1>같은 지하철도</h1>
            <h1>상선, 하선에 따라 큰 혼잡도 차이를 보입니다!</h1>
          </ChartDescription>
          <CongestionByLine
            ref={congestionByLineRef}
            redraw={scrollPosition > 10550}
          ></CongestionByLine>
        </ChartContainer>
      </InsightContainer3>

      <RealEstateContainer>
        <CartoonGrid>
          <CartoonCut
            className={`cut1 ${
              scrollPosition > 12550 + 0 && scrollPosition < 12550 + 200
                ? 'focus'
                : ''
            }`}
          >
            <CartoonSubtitle>
              "서울에서 방을 구해야하는데 여기저기 허위매물 기사 투성이네"
            </CartoonSubtitle>
          </CartoonCut>
          <CartoonCut
            className={`cut2 ${
              scrollPosition > 12550 + 200 && scrollPosition < 12550 + 400
                ? 'focus'
                : ''
            }`}
          >
            <CartoonSubtitle>
              "아는역도 없고 가격도 다 제각각이고"
            </CartoonSubtitle>
          </CartoonCut>
          <CartoonCut
            className={`cut3 ${
              scrollPosition > 12550 + 400
                ? scrollPosition > 12550 + 600
                  ? 'focus none'
                  : 'focus'
                : ''
            }`}
          >
            <CartoonSubtitle>
              "이 두개를 접목해준 서비스 어디 없나?"
            </CartoonSubtitle>
          </CartoonCut>
          <CartoonCut
            className={`cut4 ${
              scrollPosition > 12550 + 600 ? 'focus' : 'none'
            }`}
          >
            <CartoonSubtitle>
              "이 두개를 접목해준 서비스 어디 없나?"
            </CartoonSubtitle>
          </CartoonCut>
        </CartoonGrid>
      </RealEstateContainer>
      <InsightContainer4>
        <ChartContainer
          className={`${
            scrollPosition < 13800 ? 'hidden barChart' : 'barChart'
          }`}
        >
          <ChartDescription>
            <h1>역마다 다른 가격차이에</h1>
            <h1>예산에 맞는 역세권을 선택하기 힘드시죠?</h1>
            <p>
              부동산 실거래 데이터를 바탕으로 단위 면적 당 가격을 계산하였고,
              사용자가 원하는 예산에 맞춰서 더욱 똑똑하게 역세권을 추천해줍니다
            </p>
          </ChartDescription>
          <RealEstatePrice
            ref={congestionByLineRef}
            redraw={scrollPosition > 13750}
          ></RealEstatePrice>
        </ChartContainer>
      </InsightContainer4>
      <PleaseTakeMeUp
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        네, 잘알겠습니다.
      </PleaseTakeMeUp>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  width: 100%;
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
    color: #33a23d;
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
      color: #33a23d;
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
  position: absolute;
  color: #33a23d;
  top: 1160px;
  padding: 50px 100px;
  background-color: #eeeeee;
  border-radius: 50px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: #eeeeee;
    border-bottom: 0;
    border-left: 0;
    margin-left: -10px;
    margin-bottom: -20px;
  }
`;

const Logo = styled.div`
  position: relative;
  color: #33a23d;
  flex-direction: row !important;
  font-family: 'NanumSquareNeoExtraBold';
  font-size: 54px;
  margin-top: 12px;
  height: 120px;
  width: 300px;
  border: 10px solid #33a23d;
  border-radius: 120px;
  background-color: white;
  box-shadow: 2px 1px 2px rgb(0, 0, 0, 0.3), -2px 1px 2px rgb(0, 0, 0, 0.2);
  div {
    color: white;
    font-family: 'NanumSquareNeoHeavy';
    position: absolute;
    left: 16px;
    background-color: #33a23d;
    border-radius: 100%;
    width: 76px;
    height: 76px;
    line-height: 76px;
    text-align: center;
  }
  span {
    position: absolute;
    left: 100px;
  }
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
  height: 1500px;
  padding-top: 100px;
  h1 {
    position: sticky;
    top: 10px;
    font-size: 46px;
    strong {
      color: #33a23d;
    }
  }
`;
const ArticleContainer = styled.div`
  width: 50%;
  position: sticky;
  top: 80px;

  img {
    transition: margin 0.3s ease-in-out;
    margin-top: 500px;
    position: absolute;
    transform: skew(5deg, 5deg);
    width: 100%;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  }
  .focus {
    margin-top: 0px;
  }
`;

const InsightContainer3 = styled.div`
  height: 2200px;
  padding: 30px;
  padding-top: 100px;
  .barChart {
    margin-bottom: 200px;
    flex-direction: column;
  }
`;

const InsightContainer4 = styled.div`
  height: 2000px;
  padding-top: 140px;
  div {
    p {
      font-size: 18px;
      color: #7f917d;
    }
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  justify-content: center;
  transition: opacity 0.3s;
  canvas {
    margin: 20px;
  }
  .hidden {
    opacity: 0;
  }
`;

const ChartDescription = styled.div`
  margin: 30px;
  font-size: 40px;
  p {
    font-size: 30px;
    margin: 20px;
  }
  h1 {
    margin: 10px;
    font-size: 46px;
    strong {
      color: #33a23d;
    }
  }
`;

const TrainContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 3600px;
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
    color: black;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff,
      0 0 40px #fff, 0 0 55px #fff, 0 0 75px #fff;
    transition: transform 0.3s;
  }
  .small {
    color: #33a23d;
    transform: scale(0);
  }
  .bold {
    font-size: 100px;
    transform: scale(1);
    color: #33a23d;
    text-shadow: none;
    padding-bottom: 40px;
  }
`;
const RushHourContainer = styled.div`
  display: grid !important;
  align-items: flex-start !important;
  grid-template-columns: 1fr 450px;
  height: 1900px;
  position: relative;
  background-color: black;

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
    color: white;
    span {
      font-size: 40px;
      opacity: 0.3;
    }
    .focus {
      opacity: 1;
      strong {
        color: #33a23d;
      }
    }
  }
`;

const RealEstateContainer = styled.div`
  background-color: black;
  height: 1800px;
`;
const CartoonGrid = styled.div`
  display: grid !important;
  grid-template-columns: 1.3fr 1fr;
  grid-template-rows: 1fr 1.1fr;
  position: sticky;
  top: 20px;
  margin: 20px;
  width: 80%;
  height: calc(100vh - 60px);
  background-color: white;
  padding: 10px;
  align-items: stretch !important;
  div:nth-child(3) {
    grid-column: auto / span 3;
  }
  div:nth-child(4) {
    grid-column: auto / span 3;
  }
  .cut1 {
    background-image: url(${cut1});
  }
  .cut2 {
    background-image: url(${cut2});
  }
  .cut3 {
    background-image: url(${cut3});
    background-position: center;
  }
  .cut4 {
    background-image: url(${cut4});
    background-position: center;
    span {
      display: none;
    }
  }
  .focus {
    filter: grayscale(0%);
  }
`;
const CartoonCut = styled.div`
  position: relative;
  margin: 10px;
  background-color: white;
  background-size: cover;
  filter: grayscale(100%) blur(1px);
  transition: filter 0.3s;
`;

const CartoonSubtitle = styled.span`
  position: absolute;
  color: #fcd111;
  font-style: italic;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-size: 20px;
  bottom: 30px;
`;

const PleaseTakeMeUp = styled.div`
  background-color: yellowgreen;
  width: 100px;
  height: 100px;
  position: fixed;
  left: 30px;
  bottom: 200px;
  z-index: 100;
  cursor: pointer;
`;

export default AboutPage;
