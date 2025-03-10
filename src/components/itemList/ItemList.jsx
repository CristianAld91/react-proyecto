import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../itemListContainer/ItemListContainer.css';

const ItemList = ({ data }) => {
  const navigate = useNavigate(); 

  // Funcion para manejar el clic en la tarjeta del producto
  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="container">
      {data.length > 0 ? (
        data.map(celular => (
          <div className="card" key={celular.id} onClick={() => handleCardClick(celular.id)}>
            <img src={celular.imagenes.imgProducto} alt={celular.nombre} className='card-media' />
            <h2 className="card-title">{celular.nombre}</h2>
            <p className="card-description">{celular.descripcion}</p>
            <p className='card-price'>Precio: ${celular.precio}</p>
            <p className='card-stock'>Stock: {celular.stock}</p>
            <button>Agregar al carrito</button>
            <button>+</button>
            <input type="number"></input>
            <button>-</button>
          </div>
        ))
      ) : (
        <div>No hay productos disponibles</div>
      )}
    </div>
  );
};

export default ItemList;
