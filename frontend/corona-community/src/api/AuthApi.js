import { loginMember, logoutMember } from '../utiles/AuthUtil';

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

export { doLogin, doLogout };
