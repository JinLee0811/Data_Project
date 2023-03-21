import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/Modal";

const UserEdit = () => {
  const serverUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      alert("새로운 비밀번호가 일치하지 않습니다.");
      setIsOpen(false);
    } else if (!oldPassword || !newPassword || !newPasswordConfirm) {
      alert("비밀번호를 입력해주세요..");
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
      const response = await axios.get(serverUrl + "/account", {
        withCredentials: true,
      });
      setUserInfo(response.data);
      console.log(response);
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
      alert("새로운 비밀번호가 일치하지 않습니다.");
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
        setOldPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
        navigate("/user");
        alert("비밀번호가 변경되었습니다.");
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("비밀번호를 다시 확인해주세요.");
    }
  };

  if (!userInfo) {
    return <></>;
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
  color: #fff;
  font-size: 1rem;
  margin-top: 0px;
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

const Label = styled.label`
  color: #525252;
`;

export default UserEdit;
