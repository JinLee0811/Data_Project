import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';

const Withdrawl = (props) => {
  const serverUrl = process.env.REACT_APP_API_URL;
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteUser = async () => {
    try {
      // 쿠키에서 유저 정보 가져오기
      const response = await axios.get(serverUrl + "/account", { withCredentials: true });
      const user = response.data;

      // 비밀번호 일치 여부 확인
      const confirmDelete = window.confirm("정말로 탈퇴하시겠습니까?");
      if (confirmDelete) {
        const passwordCorrect = await axios.post(serverUrl + "/auth/checkPassword", {
          email: user.email,
          password: password
        }, { withCredentials: true });

        if (passwordCorrect.data === "correct") {
          // 회원정보 삭제
          await axios.delete(serverUrl + "/account", { withCredentials: true });
          alert("회원탈퇴가 완료되었습니다.");
          props.history.push("/login");
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
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