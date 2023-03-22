import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function WishList(props) {
  const serverUrl = process.env.REACT_APP_API_URL;
  const [wish, setWish] = useState("");

  useEffect(() => {
    const getUserWish = async () => {
      try {
        const response = await axios.get(serverUrl + "/wish/mypage", {
          withCredentials: true,
        });
        setWish(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserWish();
  }, []);

  const handleDeleteWish = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${serverUrl}/wish/user/${id}`, {
        withCredentials: true,
      });
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SectionTitle>내가 찜한 역세권❤️</SectionTitle>
      <DetailSection>
        <SectionContent>
          {wish && wish.length > 0 ? (
            wish.map((wish) => (
              <SubwayBox key={wish.user_id}>
                <DeleteButton onClick={(e) => handleDeleteWish(e, wish.id)}>
                  x
                </DeleteButton>
                {wish.station.station_name}역
              </SubwayBox>
            ))
          ) : (
            <SubwayBox>찜한 역세권이 없습니다.</SubwayBox>
          )}
        </SectionContent>
      </DetailSection>
    </>
  );
}
const DetailSection = styled.div`
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 50px;
  border-radius: 5px;
  width: 500px;
  height: 400px;
  background-color: #a0dda5;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-family: "NanumSquareNeoExtraBold";
`;
const SubwayBox = styled.div`
  margin: 5px 5px;
  padding: 20px 20px 20px 20px;
  background-color: white;
  border-radius: 100px;
  font-size: 13px;

  display: inline-block;
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
