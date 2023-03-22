import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import ModalInput from '../../components/ModalInput';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import Card from '../../components/Card';
import { ClipLoader } from 'react-spinners';

export default function StationInfoReview() {
  const { sendRequest, isLoading } = useHttpRequest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const station_id = '51b1e20e-7562-456c-8623-f67f6d09ed87';
  const [reviews, setReviews] = useState();
  const [numReviewsToShow, setNumReviewsToShow] = useState(7);

  const handleModalSubmit = async (query) => {
    try {
      const response = await sendRequest(`/review/${station_id}`, 'post', {
        body: query,
      });
      setReviews((prev) =>
        [...prev, response].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest(`/review/${station_id}`, 'get')
      .then((response) => setReviews(response))
      .catch((err) => console.log(err));
  }, [sendRequest]);

  const handleShowMore = () => {
    setNumReviewsToShow(numReviewsToShow + 7);
  };

  return (
    <>
      <Div
        onClick={() => {
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
            reviews
              .slice(0, numReviewsToShow)
              .map((review) => <Card key={review.id} review={review}></Card>)}
          {reviews && numReviewsToShow < reviews?.length && (
            <Box onClick={handleShowMore}>더 보기</Box>
            // <Box onClick={() => setShowCount(showCount + 6)}>더 보기</Box>
          )}
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
  font-size: 0.7rem;
  border-bottom: 0.5px solid #e9ecef;
  cursor: pointer;
  span {
    font-size: 0.7rem;
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
