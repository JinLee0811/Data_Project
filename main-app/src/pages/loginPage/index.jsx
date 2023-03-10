import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function LoginPage() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const validateEmail = (email) => {
    // simple condition to check email format
    if (!inputs.email.includes('@')) {
      setEmailError('유효한 이메일을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    // simple condition to check password length
    if (inputs.password.length <= 3) {
      setPasswordError('패스워드는 3자리 이상 입력해주세요.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail(inputs.email);
    validatePassword(inputs.password);

    // submit form if there are no errors
    if (!emailError && !passwordError) {
      console.log('폼이 정상적으로 제출되었습니다!');
      console.log(inputs.email, inputs.password);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Title>이메일로 로그인</Title>
        <Input
          type='email'
          name='email'
          value={inputs.email}
          onChange={handleChange}
          onBlur={(event) => validateEmail(event.target.value)}
          required
        />
        {emailError && <Error>{emailError}</Error>}

        <Input
          type='password'
          name='password'
          value={inputs.password}
          onChange={handleChange}
          onBlur={(event) => validatePassword(event.target.value)}
          required
        />
        {passwordError && <Error>{passwordError}</Error>}
        <Button type='submit'>로그인</Button>
        <KakaoButton> 카카오 로그인 </KakaoButton>
        <Link to='/register'>회원가입</Link>
      </Form>
    </>
  );
}

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 5rem auto;
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

const KakaoButton = styled.button`
  background-color: #FEE500;
  color: #000000 85%;
  font-size: 1rem;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1.5rem;


`;

const Error = styled.div`
  color: #8b5ad8;
  font-size: 0.875rem;
`;

export default LoginPage;
