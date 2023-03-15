import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <NavigationBar>
      <ul>
        <li>
          <Link to='/about'>소개</Link>
        </li>
        <li>
          <Link to='/'>역찾기</Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link to='/admin/user'>관리자</Link>
        </li>
        <li>
          <Link to='/register'>회원가입</Link>
        </li>
        <li>
          <Link to='/login'>로그인</Link>
        </li>

        <li>
          <Link to='/user'>마이페이지</Link>
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
  align-items: center;
  justify-content: space-between;
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0 0.5rem;
      font-size: 0.8rem;

      a {
        color: #fff;
      }
    }
  }
`;

export default Nav;
