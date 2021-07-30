import React, { useState, useEffect } from 'react';
import {
  Pagination,
  Table,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';
import Loading from '../Loading';

const Board = props => {
  const [active, setActive] = useState(1);
  const [pageSize, setPageSize] = useState(
    localStorage.getItem('pageSize') || 5
  );
  const [totalPage, setTotalPage] = useState(100);
  const [pageData, setPageData] = useState('');
  const [keyword, setKeyword] = useState('');

  const onChangeKeyword = e => {
    setKeyword(e.target.value);
  };

  const search = async () => {
    console.log(keyword);
    if (keyword) {
      window.localStorage.setItem('keyword', keyword);
      await fetchSearchData(1, keyword);
      setKeyword('');
      return;
    }
    await fetchData(1);
    window.localStorage.setItem('keyword', '');
  };

  const getUsername = email => {
    return email.split('@')[0];
  };

  const getCreatedDate = item => {
    const date = new Date(item);
    return `${item.split('T')[0]}, ${date.getHours()}: ${date.getMinutes()}`;
  };

  const changePageSize = size => {
    handleData(active);
    localStorage.setItem('pageSize', size);
    window.location.reload();
  };

  const getPosts = () => {
    const pageDataJson = JSON.parse(pageData);
    const postsDataJson = pageDataJson['content'];

    const posts = postsDataJson.map(item => (
      <tr
        className="list_item"
        onClick={() => props.history.push(`/board/detail/${item['id']}`)}
        key={item['id']}
      >
        <td>{item['id']}</td>
        <td className="title">{item['title']}</td>
        <td> &ensp;&emsp;{item['comments'].length}</td>
        <td> &ensp;&emsp;{item['recommend']}</td>
        <td>{getUsername(item['member']['email'])}</td>
        <td>{getCreatedDate(item['createdDate'])}</td>
      </tr>
    ));

    return <>{posts}</>;
  };

  const fetchData = async number => {
    const response = await fetch(`/board?page=${number - 1}&size=${pageSize}`);
    const data = await response.json();

    setPageData(JSON.stringify(data));
    setTotalPage(data['totalPages']);
  };

  const fetchSearchData = async (number, keyword) => {
    const response = await fetch(
      `/board/search?page=${number - 1}&size=${pageSize}&keyword=${keyword}`
    );
    const data = await response.json();

    setPageData(JSON.stringify(data));
    setTotalPage(data['totalPages']);
  };

  const handleData = async number => {
    setActive(number);
    setPageData('');

    if (window.localStorage.getItem('keyword')) {
      await fetchSearchData(number, window.localStorage.getItem('keyword'));
      return;
    }

    await fetchData(number);
  };

  const pagination = () => {
    let items = [];
    let firstPage = Math.max(active - 2, 1);
    let lastPage = Math.min(active + 2, totalPage);

    if (active < 3) {
      lastPage += 3 - active;
    }

    if (active > totalPage - 2) {
      firstPage -= active - (totalPage - 2);
    }

    if (totalPage < 5) {
      firstPage = 1;
      lastPage = totalPage;
    }

    for (let number = firstPage; number <= lastPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => handleData(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <div>
        <Pagination>{items}</Pagination>
      </div>
    );
  };

  useEffect(async () => {
    window.localStorage.setItem('keyword', '');
    await fetchData(1);
  }, []);

  if (!pageData) {
    return <Loading></Loading>;
  }

  return (
    <div className="board">
      <div className="board_list">
        <div className="board_header">
          <h2>자유 게시판</h2>

          <div className="board_sub">
            <div className="search">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Post Search"
                  className="search-text"
                  value={keyword}
                  onChange={onChangeKeyword}
                />
                <Button variant="outline-primary" onClick={search}>
                  Search
                </Button>
              </Form>
            </div>
            <div className="board_sub_right">
              <NavDropdown title={pageSize + '개 표시'} id="dropdown">
                <NavDropdown.Item onClick={() => changePageSize(5)}>
                  5개
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changePageSize(10)}>
                  10개
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changePageSize(30)}>
                  30개
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changePageSize(50)}>
                  50개
                </NavDropdown.Item>
              </NavDropdown>
              <Button className="write" href="/post">
                글쓰기
              </Button>
            </div>
          </div>
        </div>

        <Table responsive="sm" className="board_contents">
          <thead>
            <tr>
              <th className="number">#</th>
              <th className="title">글 제목</th>
              <th className="number">댓글 수</th>
              <th className="number">추천 수</th>
              <th className="writer">작성자</th>
              <th className="date">작성 날짜</th>
            </tr>
          </thead>
          <tbody>{getPosts()}</tbody>
        </Table>
      </div>
      <div className="pagination">
        <Pagination.First onClick={() => handleData(1)} />
        {pagination()}
        <Pagination.Last onClick={() => handleData(totalPage)} />
      </div>
    </div>
  );
};

export default Board;
