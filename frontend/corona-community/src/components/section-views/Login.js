import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { doLogin } from '../../api/AuthApi';
import { isLogined } from '../../utiles/AuthUtil';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const checkValid = async () => {
    if (email.length === 0) {
      alert('이메일을 입력해주세요');
      return;
    }

    if (password.length === 0) {
      alert('비밀번호를 입력해주세요');
      return;
    }

    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    await doLogin(email, password);

    if (regExp.test(email) && isLogined()) {
      props.history.push('/');
      window.location.reload();
      return;
    }

    alert('로그인에 실패했습니다.');
    props.history.push('/login');
  };

  if (isLogined()) {
    props.history.push('/');
  }

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
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={onChangeEmail}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={onChangePassword}
            />
          </Form.Group>

          <div className="login_subsection">
            <Link to="/signup" className="link">
              <div className="make_account">계정 만들기</div>
            </Link>
            <Button
              variant="primary"
              type="button"
              className="login_button"
              onClick={checkValid}
            >
              로그인
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
