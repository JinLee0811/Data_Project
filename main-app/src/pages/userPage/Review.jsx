import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function Review(props) {
  const serverUrl = process.env.REACT_APP_API_URL;
  const [review, setReview] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
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
    getUserReview();
  }, []);

  const handleDeleteReview = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${serverUrl}/review/${id}`, {
        withCredentials: true,
      });
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  //날짜 받아오기
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("ko-KR", options);
  };

  return (
    <>
      <SectionTitle>내가 쓴 리뷰📝</SectionTitle>
      <DetailSection>
        <SectionContent>
          {review && review.length > 0 ? (
            review.map((review) => (
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
      </DetailSection>
    </>
  );
}
const DetailSection = styled.div`
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 50px;
  border-radius: 5px;
  background-color: #a0dda5;
  width: 500px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-family: "NanumSquareNeoExtraBold";
`;

const ReviewBox = styled.div`
  margin: 0px 0px 15px 0px;
  padding: 20px 20px 20px 20px;
  background-color: white;
  border-radius: 10px;
  display: block;
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

export default Review;
