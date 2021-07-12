import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Section from './components/Section';
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
