import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

function MyPage(props) {
  const serverUrl = process.env.REACT_APP_API_URL;
  const [wish, setWish] = useState([]);
  const [review, setReview] = useState([]);

  useEffect(() => {
    getUserWish();
    getUserReview();
  }, []);

  const getUserWish = async () => {
    try {
      const response = await axios.get(serverUrl + "/wish/mypage", {
        withCredentials: true,
      });
      setWish(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getUserReview = async () => {
    try {
      const response = await axios.get(serverUrl + "/review", {
        withCredentials: true,
      });
      setReview(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReview = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${serverUrl}/review/${id}`, {
        withCredentials: true,
      });
      getUserReview();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteWish = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${serverUrl}/wish/user/${id}`, {
        withCredentials: true,
      });
      getUserWish();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("ko-KR", options);
  };

  return (
    <>
      <SectionTitle href='/user/wishlist'>내가 찜한 역세권❤️</SectionTitle>
      <DetailSection>
        <SectionContent>
          {wish && wish.length > 0 ? (
            wish.slice(0, 5).map((wish) => (
              <SubwayBox key={wish.user_id}>
                <DeleteButton onClick={(e) => handleDeleteWish(e, wish.id)}>
                  x
                </DeleteButton>
                {wish.station.station_name}역
              </SubwayBox>
            ))
          ) : (
            <SubwayBox>찜한 역세권이 없습니다.</SubwayBox>
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
              <ReviewBox key={review.id}>
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
            <ReviewBox>남긴 리뷰가 없습니다</ReviewBox>
          )}
        </SectionContent>
        <Link to='/user/review'>
          <MoreList>더보기</MoreList>
        </Link>
      </DetailSection>
    </>
  );
}
const DetailSection = styled.div`
  position: relative;
  display: flex;
  width: 500px;
  min-height: 100px;
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 50px;
  border-radius: 5px;
  background-color: #a0dda5;
`;

const SectionTitle = styled.a`
  font-family: "NanumSquareNeoExtraBold";
  display: inline-block;
  font-size: 20px;
  color: black;
  text-decoration: none;
  margin-top: 20px;
`;
const SubwayBox = styled.div`
  margin: 5px 5px;
  padding: 20px 20px 20px 20px;
  background-color: white;
  border-radius: 100px;
  display: inline-block;
  font-size: 13px;
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
  background-color: white;
  border-radius: 10px;
  display: inline-block;
  font-size: 13px;
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
