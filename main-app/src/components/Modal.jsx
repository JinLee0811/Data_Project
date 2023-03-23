import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

function Modal({ isOpen, onClose, children, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit();
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={handleModalClick}>
        {children}
        <div>
          <ConfirmButton onClick={handleSubmit}>확인</ConfirmButton>
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
  padding-left: 4rem;
  padding-right: 4rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default Modal;
