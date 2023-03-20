import React, { useState, useEffect } from "react";
import styled from "styled-components";

const sampleData = [
  {
    id: 4,
    timeStamp: 2303121122,
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

function WishList(props) {
  const [reviews, setReviews] = useState([]);
  const [likes, setLike] = useState([]);

  useEffect(() => {
    const userId = 2;
    setReviews(sampleData.filter((review) => review.userId === userId));
  }, []);

  useEffect(() => {
    const userId = 2;
    setLike(sampleLikeData.filter((like) => like.userId === userId));
  }, []);

  return (
    <>
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
    </>
  );
}
const DetailSection = styled.div`
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 50px;
  border-radius: 5px;
  width: 500px;
  height: 400px;
  background-color: #e0dafc;
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
  :hover {
    background-color: #8b5ad8;
    color: white;
    button {
      background-color: #8b5ad8;
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

export default WishList;
