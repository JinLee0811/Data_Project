import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';

const StationInfoSide = () => {
  const { station_id } = useParams();
  return (
    <Section>
      <Container>
        <Title>이대역</Title>
        <TableList>
          <NavLink to='general'>
            <div>홈</div>
          </NavLink>
          <NavLink to='review'>
            <div>리뷰</div>
          </NavLink>
        </TableList>
        <Outlet />
        {/* 
        <Link to='/'>
          <Button>검색하기</Button>
        </Link> */}
      </Container>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  /* border: 2px solid #83d189; */
  border-radius: 4px;
  flex-direction: column;
  /* margin: 1rem; */
`;
const Title = styled.h2`
  text-align: center;
  font-size: 1rem;
`;

const TableList = styled.div`
  display: flex;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem;
  font-size: 0.8rem;
  justify-content: space-around;
  
  .active {
      border-bottom: 2px solid #33a23d;
      
    }


}

`;

const Button = styled.button`
  background-color: #33a23d;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  width: 200px;
  color: #fff;
  margin-top: 20px;
`;

export default StationInfoSide;
