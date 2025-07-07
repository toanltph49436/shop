import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './user/pages/Home';

import Header from './user/components/Header';
import Footer from './user/components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
