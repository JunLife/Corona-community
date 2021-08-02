import React, { useEffect, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { isLogined } from '../../auth/AuthUtil';

const Profile = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [greeting, setGreeting] = useState('');

  const submitData = async () => {
    const data = {
      firstName,
      lastName,
      age,
      phoneNumber,
      greeting,
    };
    console.log(data);

    const response = await fetch(`/profile/${localStorage.getItem('email')}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      alert('수정에 실패했습니다.');
      return;
    }
    fetchData();
    alert('수정 되었습니다.');
    props.history.push('/');
  };

  if (!isLogined()) {
    props.history.push('/login');
    alert('로그인을 해주세요.');
  }

  const fetchData = async () => {
    const response = await fetch(`/profile/${localStorage.getItem('email')}`);
    const data = await response.json();

    setFirstName(data['firstName']);
    setLastName(data['lastName']);
    setAge(data['age']);
    setPhoneNumber(data['phoneNumber']);
    setGreeting(data['greeting']);
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  return (
    <div className="profile">
      <div className="profile_header">
        <h2>프로필</h2>
      </div>
      <div>
        <Form>
          <div className="profile_container">
            <div className="profile_input">
              <div className="profile_name">
                <Form.Group as={Col}>
                  <Form.Label>성</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="validationFormik102"
                  className="position-relative"
                >
                  <Form.Label>이름</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>나이</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>휴대폰 번호</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="profile_detail">
                <Form.Group as={Col}>
                  <Form.Label>인사</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={greeting}
                    onChange={e => setGreeting(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          <div
            className="profile_buton"
            style={{ marginLeft: '13px', marginTop: '12px' }}
          >
            <Button type="button" onClick={submitData}>
              완료
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
