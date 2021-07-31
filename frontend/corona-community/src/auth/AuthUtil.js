const loginMember = member => {
  for (let key in member) {
    if (key === 'id' || key === 'password' || key === 'role') {
      continue;
    }
    localStorage.setItem(key, member[key]);
  }
  window.location.reload();
};

const logoutMember = () => {
  while (true) {
    const email = localStorage.getItem('email');

    if (email) {
      localStorage.removeItem('email');
      localStorage.removeItem('phoneNumber');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('photo');
      localStorage.removeItem('greeting');
      localStorage.removeItem('age');
    } else {
      return;
    }
  }
};

const isLogined = () => {
  return localStorage.getItem('email');
};

export { loginMember, logoutMember, isLogined };
