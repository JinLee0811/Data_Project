import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import { Link, useOutletContext } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

function MyPage(props) {
  const { sendRequest } = useHttpRequest();
  const {
    wish,
    setWish,
    review,
    setReview,
    userInfo,
    setUserInfo,
    isLoading,
    setIsLoading,
  } = useOutletContext();

  const handleDeleteReview = async (e, id) => {
    const newReview = review.filter((review) => review.id !== id);
    setReview(newReview); //그냥 속도 빠르게 하자
    e.preventDefault();
    try {
      const response = await sendRequest(`/review/${id}`, 'delete', {});
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteWish = async (e, id) => {
    e.preventDefault();
    const newWish = wish.filter((wish) => wish.id !== id);
    setWish(newWish);
    try {
      const response = await sendRequest(`/wish/user/${id}`, 'delete', {});
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('ko-KR', options);
  };

  if (isLoading) {
    return (
      <Container>
        <ClipLoader color='#33a23d' loading={isLoading} />
      </Container>
    );
  }
  return (
    <>
      <SectionTitle href='/user/wishlist'>내가 찜한 역세권❤️</SectionTitle>
      <DetailSection>
        <SectionContent>
          {wish && wish.length > 0 ? (
            wish?.slice(0, 5).map((wish) => (
              <SubwayBox key={wish.user_id} line={wish.station.station_line}>
                <DeleteButton onClick={(e) => handleDeleteWish(e, wish.id)}>
                  x
                </DeleteButton>
                {wish.station.station_name}역
              </SubwayBox>
            ))
          ) : (
            <NoneBox>찜한 역세권이 없습니다.</NoneBox>
          )}
        </SectionContent>
        <Link to='/user/wishlist'>
          <MoreList>더보기</MoreList>
        </Link>
      </DetailSection>
      <SectionTitle href='/user/review'> 내가 쓴 리뷰📝</SectionTitle>
      <DetailSection>
        <SectionContent>
          {review && review.length > 0 ? (
            review.slice(0, 2).map((review) => (
              <ReviewBox key={review.id} line={review.station.station_line}>
                <DeleteButton onClick={(e) => handleDeleteReview(e, review.id)}>
                  x
                </DeleteButton>
                <StationInfo>
                  {review.station.station_line} {review.station.station_name}역
                </StationInfo>
                <DateInfo>{formatDate(review.createdAt)}</DateInfo>
                <ReviewContent>{review.body}</ReviewContent>
              </ReviewBox>
            ))
          ) : (
            <NoneBox>남긴 리뷰가 없습니다</NoneBox>
          )}
        </SectionContent>
        <Link to='/user/review'>
          <MoreList>더보기</MoreList>
        </Link>
      </DetailSection>
    </>
  );
}
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  align-items: center;
`;
const DetailSection = styled.div`
  position: relative;
  display: flex;
  width: 500px;
  min-height: 100px;
  margin-bottom: 30px;
  margin-top: 10px;
  padding: 50px;
  border-radius: 5px;
  background-color: #a0dda5;
`;

const SectionTitle = styled.h3`
  font-family: 'NanumSquareNeoExtraBold';
  display: inline-block;
  color: black;
  text-decoration: none;
  margin-top: 20px;
  margin-bottom: 0px;
`;

const lineColors = {
  '1호선': '#0d3692',
  '2호선': '#52c41a',
  '3호선': '#f5a623',
  '4호선': '#3065ab',
  '5호선': '#8b50a4',
  '6호선': '#cd9a6b',
  '7호선': '#54640d',
  '8호선': '#e6a0c4',
};

// 지하철 역 컴포넌트
const SubwayBox = styled.div`
  margin: 5px;
  padding: 20px;
  background-color: ${(props) =>
    props.line ? lineColors[props.line] : 'white'};
  border-radius: 100px;
  display: inline-block;
  color: ${(props) => (props.line ? 'white' : 'black')};
  font-size: 13px;
  font-weight: bold;
  button {
    background-color: ${(props) =>
      props.line ? lineColors[props.line] : 'white'};
    color: ${(props) => (props.line ? 'white' : 'black')};
  }
  :hover {
    background-color: #7bc745;
    color: white;
    button {
      background-color: #7bc745;
      color: white;
    }
  }
`;

const ReviewBox = styled.div`
  margin: 0px 0px 15px 15px;
  padding: 20px 20px 20px 20px;
  background-color: ${(props) =>
    props.line ? lineColors[props.line] : 'white'};
  border-radius: 10px;
  display: inline-block;
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.line ? 'white' : 'black')};
  button {
    background-color: ${(props) =>
      props.line ? lineColors[props.line] : 'white'};
    color: ${(props) => (props.line ? 'white' : 'black')};
  }
  :hover {
    background-color: #7bc745;
    color: white;
    button {
      background-color: #7bc745;
      color: white;
    }
  }
`;
const NoneBox = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 100px;
  display: inline-block;
  color: black;
  font-size: 13px;
  font-weight: bold;
  :hover {
    background-color: #7bc745;
    color: white;
    button {
      background-color: #7bc745;
      color: white;
    }
  }
`;
const StationInfo = styled.span`
  font-weight: bold;
`;

const DateInfo = styled.span`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 8px;
`;

const ReviewContent = styled.div`
  margin-top: 10px;
`;

const SectionContent = styled.div`
  font-size: 16px;
  margin-bottom: 0px;
`;

const DeleteButton = styled.button`
  float: right;
  background-color: white;
  border: 0px solid rgb(218, 220, 224);
  cursor: pointer;
  border-radius: 10px;
  padding: 0px;
  margin: 0px 0px 0px 5px;
  :hover {
    background-color: white;
    color: white;
  }
`;
const MoreList = styled.button`
  width: 70px;
  height: 30px;
  margin-bottom: 5px;
  background-color: #33a23d;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  align-self: flex-end;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #7bc745;
  }

  &:active {
    background-color: #f39c12;
  }
`;

export default MyPage;
