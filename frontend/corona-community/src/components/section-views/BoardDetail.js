import React, { useEffect, useState } from 'react';
import {
  InputGroup,
  FormControl,
  Button,
  Card,
  ListGroup,
} from 'react-bootstrap';
import Loading from '../Loading';

const BoardDetail = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageName, setImageName] = useState([]);
  const [recommend, setRecommend] = useState(0);
  const [comments, setComments] = useState([]);
  const [membername, setMembername] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [imageData, setImageData] = useState('');

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
    setRecommend(data['recommend']);
    setComments(data['comments']);
    setMembername(getUsername(data['member']['email']));
    setCreatedDate(getCreatedDate(data['createdDate']));
    setImageData(data['photoData']);
    setImageName(data['photoName']);
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
              추천 {recommend}&emsp;|&emsp;댓글 {comments.length}
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
        <div>{content}</div>
      </div>

      <div className="board_footer">
        <div className="board_input_comment">
          <InputGroup className="mb-3">
            <FormControl placeholder="댓글을 입력하세요." />
            <Button variant="outline-secondary" id="button-addon2">
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
