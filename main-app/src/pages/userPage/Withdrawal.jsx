import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import Modal from '../../components/Modal';

const Withdrawl = (props) => {
  const { sendRequest } = useHttpRequest();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const hadleopenModal = (e) => {
    e.preventDefault();
    if (!password) {
      alert('비밀번호를 입력해주세요.');
    } else {
      setIsOpen(true);
    }
  };

  const hadlecloseModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const hadleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest('/account', 'delete', {
        password: password,
      });
      alert('정상적으로 탈퇴 되었습니다.');
      navigate('/login');
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
      alert('비밀번호를 다시 확인하세요!');
    }
  };
  return (
    <>
      <Greeting>어디 가게?</Greeting>
      <Form onSubmit={hadleSubmit}>
        <ConfirmBox>탈퇴 하시려면 비밀번호를 입력해 주세요.</ConfirmBox>
        <Input
          type='password'
          name='password'
          placeholder='비밀번호'
          value={password}
          onChange={handlePasswordChange}
        />
        <Button onClick={hadleopenModal}>회원 탈퇴</Button>
        <Modal isOpen={isOpen} onClose={hadlecloseModal} type='submit'>
          <h2>회원 탈퇴</h2>
          <p>정말로 회원을 탈퇴하시겠습니까?</p>
        </Modal>
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
  font-family: 'NanumSquareNeoExtraBold';
`;
const ConfirmBox = styled.h4`
  color: gray;
  white-space: pre-wrap;
  margin: 0px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #33a23d;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #7bc745;
  }
`;

export default Withdrawl;
