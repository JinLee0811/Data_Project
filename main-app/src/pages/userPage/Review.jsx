import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function Review(props) {
  const serverUrl = process.env.REACT_APP_API_URL;
  const [review, setReview] = useState("");

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

  return (
    <>
      <SectionTitle>내가 쓴 리뷰📝</SectionTitle>
      <DetailSection>
        <SectionContent>
          {review && review.length > 0 ? (
            review.map((review) => (
              <ReviewBox key={review.id}>
                <DeleteButton>x</DeleteButton>({review.createdAt}){" "}
                {review.station_id} - {review.body}
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
  height: 400px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-family: "NanumSquareNeoExtraBold";
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

export default Review;
