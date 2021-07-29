import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MyModalDev = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="modalTitle">
          경기대학교 컴퓨터공학부<br></br>19학번 3학년{' '}
          <span className="bold">조민준</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalBody">
          <h4>성적표</h4>
          <img src="./grade.png" alt="성적표" className="img"></img>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const MyModalTech = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="modalTitle">
          <span className="bold">Tools</span> (2021.07.04 ~ )
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer className="modalFooter">
        <div>
          <span className="bold">개발 환경) </span>
          JAVA(JDK 14) + IntelliJ IDEA + JAVASCRIPT + Visual Studio Code
        </div>
        <div>
          <span className="bold">Frontend) </span>
          React.js + React-Bootstrap + React-chartjs-2 + HTML + CSS
        </div>
        <div>
          <span className="bold">Backend) </span> Spring Boot + Spring Security
          + JPA
        </div>
        <div>
          <span className="bold">API) </span>
          굿바이 코로나(JSON) + Rest API from Backend(JSON)
        </div>
        <div>
          <span className="bold">형상관리) </span>
          Git +{' '}
          <a
            href="https://github.com/alswns9288/Corona-comunity"
            target="blank"
          >
            GitHub
          </a>
          (클릭시 이동)
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export { MyModalDev, MyModalTech };
