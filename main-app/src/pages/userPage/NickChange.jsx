import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "../../components/Modal";


import { useUserInfo } from '../../hooks/user.hook'

const NickChange = () => {
  const serverUrl = process.env.REACT_APP_API_URL;

  const { userInfo } = useUserInfo()
  const [nickname, setNickname] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname)
    }
  }, [userInfo])

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleNicknameSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        serverUrl + "/account",
        { nickname },
        { withCredentials: true }
      );
      console.log("Nickname updated successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Greeting>변경하고자 하는 닉네임을 입력해 주세요.</Greeting>
      <Form onSubmit={handleNicknameSubmit}>
        <ConfirmBox>중복되지 않는 본인만의 닉네임으로 변경해보세요.</ConfirmBox>
        <Input
          type='text'
          name='닉네임'
          placeholder='닉네임'
          value={nickname}
          onChange={handleNicknameChange}
        />
        <Button onClick={openModal}>닉네임 변경하기</Button>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <h2>모달 내용</h2>
          <p>이곳에 모달 내용을 작성할 수 있습니다.</p>
        </Modal>
        <Button type='submit'>닉네임 변경하기</Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 500px;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const Greeting = styled.h2`
  white-space: pre-wrap;
  margin: 0px 0px 100px 0px;
`;
const ConfirmBox = styled.h4`
  color: gray;
  white-space: pre-wrap;
  margin: 0px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #8b5ad8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4b2789;
  }

  &:focus {
    outline: none;
  }
`;

export default NickChange;
