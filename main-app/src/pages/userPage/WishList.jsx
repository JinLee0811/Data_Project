import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import { ClipLoader } from 'react-spinners';

function WishList(props) {
  const { sendRequest } = useHttpRequest();
  const [wish, setWish] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserWish();
  }, []);
  const getUserWish = async () => {
    setIsLoading(true);
    try {
      const response = await sendRequest('/wish/mypage', 'get');
      setWish((cur) => response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteWish = async (e, id) => {
    e.preventDefault();
    const newWish = wish.filter((wish) => wish.id !== id);
    setWish(newWish);
    try {
      const response = await sendRequest(`/wish/user/${id}`, 'delete', {});
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) {
    return (
      <Container>
        <ClipLoader color='#33a23d' loading={isLoading} />
      </Container>
    );
  }
  return (
    <>
      <SectionTitle>내가 찜한 역세권❤️</SectionTitle>
      <DetailSection>
        <SectionContent>
          {wish && wish.length > 0 ? (
            wish.map((wish) => (
              <SubwayBox key={wish.user_id} line={wish.station.station_line}>
                <DeleteButton onClick={(e) => handleDeleteWish(e, wish.id)}>
                  x
                </DeleteButton>
                {wish.station.station_name}역
              </SubwayBox>
            ))
          ) : (
            <NoneBox>찜한 역세권이 없습니다.</NoneBox>
          )}
        </SectionContent>
      </DetailSection>
    </>
  );
}
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  align-items: center;
`;
const DetailSection = styled.div`
  height: 400px;
  width: 500px;
  overflow: auto;
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 50px;
  border-radius: 5px;
  background-color: #a0dda5;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-family: 'NanumSquareNeoExtraBold';
`;
const lineColors = {
  '1호선': '#0d3692',
  '2호선': '#52c41a',
  '3호선': '#f5a623',
  '4호선': '#3065ab',
  '5호선': '#8b50a4',
  '6호선': '#cd9a6b',
  '7호선': '#54640d',
  '8호선': '#e6a0c4',
};
const SubwayBox = styled.div`
  margin: 5px;
  padding: 20px;
  background-color: ${(props) =>
    props.line ? lineColors[props.line] : 'white'};
  border-radius: 100px;
  display: inline-block;
  color: ${(props) => (props.line ? 'white' : 'black')};
  font-size: 13px;
  font-weight: bold;
  button {
    background-color: ${(props) =>
      props.line ? lineColors[props.line] : 'white'};
    color: ${(props) => (props.line ? 'white' : 'black')};
  }
  :hover {
    background-color: #7bc745;
    color: white;
    button {
      background-color: #7bc745;
      color: white;
    }
  }
`;

const SectionContent = styled.div`
  font-size: 16px;
  margin-bottom: 0px;
`;
const NoneBox = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 100px;
  display: inline-block;
  color: black;
  font-size: 13px;
  font-weight: bold;
  :hover {
    background-color: #7bc745;
    color: white;
    button {
      background-color: #7bc745;
      color: white;
    }
  }
`;

const DeleteButton = styled.button`
  float: right;
  background-color: white;
  border: 0px solid rgb(218, 220, 224);
  cursor: pointer;
  border-radius: 10px;
  padding: 0px;
  margin: 0px 0px 0px 5px;
  :hover {
    background-color: white;
    color: white;
  }
`;

export default WishList;
