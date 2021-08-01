import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { isLogined } from '../../auth/AuthUtil';

const NewPost = props => {
  if (!isLogined()) {
    props.history.push('/login');
    alert('로그인을 해주세요.');
  }

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const onChangeFile = e => {
    setImage(e.target.files[0]);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  const onChangeText = e => {
    setText(e.target.value);
  };

  const doPost = async () => {
    const formData = new FormData();

    if (image) {
      formData.append('file', image);
    }
    formData.append('memberEmail', window.localStorage.getItem('email'));
    formData.append('title', title);
    formData.append('text', text);

    const response = await fetch('/post/new', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });

    if (response.status !== 201) {
      alert('업로드 실패');
      return;
    }

    props.history.push('/board');
  };

  return (
    <div className="new_post">
      <div className="new_post_title">
        <h2>글쓰기</h2>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" value={title} onChange={onChangeTitle} />
        </Form.Group>
        <Form.Group controlId="formFileSm">
          <Form.Label>첨부파일</Form.Label>
          <Form.Control
            type="file"
            size="sm"
            className="file"
            onChange={onChangeFile}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>본문</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            value={text}
            onChange={onChangeText}
          />
        </Form.Group>
        <div className="post_button">
          <div></div>
          <Button variant="primary" type="button" onClick={doPost}>
            &ensp;완료&ensp;
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewPost;
