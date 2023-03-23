import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import { ClipLoader } from 'react-spinners';
import { useOutletContext } from 'react-router-dom';

function Review(props) {
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
    setReview(newReview);
    e.preventDefault();
    try {
      const response = await sendRequest(`/review/${id}`, 'delete', {});
    } catch (error) {
      console.error(error);
    }
  };

  //날짜 받아오기
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
      <SectionTitle>내가 쓴 리뷰📝</SectionTitle>
      <DetailSection>
        <SectionContent>
          {review && review.length > 0 ? (
            review.map((review) => (
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
  height: 400px;
  width: 500px;
  overflow: auto;
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 50px;
  border-radius: 5px;
  background-color: #a0dda5;

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #eee;
  }
  .animate {
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .animate.fade-in {
    opacity: 1;
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

const SectionTitle = styled.h2`
  font-size: 20px;
  font-family: 'NanumSquareNeoExtraBold';
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
const ReviewBox = styled.div`
  margin: 0px 0px 15px 15px;
  padding: 20px 20px 20px 20px;
  background-color: ${(props) =>
    props.line ? lineColors[props.line] : 'white'};
  border-radius: 10px;
  display: block;
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

export default Review;
