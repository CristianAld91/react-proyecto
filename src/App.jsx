// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import './App.css';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemList from './components/itemListContainer/ItemList';


function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <div className="hero">
          <ItemListContainer greeting='¡Bienvenido a nuestra web!' />
        </div>
        <Routes exact path="/" element={<ItemListContainer/>} />
        <Route exact path="detail/:productoId" element={<ItemDetailContainer/>}/>
      <Routes path="/cart" element={<div>Mi carrito</div>} /> 
      <Routes path="/category/celulares" element={<div>Celulares</div>}/>
      <Routes path="/category/tablets" element={<div>Tablets</div>}/>

    </BrowserRouter>
  );
}

export default App;
