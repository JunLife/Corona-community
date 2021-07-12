import React from 'react';
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

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
      {/* <div className="toggle">
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
        </NavDropdown>
      </div> */}
    </Navbar>
  );
};

export default Header;
