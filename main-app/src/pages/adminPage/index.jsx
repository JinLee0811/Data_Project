import React from 'react';
import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <Aside>
      <ul>
        <li>
          <NavLink to='/admin/user'>사용자 관리</NavLink>
        </li>
        <li>
          <NavLink to='/admin/review'>리뷰 관리</NavLink>
        </li>
        <li>
          <NavLink to='/admin/calculate'>계산식</NavLink>
        </li>
      </ul>
    </Aside>
  );
}

function AdminPage() {
  return (
    <Container>
      <Sidebar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: row;
  height: 100vh;
  margin-top: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContainer = styled.section`
  flex: 1;
  padding: 40px;
  font-size: 0.8rem;
`;

const Aside = styled.aside`
  width: 200px;

  position: relative;
  top: 0;
  left: 0;

  ul {
    list-style: none;
    margin-top: 40px;
    li {
      margin-bottom: 2rem;
      cursor: pointer;
      font-size: 0.8rem;
    }

    .active {
      border-bottom: 2px solid #33a23d;
      /* padding-bottom: 3px; */
    }
    @media (max-width: 768px) {
      display: flex;
      padding-inline-start: 0;
      li {
        padding-right: 1rem;
        margin: 0;
      }
    }
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #fff;
  }
`;

export default AdminPage;
