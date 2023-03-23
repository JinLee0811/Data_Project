import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useHttpRequest from '../../utils/useHttp';
import Modal from '../../components/Modal';
import { ClipLoader } from 'react-spinners';

const UserEdit = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirm, setNewPasswordConfirm] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { sendRequest } = useHttpRequest();

  const openModal = (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      alert('새로운 비밀번호가 일치하지 않습니다.');
      setIsOpen(false);
    } else if (!oldPassword || !newPassword || !newPasswordConfirm) {
      alert('비밀번호를 입력해주세요..');
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const getUserInfo = async () => {
    try {
      const response = await sendRequest('/account', 'get');
      setUserInfo(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleNewPasswordConfirmChange = (event) => {
    setNewPasswordConfirm(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== newPasswordConfirm) {
      alert('새로운 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await sendRequest('/account', 'patch', {
        oldPassword,
        newPassword,
      });
      if (response) {
        setOldPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
        navigate('/user');
        alert('비밀번호가 변경되었습니다.');
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('비밀번호를 다시 확인해주세요.');
    }
  };

  if (!userInfo) {
    return (
      <Container>
        <ClipLoader color='#33a23d' />
      </Container>
    );
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Label>이메일</Label>
        <Input
          type='email'
          name='email'
          placeholder={userInfo.email}
          disabled
        />
        <Label>이름</Label>
        <Input type='text' name='name' placeholder={userInfo.name} disabled />
        <Label>현재 비밀번호</Label>
        <Input
          type='password'
          name='password'
          placeholder='현재 비밀번호 입력'
          value={oldPassword}
          onChange={handleOldPasswordChange}
        />
        <Label>변경할 비밀번호</Label>
        <Input
          type='password'
          name='newPassword'
          placeholder='변경할 비밀번호 입력'
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <Label>변경할 비밀번호 재입력</Label>
        <Input
          type='password'
          name='confirmNewPassword'
          placeholder='변경할 비밀번호 재입력'
          value={newPasswordConfirm}
          onChange={handleNewPasswordConfirmChange}
        />
        <Button onClick={openModal}>비밀번호 변경하기</Button>
        <Modal isOpen={isOpen} onClose={closeModal} type='submit'>
          <h2>비밀번호 변경</h2>
          <p>비밀번호를 변경하시겠습니까?</p>
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
  gap: 0.9rem;
  margin: 0 auto;
  width: 500px;
`;
const Input = styled.input`
  padding: 1rem;
  margin-top: 0px;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
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

const Label = styled.h4`
  color: #525252;
  margin: 0;
`;

export default UserEdit;
