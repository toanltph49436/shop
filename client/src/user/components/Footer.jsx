// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: '#f4f4f4', padding: '10px 20px', textAlign: 'center' }}>
      <p>© {new Date().getFullYear()} iPhone Shop. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
