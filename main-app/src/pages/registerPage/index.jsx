import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
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

  const validateForm = ({ email, password, confirmPassword }) => {
    if (emailCheck(email) === false) {
      return '이메일 형식이 올바르지 않습니다.';
    }
    if (password.length < 4) {
      return '비밀번호는 4글자 이상이어야합니다.';
    }
    if (password !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return true;
  };

  // async function registerUser(formdata) {
  //   try {
  //     const newData = await Api.post("register", formdata);
  //     alert("회원가입이 완료되었습니다!");
  //     navigate("/login");
  //   } catch (err) {
  //     console.log(err);
  //     alert(err.response.data.reason);
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validated = validateForm(inputs);
    if (typeof validated === 'string') {
      alert(validated);
      return;
    }
    const { email, password } = inputs;
    const formdata = { email, password };
    //   registerUser(formdata);

    console.log(email, password);
    alert('회원가입이 완료되었습니다');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <Input
          type='email'
          name='email'
          placeholder='이메일주소 입력'
          value={inputs.email}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='비밀번호 입력'
          value={inputs.password}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='confirmPassword'
          placeholder='비밀번호 재입력'
          value={inputs.confirmPassword}
          onChange={handleChange}
        />
        <Button type='submit'>회원가입</Button>

        <Link to='/login'>로그인</Link>
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

export default RegisterPage;
