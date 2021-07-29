import { loginMember, logoutMember } from './AuthUtil';

const doLogin = async (email, password) => {
  const data = {
    email,
    password,
  };

  const response = await fetch('/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status === 200) {
    loginMember(await response.json());
    return;
  }
};

const doLogout = async () => {
  const response = await fetch('/logout', {
    method: 'POST',
    mode: 'cors',
  });

  if (response.status === 200) {
    logoutMember();
    return;
  }
};

const doSignup = async (email, password, props) => {
  const data = {
    email,
    password,
  };

  const response = await fetch('/signup', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status === 201) {
    alert('회원가입이 완료되었습니다.');
    props.history.push('/login');
    return;
  }
  alert('회원가입에 실패했습니다.');
};

const doCheckEmail = async email => {
  const response = await fetch(`/checkEmail?email=${email}`);
  console.log(response.status);
  if (response.status !== 200) {
    throw 400;
  }
};

export { doLogin, doLogout, doSignup, doCheckEmail };
