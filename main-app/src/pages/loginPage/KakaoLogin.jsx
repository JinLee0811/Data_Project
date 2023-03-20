import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function KakaoLogin() {
  const location = useLocation();
  const KAKAO_CODE = location.search.split("=")[1];

  useEffect(() => {
    //인가코드 받음
    console.log(KAKAO_CODE);
    console.log(process.env.REACT_APP_CLIENT_ID);

    // 서버에 인가코드를 보내 액세스 토큰을 받아옴. ==> 이건 서버에서 작업하는 부분.. 지워야함
    const getKakaoToken = async () => {
      try {
        const res = await fetch({
          method: "post",
          url: "https://kauth.kakao.com/oauth/token",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: `grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${KAKAO_CODE}`,
        });

        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (!location.search) return;
    getKakaoToken();
  }, [location.search, KAKAO_CODE]);

  return (
    <section className='container-center'>
      카카오 로그인 중입니다. 잠시만 기다려주세요.
    </section>
  );
}
