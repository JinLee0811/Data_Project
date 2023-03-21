import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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
      const response = await axios.get(serverUrl + "/wish", {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SectionTitle href='/user/wishlist'>내가 찜한 역세권❤️</SectionTitle>
      <DetailSection>
        <SectionContent>
          {wish && wish.length > 0 ? (
            wish.map((wish) => (
              <SubwayBox key={wish.user_id}>
                <DeleteButton onClick={(e) => handleDeleteWish(e, wish.id)}>
                  x
                </DeleteButton>
                {wish.station_id}
              </SubwayBox>
            ))
          ) : (
            <SubwayBox>찜한 역세권이 없습니다.</SubwayBox>
          )}
        </SectionContent>
      </DetailSection>
      <SectionTitle href='/user/review'> 내가 쓴 리뷰📝</SectionTitle>
      <DetailSection>
        <SectionContent>
          {review && review.length > 0 ? (
            review.map((review) => (
              <ReviewBox key={review.id}>
                <DeleteButton onClick={(e) => handleDeleteReview(e, review.id)}>
                  x
                </DeleteButton>
                ({review.createdAt}) {review.station_id} - {review.body}
              </ReviewBox>
            ))
          ) : (
            <ReviewBox>남긴 리뷰가 없습니다</ReviewBox>
          )}
        </SectionContent>
      </DetailSection>
    </>
  );
}
const DetailSection = styled.div`
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
  margin: 0px 0px 15px 0px;
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

export default MyPage;
