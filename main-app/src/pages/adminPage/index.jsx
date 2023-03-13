import React, { useState } from "react";
import styled from "styled-components";
import UserManage from "./userManage";
import ReviewManage from "./reviewManage";
import Calculate from "./calculate";

function Sidebar({ onSelect, currentSelection }) {
  const items = ["사용자 관리", "리뷰 관리", "계산식"];
  return (
    <Aside>
      <ul>
        {items.map((item) => (
          <li
            key={item}
            onClick={() => onSelect(item)}
            className={currentSelection === item ? "selected" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </Aside>
  );
}

function MainContent({ currentSelection }) {
  switch (currentSelection) {
    case "사용자 관리":
      return <UserManage />;
    case "리뷰 관리":
      return <ReviewManage />;
    case "계산식":
      return <Calculate />;
    default:
      return null;
  }
}

function AdminPage() {
  const [currentSelection, setCurrentSelection] = useState("사용자 관리");

  return (
    <Container>
      <Sidebar onSelect={setCurrentSelection} />
      <MainContainer>
        <MainContent currentSelection={currentSelection} />
      </MainContainer>
    </Container>
  );
}

const MainContainer = styled.section`
  flex-grow: 3;
`;

const Container = styled.section`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 120px;
  width: 100%;
`;

const Aside = styled.aside`
  flex-grow: 1;
  ul {
    list-style: none;
    li {
      margin-bottom: 2rem;
      cursor: pointer;
    }
    .selected {
      text-decoration: underline;
      color: red;
    }
  }
`;

export default AdminPage;
