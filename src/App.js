import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header';
import Footer from './components/views/Footer';
import Home from './components/pages/Home';
import TableDetails from './components/pages/TableDetails';
import NotFound from './components/pages/NotFound';

const App = () => {
  return (
    <Container expand="lg">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<TableDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
