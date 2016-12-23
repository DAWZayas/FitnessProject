
// npm packages
import React from 'react';

import Footer from '../components/footer';
import Navbar from '../components/navbar';

export default ({children}) => (
  <div className="container">
    <Navbar />
    {children}
    <Footer />
  </div>
);
