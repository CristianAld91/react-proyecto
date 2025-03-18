import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../itemListContainer/ItemListContainer.css';

const ItemList = ({ data }) => {
  const navigate = useNavigate(); 

  // Función para manejar el clic en la tarjeta del producto
  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="container">
      {data.length > 0 ? (
        data.map(producto => {
          const [quantity, setQuantity] = useState(1); // Estado para la cantidad

          // Función para incrementar la cantidad
          const increment = () => {
            if (quantity < producto.stock) {
              setQuantity(quantity + 1);
            }
          };
          // Función para decrementar la cantidad
          const decrement = () => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          };

          return (
            <div className="card" key={producto.id}>
              <img 
                src={producto.imagenes.imgProducto} 
                alt={producto.nombre} 
                className='card-media' 
                onClick={() => handleCardClick(producto.id)} // Llama a handleCardClick solo al hacer clic en la imagen
              />
              <h2 className="card-title">{producto.nombre}</h2>
              <p className="card-description">{producto.descripcion}</p>
              <p className='card-price'>Precio: ${producto.precio}</p>
              <p className='card-stock'>Stock: {producto.stock}</p>
              <button>Agregar al carrito</button> 
              <button onClick={increment}>+</button>
              <input 
                type="number" 
                min="1" 
                max={producto.stock} 
                value={quantity} 
                readOnly 
              />
              <button onClick={decrement}>-</button>
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
