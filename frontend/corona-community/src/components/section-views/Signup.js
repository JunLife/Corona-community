import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Signup = () => {
  const [password, setPassword] = useState('');
  let isPasswordEquals = false;

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const checkPassword = e => {
    if (password !== e.target.value) {
      isPasswordEquals = false;
    } else {
      isPasswordEquals = true;
    }
  };

  const checkEmail = () => {
    console.log('test');
  };

  const done = () => {
    if (!isPasswordEquals) {
      alert('패스워드는 일치해야 합니다.');
      return;
    }
  };

  return (
    <div className="account_container">
      <div className="signup_section">
        <div className="bold">
          <img src="/logo.png" alt="logo" className="homeIcon"></img>
          Corona19 Comunity
        </div>

        <div>
          <h4>회원가입</h4>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <div className="check_email" onClick={checkEmail}>
              이메일 중복 확인
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="password"
              onChange={onChangePassword}
              value={password}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password Again</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="passwordAgain"
              onChange={checkPassword}
            />
          </Form.Group>

          <div className="login_subsection">
            <div></div>
            <Button
              variant="primary"
              type="submit"
              className="login_button"
              onClick={done}
            >
              완료
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
