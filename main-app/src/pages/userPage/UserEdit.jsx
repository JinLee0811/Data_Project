import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserEdit = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    userName: "",
    nickName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const validateForm = ({ password, newPassword, confirmNewPassword }) => {
    if (newPassword.length < 4) {
      return "비밀번호는 4글자 이상이어야합니다.";
    }
    if (newPassword !== confirmNewPassword) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validated = validateForm(inputs);
    if (typeof validated === "string") {
      alert(validated);
      return;
    }
    const { userName, nickName, password, newPassword, confirmNewPassword } =
      inputs;
    console.log(userName, nickName, password, newPassword);
    alert("수정이 완료되었습니다");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Title>회원정보 변경</Title>
        <Input
          type='email'
          name='email'
          placeholder='이메일주소 입력'
          value={inputs.email}
          onChange={handleChange}
          disabled
        />
        <Input
          type='password'
          name='password'
          placeholder='현재 비밀번호 입력'
          value={inputs.password}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='newPassword'
          placeholder='변경할 비밀번호 입력'
          value={inputs.newPassword}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='confirmNewPassword'
          placeholder='변경할 비밀번호 재입력'
          value={inputs.confirmNewPassword}
          onChange={handleChange}
        />
        <Input
          type='text'
          name='userName'
          placeholder='이름'
          value={inputs.userName}
          onChange={handleChange}
        />
        <Input
          type='text'
          name='nickName'
          placeholder='닉네임'
          value={inputs.nickName}
          onChange={handleChange}
        />
        <Button type='submit'>정보 수정하기</Button>

        {/* <Link to='/login'>로그인</Link> */}
      </Form>
    </>
  );
};

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  padding-top: 80px;
  width: 300px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const Button = styled.button`
  background-color: #4b2789;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #8b5ad8;
  }

  &:focus {
    outline: none;
  }
`;

export default UserEdit;
