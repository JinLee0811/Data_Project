import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';

function ModalInput({ isOpen, onClose, children, onUpdateCoordinates }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_GOOGLE_API_URL;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `${apiUrl}?address=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const pos_x = response.data.results[0].geometry.location.lat;
      const pos_y = response.data.results[0].geometry.location.lng;
      onUpdateCoordinates({ pos_x, pos_y });
      setQuery('');
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={handleModalClick}>
        {children}
        <Input
          ref={inputRef}
          name='query'
          value={query}
          onChange={handleInputChange}
        ></Input>
        <div>
          <ConfirmButton onClick={handleModalSubmit}>확인</ConfirmButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </div>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root')
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 45px;
  margin: 1rem;
  border: 3px solid #33a23d;
  padding: 0px 20px;
  border-radius: 4px;
`;

const ConfirmButton = styled.button`
  margin: 0.5rem;
  padding: 0.5rem 2rem;
  background-color: #33a23d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

const CancelButton = styled.button`
  margin: 0.5rem;
  padding: 0.5rem 2rem;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

export default ModalInput;
