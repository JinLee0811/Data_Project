import styled from 'styled-components';

export default function StationInfoGeneral() {
  return (
    <>
      <Div>소요시간</Div>
      <Div>체감시간</Div>
      <Div>편의시설</Div>
      <Div>단위면적 가격</Div>
      <Div>혼잡도 그래프</Div>
    </>
  );
}

const Div = styled.div`
  padding: 1rem;
  font-size: 0.7rem;
  border-bottom: 0.5px solid #e9ecef;
`;
