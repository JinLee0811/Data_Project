import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { ClipLoader } from 'react-spinners';

export default function KakaoLogin() {
  const location = useLocation();
  const { kakaologin } = useContext(AuthContext);
  const kakaocode = location.search.split('=')[1];
  const [isLoading, setIsLoading] = useState(false);
  console.log('kakaocode', kakaocode);

  useEffect(() => {
    const getKakaoLogin = async () => {
      setIsLoading(true);
      await kakaologin(kakaocode);
      setIsLoading(false);
    };
    getKakaoLogin();
  }, [kakaocode]);

  return (
    <Container>
      <ClipLoader color='#33a23d' loading={isLoading} />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
`;
