import React from 'react';
import { isLogined } from '../../auth/AuthUtil';

const Profile = props => {
  if (!isLogined()) {
    props.history.push('/login');
    alert('로그인을 해주세요.');
  }

  return <div>testtest</div>;
};

export default Profile;
