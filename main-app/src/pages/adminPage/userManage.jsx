import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function UserManage() {
  const serverUrl = process.env.REACT_APP_API_URL;
  const [usersList, setUsersList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(serverUrl + "/admin/users", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(response.data);
        console.log(response.data[0].isAdmin);
        setUsersList(() => response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (e) => {
    console.log(e.target);
  };

  return (
    usersList && (
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
          {usersList.map((user) => (
            <tr key={user.email}>
              <TableData>{user.createdAt.split("T")[0]}</TableData>
              <TableData>{user.email}</TableData>
              <TableData>{user.name}</TableData>
              <TableData>{user.nickname}</TableData>
              <TableData>
                <select value={user.isAdmin ? "admin" : "user"}>
                  <option value='user'>user</option>
                  <option value='admin'>admin</option>
                </select>
              </TableData>

              <TableData>
                <DeleteButton
                  id={user.email}
                  onClick={(e) => {
                    handleDelete(e);
                  }}
                >
                  Delete
                </DeleteButton>
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  );
}

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
  font-size: 0.7rem;
`;

export default UserManage;
