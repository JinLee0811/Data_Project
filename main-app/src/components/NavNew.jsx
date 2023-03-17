import React from 'react';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import { AuthContext } from '../utils/AuthContext';

const Nav = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleOpenDrawer = () => {
    setDrawerIsOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={handleCloseDrawer}></Backdrop>}
      <SideDrawer show={drawerIsOpen} closeNav={handleCloseDrawer}></SideDrawer>
      <NavigationBar>
        <SideDrawerButton onClick={handleOpenDrawer}>
          <span />
          <span />
          <span />
        </SideDrawerButton>

        <LogoBox>
          <div>2</div>
          <span>사가게?</span>
        </LogoBox>
        <Arrow>&rarr;</Arrow>
        <ul>
          <li>
            <Link to='/about'>소개</Link>
          </li>
          <li>
            <Link to='/'>역찾기</Link>
          </li>
          <li>
            <Link to='/admin/user'>관리자</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to='/user'>마이페이지</Link>
              </li>
              <li onClick={logout}>로그아웃</li>
            </>
          ) : (
            <>
              <li>
                <Link to='/register'>회원가입</Link>
              </li>
              <li>
                <Link to='/login'>로그인</Link>
              </li>
            </>
          )}
        </ul>
      </NavigationBar>
    </>
  );
};

const SideDrawerButton = styled.button`
  width: 2rem;
  height: 2.5rem;
  background: transparent;
  border: none;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  padding: 0;

  span {
    display: block;
    width: 2.5rem;
    height: 1px;
    background: #fff;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;
  @media (min-width: 768px) {
    display: none;
  }
`;

const LogoBox = styled.div`
  display: flex;
  position: relative;
  color: #4b2789;
  flex-direction: row;
  font-family: 'NanumSquareNeoExtraBold';
  font-size: 28px;
  margin-top: 5px;
  height: 60px;
  width: 157px;
  border: 10px solid #4b2789;
  border-radius: 40px;
  align-items: center;
  background-color: white;
  box-shadow: 2px 1px 2px rgb(0, 0, 0, 0.3), -2px 1px 2px rgb(0, 0, 0, 0.2);
  div {
    color: white;
    font-family: 'NanumSquareNeoHeavy';
    position: absolute;
    left: 6px;
    background-color: #4b2789;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  span {
    position: absolute;
    left: 50px;
  }
`;

const Arrow = styled.div`
  color: white;
  position: absolute;
  left: 240px;
  font-size: 30px;
  font-family: 'NanumSquareNeoBold';
`;

const NavigationBar = styled.nav`
  position: relative;
  background-color: #4b2789;
  padding: 1rem 3rem;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 15px solid white;
  ul {
    position: absolute;
    right: 50px;
    display: flex;
    align-items: center;
    list-style: none;
    height: 30px;
    margin: 0;
    padding: 0;

    li {
      margin: 0 0.5rem;
      font-size: 0.9rem;
      color: white;
      cursor: pointer;
      a {
        color: white;
      }
    }
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding-left: 1.5rem;
  }
`;

export default Nav;
