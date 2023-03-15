import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Withdrawl = () => {
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
     <Greeting>
        어디 가게?
      </Greeting>
      <Form onSubmit={handleSubmit}>
      <ConfirmBox>탈퇴 하시려면 비밀번호를 입력해 주세요.</ConfirmBox>
      <Input
          type='text'
          name='password'
          placeholder='비밀번호'
          value={inputs.password}
          onChange={handleChange}
        />
        <Button type='submit'>회원 탈퇴</Button>
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
    
`

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

export default Withdrawl;