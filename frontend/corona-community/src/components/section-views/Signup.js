import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { doCheckEmail, doSignup } from '../../auth/AuthApi';

const Signup = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let isEmailValid = false;
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

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const checkEmail = async () => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    try {
      await doCheckEmail(email);

      if (email !== '' && regExp.test(email)) {
        isEmailValid = true;
        alert('사용가능한 이메일입니다.');
        return;
      }
      alert('이메일이 올바르지 않습니다.');
    } catch {
      isEmailValid = false;
      alert('이미 존재하는 이메일입니다.');
    }
  };

  const done = () => {
    if (email === '') {
      alert('이메일을 확인해주세요.');
      return;
    }
    if (!isPasswordEquals) {
      alert('패스워드를 입력하지 않았거나 일치하지 않습니다.');
      return;
    }
    if (isEmailValid) {
      doSignup(email, password, props);
      isEmailValid = false;
      isPasswordEquals = false;
      return;
    }
    alert('이메일 중복을 확인해주세요.');
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
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={onChangeEmail}
            />
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
              type="button"
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
