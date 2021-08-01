import React, { useState, useEffect } from 'react';
import { Table, CloseButton } from 'react-bootstrap';
import Loading from '../Loading';

const Board = props => {
  const [pageData, setPageData] = useState([]);

  const getCreatedDate = item => {
    const date = new Date(item);
    return `${item.split('T')[0]}, ${date.getHours()}: ${date.getMinutes()}`;
  };

  const deletePost = async id => {
    const response = await fetch(`/post/delete/${id}`, {
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

  const getPosts = () => {
    const posts = pageData.map(item => (
      <tr className="list_item" key={item['id']}>
        <td onClick={() => props.history.push(`/modify_post/${item['id']}`)}>
          {item['id']}
        </td>
        <td
          onClick={() => props.history.push(`/modify_post/${item['id']}`)}
          className="title"
        >
          {item['title']}
        </td>
        <td onClick={() => props.history.push(`/modify_post/${item['id']}`)}>
          {' '}
          &ensp;&emsp;{item['comments'].length}
        </td>
        <td onClick={() => props.history.push(`/modify_post/${item['id']}`)}>
          {' '}
          &ensp;&emsp;{item['recommend']}
        </td>
        <td onClick={() => props.history.push(`/modify_post/${item['id']}`)}>
          {getCreatedDate(item['createdDate'])}
        </td>
        <td className="remove_post" onClick={() => deletePost(item['id'])}>
          <CloseButton />
        </td>
      </tr>
    ));

    return <>{posts.reverse()}</>;
  };

  const fetchData = async () => {
    const response = await fetch(
      `/posts/${window.localStorage.getItem('email')}`
    );
    const data = await response.json();

    setPageData(data);
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  if (!pageData) {
    return <Loading></Loading>;
  }

  return (
    <div className="board">
      <div className="board_list">
        <div className="board_header">
          <h2>내가 쓴 글</h2>
        </div>

        <Table responsive="sm" className="board_contents">
          <thead>
            <tr>
              <th className="number">#</th>
              <th className="title">글 제목</th>
              <th className="number">댓글 수</th>
              <th className="number">추천 수</th>
              <th className="date">작성 날짜</th>
              <th className="remove_post_head"></th>
            </tr>
          </thead>
          <tbody>{getPosts()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default Board;
