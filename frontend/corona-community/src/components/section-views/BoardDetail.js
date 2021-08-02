import React, { useEffect, useState } from 'react';
import {
  InputGroup,
  FormControl,
  Button,
  CloseButton,
  ListGroup,
} from 'react-bootstrap';
import Loading from '../Loading';
import { isLogined } from '../../auth/AuthUtil';

const BoardDetail = props => {
  const [postId, setPostId] = useState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageName, setImageName] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [comments, setComments] = useState([]);
  const [membername, setMembername] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [imageData, setImageData] = useState('');
  const [inputComment, setInputComment] = useState('');

  const onChangeComment = e => {
    setInputComment(e.target.value);
  };

  const doRecommend = async () => {
    if (!isLogined()) {
      props.history.push('/login');
      alert('로그인을 해주세요.');
      return;
    }

    const response = await fetch(
      `/board/detail/${props.match.params.id}/recommend/${localStorage.getItem(
        'email'
      )}`,
      {
        method: 'POST',
        mode: 'cors',
      }
    );

    if (response.status === 400) {
      alert('게시글당 한번만 추천할 수 있습니다.');
      return;
    } else if (response.status !== 201) {
      alert('잠시후 다시 시도해주세요.');
    }

    await fetchData();
  };

  const doComment = async () => {
    if (!isLogined()) {
      props.history.push('/login');
      alert('로그인을 해주세요.');
      return;
    }

    const data = {
      email: window.localStorage.getItem('email'),
      text: inputComment,
      postId: postId,
    };

    const response = await fetch('/board/detail/comment', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      alert('잠시 후 시도해주세요.');
      return;
    }

    setInputComment('');

    await fetchData();
  };

  const removeComment = async (id, email) => {
    if (window.localStorage.getItem('email') !== email) {
      alert('자신의 댓글만 삭제할 수 있습니다.');
      return;
    }

    const response = await fetch(`/board/detail/comment/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });

    if (response.status !== 200) {
      alert('잠시 후 다시 시도해주세요.');
      return;
    }

    alert('삭제가 완료되었습니다.');
    await fetchData();
  };

  const getUsername = email => {
    return email.split('@')[0];
  };

  const getCreatedDate = timestamp => {
    const date = new Date(timestamp);
    return `${
      timestamp.split('T')[0]
    }, ${date.getHours()}: ${date.getMinutes()}`;
  };

  const fetchData = async () => {
    const response = await fetch(`/board/detail/${props.match.params.id}`);
    const data = await response.json();

    setTitle(data['title']);
    setContent(data['text']);
    setRecommends(data['recommends'].length);
    setComments(data['comments']);
    setMembername(getUsername(data['member']['email']));
    setCreatedDate(getCreatedDate(data['createdDate']));
    setImageData(data['photoData']);
    setImageName(data['photoName']);
    setPostId(data['id']);
  };

  const getComments = () => {
    const commentsRender = comments.map(item => (
      <ListGroup.Item className="comment_item">
        <div className="comment_email">
          {getUsername(item['member']['email'])}
        </div>
        <div className="comment_text">{item['text']}</div>
        <div className="comment_date">
          {getCreatedDate(item['createdDate'])}
        </div>
        <div className="remove_comment">
          <CloseButton
            onClick={() => removeComment(item['id'], item['member']['email'])}
          />
        </div>
      </ListGroup.Item>
    ));

    return <ListGroup>{commentsRender}</ListGroup>;
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  if (!title || !content || (imageName && !imageData)) {
    return <Loading></Loading>;
  }

  return (
    <div className="board_detail">
      <div className="board_header">
        <div>
          <h2>{title}</h2>
        </div>
        <div className="board_sub_header">
          <div className="board_sub_top_header">
            <div className="board_sub_left_header">
              {membername}&emsp;|&emsp;{createdDate}
            </div>
            <div className="board_sub_right_header">
              추천 {recommends}&emsp;|&emsp;댓글 {comments.length}
            </div>
          </div>
          {imageName ? (
            <div className="board_image_name">
              <a
                download={imageName}
                href={'data:image/jpg;charset=UTF-8;base64, ' + imageData}
              >
                {imageName}
              </a>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="board_body">
        {imageName ? (
          <img
            alt={imageName}
            className="board_image"
            src={'data:image/jpg;charset=UTF-8;base64, ' + imageData}
          ></img>
        ) : (
          <div></div>
        )}
        <div className="board_text">{content}</div>
        <div className="board_recommend">
          <i
            className="far fa-thumbs-up"
            style={{ fontSize: 'xxx-large' }}
            onClick={doRecommend}
          ></i>
          <div style={{ marginTop: '8px' }}>{recommends}</div>
        </div>
      </div>

      <div className="board_footer">
        <div className="board_input_comment">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="댓글을 입력하세요."
              value={inputComment}
              onChange={onChangeComment}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={doComment}
            >
              완료
            </Button>
          </InputGroup>
        </div>
        {comments.length ? <div>{getComments()}</div> : <div></div>}
      </div>
    </div>
  );
};

export default BoardDetail;
