import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import { ClipLoader } from 'react-spinners';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { sendRequest, isLoading, Error } = useHttpRequest();

  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  function emailCheck(email) {
    const regex =
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    return email.match(regex) !== null;
  }

  const validateForm = ({
    name,
    nickname,
    email,
    password,
    confirmPassword,
  }) => {
    if (emailCheck(email) === false) {
      return '이메일 형식이 올바르지 않습니다.';
    }
    if (name.length < 2) {
      return '두글자 이상의 이름을 설정해주세요.';
    }
    if (nickname.length < 2) {
      return '두글자 이상의 닉네임을 설정해주세요.';
    }
    if (password.length < 4) {
      return '비밀번호는 4글자 이상이어야합니다.';
    }
    if (password !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validated = validateForm(inputs);
    if (typeof validated === 'string') {
      alert(validated);
      return;
    }

    try {
      const response = await sendRequest('/register', 'post', inputs);
      alert(response.data);
      navigate('/login');
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
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
    <Container>
      <Card>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <Label>이름</Label>
          <Input
            type='text'
            name='name'
            placeholder='이름'
            value={inputs.name}
            onChange={handleChange}
          />

          <Label>닉네임</Label>
          <Input
            type='text'
            name='nickname'
            placeholder='닉네임'
            value={inputs.nickname}
            onChange={handleChange}
          />

          <Label>이메일</Label>
          <Input
            type='email'
            name='email'
            placeholder='이메일'
            value={inputs.email}
            onChange={handleChange}
          />
          <Label>비밀번호</Label>
          <Input
            type='password'
            name='password'
            placeholder='비밀번호'
            value={inputs.password}
            onChange={handleChange}
          />
          <Label>비밀번호 확인</Label>
          <Input
            type='password'
            name='confirmPassword'
            placeholder='비밀번호 확인'
            value={inputs.confirmPassword}
            onChange={handleChange}
          />
          <Button type='submit' disabled={isLoading}>
            가입하기
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 3rem;
`;

const Title = styled.h1`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #33a23d;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const Label = styled.label`
  font-size: 0.5rem;
  margin-bottom: 0.3rem;
`;
const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #33a23d;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  width: 300px;
  cursor: pointer;

  &:hover {
    background-color: #7bc745;
  }

  &:focus {
    outline: none;
  }
`;

export default RegisterPage;
