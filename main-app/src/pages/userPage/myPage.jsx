import React, { useState, useEffect } from "react";
import styled from "styled-components";

const sampleData = [
  {
    id: 1,
    timeStamp : 2303121122,
    userId: 1,
    title: "강남역",
    content: "I loved using this product. It worked really well!",
  },
  {
    id: 2,
    timeStamp : 2303121122,
    userId: 1,
    title: "청담역",
    content: "This product didn't work for me and was a waste of money.",
  },
  {
    id: 3,
    timeStamp : 2303121122,
    userId: 2,
    title: "노원역",
    content: "생각보다 시끄러움.",
  },
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
    userId: 1,
    station: "강남역",
  },
  {
    id: 1,
    userId: 1,
    station: "강남역",
  },
  {
    id: 1,
    userId: 2,
    station: "고속버스터미널역",
  },
  {
    id: 1,
    userId: 2,
    station: "상봉역",
  },
  {
    id: 1,
    userId: 2,
    station: "서울역",
  },
];


function UserPage(props) {
  const [reviews, setReviews] = useState([]);
  const [likes, setLike] = useState([]);


  useEffect(() => {
    const userId = 2;
    setReviews(sampleData.filter((review) => review.userId === Number(userId)));
  }, []);
  const userOneReviews = reviews.filter((review) => review.userId === 2);
  const userOneReviewsCount = userOneReviews.length;

  useEffect(() => {
    const userId = 2;
    setLike(sampleLikeData.filter((like) => like.userId === Number(userId)));
  }, []);
  const userLike = likes.filter((like) => like.userId === 2);
  const userLikeCount = userLike.length;

  return (<>
  <MenuBar>
        <ul>
          <li><a href='/user'>마이페이지</a></li>
          <li><a href='/userinfo'>프로필관리</a></li>
        </ul>
      </MenuBar>
     <UserPageContainer>
      <LeftContainer>
        <InsideLeftContainer>
          <UserBrief>
          <ProfileImage
            src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"
            alt="Profile Image"
          />
            <UserName>닉네임</UserName>
            <UserEmail>aasdassdf@naver.com</UserEmail>
            <UserInfo>찜 개수:</UserInfo>
            <StationCount>{userLikeCount}</StationCount>
            <UserInfo>리뷰 수</UserInfo>
            <StationCount>{userOneReviewsCount}</StationCount>
            <UserBrief>
              <UserButton>회원 탈퇴</UserButton>
            </UserBrief>
          </UserBrief>
        </InsideLeftContainer>
      </LeftContainer>
      <MarginDiv></MarginDiv>
      <RightContainer>
      <SectionTitle>내가 찜한 역세권❤️</SectionTitle>
        <DetailSection>
          <SectionContent>
          {likes.map((like) => (
                <SubwayBox key={like.id}>
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
                 ({review.timeStamp}) {review.title} - {review.content}
                </ReviewBox>
              ))}
            </SectionContent>
        </DetailSection>
      </RightContainer>
    </UserPageContainer>
    </>
  );
}

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  background-color: white;
  border-radius: 8px;
  padding: 0px 0px;
  margin: 0px 0px 0px 100px;
  
`;

const LeftContainer = styled.div`
  display: flex;
  height:500px;
  margin: 70px 0px 180px 0px ;
  flex-direction: column;
  background-color: #f4f4f4;
  align-items: center;
  border-radius: 7px;
  border: 1px solid rgb(218, 220, 224);
  box-shadow: 30 30 100px rgba(0, 0, 0, 0.1)
`;

const InsideLeftContainer = styled.div`
  padding: 0px;
  min-height: 100px;
  position: relative;
  box-sizing: border-box;
  margin: 70px 50px 0px 50px;
  font-size: 15px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0px;
`;

const UserBrief = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;
`;

const UserName = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;
const UserEmail = styled.p`
  font-size: 16px;

`

const UserInfo = styled.p`
  font-size: 16px;
  margin-bottom: 50px;
  display: inline-block;
  margin-right: 5px;
`;
const UserButton = styled.button`
background-color: #8B5AD8;
  color: #ffffff;
  font-size: 16px;
  margin: 2px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
`;
const StationCount = styled.a`
opacity: 1;
transition: .1s opacity;
cursor: pointer;
touch-action: manipulation;
color: inherit;
text-decoration: none;
display: inline-block;
margin-right: 10px;
`;
const MarginDiv = styled.p`
padding-left: 30px;
padding-right: 30px;
background-color: white;
margin: 0px;
`;
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  border-radius: 7px;
  border: 1px solid rgb(218, 220, 224);
  margin:0px 10px 50px 50px;
  padding: 50px;
`;

const DetailSection = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  margin-right: 20px;
  padding: 50px;
  border-radius: 5px;
  background-color: #E0DAFC;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 0px;
  margin-top: 0px;
`;
const SubwayBox = styled.div`
  margin: 0px 5px;
  padding: 20px;
  background-color: white;
  border-radius: 100px;
  display: inline-block;
`

const ReviewBox = styled.div`
  margin: 0px 5px 5px 0px;
  padding: 20px;
  background-color: white;
  border-radius: 100px;
  display: inline-block;
  font-size: 13px;
`

const SectionContent = styled.div`
  font-size: 16px;
  margin-bottom: 80px;
`;

const MenuBar = styled.div`
margin: 70px 0px 0px 490px;
font-size: 16px;
background-color: #fff;
padding: 1rem;

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-right: 1rem;
    }
  } li a:hover{
    color:#8B5AD8;
  }
`



export default UserPage;