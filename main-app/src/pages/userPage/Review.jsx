import React, { useState, useEffect } from "react";
import styled from "styled-components";

const sampleData = [
  {
    id: 4,
    timeStamp : 2303121122,
    userId: 2,
    title: "건대입구역",
    content: "사람 많고 붐빔, 근데 먹을 곳 많아요.",
  },
];

const sampleLikeData = [
  {
    id: 1,
    userId: 2,
    station: "서울역",
  },
];

function Review(props) {
  const [reviews, setReviews] = useState([]);
  const [likes, setLike] = useState([]);


  useEffect(() => {
    const userId = 2;
    setReviews(sampleData.filter((review) => review.userId === userId));
  }, []);
  const userOneReviews = reviews.filter((review) => review.userId === 2);
  const userOneReviewsCount = userOneReviews.length;

  useEffect(() => {
    const userId = 2;
    setLike(sampleLikeData.filter((like) => like.userId === userId));
  }, []);
  const userLike = likes.filter((like) => like.userId === 2);
  const userLikeCount = userLike.length;

  return (<>
        <SectionTitle>내가 쓴 리뷰📝</SectionTitle>
        <DetailSection>
          <SectionContent>
              {reviews.map((review) => (
                <ReviewBox key={review.id}>
                  <DeleteButton>x</DeleteButton>
                 ({review.timeStamp}) {review.title} - {review.content}
                </ReviewBox>
              ))}
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
  background-color: #E0DAFC;
  width: 500px;
  height: 400px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
`;

const ReviewBox = styled.div`
  margin: 0px 0px 15px 0px;
  padding: 20px 20px 20px 20px;
  background-color: white;
  border-radius: 100px;
  display: inline-block;
  font-size: 13px;
  :hover{
    background-color: #8B5AD8;
    color: white;
    button {
      background-color: #8B5AD8;
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
  :hover{
    background-color: white;
    color: white;
  }
`


export default Review;