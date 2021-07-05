import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const PageNotFound = ({ history }) => {
  const goBack = () => {
    history.goBack();
  };

  return (
    <Jumbotron className="error">
      <h1 className="error-number">404</h1>
      <h3>Page Not Found!!</h3>
      <p>Something went wrong, pleas try again.</p>
      <p>
        <Button variant="primary" className="goBack" onClick={goBack}>
          ← Go Back
        </Button>
      </p>
    </Jumbotron>
  );
};

export default PageNotFound;
