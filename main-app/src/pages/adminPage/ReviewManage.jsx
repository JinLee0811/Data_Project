import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function ReviewManage() {
  // const reviewsList = [
  //   {
  //     user_id: 1,
  //     subway_id: "성수역",
  //     subway_line: 2,
  //     nickName: "여리",
  //     review: "앨리스에서 너무 멀어요",
  //     createdAt: "2022-01-01",
  //   },
  //   {
  //     user_id: 2,
  //     subway_id: "서울역",
  //     subway_line: 4,
  //     nickName: "JIN",
  //     review: "조용히 해주세요",
  //     createdAt: "2023-01-01",
  //   },
  //   {
  //     user_id: 3,
  //     subway_id: "왕십리역",
  //     subway_line: 2,
  //     nickName: "ana",
  //     review: "늦어서 죄송합니다",
  //     createdAt: "2022-06-01",
  //   },
  // ];

  const serverUrl = process.env.REACT_APP_API_URL;
  const [reviewsList, setReviewsList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(serverUrl + "/admin/review", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(response.data);
        setReviewsList(() => response.data);
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
    reviewsList && (
      <Table>
        <thead>
          <tr>
            <TableHeader>Created Date</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>닉네임</TableHeader>
            <TableHeader>호선</TableHeader>
            <TableHeader>지하철역</TableHeader>
            <TableHeader>리뷰</TableHeader>
            <TableHeader>관리</TableHeader>
          </tr>
        </thead>
        <tbody>
          {reviewsList.map((review) => (
            <tr key={review.user.email}>
              <TableData>{review.createdAt.split("T")[0]}</TableData>
              <TableData>{review.user.name}</TableData>
              <TableData>{review.user.nickname}</TableData>
              <TableData>{review.station.station_line}</TableData>
              <TableData>{review.station.station_name}</TableData>
              <TableData>{review.body}</TableData>

              <TableData>
                <DeleteButton
                  id={review.user.email}
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

export default ReviewManage;