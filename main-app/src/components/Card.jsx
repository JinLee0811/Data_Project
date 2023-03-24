import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Card({ review }) {
  return (
    <Container>
      <Author>{review?.user?.nickname}</Author>
      <Body>{review.body}</Body>
      <Date>{review.createdAt.split('T')[0]}</Date>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.8rem;
  font-size: 0.7rem;
  border-bottom: 0.5px solid #e9ecef;
`;

const Author = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem;
`;

const Body = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem;
`;

const Date = styled.div`
  font-size: 0.5rem;
  color: #999;
  margin: 0.5rem;
`;
