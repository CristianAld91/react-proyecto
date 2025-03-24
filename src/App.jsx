import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import CartView from './components/cardView/CardView'; 
import { addToCart, removeFromCart, updateQuantity, calculateTotal } from './components/cartUtils/CartUtils';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); 

  const handleAddToCart = (product) => {
    setCartItems(prevItems => addToCart(prevItems, product));
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prevItems => removeFromCart(prevItems, id));
};

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(prevItems => updateQuantity(prevItems, id, quantity));
  };

  const total = calculateTotal(cartItems);

  return (
    <BrowserRouter>
      <NavBar cartItems={cartItems} toggleCart={() => setShowCart(!showCart)} />
      {showCart && (
        <CartView 
          cartItems={cartItems} 
          removeFromCart={handleRemoveFromCart} 
          updateQuantity={handleUpdateQuantity} 
          calculateTotal={total} 
        />
      )}
  
      <Routes>
        <Route exact path="/" element={<ItemListContainer addToCart={handleAddToCart} />} />
        <Route path="/category/:categoryId" element={<ItemListContainer addToCart={handleAddToCart} />} />
        <Route path="/item/:id" element={<ItemDetailContainer addToCart={handleAddToCart} />} />
        <Route path="/category/tablets" element={<ItemListContainer addToCart={handleAddToCart} />} />
        <Route path="/category/celulares" element={<ItemListContainer addToCart={handleAddToCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
