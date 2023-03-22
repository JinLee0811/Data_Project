import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';

function ModalInput({ isOpen, onClose, children, inputHeight = 45, onSubmit }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit(query);
    setIsLoading(false);
    setQuery('');
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
          height={inputHeight}
        ></Input>
        <div>
          <ConfirmButton onClick={handleSubmit} disabled={isLoading}>
            확인
          </ConfirmButton>
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
  height: ${(props) => props.height}px;
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
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) => (props.disabled ? '#ccc' : '#33a23d')};
`;

const CancelButton = styled.button`
  margin: 0.5rem;
  padding: 0.5rem 2rem;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

export default ModalInput;
