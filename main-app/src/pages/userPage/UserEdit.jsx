import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import { useUserInfo } from '../../hooks/user.hook'

const UserEdit = () => {
  const serverUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const userInfo = useUserInfo()
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleNewPasswordConfirmChange = (event) => {
    setNewPasswordConfirm(event.target.value);
  };

  const handleResetPasswordSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== newPasswordConfirm) {
      setMessage("새로운 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.patch(
        serverUrl + "/account",
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      if (response) {
        alert("비밀번호가 변경되었습니다.");
        setOldPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
        navigate("/user");
        console.log(response.data);
      } else {
        setMessage("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      setMessage("비밀번호를 다시 확인해주세요.");
    }
  };

  return (
    <>
      <Form onSubmit={handleResetPasswordSubmit}>
        <Input
          type='email'
          name='email'
          placeholder={userInfo.email}
          disabled
        />
        <Input type='text' name='name' placeholder={userInfo.name} disabled />
        <Input
          type='text'
          name='nickName'
          placeholder={userInfo.nickname}
          disabled
        />
        <Input
          type='password'
          name='password'
          placeholder='현재 비밀번호 입력'
          value={oldPassword}
          onChange={handleOldPasswordChange}
        />
        <Input
          type='password'
          name='newPassword'
          placeholder='변경할 비밀번호 입력'
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <Input
          type='password'
          name='confirmNewPassword'
          placeholder='변경할 비밀번호 재입력'
          value={newPasswordConfirm}
          onChange={handleNewPasswordConfirmChange}
        />
        <Button type='submit'>정보 수정하기</Button>
        {message && <p>{message}</p>}
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  width: 500px;
`;
const Input = styled.input`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const Button = styled.button`
  background-color: #8b5ad8; //#33a23d
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

export default UserEdit;
