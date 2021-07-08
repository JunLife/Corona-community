import React, { useState } from 'react';
import { MyModalDev, MyModalTech } from './Modals';

const Footer = () => {
  const [modalShowDev, setModalShowDev] = useState(false);
  const [modalShowTech, setModalShowTech] = useState(false);

  return (
    <div className="footer">
      <ul className="footer-list">
        <li className="footer-item" onClick={() => setModalShowDev(true)}>
          개발자
        </li>
        <li className="footer-item" onClick={() => setModalShowTech(true)}>
          Tools
        </li>
      </ul>
      <MyModalDev show={modalShowDev} onHide={() => setModalShowDev(false)} />
      <MyModalTech
        show={modalShowTech}
        onHide={() => setModalShowTech(false)}
      />
    </div>
  );
};

export default Footer;
