import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Withdrawl = (props) => {
  const serverUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteUser = async (e) => {
      e.preventDefault()
      try {
        const confirmDelete = window.confirm("정말로 탈퇴하시겠습니까?");
        if (confirmDelete) {
          const response = await axios.delete(serverUrl + "/account", {
            data: {
              password: password
            },
            withCredentials: true
          });
          console.log(response.data);
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <>
     <Greeting>
        어디 가게?
      </Greeting>
      <Form>
      <ConfirmBox>탈퇴 하시려면 비밀번호를 입력해 주세요.</ConfirmBox>
      <Input
          type='password'
          name='password'
          placeholder='비밀번호'
          value={password}
          onChange={handlePasswordChange}
        />
        <Button onClick={handleDeleteUser}>회원 탈퇴</Button>
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