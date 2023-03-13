import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <NavigationBar>
      <ul>
        <li>
          <Link to='/'>소개</Link>
        </li>
        <li>
          <Link to='/login'>로그인/회원가입</Link>
        </li>
        <li>
          <Link to='/'>역찾기</Link>
        </li>
        <li>
          <Link to='/admin'>관리자</Link>
        </li>
      </ul>
    </NavigationBar>
  );
};

const NavigationBar = styled.nav`
  background-color: #4b2789;
  padding: 1rem;
  height: 30px;
  display: flex;
  width: 100%;
  align-items: center;
  position: fixed;
  background-color: #4b2789;
  z-index: 9999;

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-right: 1rem;

      a {
        color: #fff;
      }
    }
  }
`;

export default Nav;
