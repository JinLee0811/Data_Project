import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import useHttpRequest from "../../utils/useHttp";

function UserManage() {
  const [users, setUsers] = useState([]);
  const [isActiveUserShown, setIsActiveUserShown] = useState(true);
  const { sendRequest } = useHttpRequest();

  const fetchData = async () => {
    try {
      const response = await sendRequest("/admin/users", "get");
      console.log(response);
      setUsers(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = useCallback(async (user_id) => {
    try {
      const response = await sendRequest(
        `/admin/users/${user_id}`,
        "delete",
        {}
      );
      console.log(response);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // const filteredData = useMemo(() => {
  //   return isActiveUserShown
  //     ? users?.filter((user) => user.deletedAt === null)
  //     : users?.filter((user) => user.deletedAt !== null);
  // }, [users, isActiveUserShown]);

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
              .map((user) => (
                <tr key={user.id}>
                  <TableData>{user.createdAt.split("T")[0]}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>{user.name}</TableData>
                  <TableData>{user.nickname}</TableData>
                  <TableData> {user.isAdmin ? "admin" : "user"}</TableData>
                  <TableData>
                    {isActiveUserShown && (
                      <DeleteButton onClick={() => handleDelete(user.id)}>
                        삭제
                      </DeleteButton>
                    )}
                  </TableData>
                </tr>
              ))}
          </tbody>
        </Table>
      </>
    )
  );
}

const Select = styled.select`
  margin-bottom: 1rem;
`;
const Table = styled.table`
  width: 100%;
  font-size: 0.8rem;
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
  /* min-height: 2rem; */
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

export default UserManage;
