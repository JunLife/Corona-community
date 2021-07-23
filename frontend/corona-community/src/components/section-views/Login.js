import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="account_container">
      <div className="login_section">
        <div className="bold">
          <img src="/logo.png" alt="logo" className="homeIcon"></img>
          Corona19 Comunity
        </div>

        <div>
          <h4>로그인</h4>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <div className="login_subsection">
            <Link to="/signup" className="link">
              <div className="make_account">계정 만들기</div>
            </Link>
            <Button
              variant="primary"
              type="submit"
              className="login_button"
              onClick={() => login()}
            >
              로그인
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const login = () => {
  console.log('test');
};

export default Login;
