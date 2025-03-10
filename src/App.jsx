import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
  
      <Routes>
        <Route exact path="/" element={<ItemListContainer />} />
        <Route exact path="/category/:id" element={<ItemListContainer />} />
        <Route exact path="/item/:id" element={<ItemDetailContainer />} />
        <Route path='/category/:categoryId' element={<ItemListContainer />} />
        <Route path="/category/tablets" element={<div>Tablets</div>} />
        <Route path="/category/celulares" element={<div>Celulares</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
