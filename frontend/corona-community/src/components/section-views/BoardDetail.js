import React, { useEffect, useState } from 'react';
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
    console.log(imageName + ' ' + imageData);
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
    </div>
  );
};

export default BoardDetail;
