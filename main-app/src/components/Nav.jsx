import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
          <Link to='/main'>역찾기</Link>
        </li>
      </ul>
    </NavigationBar>
  );
};

const NavigationBar = styled.nav`
  background-color: #f0f0f0;
  padding: 1rem;

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-right: 1rem;
    }
  }
`;

export default Nav;
