import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import './App.css';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';

function App() {
  return (
    <Router>
      <NavBar />
    
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/detail/:id" element={<ItemDetailContainer />} />
  
        <Route path="/category/tablets" element={<div>Tablets</div>} />
        <Route path="/category/celulares" element={<div>Celulares</div>} />
      </Routes>
    </Router>
  );
}

export default App;
