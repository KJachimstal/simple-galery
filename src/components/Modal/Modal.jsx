import React from 'react';
import './Modal.css';

const Modal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={imageUrl} alt="Cat Enlarged" />
      </div>
    </div>
  );
};

export default Modal;
