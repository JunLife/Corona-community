import React from 'react';
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isLogined } from '../auth/AuthUtil';
import { doLogout } from '../auth/AuthApi';

const Header = () => {
  return (
    <Navbar bg="light" variant="light" className="header">
      <div className="search">
        <Form inline>
          <FormControl
            type="text"
            placeholder="Post Search"
            className="search-text"
          />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </div>

      {isLogined() ? (
        <div className="toggle">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" onClick={doLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      ) : (
        <div className="login_button">
          <Link to="/login" className="link">
            <Button variant="primary">로그인</Button>
          </Link>
        </div>
      )}
    </Navbar>
  );
};

export default Header;
