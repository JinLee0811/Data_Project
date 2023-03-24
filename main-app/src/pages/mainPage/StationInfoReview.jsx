import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import ModalInput from '../../components/ModalInput';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import Card from '../../components/Card';
import { ClipLoader } from 'react-spinners';

export default function StationInfoReview() {
  const { sendRequest, isLoading } = useHttpRequest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState();
  const [numReviewsToShow, setNumReviewsToShow] = useState(7);
  const { isLoggedIn } = useContext(AuthContext);
  const { station_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // post로 리뷰를 줄 때는 user의 name 정보가 없다.  따라서 setReviews를 해줘도 username이 들어가지 않는다.=> 렌더할 때 계속 유저네임이 공백으로 나옴.
  // 따라서 post 후에 setReview 대신, 다시 get요청을 하도록 바꿈
  // useContext에서 username받아와서 해도되지만 시간없서

  const handleModalSubmit = async (query) => {
    try {
      await sendRequest(`/review/${station_id}`, 'post', {
        body: query,
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await sendRequest(`/review/${station_id}`, 'get');
      setReviews(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowMore = () => {
    setNumReviewsToShow(numReviewsToShow + 7);
  };

  return (
    <>
      <Div
        onClick={() => {
          if (!isLoggedIn) {
            alert('로그인이 필요한 서비스 입니다.');
            navigate('/login', {
              state: {
                redirectUrl:
                  location.pathname + location.search + location.hash,
              },
            });
            return;
          }

          setIsModalOpen(true);
        }}
      >
        <span className='material-symbols-outlined'>edit</span>
        <span> 리뷰 작성하기</span>
      </Div>

      {isLoading ? (
        <Container>
          <ClipLoader color='#33a23d' loading={isLoading} />
        </Container>
      ) : (
        <ReviewContainer>
          {reviews &&
            reviews.length > 0 &&
            reviews
              .slice(0, numReviewsToShow)
              .map((review) => <Card key={review.id} review={review}></Card>)}

          {/* 리뷰수가 numReviewsToShow 보다 많으면 더보기 버튼 */}
          {reviews && numReviewsToShow < reviews?.length && (
            <Box onClick={handleShowMore}>더 보기</Box>
          )}

          {/* 리뷰가 없으면 메시지 출력 */}
          {reviews?.length === 0 && <Div>작성된 리뷰가 없습니다.</Div>}
        </ReviewContainer>
      )}

      <ModalInput
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        inputHeight={100}
        onSubmit={handleModalSubmit}
      >
        리뷰를 남겨주세요.
      </ModalInput>
    </>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 0.8rem;
  border-bottom: 0.5px solid #e9ecef;
  cursor: pointer;
  span {
    font-size: 0.8rem;
    padding-left: 0.5rem;
  }
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
`;
const ReviewContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const Box = styled.div`
  background-color: #e9ecef;
  padding: 1rem;
  font-size: 0.8rem;
  text-align: center;
`;
