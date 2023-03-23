import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHttpRequest from '../../utils/useHttp';
import { ClipLoader } from 'react-spinners';
import Modal from '../../components/Modal';
import ReactPaginate from 'react-paginate';

function UserManage() {
  const [users, setUsers] = useState([]);
  const [isActiveUserShown, setIsActiveUserShown] = useState(true);
  const { sendRequest, isLoading } = useHttpRequest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 12;

  const startIndex = pageNumber * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest('/admin/users', 'get');
        console.log(response);
        setUsers(response);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await sendRequest(
        `/admin/users/${userIdToDelete}`,
        'delete',
        {}
      );
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id === userIdToDelete) {
            return {
              ...user,
              deletedAt: new Date(),
            };
          }
          return user;
        })
      );
      alert(response);
      setUserIdToDelete(null);
      // await fetchData();
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
    users && (
      <>
        <Select
          id='isActiveUserShown'
          value={isActiveUserShown}
          onChange={(e) => setIsActiveUserShown(JSON.parse(e.target.value))}
        >
          <option value={true}>활성화 사용자</option>
          <option value={false}>삭제된 사용자</option>
        </Select>

        <Table>
          <thead>
            <tr>
              <TableHeader>Created At</TableHeader>
              <TableHeader>이메일</TableHeader>
              <TableHeader>이름</TableHeader>
              <TableHeader>닉네임</TableHeader>
              <TableHeader>유형</TableHeader>
              <TableHeader>관리</TableHeader>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                isActiveUserShown
                  ? user.deletedAt === null
                  : user.deletedAt !== null
              )
              .slice(startIndex, endIndex)
              .map((user) => (
                <tr key={user.id}>
                  <TableData>{user.createdAt.split('T')[0]}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>{user.name}</TableData>
                  <TableData>{user.nickname}</TableData>
                  <TableData> {user.isAdmin ? 'admin' : 'user'}</TableData>
                  <TableData>
                    {isActiveUserShown && (
                      <DeleteButton
                        onClick={() => {
                          setIsModalOpen(true);
                          setUserIdToDelete(user.id);
                        }}
                      >
                        삭제
                      </DeleteButton>
                    )}
                  </TableData>
                </tr>
              ))}
          </tbody>
        </Table>
        <PaginationContainer>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={Math.ceil(
              users.filter((user) =>
                isActiveUserShown
                  ? user.deletedAt === null
                  : user.deletedAt !== null
              ).length / usersPerPage
            )}
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
          <DeleteMessage>
            정말로 사용자를 비활성화(삭제)하겠습니까?
          </DeleteMessage>
        </Modal>
      </>
    )
  );
}

// () => handleDelete(user.id)

const Select = styled.select`
  margin-bottom: 1rem;
`;
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
  height: 2rem;
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

export default UserManage;
