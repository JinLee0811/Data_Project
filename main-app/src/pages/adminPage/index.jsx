import React, { useState } from "react";
import styled from "styled-components";
import UserManage from "./UserManage";
import ReviewManage from "./ReviewManage";
import Calculate from "./Calculate";
import { Outlet, NavLink } from "react-router-dom";

function Sidebar({ onSelect, currentSelection }) {
  const items = ["사용자 관리", "리뷰 관리", "계산식"];

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
`;

const MainContainer = styled.section`
  flex: 1;
  padding: 40px;
`;

const Aside = styled.aside`
  width: 200px; // adjust the width as necessary
  background-color: #f2f2f2; // sets the background color of the sidebar
  position: relative; // fixes the sidebar in place
  top: 0;
  left: 0;
  bottom: 0;

  ul {
    list-style: none;
    margin-top: 40px;
    li {
      margin-bottom: 2rem;
      cursor: pointer;
    }
    .active {
      border-bottom: 2px solid #4b2789;
      /* padding-bottom: 3px; */
    }
  }
`;

export default AdminPage;
