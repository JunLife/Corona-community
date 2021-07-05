import React from 'react';
import Header from './component/Header';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Section from './component/Section';
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="withoutNavbar">
        <Header />
        <Section />
        <Footer />
      </div>
    </div>
  );
};

export default App;
