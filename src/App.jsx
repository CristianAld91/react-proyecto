import './App.css';
import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import ItemQualitySelector from './components/ItemQuality/ItemQualitySelector';
import { addToCart, updateQuantity, calculateTotal } from './components/cart/cartFuncions';
import Footer from '../src/assets/footer/footer';

function App() {
  const [cartItems, setCartItems] = useState([]); // Estado del carrito
  const [showCart, setShowCart] = useState(false); // Control de visibilidad del carrito

  // Función para agregar producto al carrito
  const handleAddToCart = useCallback((product) => {
    setCartItems((prevItems) => addToCart(prevItems, product));
  }, []);

  // Función para actualizar cantidad de producto
  const handleUpdateQuantity = useCallback((id, quantity) => {
    setCartItems((prevItems) => updateQuantity(prevItems, id, quantity));
  }, []);

  // Calcular total del carrito
  const total = calculateTotal(cartItems);

  //Verificar las props enviadas
  console.log("Estado y funciones enviadas desde App.jsx:", { cartItems, setCartItems, handleUpdateQuantity });

  return (
    <BrowserRouter>
      {/* NavBar */}
      <NavBar 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
        updateQuantity={handleUpdateQuantity} 
        toggleCart={() => setShowCart(!showCart)} 
      />

      {/* Renderizar ItemQualitySelector solo si el carrito está visible */}
      {showCart && (
        <ItemQualitySelector 
          cartItems={cartItems} 
          setCartItems={setCartItems} 
          updateQuantity={handleUpdateQuantity} 
        />
      )}

      {/* Configurar rutas */}
      <Routes>
        {/* Página principal */}
        <Route 
          exact 
          path="/" 
          element={<ItemListContainer addToCart={handleAddToCart} />} 
        />

        {/* Categorías */}
        <Route 
          path="/category/:categoryId" 
          element={<ItemListContainer addToCart={handleAddToCart} />} 
        />

        {/* Detalles de ítems */}
        <Route 
          path="/item/:id" 
          element={<ItemDetailContainer addToCart={handleAddToCart} />} 
        />
        
        {/* Categoría tablets */}
        <Route 
          path="/category/tablets" 
          element={<ItemListContainer addToCart={handleAddToCart} />} 
        />
        
        {/* Categoría celulares */}
        <Route 
          path="/category/celulares" 
          element={<ItemListContainer addToCart={handleAddToCart} />} 
        />
      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
