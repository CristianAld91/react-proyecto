import './App.css';
import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import CartView from './components/cardView/CartView'; 
import { addToCart, updateQuantity, calculateTotal } from './components/cart/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); 

  const handleAddToCart = useCallback((product) => {
    setCartItems(prevItems => addToCart(prevItems, product));
  }, []);

  const handleUpdateQuantity = useCallback((id, quantity) => {
    setCartItems(prevItems => updateQuantity(prevItems, id, quantity));
  }, []);

  const total = calculateTotal(cartItems); 

  return (
    <BrowserRouter>
      <NavBar cartItems={cartItems} toggleCart={() => setShowCart(!showCart)} />
      {showCart && (
        <CartView 
          cartItems={cartItems} 
          setCartItems={setCartItems} 
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
