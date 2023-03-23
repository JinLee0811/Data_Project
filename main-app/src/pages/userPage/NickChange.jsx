import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import Modal from '../../components/Modal';
import { ClipLoader } from 'react-spinners';
import { useOutletContext } from 'react-router-dom';

const NickChange = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { sendRequest } = useHttpRequest();
  const { userInfo, setUserInfo, isLoading } = useOutletContext();

  console.log(userInfo);
  const [nickname, setNickname] = useState(userInfo ? userInfo.nickname : null);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserInfo((cur) => ({
      ...cur,
      nickname: nickname,
    }));
    try {
      await sendRequest('/account', 'patch', { nickname });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert('닉네임이 중복됩니다.');
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
      <Greeting>변경하고자 하는 닉네임을 입력해 주세요.</Greeting>
      <Form onSubmit={handleSubmit}>
        <ConfirmBox>중복되지 않는 본인만의 닉네임으로 변경해보세요.</ConfirmBox>
        <Input
          type='text'
          name='닉네임'
          placeholder='닉네임'
          value={nickname}
          onChange={handleNicknameChange}
        />
        <Button onClick={openModal}>닉네임 변경하기</Button>
        <Modal isOpen={isOpen} onClose={closeModal} type='submit'>
          <h2>닉네임 변경</h2>
          <p>닉네임을 변경하시겠습니까?</p>
        </Modal>
      </Form>
    </>
  );
};
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  align-items: center;
`;
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
  background-color: #33a23d;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #7bc745;
  }

  &:focus {
    outline: none;
  }
`;

export default NickChange;
