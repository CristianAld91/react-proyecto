import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import CartView from './components/cardView/CardView'; 
import CartItem from './components/cartItem/CartItem'; 

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); 

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    const newItem = new CartItem(product.id, product.nombre, product.precio, product.quantity || 1);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === newItem.id ? { ...item, cantidad: item.cantidad + newItem.cantidad } : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, cantidad: quantity } : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <BrowserRouter>
      <NavBar cartItems={cartItems} toggleCart={() => setShowCart(!showCart)} />
      {showCart && (
        <CartView 
          cartItems={cartItems} 
          removeFromCart={removeFromCart} 
          updateQuantity={updateQuantity} 
          calculateTotal={calculateTotal} 
        />
      )}
  
  <Routes>
  <Route exact path="/" element={<ItemListContainer addToCart={addToCart} />} />
  <Route path="/category/:categoryId" element={<ItemListContainer addToCart={addToCart} />} />
  <Route path="/item/:id" element={<ItemDetailContainer addToCart={addToCart} />} />
  <Route path="/category/tablets" element={<ItemListContainer addToCart={addToCart} />} />
  <Route path="/category/celulares" element={<ItemListContainer addToCart={addToCart} />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;
