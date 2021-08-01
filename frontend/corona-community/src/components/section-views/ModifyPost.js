import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Loading from '../Loading';

const ModifyPost = props => {
  const [imageData, setImageData] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [newImage, setNewImage] = useState(null);

  const onChangeFile = e => {
    setNewImage(e.target.files[0]);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  const onChangeText = e => {
    setContent(e.target.value);
  };

  const doModify = async () => {
    const formData = new FormData();

    if (newImage) {
      formData.append('file', newImage);
    }
    formData.append('title', title);
    formData.append('text', content);

    const response = await fetch(`/post/modify/${props.match.params.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: formData,
    });

    if (response.status !== 200) {
      alert('수정 실패');
      return;
    }

    props.history.push('/board');
  };

  const fetchData = async () => {
    const response = await fetch(`/board/detail/${props.match.params.id}`);
    const data = await response.json();

    setTitle(data['title']);
    setContent(data['text']);
    setImageName(data['photoName']);
    setImageData(data['photoData']);
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  if (!title || !content || (imageName && !imageData)) {
    return <Loading></Loading>;
  }

  return (
    <div className="new_post">
      <div className="new_post_title">
        <h2>글수정</h2>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={onChangeTitle}
            onKeyDown={e => {
              if (e.keyCode === 8) {
                return;
              }
            }}
          />
        </Form.Group>
        <Form.Group controlId="formFileSm">
          <Form.Label>
            <span className="bold">현재 파일: {imageName}</span>
          </Form.Label>
          <Form.Control
            type="file"
            size="sm"
            className="file"
            onChange={onChangeFile}
          />
        </Form.Group>
        (이미지를 변경하려면 이미지를 업로드 하세요. - 아무것도 업로드 하지
        않으면 이미지가 삭제됩니다.)
        {imageName ? (
          <div className="board_image_container">
            <img
              alt={imageName}
              className="board_image"
              src={'data:image/jpg;charset=UTF-8;base64, ' + imageData}
            ></img>
          </div>
        ) : (
          <div></div>
        )}
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>본문</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            value={content}
            onChange={onChangeText}
          />
        </Form.Group>
        <div className="post_button">
          <div></div>
          <Button variant="primary" type="button" onClick={doModify}>
            &ensp;완료&ensp;
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ModifyPost;
