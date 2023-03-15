import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
const sampleData = [
  {
    id: 4,
    timeStamp: 2303121122,
    userId: 2,
    title: '건대입구역',
    content: '사람 많고 붐빔, 근데 먹을 곳 많아요.',
  },
];

const sampleLikeData = [
  {
    id: 1,
    userId: 2,
    station: '서울역',
  },
];

function UserPage(props) {
  const [imageUrl, setImageUrl] = useState('');
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

  useEffect(() => {
    // 랜덤 고양이 이미지 가져오기
    fetch('https://api.thecatapi.com/v1/images/search')
      .then((response) => response.json())
      .then((data) => setImageUrl(data[0].url))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <UserPageContainer>
        <LeftContainer>
          <InsideLeftContainer>
            <UserBrief>
              <ProfileImage src={imageUrl} alt='Profile Image' />
              <UserBrief>
                <UserName>닉네임</UserName>
                <Link to='/user/nickchange'>
                  <NickChange>✏️</NickChange>
                </Link>
              </UserBrief>
              <UserEmail>aasdassdf@naver.com</UserEmail>
              <UserInfo>나의 찜:</UserInfo>
              <Link to='/user/wishlist'>
                <StationCount>{userLikeCount}</StationCount>
              </Link>
              <UserInfo>나의 리뷰:</UserInfo>
              <Link to='/user/review'>
                <StationCount>{userOneReviewsCount}</StationCount>
              </Link>
              <UserBrief>
                <Link to='/'>
                  <UserButton>역 찾으러 가기</UserButton>
                </Link>
              </UserBrief>
            </UserBrief>
          </InsideLeftContainer>
        </LeftContainer>
        <MarginDiv></MarginDiv>
        <RightContainer>
          <MenuBar>
            <ul>
              <li>
                <Link to='/user'>마이페이지</Link>
              </li>
              <li>
                <Link to='/user/useredit'>프로필관리</Link>
              </li>
              <li>
                <Link to='/user/withdrawl'>회원탈퇴</Link>
              </li>
            </ul>
          </MenuBar>
          <RightSection>
            <Outlet />
          </RightSection>
        </RightContainer>
      </UserPageContainer>
      <Footer>
        <nav>
          <a
            href='https://www.notion.so/elice/3087fb6533044f71916c420d86213a6e?p=0d06a8c5921d4817b428bd9fac47ac87&pm=s'
            target='_blank'
            rel='noreferrer'
          >
            Notion
          </a>{' '}
          |
          <a
            href='https://kdt-gitlab.elice.io/ai_track/class_06/data_project/team02/frontend-real'
            target='_blank'
            rel='noreferrer'
          >
            GitLab
          </a>
        </nav>
        <p>
          <span>팀명 : 이사가게? 어디가게?</span>
          <br />
          <span>팀장 : 이정진</span>
          <br />
          <span>F E : 최호열 안나연 이정진</span>
          <br />
          <span>B E : 정종열 강성훈 이승은</span>
          <br />
        </p>
      </Footer>
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
  margin: 30px auto;
`;

const LeftContainer = styled.div`
  display: flex;
  height: 500px;
  margin: 70px 0px 180px 0px;
  flex-direction: column;
  background-color: #f4f4f4;
  align-items: center;
  border-radius: 7px;
  border: 1px solid rgb(218, 220, 224);
  box-shadow: 30 30 100px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 10px;
`;

const UserBrief = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;
`;

const UserName = styled.h2`
  background-color: #f4f4f4;
  border: 0px;
  display: inline;
  font-size: 24px;
  margin-bottom: 10px;
  margin-left: 20px;
`;

const NickChange = styled.button`
  display: inline;
  border: 0px;
  background-color: #f4f4f4;
  cursor: pointer;
`;

const UserEmail = styled.p`
  font-size: 16px;
`;

const UserInfo = styled.p`
  font-size: 16px;
  margin-bottom: 50px;
  display: inline-block;
  margin-right: 5px;
`;
const UserButton = styled.button`
  background-color: #8b5ad8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4b2789;
  }

  &:focus {
    outline: none;
  }
`;
const StationCount = styled.h4`
  cursor: pointer;
  color: red;
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
  margin: 30px 10px 50px 50px;
  padding: 0px 50px;
`;
const MenuBar = styled.div`
  font-size: 16px;
  padding: 20px 0px 0px 0px;
  margin-left: 0px;
  margin-top: 0px;
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-right: 1rem;
    }
  }
  li a:hover {
    color: #8b5ad8;
  }
`;
const RightSection = styled.div`
  margin: auto;
`;

const Footer = styled.div`
  width: 100%;
  height: 90px;
  bottom: 0px;
  position: absolute;
  border-top: 1px solid #c4c4c4;
  padding-top: 15px;
  color: #808080;
  font-size: 11px;
  section {
    padding-bottom: 105px;
  }
  a {
    display: inline-block;
    margin: 0 20px 10px 20px;
    color: #808080;
    font-size: 11px;
  }
  a:visited {
    color: #808080;
  }
  p {
    margin-top: 0;
    margin-bottom: 0;
  }
  p span {
    display: inline-block;
    margin-left: 20px;
  }
`;

export default UserPage;
