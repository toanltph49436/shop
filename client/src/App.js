import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './user/pages/Home';

import Header from './user/components/Header';
import Footer from './user/components/Footer';
import ProductDetail from './user/pages/ProductDetail';
import Register from './user/pages/Register';
import Login from './user/pages/Login';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
