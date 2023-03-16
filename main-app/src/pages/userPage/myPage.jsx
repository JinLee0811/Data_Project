import React, { useState, useEffect } from "react";
import styled from "styled-components";

const sampleData = [
  
];

const sampleLikeData = [
  
];

function MyPage(props) {
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
      <SectionTitle>내가 찜한 역세권❤️</SectionTitle>
        <DetailSection>
          <SectionContent>
          {likes.map((like) => (
                <SubwayBox key={like.id}>
                  <DeleteButton>x</DeleteButton>





                  
                 {like.station}
                </SubwayBox>
              ))}
            </SectionContent>
        </DetailSection>
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
  width: 500px;
  height: 100px;
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 50px;
  border-radius: 5px;
  background-color: #E0DAFC;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
`;
const SubwayBox = styled.div`
  margin: 5px 5px;
  padding: 20px 20px 20px 20px;
  background-color: white;
  border-radius: 100px;
  display: inline-block;
  :hover{
    background-color: #8B5AD8;
    color: white;
    button {
      background-color: #8B5AD8;
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


export default MyPage;