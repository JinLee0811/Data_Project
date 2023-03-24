import React, { useEffect, useState, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';
import useHttpRequest from '../../utils/useHttp';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../utils/AuthContext';

const StationInfoSide = () => {
  const { station_id } = useParams();
  const { sendRequest } = useHttpRequest();
  const [station, setStation] = useState();
  const [wish, setWish] = useState();
  const [error, setError] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isToggleLoading, setIsToggleLoading] = useState(false);
  const { state } = location;
  const { redirectUrl = '/', rentPrice = 0, leasePrice = 0 } = state || {}; // StationListSide에서 보내온 variable => child에 전달하기

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      sendRequest(`/station/${station_id}`, 'get'),
      sendRequest(`/wish/stationpage/${station_id}`, 'get'),
    ])
      .then(([stationResponse, wishResponse]) => {
        setStation(stationResponse);
        setWish(wishResponse);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setIsLoading(false);
      });
  }, [isLoggedIn, station_id]);

  const handleToggleLike = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스 입니다.');
      navigate('/login', {
        state: {
          redirectUrl: location.pathname + location.search + location.hash,
        },
      });
      return;
    }

    setIsToggleLoading(true);

    try {
      const endpoint =
        wish?.wish_id?.length === 0 //wish_id 가 있는 경우에는 delete, 없으면 like 해주기
          ? `/wish/${station_id}`
          : `/wish/station/${station_id}`;
      const method = wish?.wish_id?.length === 0 ? 'post' : 'delete';
      const response = await sendRequest(endpoint, method, {});

      setWish((prev) => ({
        ...prev,
        wish_id: method === 'post' ? response.newWish.id : '',
        stationWishCount: prev.stationWishCount + (method === 'post' ? 1 : -1),
      }));
      setIsToggleLoading(false);
    } catch (error) {
      console.log(error);
      setIsToggleLoading(false);
    }
  };

  function handleGoBack() {
    navigate(redirectUrl);
  }

  if (error) {
    return (
      <LoadingContainer>
        오류로 인해 정보를 가져오지 못했습니다.
      </LoadingContainer>
    );
  }
  if (isLoading) {
    return (
      <LoadingContainer>
        <ClipLoader color='#33a23d' />
      </LoadingContainer>
    );
  }

  return (
    <Section>
      <Container>
        <GoBack>
          <span className='material-icons' onClick={handleGoBack}>
            navigate_before
          </span>
          <span className='goto_before' onClick={handleGoBack}>
            뒤로가기
          </span>
        </GoBack>
        <Main>
          <Title>{station?.station_name}</Title>
          <Line line={station?.station_line}>{station?.station_line}</Line>
        </Main>
        <LikeInfo>
          <Like
            className='material-icons'
            onClick={handleToggleLike}
            disabled={isToggleLoading}
          >
            {isLoggedIn && wish?.wish_id ? 'favorite' : 'favorite_border'}
          </Like>

          <LikeCount>
            찜 갯수({isLoggedIn ? wish?.stationWishCount : wish})
          </LikeCount>
        </LikeInfo>
        <TableList>
          <NavLink exact to='' end state={{ station, rentPrice, leasePrice }}>
            <div>홈</div>
          </NavLink>
          <NavLink exact to='review' state={{ station, rentPrice, leasePrice }}>
            <div>리뷰</div>
          </NavLink>
        </TableList>
        <Outlet context={{ station, rentPrice, leasePrice }} />
      </Container>
    </Section>
  );
};

const LoadingContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  border-radius: 4px;
  flex-direction: column;
`;

const GoBack = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.9rem;
  span {
    color: '#ccc';
    text-align: center;
    cursor: pointer;
  }
  a {
    margin: 0;
    padding: 0;
  }
  .goto_before {
    margin-right: 1rem;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.3rem;
`;

const Line = styled.h2`
  font-size: 1.1rem;
  color: ${({ line }) => lineColors[line] || '#000'};
  margin-left: 5px;
`;

const LikeInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Like = styled.button`
  text-align: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const LikeCount = styled.span`
  text-align: center;
  font-size: 0.9rem;
`;

const TableList = styled.div`
  display: flex;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem;
  font-size: 1.1rem;

  justify-content: space-around;

  .active {
    border-bottom: 2px solid #33a23d;
  }
`;

const lineColors = {
  '1호선': '#0054A6',
  '2호선': '#007B43',
  '3호선': '#F05E1C',
  '4호선': '#00A5DE',
  '5호선': '#A640B6',
  '6호선': '#C55C1D',
  '7호선': '#54640D',
  '8호선': '#E31B70',
};

export default StationInfoSide;
