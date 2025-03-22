import React from 'react';
import './cartModal.css'
const CartModal = ({ cart, onClose }) => {
  return (
    <div className="cart-modal">
      <button onClick={onClose}>Cerrar</button>
      <h2>Detalles del Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        cart.map(item => (
          <div key={item.id}>
            <h3>{item.nombre}</h3>
            <p>Cantidad: {item.cantidad}</p>
            <p>Precio: ${item.precio * item.cantidad}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartModal;
