import React, { useState } from "react";
import styled from "styled-components";

function UserManage() {
  const usersList = [
    {
      id: 1,
      name: "최호열",
      email: "yeol@example.com",
      createdAt: "2022-01-01",
      role: "admin",
    },
    {
      id: 2,
      name: "이정진",
      email: "jin@example.com",
      createdAt: "2023-01-01",
      role: "admin",
    },
    {
      id: 3,
      name: "안나연",
      email: "ana@example.com",
      createdAt: "2022-06-01",
      role: "user",
    },
  ];

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Created Date</TableHeader>
          <TableHeader>ID</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Role</TableHeader>

          <TableHeader>관리</TableHeader>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => (
          <tr key={user.id}>
            <TableData>{user.createdAt}</TableData>
            <TableData>{user.id}</TableData>
            <TableData>{user.name}</TableData>
            <TableData>{user.email}</TableData>
            <TableData>
              <select value={user.role} name={user.id}>
                <option value='user'>user</option>
                <option value='admin'>admin</option>
              </select>
            </TableData>

            <TableData>
              <DeleteButton>Delete</DeleteButton>
            </TableData>
          </tr>
        ))}
      </tbody>
    </Table>
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
