import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import useHttpRequest from '../../utils/useHttp';
import { ClipLoader } from 'react-spinners';

// 가져올 것 -> 고양이 이미지, 닉네임, 이메일, 찜 수, 리뷰 수
function UserPage(props) {
  const [wish, setWish] = useState();
  const [review, setReview] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { sendRequest } = useHttpRequest();

  useEffect(() => {
    setIsLoading(true); // 데이터 로딩 중임을 표시

    Promise.all([getUserInfo(), getUserWish(), getUserReview()])
      .then(() => {
        setIsLoading(false); // 모든 데이터가 로딩되었음을 표시
      })
      .catch((error) => console.error(error));
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await sendRequest('/account', 'get');
      setUserInfo((cur) => response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const getUserWish = async () => {
    try {
      const response = await sendRequest('/wish/mypage', 'get');
      setWish((cur) => response);
    } catch (error) {
      console.error(error);
    }
  };
  const getUserReview = async () => {
    try {
      const response = await sendRequest('/review', 'get');
      setReview((cur) => response);
    } catch (error) {
      console.error(error);
    }
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
      <UserPageContainer>
        <LeftContainer>
          <InsideLeftContainer>
            <UserBrief>
              <ProfileImage
                src={
                  'https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000'
                }
                alt='Profile Image'
              />
              <UserBrief>
                <UserName>
                  {userInfo?.nickname}
                  <Link to='/user/nickchange'>
                    <NickChange>
                      <span className='material-symbols-outlined'>edit</span>
                    </NickChange>
                  </Link>
                </UserName>
              </UserBrief>
              <UserEmail>{userInfo?.email}</UserEmail>
              <LinkBox>
                <LinkBox2>
                  <Atag>
                    <Link to={'/user/wishlist'}>
                      <Emogi>
                        <span class='material-symbols-outlined'>favorite</span>
                      </Emogi>
                      <UserInfo>나의 찜</UserInfo>
                      <StationCount>
                        {wish?.length > 0 ? wish.length : 0}
                      </StationCount>
                    </Link>
                  </Atag>

                  <Atag>
                    <Link to={'/user/review'}>
                      <Emogi>
                        <span className='material-symbols-outlined'>chat</span>
                      </Emogi>
                      <UserInfo>나의 리뷰</UserInfo>

                      <StationCount>
                        {review?.length > 0 ? review.length : 0}
                      </StationCount>
                    </Link>
                  </Atag>
                </LinkBox2>
              </LinkBox>
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
            <Outlet
              context={{
                wish,
                setWish,
                review,
                setReview,
                userInfo,
                setUserInfo,
                isLoading,
                setIsLoading,
              }}
            />
          </RightSection>
        </RightContainer>
      </UserPageContainer>
      <Footer>
        <p>
          <a
            href='https://www.notion.so/elice/3087fb6533044f71916c420d86213a6e?p=0d06a8c5921d4817b428bd9fac47ac87&pm=s'
            target='_blank'
            rel='noreferrer'>
            Notion
          </a>{' '}
          |
          <a
            href='https://kdt-gitlab.elice.io/ai_track/class_06/data_project/team02/frontend-real'
            target='_blank'
            rel='noreferrer'>
            GitLab
          </a>
          <br />
          <br />
          <br />
          <span>Copyright © 2023</span>
        </p>
        <p>
          <span>팀명 : 이사가게? 어디가게?</span>
          <br />
          <span>팀장 : 이정진</span>
          <br />
          <span>F E : 최호열 안나연 이정진</span>
          <span>B E : 정종열 강성훈 이승은</span>
          <br />
        </p>
      </Footer>
    </>
  );
}
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 380px;
  align-items: center;
`;
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
  margin: 70px 20px 0px 20px;
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
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: bold;
`;
const UserName = styled.h2`
  background-color: #f4f4f4;
  font-family: 'NanumSquareNeoExtraBold';
  border: 0px;
  display: inline;
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
  margin-left: 20px;
  color: #292929;
`;
const NickChange = styled.div`
  border: 0px;
  margin: 5px;
  display: inline;
  background-color: #f4f4f4;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
const UserEmail = styled.p`
  font-size: 16px;
  color: #828c94;
`;
const UserInfo = styled.div`
  font-size: 16px;
  line-height: 21px;
  font-weight: normal;
  text-align: center;
  color: #828c94;
`;
const UserButton = styled.button`
  background-color: #33a23d;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 3rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #7bc745;
  }
`;
const StationCount = styled.div`
  color: #525b61;
  font-size: 15px;
  line-height: 21px;
  font-weight: bold;
  text-align: center;
  margin-top: 5px;
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
    li a {
      color: #33a23d;
    }
  }
  li a:hover {
    color: #008f62;
  }
`;
const RightSection = styled.div`
  margin: auto;
`;
const Footer = styled.div`
  width: 100%;
  height: 50px;
  bottom: 0px;
  border-top: 1px solid #c4c4c4;
  padding-top: 15px;
  color: #808080;
  font-size: 11px;
  display: flex;
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
    display: inline-block;
  }
  p span {
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 10px;
  }
`;

const LinkBox = styled.div`
  border-top: 1px solid rgb(234, 235, 239);
  width: 250px;
  margin-top: 30px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 30px;
  display: block;
  flex-direction: column;
`;
const LinkBox2 = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
`;

const Emogi = styled.div`
  margin: 0px auto 4px;
  margin-top: 10px;
`;
const Atag = styled.a`
  flex: 1 0 0px;
  display: block;
  min-width: 0px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  touch-action: manipulation;
  transition: opacity 0.1s ease 0s;

  &:hover {
    opacity: 0.6;
  }
`;

export default UserPage;
