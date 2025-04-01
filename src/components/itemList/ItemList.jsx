import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../itemListContainer/ItemListContainer.css';

const ItemList = ({ data, addToCart }) => {
  const navigate = useNavigate(); 
  const [quantities, setQuantities] = useState({});

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  const increment = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const decrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1)
    }));
  };

  const handleAddToCart = (producto) => {
    const quantity = quantities[producto.id] || 1; // Usar la cantidad seleccionada
    if (producto.stock >= quantity) {
      // Agregar al carrito con la cantidad seleccionada
      addToCart({ ...producto, cantidad: quantity });
      // Reiniciar cantidad solo si se agrega correctamente
      setQuantities(prev => ({ ...prev, [producto.id]: 1 })); // Reiniciar a 1 después de agregar
    } else {
      alert('El producto no está disponible en stock');
    }
  };

  return (
    <div className="container">
      {data.length > 0 ? (
        data.map(producto => {
          const quantity = quantities[producto.id] || 1;

          return (
            <div className="card" key={producto.id}>
              <img 
                src={producto.imgProducto} 
                alt={producto.nombre} 
                className='card-media' 
                onClick={() => handleCardClick(producto.id)} 
              />
              <h2 className="card-title">{producto.nombre}</h2>
              <p className="card-description">{producto.descripcion}</p>
              <p className='card-price'>Precio: ${producto.precio}</p>
              <p className='card-stock'>Stock: {producto.stock}</p>
              <button onClick={() => handleAddToCart(producto)}>Agregar al carrito</button> 
              <button onClick={() => increment(producto.id)}>+</button>
              <input 
                type="number" 
                min="1" 
                max={producto.stock} 
                value={quantity} 
                readOnly 
                aria-label={`Cantidad de ${producto.nombre}`} 
              />
              <button onClick={() => decrement(producto.id)}>-</button>
            </div>
          );
        })
      ) : (
        <div>No hay productos disponibles</div>
      )}
    </div>
  );
};

export default ItemList;
