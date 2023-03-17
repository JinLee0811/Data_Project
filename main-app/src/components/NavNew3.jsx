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

        <ul>
          <li>
            <Link to='/about'>
              <div className='station'></div>
              <p>소개</p>
            </Link>
          </li>
          <li>
            <Link to='/'>
              <div className='station'></div>
              <p>역찾기</p>
            </Link>
          </li>
          <li>
            <Link to='/admin/user'>
              <div className='station'></div>
              <p>관리자</p>
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to='/user'></Link>
              </li>
              <li onClick={logout}>로그아웃</li>
            </>
          ) : (
            <>
              <li>
                <Link to='/register'>
                  <div className='station'></div>
                  <p>회원가입</p>
                </Link>
              </li>
              <li>
                <Link to='/login'>
                  <div className='station'></div>
                  <p>로그인</p>
                </Link>
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
  color: white;
  flex-direction: row;
  font-family: 'NanumSquareNeoExtraBold';
  font-size: 28px;
  margin-top: 5px;
  height: 60px;
  width: 157px;
  border: 10px solid white;
  border-radius: 40px;
  align-items: center;
  background-color: #4b2789;
  box-shadow: 2px 1px 2px rgb(0, 0, 0, 0.3), -2px 1px 2px rgb(0, 0, 0, 0.2);
  div {
    color: #4b2789;
    font-family: 'NanumSquareNeoHeavy';
    position: absolute;
    left: 6px;
    background-color: white;
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

const NavigationBar = styled.nav`
  position: relative;
  background-color: white;
  padding: 0rem 2rem;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 30px solid #4b2789;
  border-bottom: 30px solid #4b2789;

  ul {
    position: absolute;
    right: 50px;
    display: flex;
    align-items: center;
    list-style: none;
    height: 10px;
    margin: 0;
    padding: 0;

    li {
      margin: 0 3rem;
      font-size: 0.9rem;
      position: relative;
      cursor: pointer;
      a {
        display: flex;
        justify-content: center;
        position: relative;
        .station {
          background-color: #4b2789;
          width: 10px;
          height: 10px;
          border: 6px solid white;
          border-radius: 50%;
        }
        p {
          position: absolute;
          top: 12px;
          color: white;
          width: 60px;
          text-align: center;
        }
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
