import React, { useState } from "react";
import styled from "styled-components";

function ReviewManage() {
  const reviewsList = [
    {
      user_id: 1,
      subway_id: "성수역",
      subway_line: 2,
      nickName: "여리",
      review: "앨리스에서 너무 멀어요",
      createdAt: "2022-01-01",
    },
    {
      user_id: 2,
      subway_id: "서울역",
      subway_line: 4,
      nickName: "JIN",
      review: "조용히 해주세요",
      createdAt: "2023-01-01",
    },
    {
      user_id: 3,
      subway_id: "왕십리역",
      subway_line: 2,
      nickName: "ana",
      review: "늦어서 죄송합니다",
      createdAt: "2022-06-01",
    },
  ];

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Created Date</TableHeader>
          <TableHeader>ID</TableHeader>
          <TableHeader>닉네임</TableHeader>
          <TableHeader>지하철역</TableHeader>
          <TableHeader>호선</TableHeader>
          <TableHeader>리뷰</TableHeader>
          <TableHeader>관리</TableHeader>
        </tr>
      </thead>
      <tbody>
        {reviewsList.map((review) => (
          <tr key={review.user_id}>
            <TableData>{review.createdAt}</TableData>
            <TableData>{review.user_id}</TableData>
            <TableData>{review.nickName}</TableData>
            <TableData>{review.subway_id}</TableData>
            <TableData>{review.subway_line}</TableData>
            <TableData>{review.review}</TableData>

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

export default ReviewManage;
