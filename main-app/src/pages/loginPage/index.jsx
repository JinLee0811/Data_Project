import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../utils/AuthContext';
import { ClipLoader } from 'react-spinners';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  function emailCheck(email) {
    const regex =
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    return email.match(regex) !== null;
  }

  const validateForm = ({ email, password }) => {
    if (emailCheck(email) === false) {
      return '이메일 형식이 올바르지 않습니다.';
    }
    if (password.length < 4) {
      return '비밀번호는 4글자 이상이어야합니다.';
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validated = validateForm(inputs);
    if (typeof validated === 'string') {
      alert(validated);
      return;
    }
    await login(inputs.email, inputs.password);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
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
        <Title>이메일로 로그인</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type='email'
            name='email'
            value={inputs.email}
            placeholder='이메일'
            onChange={handleChange}
            required
          />

          <Input
            type='password'
            name='password'
            value={inputs.password}
            placeholder='비밀번호'
            onChange={handleChange}
            required
          />

          <Button type='submit'>로그인</Button>
          <Link to='/register'>
            <RegisterButton> 회원가입 </RegisterButton>
          </Link>
        </Form>

        <Break />

        <a href={process.env.REACT_APP_KAKAO_AUTH_URL}>
          <KakaoButton> 카카오 로그인 </KakaoButton>
        </a>
      </Card>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #33a23d;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  width: 300px;
  cursor: pointer;

  &:hover {
    background-color: #33a23d;
  }

  &:focus {
    outline: none;
  }
`;

const RegisterButton = styled.button`
  background-color: #fff;
  color: #33a23d;
  font-size: 1rem;
  padding: 0.5rem;
  border: solid 1px #33a23d;
  border-radius: 4px;
  box-sizing: border-box;
  width: 300px;
  cursor: pointer;

  &:hover {
    background-color: #33a23d;
  }

  &:focus {
    outline: none;
  }
`;

const KakaoButton = styled.button`
  background-color: #fee500;
  color: #000000 85%;
  font-size: 1rem;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  width: 300px;
`;

const Break = styled.hr`
  border-top: 1px solid #ccc;
  /* width: 300px; */
  margin: 2em 0;
`;

export default LoginPage;
