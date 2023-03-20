import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

function UserManage() {
  const serverUrl = process.env.REACT_APP_API_URL;
  const [usersList, setUsersList] = useState();
  const [showActiveUser, setShowActiveUser] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(serverUrl + "/admin/users", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(response.data);
        setUsersList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    console.log("useEffect called");
  }, []);

  const handleDelete = useCallback(async (e) => {
    const user_id = e.target.id;
    console.log(user_id);
    try {
      const response = await axios.delete(
        serverUrl + `/admin/users/${user_id}`,
        {
          headers: { Content_Type: "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  });

  const filteredData = showActiveUser
    ? usersList?.filter((user) => user.deletedAt === null)
    : usersList?.filter((user) => user.deletedAt !== null);

  return (
    filteredData && (
      <>
        <Select
          id='showActiveUser'
          value={showActiveUser}
          onChange={(e) => setShowActiveUser(JSON.parse(e.target.value))}
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
            {filteredData.map((user) => (
              <tr key={user.id}>
                <TableData>{user.createdAt.split("T")[0]}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>{user.name}</TableData>
                <TableData>{user.nickname}</TableData>
                <TableData> {user.isAdmin ? "admin" : "user"}</TableData>
                <TableData>
                  <DeleteButton
                    id={user.id}
                    onClick={(e) => {
                      handleDelete(e);
                    }}
                  >
                    비활성화
                  </DeleteButton>
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
`;

const DeleteButton = styled.button`
  background-color: #8b5ad8;
  border: none;
  color: #fff;
  padding: 0.5rem;
  margin: 0.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 0.6rem;
`;

export default UserManage;
