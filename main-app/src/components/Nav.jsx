import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SideDrawer from './SideDrawer';
import NavLink from './NavLink';

const Nav = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerIsOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={handleCloseDrawer}></Backdrop>}
      <SideDrawer show={drawerIsOpen} closeNav={handleCloseDrawer}>
        <NavLink></NavLink>
      </SideDrawer>
      <NavigationBar>
        <SideDrawerButton onClick={handleOpenDrawer}>
          <span />
          <span />
          <span />
        </SideDrawerButton>
        <Link to='/'>
          <LogoBox>
            <div>2</div>
            <span>사가게?</span>
          </LogoBox>
        </Link>
        <NavLink></NavLink>
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
    background: #33a23d;
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
  color: #33a23d;
  flex-direction: row;
  font-family: 'NanumSquareNeoExtraBold';
  font-size: 1.5rem;
  margin-top: 12px;
  height: 3.7rem;
  width: 9rem;
  border: 10px solid #33a23d;
  border-radius: 40px;
  align-items: center;
  background-color: white;
  box-shadow: 2px 1px 2px rgb(0, 0, 0, 0.3), -2px 1px 2px rgb(0, 0, 0, 0.2);
  div {
    color: white;
    font-family: 'NanumSquareNeoHeavy';
    position: absolute;
    left: 6px;
    background-color: #33a23d;
    border-radius: 100%;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
  }
  span {
    position: absolute;
    left: 50px;
  }
  @media (max-width: 768px) {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    height: 2.5rem;
    width: 7rem;
    font-size: 1rem;
    div {
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
    }
  }
`;

const NavigationBar = styled.nav`
  position: relative;
  background-color: #33a23d;
  padding: 0rem 2rem;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 34px solid white;

  z-index: 20;

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
          background-color: white;
          width: 10px;
          height: 10px;
          border: 6px solid #33a23d;
          border-radius: 50%;
        }
        p {
          position: absolute;
          top: -32px;
          color: #33a23d;
          width: 80px;
          text-align: center;
          font-family: 'NanumSquareNeoBold';
          letter-spacing: 1px;
        }
      }
    }
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding-left: 1.5rem;
    background-color: #fff;
    position: static;
  }
`;

export default Nav;
