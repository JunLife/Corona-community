import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="loading">
      <Spinner animation="border" variant="primary"></Spinner>
      <div className="loading-message">Loading...</div>
    </div>
  );
};

export default Loading;
