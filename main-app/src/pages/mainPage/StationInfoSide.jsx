import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { NavLink, Outlet, Link } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(true);

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

  const handleToggleLike = () => {
    if (isLoggedIn) {
      wish?.wish_id.length === 0
        ? sendRequest(`/wish/${station_id}`, 'post', {})
            .then((response) => {
              setWish((prev) => ({
                ...prev,
                wish_id: response.newWish.id,
                stationWishCount: prev.stationWishCount + 1,
              }));
            })
            .catch((err) => console.log(err))
        : sendRequest(`/wish/station/${station_id}`, 'delete', {})
            .then((response) => {
              setWish((prev) => ({
                ...prev,
                wish_id: '',
                stationWishCount: prev.stationWishCount - 1,
              }));
            })
            .catch((err) => console.log(err));
    } else {
      alert('로그인이 필요한 서비스 입니다.');
      navigate('/login', {
        state: {
          redirectUrl: location.pathname + location.search + location.hash,
        },
      });
    }
  };

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
          <span className='material-icons'>navigate_before</span>
          <span>
            <Link to='/'>다시 검색하기 </Link>
          </span>
        </GoBack>
        <Main>
          <Title>{station?.station_name}</Title>
          <Line line={station?.station_line}>{station?.station_line}</Line>
        </Main>
        <LikeInfo>
          <Like className='material-icons' onClick={handleToggleLike}>
            {isLoggedIn && wish && wish?.wish_id
              ? 'favorite'
              : 'favorite_border'}
          </Like>

          <LikeCount>
            찜 갯수({isLoggedIn ? wish?.stationWishCount : wish})
          </LikeCount>
        </LikeInfo>
        <TableList>
          <NavLink to='general'>
            <div>홈</div>
          </NavLink>
          <NavLink to='review'>
            <div>리뷰</div>
          </NavLink>
        </TableList>
        <Outlet context={station} />
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
  padding-top: 80px;
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
  font-size: 10px;
  span {
    color: '#ccc';
    margin-right: 5px;
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
  font-size: 0.9rem;
  color: ${({ line }) => lineColors[line] || '#000'};
  margin-left: 5px;
`;

const LikeInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Like = styled.span`
  text-align: center;
  cursor: pointer;
`;

const LikeCount = styled.span`
  text-align: center;
  font-size: 10px;
`;

const TableList = styled.div`
  display: flex;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem;
  font-size: 0.8rem;
  justify-content: space-around;

  .active {
    border-bottom: 2px solid #33a23d;
  }
`;

const Button = styled.button`
  background-color: #33a23d;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  width: 200px;
  color: #fff;
  margin-top: 20px;
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
