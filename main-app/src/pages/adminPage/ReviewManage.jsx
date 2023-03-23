import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import { ClipLoader } from 'react-spinners';
import Modal from '../../components/Modal';
import ReactPaginate from 'react-paginate';

function ReviewManage() {
  const [reviews, setReviews] = useState();
  const { sendRequest, isLoading } = useHttpRequest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const reviewsPerPage = 12;

  const startIndex = pageNumber * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest('/admin/review', 'get');
        const response_active = response.filter(
          (item) => item.deletedAt === null
        );
        setReviews(response_active);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await sendRequest(
        `/admin/review/${reviewIdToDelete}`,
        'delete',
        {}
      );
      const newReview = reviews.filter(
        (review) => review.id !== reviewIdToDelete
      );
      setReviews(newReview);
      alert(response);
      setReviewIdToDelete(null);
    } catch (err) {
      console.log(err);
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
    reviews && (
      <>
        <Table>
          <thead>
            <tr>
              <TableHeader>Created Date</TableHeader>
              <TableHeader>이름</TableHeader>
              <TableHeader>호선</TableHeader>
              <TableHeader>지하철역</TableHeader>
              <TableHeader>리뷰</TableHeader>
              <TableHeader>관리</TableHeader>
            </tr>
          </thead>
          <tbody>
            {reviews.slice(startIndex, endIndex).map((review) => (
              <tr key={review.id}>
                <TableData>{review.createdAt.split('T')[0]}</TableData>
                <TableData>{review.user.name}</TableData>

                <TableData>{review.station.station_line}</TableData>
                <TableData>{review.station.station_name}</TableData>
                <TableReviewData>{review.body}</TableReviewData>
                <TableData>
                  <DeleteButton
                    onClick={() => {
                      setIsModalOpen(true);
                      setReviewIdToDelete(review.id);
                    }}
                  >
                    삭제
                  </DeleteButton>
                </TableData>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationContainer>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={Math.ceil(reviews.length / reviewsPerPage)}
            onPageChange={(selected) => {
              setPageNumber(selected.selected);
            }}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </PaginationContainer>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleDelete}
        >
          <DeleteMessage>정말로 리뷰를 삭제하겠습니까?</DeleteMessage>
        </Modal>
      </>
    )
  );
}

const Table = styled.table`
  width: 100%;
  font-size: 0.7rem;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 0.5rem 0.5px;
  text-align: left;
  font-weight: bold;
`;

const TableData = styled.td`
  border-bottom: 1px solid #ddd;
`;

const TableReviewData = styled.td`
  border-bottom: 1px solid #ddd;
  width: 40%;
`;

const DeleteButton = styled.button`
  background-color: #33a23d;
  border: none;
  color: #fff;
  padding: 0.5rem;
  margin: 0.5rem 0;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 0.6rem;
`;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
`;

const DeleteMessage = styled.div`
  padding: 1rem;
  font-size: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  ul {
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    a {
      padding: 1rem;
    }
  }
  .active {
    font-family: 'NanumSquareNeoExtraBold';
    a {
      color: #33a23d;
    }
  }
`;
export default ReviewManage;
