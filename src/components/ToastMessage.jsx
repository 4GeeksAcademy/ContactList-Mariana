// src/components/ToastMessage.jsx
import React from "react";

const ToastMessage = ({ message, type }) => {
  return (
    <div className={`toast-modern toast-${type}`}>
      {message}
    </div>
  );
};

export default ToastMessage;
